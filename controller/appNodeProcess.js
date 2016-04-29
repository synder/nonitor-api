/**
 * Created by synder on 16/4/26.
 */

var appNodeProcessInfo = require('../model/appNodeProcessInfo');
var convert = require('../helper/convert');

var INFO_CACHE = {};

var LAST_SAVE_MINUTES = 0;

//gen a cache key
var genCacheKey = function(key, node, pid, minutes){
    return key + node + pid + minutes;
};

//init a array
var initZeroArray = function(){
    return [
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0
    ]
};

//set cache
var setCache = function(key, node, pid, minutes, second, info){

    var cacheKey = genCacheKey(key, node, pid, minutes);

    if(!INFO_CACHE[cacheKey]){
        INFO_CACHE[cacheKey] = {
            app: key,
            node: node,
            minutes: minutes,
            pid: info.pid,
            ppid: info.ppid,
            lavg: initZeroArray(),
            nmrss: initZeroArray(),
            nmheap: initZeroArray(),
            nmused: initZeroArray(),
            smfree: initZeroArray()
        };
    }

    INFO_CACHE[cacheKey].lavg[second] = info.loadavg;
    INFO_CACHE[cacheKey].nmrss[second] =  info.memory.rss;
    INFO_CACHE[cacheKey].nmheap[second] = info.memory.heap;
    INFO_CACHE[cacheKey].nmused[second] = info.memory.used;
    INFO_CACHE[cacheKey].smfree[second] = info.memory.free;
};

//get cache then del it
var getCache = function(key, node, pid, minutes){
    var cacheKey = genCacheKey(key, node, pid, minutes);
    var info = INFO_CACHE[cacheKey];
    delete INFO_CACHE[cacheKey];
    return info;
};

/**
 * @desc 处理汇报的进程信息
 * */
exports.handle = function (req, res, next) {

    var key = req.body.key;
    var node = req.body.node;
    var data = req.body.data;

    for(var i = 0; i < data.length; i++){

        var info = data[i],
            seconds = convert.convertTimestampToSeconds(info.time),
            minutes = convert.convertTimestampToMinutes(info.time),
            second = seconds % 60;

        if(LAST_SAVE_MINUTES === 0){
            LAST_SAVE_MINUTES = minutes;
        }

        setCache(key, node, info.pid, minutes, second, info);

        //save last minutes data
        if(LAST_SAVE_MINUTES < minutes){
            LAST_SAVE_MINUTES = minutes;
            var cacheInfo = getCache(key, node, info.pid, minutes - 1);
            if(cacheInfo){
                appNodeProcessInfo.insertAppNodeProcessInfo(cacheInfo, function(err){
                    if(err){
                        console.error(err.stack);
                    }
                });
            }
        }
    }

    res.end();
};