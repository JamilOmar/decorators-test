import 'reflect-metadata';
import * as Enums from '../enums';
export declare function Field(opt: {
    internalName: string;
    type?: Enums.FieldType;
    isRequired?: boolean;
    isReadOnly?: boolean;
}): (target: any, propertyKey: string) => void;
