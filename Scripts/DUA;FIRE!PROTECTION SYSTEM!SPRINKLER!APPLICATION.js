showDebug = true;

var startDate = new Date();

logDebug("script executed: "+ startDate);
var FROM = "noreply@accela.com";
		var TO = "bkwarteng@accela.com";
		var SUBJECT = "dua/protection system/sprinkler/application CAPID:" + capId + "startDate:" + startDate;
		var BODY_TEXT = "Parent CapId: " + parentCapId + " " + debug;
		aa.sendMail(FROM, TO, "", SUBJECT , BODY_TEXT);

resultWorkflowTask("Application Submittal","Complete","updated via ecscript different status","");