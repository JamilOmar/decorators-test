"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function List(opt) {
    return function (target) {
        let objectProperties = Reflect.getMetadata('labshare:list', target.prototype) || [];
        objectProperties.push(opt);
        Reflect.defineMetadata('labshare:list', objectProperties, target.prototype);
    };
}
exports.List = List;
//# sourceMappingURL=index.js.map