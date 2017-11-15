
'use strict';


import * as _ from 'lodash';
import * as urljoin from 'url-join';
import 'reflect-metadata';
const FacilityProxy = require('ls-facility').Proxy,
    FacilityItems = FacilityProxy.Items;


/*
function getName(inputClass:any) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((<any> inputClass).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }

*/
//method for generate objects

export interface labshareObjectListPropertyMetadata {
    listname: string;
    readOnlyFields?: any[];
    hiddenFields?: any[];
    staffFields?: any[];
}

export interface labshareObjectListMetadata {
    properties: labshareObjectListPropertyMetadata;
    fields: string[];
}




export class Items<T>  {
    private listName?: string;
    private converToBase?: new () => T;
    private localObjectMetadata: labshareObjectListMetadata;
    private facilityPath: string;
    private config: any;
    constructor(opt:{facilityPath: string, listname?: string, config: any, converToBase?: new () => T}) {
        this.listName = opt.listname;
        this.facilityPath = opt.facilityPath;
        this.config = opt.config;
        this.converToBase = opt.converToBase;
    }

    labshareObjectMetadata() {
        if (!this.localObjectMetadata) {
            let localObjectInstance = this.getNew();
            let listProperties: labshareObjectListPropertyMetadata = Reflect.getMetadata('labshare:list', localObjectInstance)[0];
            this.localObjectMetadata = {
                properties: listProperties,
                fields: Reflect.getMetadata('labshare:fields', localObjectInstance)
            };
        }
        return this.localObjectMetadata;

    }

    getNew(): T | object {
        if (this.converToBase)
            return new this.converToBase();
        return {}
    }
    isLabshareObj(inputClass: any) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((<any>inputClass).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
    protected toLabshareObject(item: T): any {
        //get the information from the parent
        let parentTarget = Object.getPrototypeOf(item).constructor;
        //get information for each of the properties
        let labshareProperties: any[] = [];
        _.mapKeys(item, (value: any, key: string) => {
            let indices = Reflect.getMetadata(`labshare:field:${key}`, item, key);
            if (indices && indices.length === 1) //only one map per field
            {
                labshareProperties.push({
                    internalName: indices[0].internalName,
                    type: indices[0].type || 'Text',
                    value: value || null
                })
            }
        });
        return { Properties: labshareProperties };
    }
    protected fromLabshareObject(labshareObj: any): T {
        let newObj = this.getNew();
        let fieldsMetadata = Reflect.getMetadata('labshare:fields', newObj);
        _.forEach(fieldsMetadata, (key) => {
            let indices = Reflect.getMetadata(`labshare:field:${key}`, newObj, key);
            if (indices && indices.length === 1) //only one map per field
            {
                let property = _.find(labshareObj.Properties, x => { return x.internalName == indices[0].internalName });
                if (property)
                    _.set(newObj as Object, key, property.value);
            }
        })
        return newObj as T;
    }

    //***************************************************************************************************************
    async getAll(): Promise<any> {



        if (this.converToBase) {
            let api = new FacilityItems({ facilityPath: this.facilityPath, listName: this.labshareObjectMetadata().properties.listname || this.listName, driver: 'spFacility', driverConfig: this.config });
            let data = await api.getAll();
            let objs: T[] = [];

            _.forEach(data.items, (obj) => {
                objs.push(this.fromLabshareObject(obj));
            })
            return objs;

        }
        else {
            let api = new FacilityItems({ facilityPath: this.facilityPath, listName: this.listName, driver: 'spFacility', driverConfig: this.config });
            return await api.getAll();

        }

    }


    //***************************************************************************************************************
    /**
     *
     * @param {T} item
     * @returns {*}
     */
    async add(item: T): Promise<number> {

        let itemID;
        if (this.converToBase) {
            let api = new FacilityItems({ facilityPath: this.facilityPath, listName: this.labshareObjectMetadata().properties.listname || this.listName, driver: 'spFacility', driverConfig: this.config });
            itemID = await api.add(this.toLabshareObject(item));


        }
        else {
            let api = new FacilityItems({ facilityPath: this.facilityPath, listName: this.listName, driver: 'spFacility', driverConfig: this.config });
            itemID = await api.add(item);

        }
        return itemID;
    }


}

