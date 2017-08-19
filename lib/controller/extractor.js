/**
 * Created by Sakshi on 8/10/2017.
 */

var SESSION_VAR = require('../controller/initialiser').SESSION_VAR;
var helper = require('./../utils/helper');

var Extractor = function(response, bindings) {
    this.response = response.getResponseBody();
    this.bindings = bindings;
};

Extractor.prototype.execute = function(){
    var bindingOption,
        bindingObj,
        extractedValue;

    var bindings = this.bindings;
    for(var keyToBind in bindings){
        bindingObj = bindings[keyToBind];
        bindingOption = Object.keys(bindingObj);
        switch(bindingOption[0]){
            case "jsonpath":
                extractedValue = helper.jsonExtractor(bindingObj.jsonpath,this.response);
                if(bindingObj.hasOwnProperty("agg")){
                    switch(bindingObj.agg){
                        case "sum":
                            if(Array.isArray(extractedValue)){
                                var sum = 0;
                                extractedValue.forEach(function(val){
                                    sum += val;
                                });
                                SESSION_VAR[keyToBind] = sum;
                            }else{
                                SESSION_VAR[keyToBind] = extractedValue;
                            }
                            break;
                    }
                }else{
                    SESSION_VAR[keyToBind] = extractedValue;
                }
                break;
        }
    }
};

module.exports = Extractor;