return 0;
/*
var newAltID = icms334_generateCustomId();
if (newAltID != "") {
	logDebug("Changing altId of child from " + capIDString + " to " + newAltID);
	var updateResult = aa.cap.updateCapAltID(capId, newAltID);
	if (updateResult.getSuccess()) {
		logDebug("Successfully modified the record altId");
		//reset global var for other scripts
		capIDString = newAltID;
	}
	else {
		logDebug("Error editing the altId " + updateResult.getErrorMessage());
	}
}

function icms334_generateCustomId() {
    var customId = "";
    if (parentCapId == null) {
        parentCapId = getParent();
    }
    if (parentCapId) {
        var yy = (""+getAppSpecific("Square Feet")).substring(2);
        customId = parentCapId.getCustomID() + "-" + yy + getAppSpecific("Type");
    }
    return customId;
}
*/