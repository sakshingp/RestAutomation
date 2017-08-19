/**
 * Created by Sakshi on 8/11/2017.
 */
var SESSION_VAR = require('./initialiser').SESSION_VAR;

module.exports.getFormattedValue = function(value){
        if(typeof value == "string")
            return value;
        if(typeof value == "object"){
            if(value.hasOwnProperty("template")){
                var tempValue = value["template"];
                if(typeof tempValue == "string")
                    tempValue = replaceTemplate(tempValue);
                else if(typeof tempValue == "object"){
                   for(var key in tempValue)
                     tempValue[key] = replaceTemplate(tempValue[key]);
                }
                return tempValue;
            }else{
                return value;
            }
        }
};

function replaceTemplate(inputValue){
    try{
        var temparg;
        inputValue.match(/\{(.*?)\}/g).forEach(function(arg){
            temparg = arg.replace(/{|}/g, "");
            inputValue = inputValue.replace(arg,SESSION_VAR[temparg]);
            if(typeof SESSION_VAR[temparg] == "number")
                inputValue = Number(inputValue);
        });
        return inputValue;
    }catch(err){
        return inputValue;
    }

}
