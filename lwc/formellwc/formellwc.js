/**
 * Created by Master on 19.12.2019.
 */

import { LightningElement, api} from 'lwc';

export default class Formellwc extends LightningElement {


@api
index;
@api
type;
name;
secondName;
labelFirstInput;
labelSecondInput;

connectedCallback(){
    this.chooseType();
}

chooseType(){
    if(this.type.includes("Contact")){
       this.setLabel('Last Name','Email');
    }
    if(this.type.includes("Campaign")){
       this.setLabel('Campaign Name','Description');
    }
}
setLabel(firstInput,secondInput){
    this.labelFirstInput = firstInput;
    this.labelSecondInput = secondInput;

}


changeName(event){
   this.name = event.target.value;
   this.sendEvent();
}
changeSec(event){
   this.secondName = event.target.value;
   this.sendEvent();
         }
sendEvent(event){
    let ev = {ind:this.index,name:this.name,secondName:this.secondName};
    this.dispatchEvent(
        new CustomEvent('childevent',{
            detail:ev }));
}

}