/**
 * @author synder
 * @date 16/1/10
 * @desc
 */
var Xpress = require('xpress');
var config = require('./config');

global.config = config;

//---------------------------------------------------------
var server = new Xpress({
    host: config.private.server.host,
    key: config.private.server.key,
    cert: config.private.server.cert,
    port: {
        http: config.private.server.port.http,
        https: config.private.server.port.https
    }
});

//---------------------------------------------------------
server.conf('x-powered-by', false);
server.conf('trust proxy', true);


//---------------------------------------------------------
var body = require('body-parser');

server.use(body.json());

//---------------------------------------------------------

var agentRouter = require('./router/agent');

server.sub(agentRouter);

//---------------------------------------------------------

server.error(404, function (err, req, res, next) {
    res.status(404).send('not found');
});

server.error(500, function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('server error');
});

//---------------------------------------------------------
server.listen(function (message) {
    console.log(message);
});

//---------------------------------------------------------
module.exports = server;
