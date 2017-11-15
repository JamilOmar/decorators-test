import {List,Provider} from '../decorators/class';
import {Field, FieldType} from '../decorators/fields';
@List({listname:'ProjectsTest'})
export class Project
{
    constructor(){
    }
    @Field({ internalName:'ID' , type: 'Number'})
    public id? :number;


    @Field({ internalName:'Title' , type: 'Text'})
    public name :string;

    public test :string;

}