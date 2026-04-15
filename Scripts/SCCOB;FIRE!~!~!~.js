	aa.print("Env Variables" + aa.env.getParamValues());
	aa.print("cap: " + cap);
	aa.print("cap class: " + cap.getClass());
	aa.print("capId: " + capId)
var startDate = new Date();
logDebug("script executed from cart: "+ startDate);
var FROM = "noreply@accela.com";
		var TO = "esheridan@accela.com";
		var SUBJECT = "sccob:Fire/*/*/* startDate:" + startDate;
		var BODY_TEXT = " " + debug;
		aa.sendMail(FROM, TO, "", SUBJECT , BODY_TEXT);

showDebug=true;
cancel=true;