try {
	eval(getScriptText("INCLUDES_CUSTOM_MESSAGE"));
	var taskStatusStr = wfTask + "_" + wfStatus;
	taskStatusStr = taskStatusStr.replace(/[ -//]/g, '_');
	var functionName = taskStatusStr.toLowerCase();
	try {
		userTaskPermissionValidation();
		eval(functionName + '();');
	} catch (funcEx) {
		aa.print("This function is not defined.");
	}
} catch (ex) {
	aa.print("ERROR::WTUB:BFP/Common/Plan/ARCS Agreement: " + ex);
}
/*--------------------------------------------------------------------------------------------------------------------------------*/
function executive_review_review_complete() {
	var documentRequiredType = "ARCS Agreement";
	if (!validateDocumentStatus(documentRequiredType)) {
		cancelAndShowMessage("The status of the document " + documentRequiredType + " under the 'Documents' tab is not set to Review Complete. Please update the status to procceed.");
	}
}

function legal_review_additional_info_requested() {
    
}

function legal_review_approved() {
    
}

function legal_review_rejected() {
    
}

function executive_review_returned_for_legal_review() {
    
}

function executive_review_pending_review() {
 
}

function legal_review_pending_review() {

}

/*--------------------------------------------------------------------------------------------------------------------------------*/
function validateSupervisorRestriction(currentUserID) {
	var userDepartment = getDepartmentName(currentUserID);
	if (matches(userDepartment, "Plan Examiner") && getAppSpecific("Need Supervisor Review") == "Yes") {
		cancelAndShowMessage("A supervisor's restriction has been applied. In order to issue a result, please contact your supervisor. You may also, assign this application to your supervisor by selecting Supervisor Review");
	}
}

function validateDocumentStatus(requiredDocType) {

	var docList = aa.document.getCapDocumentList(capId, "ADMIN");
	if (docList.getSuccess()) {
		var docListOutput = docList.getOutput();
		for (var i in docListOutput) {
			var doc = docListOutput[i];
			if (doc.getDocCategory() == requiredDocType && doc.getDocStatus() == "Review Complete") {
				return true;
			}
		}
	}
	return false;
}

function isCorrospondenceCondCreated(conditionType, conditionStatus, conditionName) {
	var condResult = aa.capCondition.getCapConditions(capId, conditionType);
	if (condResult.getSuccess()) {
		var capConds = condResult.getOutput();
	} else {
		return false;
	}
	for (i in capConds) {
		var thisCond = capConds[i];
		var thisCondStatus = thisCond.getConditionStatus();
		var thisCondName = thisCond.getConditionDescription();
		if ((conditionStatus.toUpperCase().equals(thisCondStatus.toUpperCase())) && (conditionName.toUpperCase().equals(thisCondName.toUpperCase()))) {
			return true;
		}
	}
	return false;
}

function cancelAndShowMessage(message) {
	cancel = true;
	showMessage = true;
	popupMessage(message);
}

function userTaskPermissionValidation() {
	var userDepartment = getDepartmentName(currentUserID);
	if (matches(userDepartment, "Administrator", "Plan Supervisor")) {
		return;
	}
	var message = "You are not authorized to perform this action. If you believe you have received this message in error, please contact your system administrator.";
	if (wfTask == "Administrative Review" && !matches(userDepartment, "PCU Unit Admin")) {
		cancelAndShowMessage(message);
	} else if (wfTask == "Plan Review" && !matches(userDepartment, "Plan Examiner")) {
		cancelAndShowMessage(message);
	} else if (wfTask == "Supervisor Review") {
		cancelAndShowMessage(message);
	}
}