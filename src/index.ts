import { Project } from './models/project';
import { Items } from './proxy/items';





let itemsProxy = new Items<Project>({
    facilityPath: 'FACILITY_INTEGRATION_TESTS_DEV', config: {
        "Site": "https://testsp.labshare.org/ss/one/",
        "User": "USERNAME",
        "Password": "PASSWORD"
    }, converToBase: Project
});
/*
let pr = new Project();
pr.name = "Artem";
itemsProxy.add(pr).then
(data =>{

    console.log(data);
})
*/

let prt = new Project();
itemsProxy.getAll().then(data => {
    console.log(data);

}, err => {

    console.log(err);
})

