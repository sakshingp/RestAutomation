/**
 * Created by Sakshi on 8/9/2017.
 */


var Response = function() {};

Response.prototype.setResponseStatusCode = function(responseStatus){
    this.responseStatusCode = responseStatus;
};

Response.prototype.getResponseStatusCode = function(){
    return this.responseStatusCode;
};

Response.prototype.setResponseHeaders = function(responseHeaders){
    this.responseHeaders = JSON.parse(JSON.stringify(responseHeaders));
};

Response.prototype.getResponseHeader = function(name){
    if(this.responseHeaders.hasOwnProperty(name))
        return  this.responseHeaders[name];
    else
        return "Invalid Header";
};

Response.prototype.getResponseHeaders = function(){
    return  this.responseHeaders;
};

Response.prototype.setResponseBody = function(responseBody){
    this.responseBody = JSON.parse(JSON.stringify(responseBody));
};

Response.prototype.getResponseBody = function(){
    return this.responseBody;
};


module.exports = Response;