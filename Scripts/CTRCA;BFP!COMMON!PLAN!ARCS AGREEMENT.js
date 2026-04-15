try {
    aa.print("Inspection Record ID: " + capId.getCustomID());
    var arcsPlanRecordID = getAppSpecific("Record ID");
    aa.print("ARCS Plan Record ID: " + arcsPlanRecordID);
    if (arcsPlanRecordID != null && arcsPlanRecordID != "") {
        var arcsPlanCapId = aa.cap.getCapID(arcsPlanRecordID);
        if (arcsPlanCapId.getSuccess()) {
            arcsPlanCapId = arcsPlanCapId.getOutput();
            aa.cap.createAppHierarchy(arcsPlanCapId, capId);
            aa.print("Linked Records");
        }
    }

    var signatoryTitle = getAppSpecific("Signatory Title");
    aa.print("Signatory Title: " + signatoryTitle);
    if (signatoryTitle != null && signatoryTitle == "Other") {
        createAndSendEmailNotification();
    }
} catch (ex) {
    aa.print("ERROR::ASA:BFP/COMMON/PLAN/ARCS AGREEMENT: " + ex);
}

function createAndSendEmailNotification() {
    var attachmentFiles = new Array();
    var emailParameters = aa.util.newHashtable();
    addParameter(emailParameters, "$$ACAMyRecordPageURL$$", eval(lookup("NOTIFICATION_TEMPLATE_VARIABLE_MAPPING", "ACAMyRecordPageURL")));
    addParameter(emailParameters, "$$altID$$", capId.getCustomID());
    var capId1 = capId.ID1;
    var capId2 = capId.ID2;
    var capId3 = capId.ID3;
    var fvCapID4Email = aa.cap.createCapIDScriptModel(capId1, capId2, capId3);
    //GeneralLaw.Unit@fdny.nyc.gov
    var sendResult = aa.document.sendEmailAndSaveAsDocument(fromEmailAddress, "chetan.kamble@gcomsoft.com;bini.joseph@fdny.gov.nyc", "", "ARCS_AGREEMENT_SIGNATORY_OTHER", emailParameters, fvCapID4Email, attachmentFiles);
    aa.print("Sent email to General Law");
}