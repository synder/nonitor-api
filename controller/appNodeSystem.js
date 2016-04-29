/**
 * Created by synder on 16/4/26.
 */

var appNodesystemInfo = require('../model/appNodesystemInfo');

exports.handle = function (req, res, next) {

    var app = req.body.key;
    var node = req.body.node;

    var info = req.body.data[0];

    if (info) {

        var condition = {
            app: app,
            node : node
        };

        var saveInfo = {
            app: app, //app key
            node: node, //app node
            arch: info.arch, //system arch
            cpus: info.cpus, //system cpus count
            mem: info.totalmem, //system total memory
            hostname: node, //system hostname
            platform: info.platform, //system platform
            release: info.release, //system release version
            nv8: info.v8, //node v8 version
            nuv: info.uv, //node uv version
            nicu: info.icu, //node icu version
            nnode: info.node, //node version
            nzlib: info.zlib, //node zlib version
            nares: info.ares, //node ares version
            nmodules: info.modules, //node modules count
            nopenssl: info.openssl  //node openssl version
        };

        appNodesystemInfo.upsertAppNodeSystemInfo(condition, saveInfo, function(err){
            if(err){
                console.log(err.stack);
            }
        });
    }

    res.end();
};
