/**
 * Created by synder on 16/4/25.
 */


var conn = require('../../database/monitor').conn;

var AppNodeSystemInfo = conn.model('AppNodeSystemInfo');

/**
 * @desc save system info with batch
 * */
exports.upsertAppNodeSystemInfo = function(condition, update, callback){
    AppNodeSystemInfo.findOneAndUpdate(condition, update, {upsert:true}, callback);
};