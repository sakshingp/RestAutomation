/**
 * Created by Sakshi on 7/27/2017.
 */

var jsonQuery = require('json-query');

function jsonExtractor(query,data){
    var result = jsonQuery(query, {data: data}).value;
    if((Array.isArray(result) && result.length==0) || (result==undefined)){
        result = null;
    }
    return result;
}
module.exports = {
    jsonExtractor:jsonExtractor

};