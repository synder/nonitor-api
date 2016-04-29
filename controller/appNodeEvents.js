/**
 * Created by synder on 16/4/21.
 */

var appNodeEvent = require('../model/appNodeEvent');

/**
 * @desc recorder start event
 * */
exports.start = function(req, res, next){

    var app = req.body.key;
    var node = req.body.node;
    var info = req.body.data[0];

    if(info){
        var saveInfo = {
            app     : app,         //app key
            node    : node,        //app node id
            time    : info.time,   //event emit time
            pid     : null,        //process id
            msg     : null         //event msg
        };

        appNodeEvent.insertAppNodeStartEvent(saveInfo, function(err){
            if(err){
                console.error(err.stack);
            }
        });
    }

    res.end();
};

/**
 * @desc recorder stop event
 * */
exports.stop = function(req, res, next){
    var app = req.body.key;
    var node = req.body.node;
    var info = req.body.data[0];

    if(info){
        var saveInfo = {
            app     : app,         //app key
            node    : node,        //app node id
            time    : info.time,   //event emit time
            pid     : null,        //process id
            msg     : null         //event msg
        };

        appNodeEvent.insertAppNodeStopEvent(saveInfo, function(err){
            if(err){
                console.error(err.stack);
            }
        });
    }

    res.end();
};

/**
 * @desc recorder error event
 * */
exports.error = function(req, res, next){
    var app = req.body.key;
    var node = req.body.node;
    var info = req.body.data[0];

    if(info){
        var saveInfo = {
            app     : app,         //app key
            node    : node,        //app node id
            time    : info.time,   //event emit time
            pid     : info.pid,    //process id
            msg     : info.msg || null        //event msg
        };

        appNodeEvent.insertAppNodeErrorEvent(saveInfo, function(err){
            if(err){
                console.error(err.stack);
            }
        });
    }
    res.end();
};


/**
 * @desc recorder crash event
 * */
exports.crash = function(req, res, next){
    var app = req.body.key;
    var node = req.body.node;
    var info = req.body.data[0];

    if(info){
        var saveInfo = {
            app     : app,         //app key
            node    : node,        //app node id
            time    : info.time,   //event emit time
            pid     : info.pid,        //process id
            msg     : null         //event msg
        };

        appNodeEvent.insertAppNodeCrashEvent(saveInfo, function(err){
            if(err){
                console.error(err.stack);
            }
        });
    }
    res.end();
};

