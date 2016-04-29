/**
 * Created by synder on 16/4/25.
 */


var conn = require('../../database/monitor').conn;

var AppNodeInfo = conn.model('AppNodeInfo');

/**
 * @desc save app real time node info
 * */
exports.upsertAppNodeInfo = function(condition, update, callback){
    AppNodeInfo.findOneAndUpdate(condition, update, {upsert:true}, callback);
};