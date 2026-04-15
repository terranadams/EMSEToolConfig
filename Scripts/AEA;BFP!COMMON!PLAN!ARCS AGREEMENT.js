try {
	var applicationType = getAppSpecific("Application Type", capId);
	lockAllDocsOnACA();
	createRefContactsFromCapContactsAndLink(capId, null, null, false, true, comparePeopleFDNY);
	assignTaskToLastWorkflowActionUser(capId);
	//compareContactDetailsChanges(capId, "Applicant","Applicant Change", "Change in Applicant Details", "Applicant Details");
	//compareContactDetailsChanges(capId, "Authorized Officer of the Manufacturer","Contact Change", "Change in Authorized Officer of the Manufacturer Details", "Authorized Officer of the Manufacturer Details");
	//validateLicProfChanges();
	updateAppStatusCloseEdit();
	var parameters = aa.util.newHashMap();
	parameters.put("RECORD_ID", String(capId.getCustomID()));
	//runReportAndSaveToDocTab("Tech Management Summary Report", parameters, "BFP_COM_PLAN", "Internal use only");

} catch (ex) {
	logDebug("ERROR AEA:BFP/Common/Plan/ARCS Agreement: " + ex);
}

function updateAppStatusCloseEdit() {
	var currentStatus = getAppStatus(capId);
	var planTypeString = getAppSpecific("Application Type",capId);
	if (currentStatus == "Additional Info Requested") {
		var activeTask = getActiveWorkflowTask(capId);
		if (activeTask != null) {
			updateTask(activeTask.getTaskDescription(), "Additional Info Received", "Updated via script", "");
		}
		var emailParameters = getEmailParameters();
		var emailArrayTo = getEmailSenderList(capId,"BFP_COM_PLAN_Notification_Recipients", planTypeString);
		createAndSendEmailNotification("AA_MESSAGE_IS_APPLICATION_ADDITIONAL_INFO_RECEIVED", emailParameters, null, emailArrayTo);
	}
	revokeAppACAEdit(capId);
}

function compareContactDetailsChanges(capId, contactType, conditionType, conditionName, fieldName){
	var currentContactDetails = getContactDetailsString(capId, contactType);
	var previousContactDetails = String(getAppSpecific(fieldName));
	if (previousContactDetails != "null") { 
		if (currentContactDetails != previousContactDetails) {
			if (!appHasCondition(conditionType, "Added", conditionName, "Notice")) {
				addOrUpdateCondition(conditionType, conditionName, capId);
			}
			var contentString = "First Name||Last Name||Middle Name||Legal Business Name||EIN||Registration Number||Professional License number||SSN";
			if (contactType != "Applicant") {
				contentString += "||Email";
			}
			var content = getApplicantsChanges(currentContactDetails,previousContactDetails,contentString);
			updateConditionBody(conditionType, conditionName, capId, content);
		}
	}
	editAppSpecific(fieldName, currentContactDetails);
}

function getApplicantsChanges(currentContactDetails, previousContactDetails,content){
	var notificationBody = "Changes: \n" ;
	var contentArray = content.split("||");
	var currentContactDetailsArray = currentContactDetails.split("||");
	var previousContactDetailsArray = previousContactDetails.split("||");
	for (var i = 0; i < contentArray.length; i++) {
		if (previousContactDetailsArray[i] != currentContactDetailsArray[i]) {
			notificationBody += contentArray[i] + " --> Changed from: '" + previousContactDetailsArray[i] + "' to: '" + currentContactDetailsArray[i] + "'\n";
		}
	}
	return notificationBody;
}

