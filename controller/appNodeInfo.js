/**
 * Created by synder on 16/4/26.
 */


var appNodeInfo = require('../model/appNodeInfo');

exports.handle = function (req, res, next) {

    var app = req.body.key;
    var node = req.body.node;

    var info = req.body.data[0];

    if(info){
        var condition = {
            app : app,
            node: node
        };

        var saveInfo = {
            app : app,
            node: node,
            dir : info.dir,
            cluster : info.cluster,
            worker : info.worker,
            ctime : Date.now(),
            mpid : info.mpid,
            wpid : info.wpid
        };

        appNodeInfo.upsertAppNodeInfo(condition, saveInfo, function(err){
            if(err){
                console.error(err.stack);
            }
        });
    }

    res.end();
};
