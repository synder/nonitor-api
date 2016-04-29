/**
 * Created by synder on 16/4/25.
 */

var conn = require('../../database/monitor').conn;

var AppNodeProcessInfo = conn.model('AppNodeProcessInfo');

/**
 * @desc save process info with batch
 * */
exports.insertAppNodeProcessInfo = function(info, callback){
    AppNodeProcessInfo.create(info, callback);
};