function assignTaskToLastWorkflowActionUser(capId) {
	var activeWFTask = getActiveWorkflowTask(capId);
	if (activeWFTask) {
		var taskUserObj = null;
		var assignStaff = activeWFTask.getTaskItem().getAuditID();
		if (assignStaff != null) {
			var userObjRes = aa.person.getUser(assignStaff.toString());
			if (userObjRes.getSuccess()) {
				taskUserObj = userObjRes.getOutput();
			}
		}
		if (taskUserObj == null || taskUserObj.getUserStatus() != "ENABLE") {
			unassignTask(activeWFTask.getTaskDescription());
			return false;
		}
		activeWFTask.setAssignedUser(taskUserObj);
		var taskItemCr = activeWFTask.getTaskItem();
		var adjustResultCr = aa.workflow.assignTask(taskItemCr);
		return true;
	}
	return false;
}


function getEmailParameters() {
	var emailParameters = aa.util.newHashtable();
	addParameter(emailParameters, "$$ACAMyRecordPageURL$$", eval(lookup("NOTIFICATION_TEMPLATE_VARIABLE_MAPPING", "ACAMyRecordPageURL")));
	addParameter(emailParameters, "$$altID$$", capId.getCustomID());
	addParameter(emailParameters, "$$PremisesAddress$$", getAddressString(capId));
	addParameter(emailParameters, "$$applicationType$$", applicationType);
	addParameter(emailParameters, "$$EMAIL$$", lookup("NOTIFICATION_TEMPLATE_VARIABLE_MAPPING", "TM_EMAIL"));
	addParameter(emailParameters, "$$PHONE_NUMBER$$", lookup("NOTIFICATION_TEMPLATE_VARIABLE_MAPPING", "TM_PHONE_NO"));

	return emailParameters;
}

function createAndSendEmailNotification(templateName, emailParameters, attachmentFiles, emailArrayTo) {
	var capId1 = capId.ID1;
	var capId2 = capId.ID2;
	var capId3 = capId.ID3;
	var fvCapID4Email = aa.cap.createCapIDScriptModel(capId1, capId2, capId3);
	var sendResult = aa.document.sendEmailAndSaveAsDocument(fromEmailAddress, String(emailArrayTo), "", templateName, emailParameters, fvCapID4Email, attachmentFiles);
}

function validateLicProfChanges(){
	var currentContactDetails = getLicProfDetailsString(capId);
	var previousContactDetails = String(getAppSpecific("LP Details"));
	var addCondition = false;
	if (previousContactDetails != "null") {
		if (currentContactDetails.toUpperCase() != previousContactDetails.toUpperCase()) {
			var contentString = "License Type||Prof. Licence Number||First Name||Middle Name||Last Name||Name of Business||Email||Business Phone||Mobile Phone||Fax||Address"
			var contentArray = contentString.split("||");
			var currentLicProfArray = currentContactDetails.split("~");
			var previousLicProfArray = previousContactDetails.split("~");
			var notificationBody = "Changes: \n" ;
			for (l in currentLicProfArray) {
				if (previousLicProfArray[l] == "" || currentLicProfArray[l] == "" || String(currentLicProfArray[l]).toUpperCase() == String(previousLicProfArray[l]).toUpperCase()) {
					continue;
				}
				var currentLpDetailsArray = currentLicProfArray[l].split("||");
				var previousLpDetailsArray = previousLicProfArray[l].split("||");
				notificationBody += "\n \n" + currentLpDetailsArray[0] + "\n";
				for (var i = 0; i < contentArray.length; i++) {
					if (previousLpDetailsArray[i] != currentLpDetailsArray[i]) {
						notificationBody += contentArray[i] + " --> Changed from: '" + previousLpDetailsArray[i] + "' to: '" + currentLpDetailsArray[i] + "'\n";
						addCondition = true;
					}
				}
			}
			if (!appHasCondition("Contact Change", "Added", "Change in Licensed Professional Details", "Notice") && addCondition) {
				addOrUpdateCondition("Contact Change", "Change in Licensed Professional Details", capId);
			}
			updateConditionBody("Contact Change", "Change in Licensed Professional Details", capId, notificationBody);
		}
	}
	editAppSpecific("LP Details", currentContactDetails);
}