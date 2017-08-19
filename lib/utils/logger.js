/**
 * Created by Sakshi on 7/27/2017.
 */

var chalk = require('chalk');

var _timer = function(){
    var currentDate = new Date(new Date().toISOString());
    return "["+currentDate.toLocaleString().replace(/\//g,"-")+"] ";
};

var _logger = function(){
    var _logError = function(message){
        console.log(chalk.red( _timer()+"[Error] "+message));
    };
    var _logSuccess = function(message){
        console.log(chalk.green( _timer()+"[Info] "+message));
    };
    var _logInfo = function(message){
        console.log(chalk.blue( _timer()+"[Info] "+message));
    };
    return {
        logError:_logError,
        logSuccess: _logSuccess,
        logInfo:_logInfo
    }
}();

module.exports = _logger;