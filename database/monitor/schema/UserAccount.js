/**
 * Created by synder on 16/4/25.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * @desc this system user account schema
 * */
var UserAccountSchema = new Schema({
    username   : {type: String, required: true}, //username for login
    password   : {type: String, required: true}, //password for login
    nickname   : {type: String, required: true}, //nickname for show
    gender     : {type: String, required: true}, //user gender
    status     : {type: Number, required: true}, //account status which control login
    ctime      : {type: Date,   required: true}, //account create time
    mtime      : {type: Date,   required: true}  //account modify time
});

//create index
UserAccountSchema.index({username : 1}, {unique:true});

//account status
UserAccountSchema.statics.STATUS = {
    LOCKED : 0, //account has ben locked
    NORMAL : 1  //account is normal
};



exports.UserAccountSchema = UserAccountSchema;