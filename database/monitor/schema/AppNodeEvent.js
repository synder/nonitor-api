/**
 * Created by synder on 16/4/25.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

/***
 * @desc application event info
 */
var AppNodeEventSchema = new Schema({
    app     : {type: ObjectId, required: true}, //app key
    node    : {type: String, required: true}, //app node id
    type    : {type: Number, required: true}, //event type
    time    : {type: Date,   required: true}, //event emit time
    pid     : {type: Number},                 //process id
    msg     : {type: String}                  //event msg
});

AppNodeEventSchema.index({app : 1});
AppNodeEventSchema.index({app : 1, node:1});

AppNodeEventSchema.statics.TYPE = {
    START : 0,  //app start
    CRASH : 1,  //app process crash
    ERROR : 2,  //app error
    STOP  : 3   //app stop
};

exports.AppNodeEventSchema = AppNodeEventSchema;
