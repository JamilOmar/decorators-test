'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
require("reflect-metadata");
const FacilityProxy = require('ls-facility').Proxy, FacilityItems = FacilityProxy.Items;
class Items {
    constructor(opt) {
        this.listName = opt.listname;
        this.facilityPath = opt.facilityPath;
        this.config = opt.config;
        this.converToBase = opt.converToBase;
    }
    labshareObjectMetadata() {
        if (!this.localObjectMetadata) {
            let localObjectInstance = this.getNew();
            let listProperties = Reflect.getMetadata('labshare:list', localObjectInstance)[0];
            this.localObjectMetadata = {
                properties: listProperties,
                fields: Reflect.getMetadata('labshare:fields', localObjectInstance)
            };
        }
        return this.localObjectMetadata;
    }
    getNew() {
        if (this.converToBase)
            return new this.converToBase();
        return {};
    }
    isLabshareObj(inputClass) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(inputClass.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
    toLabshareObject(item) {
        //get the information from the parent
        let parentTarget = Object.getPrototypeOf(item).constructor;
        //get information for each of the properties
        let labshareProperties = [];
        _.mapKeys(item, (value, key) => {
            let indices = Reflect.getMetadata(`labshare:field:${key}`, item, key);
            if (indices && indices.length === 1) {
                labshareProperties.push({
                    internalName: indices[0].internalName,
                    type: indices[0].type || 'Text',
                    value: value || null
                });
            }
        });
        return { Properties: labshareProperties };
    }
    fromLabshareObject(labshareObj) {
        let newObj = this.getNew();
        let fieldsMetadata = Reflect.getMetadata('labshare:fields', newObj);
        _.forEach(fieldsMetadata, (key) => {
            let indices = Reflect.getMetadata(`labshare:field:${key}`, newObj, key);
            if (indices && indices.length === 1) {
                let property = _.find(labshareObj.Properties, x => { return x.internalName == indices[0].internalName; });
                if (property)
                    _.set(newObj, key, property.value);
            }
        });
        return newObj;
    }
    //***************************************************************************************************************
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.converToBase) {
                let api = new FacilityItems({ facilityPath: this.facilityPath, listName: this.labshareObjectMetadata().properties.listname || this.listName, driver: 'spFacility', driverConfig: this.config });
                let data = yield api.getAll();
                let objs = [];
                _.forEach(data.items, (obj) => {
                    objs.push(this.fromLabshareObject(obj));
                });
                return objs;
            }
            else {
                let api = new FacilityItems({ facilityPath: this.facilityPath, listName: this.listName, driver: 'spFacility', driverConfig: this.config });
                return yield api.getAll();
            }
        });
    }
    //***************************************************************************************************************
    /**
     *
     * @param {T} item
     * @returns {*}
     */
    add(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let itemID;
            if (this.converToBase) {
                let api = new FacilityItems({ facilityPath: this.facilityPath, listName: this.labshareObjectMetadata().properties.listname || this.listName, driver: 'spFacility', driverConfig: this.config });
                itemID = yield api.add(this.toLabshareObject(item));
            }
            else {
                let api = new FacilityItems({ facilityPath: this.facilityPath, listName: this.listName, driver: 'spFacility', driverConfig: this.config });
                itemID = yield api.add(item);
            }
            return itemID;
        });
    }
}
exports.Items = Items;
//# sourceMappingURL=items.js.map