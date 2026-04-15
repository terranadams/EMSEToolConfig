try {
    var taskStatusStr = wfTask + "_" + wfStatus;
    taskStatusStr = taskStatusStr.replace(/[ -//]/g, '_');
    var functionName = taskStatusStr.toLowerCase();

    try {
        eval(functionName + '();');
    } catch (funcEx) {
        aa.print(functionName + ": This function is not defined. OR");
        aa.print(funcEx.message);
        aa.print(funcEx.stack);
    }
} catch (ex) {
    aa.print("ERROR::WTUA:BFP/Common/Plan/ARCS Agreement: " + ex);
}
/*--------------------------------------------------------------------------------------------------------------------------------*/


function legal_review_additional_info_requested() {
    sendAppToACA4Edit();
    unassignTask("Legal Review");
    sendEmailNotification(wfStatus);
}

function legal_review_approved() {
    unassignTask("Legal Review");
    //sendEmailNotification(wfStatus);
}

function legal_review_rejected() {
    unassignTask("Legal Review");
    sendEmailNotification(wfStatus);
}

function executive_review_returned_for_legal_review() {
    unassignTask("Executive Review");
    updateTask("Legal Review", "Pending Review", "Updated via script", capId);
    //sendEmailNotification(wfStatus);
}

function executive_review_review_complete() {
    unassignTask("Executive Review");
    sendEmailNotification(wfStatus);
}

function executive_review_pending_review() {
 
}

function legal_review_pending_review() {

}
/*--------------------------------------------------------------------------------------------------------------------------------*/

function sendEmailNotification(resultType) {
    var attachmentFiles = new Array();
    var notificationTemplate = getNotificationTemplate4ArcsAgreement(resultType);
    var emailParameters = getEmailParameters4ArcsAgreement(resultType);
    var emailArrayTo = getEmailSenderList4ARCSAgreement(capId);
    aa.print("notificationTemplate: " + notificationTemplate);
    aa.print("attachmentFiles: " + attachmentFiles);
    aa.print("emailParameters: " + emailParameters);
    aa.print("emailArrayTo: " + emailArrayTo);
    if (resultType == "Review Complete") {
    	sleepFor(6000);
        var docArrLOA = getDocumentLocationArrayByDocStatus(capId, "BFP_ARCS_AG", "ARCS Agreement", "Review Complete", true);
        for (var i in docArrLOA) {
            var docRow1Obj = docArrLOA[i];
            attachmentFiles.push(docRow1Obj.fileLocation);
        }
    }
    createAndSendEmailNotification(notificationTemplate, emailParameters, attachmentFiles, emailArrayTo);
}

function getNotificationTemplate4ArcsAgreement(resultType) {

    if (resultType == "Additional Info Requested" ) {
        return "ARCS_AGREEMENT_ADDITIONAL_INFO_REQUESTED";
    } else if (resultType == "Rejected") {
        return "ARCS_AGREEMENT_REJECTED";
    } else if (resultType == "Review Complete") {
        return "ARCS_AGREEMENT_REVIEW_COMPLETE";
    }
    return "";
}


function getEmailParameters4ArcsAgreement(statusType) {

    var emailParameters = aa.util.newHashtable();
    addParameter(emailParameters, "$$ACAMyRecordPageURL$$", eval(lookup("NOTIFICATION_TEMPLATE_VARIABLE_MAPPING", "ACAMyRecordPageURL")));
    addParameter(emailParameters, "$$altID$$", capId.getCustomID());
    addParameter(emailParameters, "$$CAPTYPE$$", aa.cap.getCap(capId).getOutput().getCapType().getAlias());
    var addressStr = getAddressString(capId);
    addParameter(emailParameters, "$$PremisesAddress$$", addressStr);
    addParameter(emailParameters, "$$PREMISESADDRESS$$", addressStr);

    if (statusType == "Additional Info Requested" || statusType == "Rejected") {
        var notificationComment = getTSIAdhocWorkflow("Notification Comment");
        if (notificationComment == null) {
            notificationComment = "";
        }
        addParameter(emailParameters, "$$AdditionalInfoComment$$", notificationComment);

    } else if (statusType == "Fee Exemption Rejected") {
        var reasonRejectionTSI = getTSIAdhocWorkflow("Reason for Rejection");
        reasonRejection = (reasonRejectionTSI == null) ? "" : reasonRejectionTSI;
        addParameter(emailParameters, "$$RejectionReason$$", reasonRejection);

    }

    return emailParameters;
}

function createAndSendEmailNotification(templateName, emailParameters, attachmentFiles, emailArrayTo) {
    var capId1 = capId.ID1;
    var capId2 = capId.ID2;
    var capId3 = capId.ID3;
    var fvCapID4Email = aa.cap.createCapIDScriptModel(capId1, capId2, capId3);
    var sendResult = aa.document.sendEmailAndSaveAsDocument(fromEmailAddress, String(emailArrayTo), "", templateName, emailParameters, fvCapID4Email, attachmentFiles);
}


function getEmailSenderList4ARCSAgreement(capId) {

    var emailArrayTo = new Array();
    emailArrayTo.push(getCreatedByEmail(capId));
    var capContactResult = aa.people.getCapContactByCapID(capId);
    if (capContactResult.getSuccess()) {
        var capContactArray = capContactResult.getOutput();
        for (yy in capContactArray) {
            var capContact = capContactArray[yy].getCapContactModel();
            if (capContact.getEmail() != null || capContact.getEmail() != undefined) {
                var emailTo = String(capContact.getEmail());
                var result = containsInArray(emailArrayTo, emailTo);
                if (!result) {
                    emailArrayTo.push(emailTo);
                }
            }
        }
    }
    return emailArrayTo;
}

function getDocumentLocationArrayByDocStatus(capId, docGroup, docType, docStatus) {

	var getLatestDocument = false;
	if (arguments.length > 4) {
		getLatestDocument = arguments[4];
	}

	var documentStatus = null;
	var docArr = new Array();
	var latestDocument = null;
	var latestDocumentUploadDate = new Date(0);
	var docList = aa.document.getCapDocumentList(capId, "ADMIN");
	var fileLocation = new Array();
	if (docList.getSuccess()) {
	  	var docListOutput = docList.getOutput();
	  	for (var i in docListOutput) {
		    var doc = docListOutput[i];
		    aa.print(doc);
		    if (((doc.getDocGroup() + "") == docGroup) && ((doc.getDocCategory() + "") == docType)) {
			    // if (docType == "ARCS Agreement") {
			    //    documentStatus = doc.getDocStatus();
			    // }

			    // if (documentStatus == docStatus) {
				    if (getLatestDocument) {
						var uploadDate = doc.getFileUpLoadDate();
						if (uploadDate.getTime() >= latestDocumentUploadDate.getTime()) {
						    aa.print("Here 1");
							latestDocument = doc;
							latestDocumentUploadDate = uploadDate;
						}
					}
				// }
		  	}
		}

	    if (latestDocument != null) {
	        var docDownload = aa.document.downloadFile2Disk(latestDocument, "BFP", "", "", true);
	        if (docDownload.getSuccess()) {
	            var docDownloadOutput = docDownload.getOutput();
	            aa.print("*** Adding " + docType + " Document as an Email Attachment ***");
	            var docRowObj = new Object();
	            docRowObj.docModel = doc;
	            docRowObj.fileLocation = docDownloadOutput;
	            docArr.push(docRowObj);
	        }
	    }
	}

	return docArr;
}