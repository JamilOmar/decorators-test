"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Field(opt) {
    return function (target, propertyKey) {
        //adding the properpty to the available fields
        let objectFields = Reflect.getMetadata('labshare:fields', target) || [];
        objectFields.push(propertyKey);
        Reflect.defineMetadata('labshare:fields', objectFields, target);
        //adding the metadata to each of the properties
        let metadataKey = `labshare:field:${propertyKey}`;
        let indices = Reflect.getMetadata(metadataKey, target, propertyKey) || [];
        indices.push(opt);
        Reflect.defineMetadata(metadataKey, indices, target, propertyKey);
    };
}
exports.Field = Field;
//# sourceMappingURL=index.js.map