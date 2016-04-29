/**
 * Created by synder on 16/4/25.
 * @desc recorder
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;


var AppWebTransExceptionSchema = new Schema({
    app      : {type: ObjectId, required: true}, //app key
    node     : {type: String, required: true}, //app node
    type     : {type: Number, required: true}, //warning type
    url      : {type: String, required: true}, //request url
    method   : {type: String, required: true}, //request method
    time     : {type: Date,   required: true}, //request end time
    message  : {type: Array,  required: true}  //warn messages
});

AppWebTransExceptionSchema.index({app: 1, url: 1});

//account status
AppWebTransExceptionSchema.statics.WARN_TYPE = {
    WARN_TIME : 0,    // warning info
    WARN_MEM : 1,    // warning info
    TIMEOUT : 2,  // response timeout
    ERROR : 3   // error type,
};


/**
 * @desc web transaction schema
 * */
var AppWebTransInfoSchema = new Schema({
    app      : {type: String, required: true}, //app key
    node     : {type: String, required: true}, //app node
    url      : {type: String, required: true}, //request url
    method   : {type: String, required: true}, //request method
    minutes  : {type: Number, required: true}, //request in minute
    count    : {type: Number, required: true}, //request count
    timeout  : {type: Number, required: true}, //request timeout count
    error    : {type: Number, required: true}, //request error count
    requests : {type: Array, required: true}   //store each request info
}, { capped: 1024 * 1024 * 10});

AppWebTransInfoSchema.index({app: 1, url: 1, minutes: 1});

exports.AppWebTransExceptionSchema = AppWebTransExceptionSchema;
exports.AppWebTransInfoSchema = AppWebTransInfoSchema;