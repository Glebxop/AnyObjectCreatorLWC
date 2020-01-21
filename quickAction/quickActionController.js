/**
 * Created by Master on 18.12.2019.
 */

({
doInit : function(component, event, helper) {
let array = new Array();
    for (let i = 0; i < 3; i++){
        array[i] = new Array(2);
    }

component.set("v.listObj",array);
let url = window.location.href;
if(url.includes('Contact')){
    component.set("v.url","Contact");


}
    /*var sPageURL = window.location.search; //You get the whole decoded URL of the page.

        console.log(sPageURL);


window.location.href = 'https://www.google.com/search?q=google&oq=goo&aqs=chrome.0.0j69i57j0l2j35i39j0l3.1787j0j7&sourceid=chrome&ie=UTF-8';
        //component.set(component.get("v.pageReference").state.testAttribute);
    */},

    objCh : function(cmp){
        console.log("change");
        console.log(cmp.get("v.listObj"));
    },

    showArr : function(cmp){
        console.log(cmp.get("v.listObj"))

    }


});