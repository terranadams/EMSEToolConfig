        //var emailFrom = "tadams@accela.com";

        //var emailTo = "tadams@accela.com"; //replace with uploadeddocs email address

        //var emailCC = "";

        //var emailSubject = "Documents uploaded to " + capId.getCustomID();

        //var emailBody = "These documents have been uploaded to " + capId.getCustomID() + ":\n" + docNames;

        //aa.sendMail(emailFrom, emailTo, emailCC, emailSubject, emailBody);

        //logDebug("Document Upload Email sent to: " + emailTo);

var assignedEmail = "smerrill@accela.com";

if (currentUserID.indexOf("PUBLICUSER") == 0 {
  publicUser = true;
}

if (publicUser) {
  var docModelArray = documentModelArray.toArray();
  var docCategory = docModelArray[0].getDocCategory();
  if (docCategory == "SM DOC 1 TEST") {
    var params = aa.util.newHashtable();
    addParaeter(params, "$$aldid$$", capid.getCustomID());
    sendNotification("", "", assignedEmail, "SM BLD TEST WORKFLOW STANDARD COMMENTS", params, []);
  }
}

//aa.sendMail("noreply@accela.com", "smerrill@accela.com", assignedEmail, "SM BLD TEST WORKFLOW STANDARD COMMENTS", debug);

