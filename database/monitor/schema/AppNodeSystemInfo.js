/**
 * Created by synder on 16/4/25.
 */


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

/***
 * @desc system info schema
 */
var AppNodeSystemInfoSchema = new Schema({
    app      : {type: ObjectId, required: true}, //app key
    node     : {type: String, required: true}, //app node

    arch     : {type: String, required: true}, //system arch
    cpus     : {type: Number, required: true}, //system cpus count
    mem      : {type: String, required: true}, //system total memory
    hostname : {type: String, required: true}, //system hostname
    platform : {type: String, required: true}, //system platform
    release  : {type: String, required: true}, //system release version

    nv8      : {type: String, required: true}, //node v8 version
    nuv      : {type: String, required: true}, //node uv version
    nicu     : {type: String, required: true}, //node icu version
    nnode    : {type: String, required: true}, //node version
    nzlib    : {type: String, required: true}, //node zlib version
    nares    : {type: String, required: true}, //node ares version
    nmodules : {type: Number, required: true}, //node modules count
    nopenssl : {type: String, required: true}  //node openssl version
});

AppNodeSystemInfoSchema.index({app : 1});
AppNodeSystemInfoSchema.index({app : 1, node: 1}, {unique : true});

exports.AppNodeSystemInfoSchema = AppNodeSystemInfoSchema;