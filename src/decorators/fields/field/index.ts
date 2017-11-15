

import 'reflect-metadata';
import * as Enums from '../enums';


export function Field(opt: { internalName: string, type?: Enums.FieldType, isRequired?: boolean, isReadOnly?: boolean }) {
    return function (target: any, propertyKey: string) {
        //adding the properpty to the available fields
        let objectFields = Reflect.getMetadata('labshare:fields', target) || [];
        objectFields.push(propertyKey);
        Reflect.defineMetadata('labshare:fields',objectFields, target); 
        //adding the metadata to each of the properties
        let metadataKey =`labshare:field:${propertyKey}`;
        let indices = Reflect.getMetadata(metadataKey, target, propertyKey) || [];
        indices.push(opt);
        Reflect.defineMetadata(metadataKey, indices, target, propertyKey);
    };
}
