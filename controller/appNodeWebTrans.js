/**
 * Created by synder on 16/4/26.
 */

var socketServer = require('../app').socketServer;

var conn = require('../database/monitor').conn;

var AppWebTransException = conn.model('AppWebTransException');

var appNodeWebTransInfo = require('../model/appNodeWebTransInfo');

var convert = require('../helper/convert');

var INFO_CACHE = {};

var LAST_SAVE_MINUTES = 0;

//gen cache key
var genCacheKey = function(app, node, method, url){
    return app + node + method + url ;
};

//set cache
var setCache = function(app, node, method, url, minutes, warnType, info){

    if(!INFO_CACHE[minutes]){
        INFO_CACHE[minutes] = {};
    }

    var cacheKey = genCacheKey(app, node, method, url);

    if(!INFO_CACHE[minutes][cacheKey]){
        INFO_CACHE[minutes][cacheKey] = {
            app: app,
            node: node,
            url: info.url,
            method: info.method,
            minutes: minutes,
            count: 0,
            timeout : 0,
            error: 0,
            requests: []
        };
    }

    INFO_CACHE[minutes][cacheKey].requests.push([
        info.status.code,
        info.status.msg,
        info.time.in,
        info.time.out,
        info.loadavg,
        info.used.in,
        info.used.out
    ]);

    INFO_CACHE[minutes][cacheKey].count += 1;

    if(warnType === AppWebTransException.WARN_TYPE.TIMEOUT){
        INFO_CACHE[minutes][cacheKey].timeout += 1;
    }

    if(warnType === AppWebTransException.WARN_TYPE.ERROR){
        INFO_CACHE[minutes][cacheKey].error += 1;
    }
};

//get cache and del it
var getCache = function(minutes){
    var info = [];

    for(var key in INFO_CACHE[minutes]){
        info.push(INFO_CACHE[minutes][key]);
    }

    delete INFO_CACHE[minutes];

    return info.length > 0 ? info : null;
};

//get warn request info
var genWarn = function(app, node, info){
    var warnMessage = [],
        resTime = info.time.out - info.time.in,
        usedIncMem = info.used.out - info.used.in,
        warnType = 1;

    if(resTime > 500){
        warnType = AppWebTransException.WARN_TYPE.WARN_TIME;
        warnMessage.push('Response Time ('+ resTime +'ms) More Than 500ms');
    }

    if(info.free.out < 104857600){
        warnType = AppWebTransException.WARN_TYPE.WARN_MEM;
        warnMessage.push('Free Memory ('+ (info.free.out / 1048576) +'ms) Less Than 100M');
    }

    if(info.used.out > 524288000){
        warnType = AppWebTransException.WARN_TYPE.WARN_MEM;
        warnMessage.push('Used Memory ('+ (info.used.out / 1048576) +'ms) More Than 500M');
    }

    if(usedIncMem > 20971520){
        warnType = AppWebTransException.WARN_TYPE.WARN_MEM;
        warnMessage.push('Memory Increase ('+ (usedIncMem / 1048576)  +'M) More Than 20M');
    }

    if(info.status.code == 408 && resTime > 50000){
        warnType = AppWebTransException.WARN_TYPE.TIMEOUT;
        warnMessage.push('Response Timeout (' + resTime + 'ms)');
    }

    if(info.status.code > 499){
        warnType = AppWebTransException.WARN_TYPE.ERROR;
        warnMessage.push('Server Error ' + info.status.code + '(' + info.status.msg + ')');
    }

    if(warnMessage.length > 0){
        return {
            app : app,
            node: node,
            url : info.url,
            type : warnType,
            method : info.method,
            time : info.time.out,
            message: warnMessage
        };
    }else{
        return null;
    }

};

//emit msg to client
var sendMessage = function(info){
    if(socketServer.sockets){
        socketServer.sockets.emit('web', info);
    }
};
/***
 * @desc  save web transaction data
 * */
exports.handle = function (req, res, next) {

    var app = req.body.key;
    var node = req.body.node;
    var data = req.body.data;

    sendMessage(data);

    for(var i = 0; i < data.length; i++){

        var info = data[i],
            minutes = convert.convertTimestampToMinutes(info.time.out);

        if(LAST_SAVE_MINUTES === 0){
            LAST_SAVE_MINUTES = minutes;
        }

        var warnInfo = genWarn(app, node, info);

        if(warnInfo){
            appNodeWebTransInfo.insertAppWebTransExceptionInfo(warnInfo, function(err){
                if(err){
                    console.error(err.stack);
                }
            });
        }

        setCache(app, node, info.method, info.url, minutes, warnInfo ? warnInfo.type : null, info);

        //save last minutes info
        if(LAST_SAVE_MINUTES < minutes){

            LAST_SAVE_MINUTES = minutes;

            var cacheInfo = getCache(minutes - 1);

            if(cacheInfo){
                appNodeWebTransInfo.insertAppNodeWebTransInfo(cacheInfo, function(err){
                    if(err){
                        console.error(err.stack);
                    }
                });
            }
        }
    }

    res.end();
};