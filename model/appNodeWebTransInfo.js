/**
 * Created by synder on 16/4/25.
 */


var conn = require('../../database/monitor').conn;

var AppNodeWebTransInfo = conn.model('AppNodeWebTransInfo');
var AppWebTransException = conn.model('AppWebTransException');

/**
 * @desc batch save app web transaction
 * */
exports.insertAppNodeWebTransInfo = function(info, callback){
    AppNodeWebTransInfo.create(info, callback);
};

/**
 * @desc batch save app web transaction exception info
 * */
exports.insertAppWebTransExceptionInfo = function(info, callback){
    AppWebTransException.create(info, callback);
};


