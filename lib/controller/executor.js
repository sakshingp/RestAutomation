/**
 * Created by Sakshi on 8/1/2017.
 */

var Request = require('superagent');
var Response = require('./response');
var Template = require('./template');
var Logger = require('./../utils/logger');

function responseCallback(url, cb){
    return function(err, res){
        if(err){
            Logger.logError("Error in api response of - "+url);
            Logger.logError(res.body);
            cb(err,null);
        }else{
            var response = new Response();
            response.setResponseStatusCode(res.status);
            response.setResponseBody(res.body);
            response.setResponseHeaders(res.headers);
            Logger.logSuccess("Successfully got api response of - "+url);
            cb(null,response);
        }
    }
}

function post(requestURL, requestBody, requestHeader, cb) {
    var url = Template.getFormattedValue(requestURL);
    var body = Template.getFormattedValue(requestBody);
    var headers = Template.getFormattedValue(requestHeader);
    Request
        .post(url)
        .send(body)
        .set(headers)
        .end(responseCallback(url,cb));
}

function get(requestURL, queryObj, requestHeader,cb) {
    var url = Template.getFormattedValue(requestURL);
    var queryObj = Template.getFormattedValue(queryObj);
    var headers = Template.getFormattedValue(requestHeader);
    Request
        .get(url)
        .query(queryObj)
        .set(headers)
        .end(responseCallback(url, cb));
}

function del(requestURL, queryObj, requestHeader, cb) {
    var url = Template.getFormattedValue(requestURL);
    var queryObj = Template.getFormattedValue(queryObj);
    var headers = Template.getFormattedValue(requestHeader);
    Request
        .del(url)
        .query(queryObj)
        .set(headers)
        .end(responseCallback(url, cb));
}

module.exports = {
    post: post,
    get: get,
    del: del
};