var startDate = new Date();
need error
logDebug("script executed from cart: "+ startDate);
var FROM = "noreply@accela.com";
		var TO = "esheridan@accela.com";
		var SUBJECT = "scco:Fire/Protection System/Sprinkler/License startDate:" + startDate;
		var BODY_TEXT = " " + debug;
		aa.sendMail(FROM, TO, "", SUBJECT , BODY_TEXT);

showDebug=true;