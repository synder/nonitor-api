/**
 * @author synder
 * @date 16/1/10
 * @desc
 */
var Router = require('xpress').Router;
var agentRouter = new Router();

var appNodeEvents = require('../../controller/appNodeEvents');
var appNodeInfo = require('../../controller/appNodeInfo');
var appNodeProcess = require('../../controller/appNodeProcess');
var appNodeSystem = require('../../controller/appNodeSystem');
var appNodeWebTrans = require('../../controller/appNodeWebTrans');

agentRouter.put('/app/node/event/start', appNodeEvents.start);
agentRouter.put('/app/node/event/stop', appNodeEvents.stop);
agentRouter.put('/app/node/event/error', appNodeEvents.error);
agentRouter.put('/app/node/event/crash', appNodeEvents.crash);

agentRouter.put('/app/node/info', appNodeInfo.handle);
agentRouter.put('/app/node/system/info', appNodeSystem.handle);
agentRouter.put('/app/node/process/info', appNodeProcess.handle);
agentRouter.put('/app/node/web/tran/info', appNodeWebTrans.handle);

module.exports = agentRouter;