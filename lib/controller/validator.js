/**
 * Created by Sakshi on 8/9/2017.
 */

var assert = require('chai').assert;
var helper = require('./../utils/helper');
var template = require('./template');

var Validator = function(response, validations){
    this.response = response;
    this.validations = validations;
};

Validator.prototype.execute = function(){
    var validateOption,
        validateObj,
        extractedValue,
        expectedValue;

    var validations = this.validations;
    for(var validateTest in validations){
        validateObj = validations[validateTest];
        validateOption = Object.keys(validateObj);
        switch(validateTest){
            case "extract_test":
                switch(validateOption[0]){
                    case "jsonpath":
                        extractedValue = helper.jsonExtractor(validateObj.jsonpath,this.response.getResponseBody());
                        break;
                }
                switch(validateObj.test){
                    case "exists":
                        assert.isNotNull(extractedValue,validateObj.jsonpath + " doesn't exists in response body");
                        break;
                    case "not_exists":
                        assert.isNull(extractedValue,validateObj.jsonpath + " exists in response body");
                        break;
                }
                break;

            case "compare":
                switch(validateOption[0]){
                    case "jsonpath":
                        extractedValue = helper.jsonExtractor(validateObj.jsonpath,this.response.getResponseBody());
                        expectedValue = template.getFormattedValue(validateObj.expected);
                        if(validateObj.hasOwnProperty("agg")){
                            switch(validateObj.agg){
                                case "sum":
                                    if(Array.isArray(extractedValue)){
                                        var sum = 0;
                                        extractedValue.forEach(function(val){
                                            sum += val;
                                        });
                                        extractedValue = sum;
                                    }
                                    break;
                            }
                        }
                        break;
                    case "header":
                        extractedValue = this.response.getResponseHeader(validateObj.header);
                        expectedValue = validateObj.expected;
                        break;
                    case "status_code":
                        extractedValue = this.response.getResponseStatusCode();
                        expectedValue = validateObj.expected;
                        break;
                }
                switch(validateObj.comparator){
                    case "eq":
                        assert.strictEqual(extractedValue,expectedValue,
                            "actual value \""+ extractedValue + "\" is not equal to expected value \""+ validateObj.expected +"\"");
                        break;
                    case "contains":
                        assert.include(extractedValue,expectedValue,
                            "actual value \""+ extractedValue + "\" doesn't contains expected value \""+ validateObj.expected +"\"");
                        break;
                }
                break;
        }
    }

};

module.exports = Validator;