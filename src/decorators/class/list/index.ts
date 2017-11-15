import 'reflect-metadata';
import * as Enums from '../enums';
export function List(opt?: {
    listname?: string, readOnlyFields?: any[]
        , hiddenFields?: any[], staffFields?: any[]
}) {
    return function (target: any) {
        
        let objectProperties = Reflect.getMetadata('labshare:list', target.prototype) || [];
        objectProperties.push(opt);
        Reflect.defineMetadata('labshare:list', objectProperties, target.prototype);
    };
}
