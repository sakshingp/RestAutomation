/**
 * Created by sakshinagpal on 8/15/2017.
 */

SESSION_VAR = {};

function bindVariables(obj){
    for(var key in obj){
        SESSION_VAR[key] = obj[key];
    }
}

module.exports = {
    bindVariables: bindVariables,
    SESSION_VAR: SESSION_VAR
}