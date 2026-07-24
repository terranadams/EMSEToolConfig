//DANA:*/*/*/*
showDebug = true;

logDebug("capId:" + capId);

// function sendEmailDebugLogForNvMed() {
// 	var startDate = new Date();
// 	logDebug("script executed: " + startDate);
// 	var FROM = "noreply@accela.com";
// 	var TO = "sdotson@ccb.nv.gov";
// 	var SUBJECT = "DANA:CANNABIS/*/*/* " + capId + " startDate:" + startDate;
// 	var BODY_TEXT = "Parent CapId: " + parentCapId + " " + debug;
// 	aa.sendMail(FROM, TO, "", SUBJECT, BODY_TEXT);
// }

// sendEmailDebugLogForNvMed();

var activityModel = aa.env.getValue("ActivityModel");
exploreObject(activityModel);

// var capId = activityModel.getCapID();
// exploreObject(capId);

/**
* Loads all of the event variables and returns them in an array of key-value
* pairs. This function takes an optional boolean flag to indicate whether or
* not to log the key-value pairs using the logDebug function.
*
* @param {boolean} logFlag - indicates whether or not to log the key-value pairs
* @return {Array} - An array of the key-value pairs which are in the environment.
*/

function loadEnvVars(logFlag) {
    var newArr = [];
    var params = aa.env.getParamValues();
    var keys = params.keys();
    var key = null;
    while (keys.hasMoreElements()) {
        key = keys.nextElement();
        var keyValue = aa.env.getValue(key);
        newArr[key] = keyValue;
        if (logFlag) {
            logDebug("Loaded parameter " + key + " = " + keyValue);
        }
    }
    return newArr;
}