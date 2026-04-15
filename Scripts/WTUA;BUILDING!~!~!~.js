showDebug=true;
showMessage=true;	
logDebug("Hello sam. Ready to break more things?")

if (matches(wfTask,"Application Submittal","Review Distribution","Document Processing","Permit Issuance","Document Submitted Online") && wfStatus == "Additional Information Required") {
    emailTemplate = "SM BLD TEST WORKFLOW STANDARD COMMENTS";
}