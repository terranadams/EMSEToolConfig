showDebug=true;

var thisFee=invoiceFee("MINMAXJOBVAL", "FINAL");
aa.print("thisFee: "+thisFee);

var toEmail = "esheridan@accela.com"
var notificationTemplate = "AA_MESSAGE_WFCOMMENT";
var emailParams = aa.util.newHashtable();
//emailParams = getWorkflowParams4Notification(emailParams);
	addParameter(emailParams, "$$wfStatus$$", wfStatus);
	addParameter(emailParams, "$$wfTask$$", wfTask);
	addParameter(emailParams, "$$wfComment$$", wfComment);
aa.print("emailParams: " + emailParams);

var sent = aa.document.sendEmailByTemplateName("", toEmail, "", notificationTemplate, emailParams, null);
if (!sent.getSuccess()) {
	aa.debug("SND_STF_EMAIL", "**WARN SEND_NOTIFICATION_BYTEMPLATENAME failed, Error: " + sent.getErrorMessage());
}




function getWorkflowParams4Notification(params) 
{
	// pass in a hashtable and it will add the additional parameters to the table
	addParameter(params, "$$wfStatus$$", wfStatus);
	addParameter(params, "$$wfTask$$", wfTask);
	//addParameter(params, "$$wfComment$$", wfComment);
aa.print("emailParams: " + params);
	return params;
}