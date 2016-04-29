/**
 * Created by synder on 16/4/25.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

/**
 * @desc agent auth info
 * */
var AppAgentAccountSchema = new Schema({
    user       : {type: ObjectId, required: true},  //app user
    name       : {type: String,   required: true},  //app name
    key        : {type: String,   required: true},  //app key
    secret     : {type: String,   required: true},  //app secret
    status     : {type: Number,   required:true},   //status true or false
    ctime      : {type: Date,     required: true},  //create time,
    mtime      : {type: Date,     required: true}   //modify time,
});

//create index
AppAgentAccountSchema.index({user:1, name : 1}, {unique:true});
AppAgentAccountSchema.index({user:1, key : 1}, {unique:true});
AppAgentAccountSchema.index({key : 1});


//agent auth account status
AppAgentAccountSchema.statics.STATUS = {
    LOCKED : 0, //account has ben locked
    NORMAL : 1  //account is normal
};


exports.AppAgentAccountSchema = AppAgentAccountSchema;
