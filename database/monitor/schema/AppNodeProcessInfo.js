/**
 * Created by synder on 16/4/25.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

/**
 * process info schema
 * */
var AppNodeProcessInfoSchema = new Schema({
    app     : {type: ObjectId, required: true}, //app key
    node    : {type: String, required: true}, //app node
    ppid    : {type: Number, required: true}, //process parent process id
    pid     : {type: Number, required: true}, //process id
    minutes : {type: Number, required: true}, //gather in which minutes
    lavg    : {type: Array},                  //load avg
    nmrss   : {type: Array},                  //node rss memory
    nmheap  : {type: Array},                  //node total heap memory
    nmused  : {type: Array},                  //node used memory
    smfree  : {type: Array}                   //system total free memory
}, { capped: 1024 * 1024 * 10});


AppNodeProcessInfoSchema.index({app: 1, minutes: 1});
AppNodeProcessInfoSchema.index({app: 1, node: 1, minutes: 1});


exports.AppNodeProcessInfoSchema = AppNodeProcessInfoSchema;