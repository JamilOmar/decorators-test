import 'reflect-metadata';
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
export declare class Items<T> {
    private listName?;
    private converToBase?;
    private localObjectMetadata;
    private facilityPath;
    private config;
    constructor(opt: {
        facilityPath: string;
        listname?: string;
        config: any;
        converToBase?: new () => T;
    });
    labshareObjectMetadata(): labshareObjectListMetadata;
    getNew(): T | object;
    isLabshareObj(inputClass: any): string;
    protected toLabshareObject(item: T): any;
    protected fromLabshareObject(labshareObj: any): T;
    getAll(): Promise<any>;
    /**
     *
     * @param {T} item
     * @returns {*}
     */
    add(item: T): Promise<number>;
}
