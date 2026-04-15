if (matches(currentUserID,"bkwarteng")) {
    showDebug = true;
}

logDebug("Event fired.");

aa.sendMail("noreply@accela.com", "bkwarteng@accela.com", "", "ALUA event fired", "Success");