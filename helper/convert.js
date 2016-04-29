/**
 * Created by synder on 16/4/27.
 */

//-------------------------------------------------------
exports.convertTimestampToMinutes = function (timestamp) {
    return Math.floor(Math.floor(timestamp / 1000) / 60);
};

exports.convertDateToMinutes = function (date) {
    return Math.floor(Math.floor(date.getTime() / 1000) / 60);
};

exports.convertMinutesToTimestamp = function (minutes) {
    return minutes * 60000;
};

//-------------------------------------------------------
exports.convertTimestampToSeconds = function (timestamp) {
    return Math.floor(timestamp / 1000);
};

exports.convertDateToSeconds = function (date) {
    return Math.floor(date.getTime() / 1000);
};

exports.convertSecondsToTimestamp = function (seconds) {
    return seconds * 1000;
};

//-------------------------------------------------------
exports.convertTimestampToHours = function (timestamp) {
    return Math.floor(Math.floor(Math.floor(timestamp / 1000) / 60) / 60);
};

exports.convertDateToHours = function (date) {
    return Math.floor(Math.floor(Math.floor(date.getTime() / 1000) / 60) / 60);
};

exports.convertHoursToTimestamp = function (hours) {
    return hours * 3600000;
};

//-------------------------------------------------------
exports.convertDateToTimestamp = function (date) {
    return date.getTime();
};

exports.convertTimestampToDate = function (timestamp) {
    return new Date(timestamp);
};
//-------------------------------------------------------
