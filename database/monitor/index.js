/**
 * @author synder
 * @date 16/1/10
 * @desc
 */

var mongoose = require('mongoose');

var config = require('./../../config');

var mongodbConfig = config.private.database.mongodb;

var option =  {
    user: mongodbConfig.user,
    pass: mongodbConfig.password
};

var conn = mongoose.createConnection(mongodbConfig.uri, option);

conn.on('error', console.error.bind(console, 'connection error'));

//import schema
var UserAccount = require('./schema/UserAccount');
var AppNodeInfo = require('./schema/AppNodeInfo');
var AppNodeEvent = require('./schema/AppNodeEvent');
var AppAgentAccount = require('./schema/AppAgentAccount');
var AppNodeSystemInfo = require('./schema/AppNodeSystemInfo');
var AppNodeProcessInfo = require('./schema/AppNodeProcessInfo');
var AppNodeWebTransInfo = require('./schema/AppNodeWebTransInfo');

//define model
conn.model('UserAccount', UserAccount.UserAccountSchema, 'user_account');
conn.model('AppNodeInfo', AppNodeInfo.AppNodeInfoSchema, 'app_node_info');
conn.model('AppNodeEvent', AppNodeEvent.AppNodeEventSchema, 'app_node_event');
conn.model('AppAgentAccount', AppAgentAccount.AppAgentAccountSchema, 'app_agent_account');
conn.model('AppNodeSystemInfo', AppNodeSystemInfo.AppNodeSystemInfoSchema, 'app_node_system_info');
conn.model('AppNodeProcessInfo', AppNodeProcessInfo.AppNodeProcessInfoSchema, 'app_node_process_info');
conn.model('AppNodeWebTransInfo', AppNodeWebTransInfo.AppWebTransInfoSchema, 'app_node_web_trans_info');
conn.model('AppWebTransException', AppNodeWebTransInfo.AppWebTransExceptionSchema, 'app_web_trans_exception');

exports.mongoose = mongoose;
exports.conn = conn;