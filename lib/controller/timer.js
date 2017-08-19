/**
 * Created by Sakshi on 8/16/2017.
 */

module.exports.wait = function(milliseconds){
    var start = new Date().getTime();
    for (var i = 0; i < 1e30; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}