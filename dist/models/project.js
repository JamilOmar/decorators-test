"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("../decorators/class");
const fields_1 = require("../decorators/fields");
let Project = class Project {
    constructor() {
    }
};
__decorate([
    fields_1.Field({ internalName: 'ID', type: 'Number' }),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    fields_1.Field({ internalName: 'Title', type: 'Text' }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
Project = __decorate([
    class_1.List({ listname: 'ProjectsTest' }),
    __metadata("design:paramtypes", [])
], Project);
exports.Project = Project;
//# sourceMappingURL=project.js.map