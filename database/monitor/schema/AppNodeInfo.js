/**
 * @author synder
 * @date 16/1/14
 * @desc
 */


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

/***
 * @desc node app info schema
 */
var AppNodeInfoSchema = new Schema({
    app     : {type: ObjectId, required: true}, //app key
    node    : {type: String, required: true}, //app node
    dir     : {type: String, required: true}, //app dir name
    cluster : {type: String, required: true}, //is start with cluster
    worker  : {type: Number, required: true}, //worker number
    ctime   : {type: Date,   required: true}, //create time
    mpid    : {type: Number, required: true}, //master process id
    wpid    : {type: Array}                   //worker process id
});

AppNodeInfoSchema.index({app : 1});
AppNodeInfoSchema.index({app : 1, node: 1});

exports.AppNodeInfoSchema = AppNodeInfoSchema;