"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("./models/project");
const items_1 = require("./proxy/items");
let itemsProxy = new items_1.Items({
    facilityPath: 'FACILITY_INTEGRATION_TESTS_DEV', config: {
        "Site": "https://testsp.labshare.org/ss/one/",
        "User": "USERNAME",
        "Password": "PASSWORD"
    }, converToBase: project_1.Project
});
/*
let pr = new Project();
pr.name = "Artem";
itemsProxy.add(pr).then
(data =>{

    console.log(data);
})
*/
let prt = new project_1.Project();
itemsProxy.getAll().then(data => {
    console.log(data);
}, err => {
    console.log(err);
});
//# sourceMappingURL=index.js.map