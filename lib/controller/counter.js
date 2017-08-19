/**
 * Created by Sakshi on 8/17/2017.
 */


module.exports.execute = function(count, fnDef, callback){
    steps(0, fnDef, callback);
};

var steps = function(index,fnDef, callback){
    fnDef();
    if(++index < count)
        steps(index,fnDef,callback);
    else
        callback();
};

