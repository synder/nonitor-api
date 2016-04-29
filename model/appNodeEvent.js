/**
 * Created by synder on 16/4/25.
 */

var conn = require('../../database/monitor').conn;

var AppNodeEvent = conn.model('AppNodeEvent');

/**
 * @desc save start event
 * */
exports.insertAppNodeStartEvent = function(info, callback){
    info.type = AppNodeEvent.TYPE.START;
    AppNodeEvent.create(info, callback);
};


/**
 * @desc save stop event
 * */
exports.insertAppNodeStopEvent = function(info, callback){
    info.type = AppNodeEvent.TYPE.STOP;
    AppNodeEvent.create(info, callback);
};


/**
 * @desc save crash event
 * */
exports.insertAppNodeCrashEvent = function(info, callback){
    info.type = AppNodeEvent.TYPE.CRASH;
    AppNodeEvent.create(info, callback);
};


/**
 * @desc save error event
 * */
exports.insertAppNodeErrorEvent = function(info, callback){
    info.type = AppNodeEvent.TYPE.ERROR;
    AppNodeEvent.create(info, callback);
};