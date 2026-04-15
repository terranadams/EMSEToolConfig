showDebug=true;
logDebug("WATA:Fire/Protection System/Sprinkler/Application");

var startDate = new Date();

logDebug("script executed: "+ startDate);
var FROM = "noreply@accela.com";
		var TO = "esheridan@accela.com";
		var SUBJECT = "wataA:Fire-Protection System-Sprinkler-Application:"+ "startDate:" + startDate;
		var BODY_TEXT = " " + debug;
		aa.sendMail(FROM, TO, "", SUBJECT , BODY_TEXT);