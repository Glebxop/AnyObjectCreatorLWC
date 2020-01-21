/**
 * Created by Master on 19.12.2019.
 */

import { LightningElement , track, api } from 'lwc';
import methodToDB from '@salesforce/apex/OperateWithLWC.callToDb'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class QuickActionLwc extends LightningElement {
@track
numberObj=3;

@api
url;
@track
arraysObj;


constructor(){
    super();
    this.url = window.location.href;
    this.array();
}

array() {
   let arrays = new Array();
   for (let i = 0; i < this.numberObj; i++){
      if(this.arraysObj&&this.arraysObj.length>i&&this.arraysObj.length>0){
         let item = {
                     name : this.arraysObj[i].name,
                     secondName : this.arraysObj[i].secondName,
                     index : this.arraysObj[i].index}
         arrays.push(item);
      } else {
      arrays.push(this.newItem(i));}
   }
   this.arraysObj = [];
   this.arraysObj = arrays;
}
newItem(indexI){
    let item = {
             name : "",
             secondName : "",
             index : indexI
    }
    return item;
}


plusNumObj(){
    let number = ++this.numberObj;
        if(number>10){
            number = 10;
        }
    this.numberObj = number;
    this.array();
}
minusNumObj(){
    let number = --this.numberObj;
    if(number<=0){
        number = 1;
    }
    this.numberObj = number;
    this.array();
}

handleChildEvent(event){
    this.arraysObj[event.detail.ind].name = event.detail.name;
    this.arraysObj[event.detail.ind].secondName = event.detail.secondName;
}

callDB(){
    methodToDB({arrayOfItem:JSON.stringify(this.arraysObj),
    typeOfObj:this.url
    })
    .then(result=>{
        console.log(result);
    if(result){
        this.showToast('Record inserted','Without any problems','success');
    }else{
        this.showToast('Record did not inserted','There are some problems','error');
    }
    })
    .catch(error=>{this.showToast('Record did not inserted',error,'error');})
}
showToast(title,message,variant){
    let evt = new ShowToastEvent({
                    title: title,
                    message: message,
                    variant: variant,
                    mode: 'dismissable'
                });
    this.dispatchEvent(evt);
}


}