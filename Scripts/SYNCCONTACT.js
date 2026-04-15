/*-----------------------------------------------------------------------------/
Title: SLATE_RENTALREG_CONTACT_SYNC

Run Order:
1. Slate_RentalReg_Rec_Sync > Creates/updates records in LJCMG
2. Slate_RentalReg_Addr_Sync > Adds addresses to records created by (1)
3. (This Job) Slate_RentalReg_Contact_Sync > Creates contacts on records created in (1) by lookup via the Contact ASI Slate ID fields

Requires Contact Type to be configured with ASI template (not people attr). Subgroup "CONTACT ID" > Field "Slate Contact ID"

ASI group on existing contact types could be added to other contact types, but would impact both if diverging reqs occurred.

/-----------------------------------------------------------------------------*/

function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if (!servProvCode)
		servProvCode = aa.getServiceProviderCode();
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		if (useProductScripts) {
			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
		} else {
			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		}
		return emseScript.getScriptText() + "";
	} catch (err) {
		return "";
	}
}

function getMasterScriptText(vScriptName) {
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
	return emseScript.getScriptText() + "";
}


showDebug = true;
runName = "Contacts";
var SCRIPT_VERSION = "3.0";
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, true));
eval(getScriptText("INCLUDES_ACCELA_GLOBALS", null, true));
eval(getScriptText("INCLUDES_BATCH"));

eval('function logDebug(str) {emailText += str + "<br>";aa.print(str + "<br>");}');
/*-----------------------------------------------------------------------------/
 BATCH PARAMETERS
/-----------------------------------------------------------------------------*/

//Testing
// aa.env.setValue("BatchJobName","SLATE_RENTALREG_CONTACT_SYNC");
// aa.env.setValue("emailAddress","adam@grayquarter.com");
// aa.env.setValue("FTPStandardChoice","SFTP_SLATE_RENTAL_RECORD");
// aa.env.setValue("maxSeconds",290);
// aa.env.setValue("delimiter","|");
// aa.env.setValue("firstRowHeader","Y");
// aa.env.setValue("remoteFileName","contacts.csv");
// aa.env.setValue("showFiltered","Y");

//Job Parameters
var emailAddress = getParam("emailAddress");
var sftpConfig = getParam("FTPStandardChoice");
var maxSeconds = getParam("maxSeconds");
var fileDelim = getParam("delimiter");
    /* null values at the end of line interfere with buffered reader. cast line value to String and then escaping the delim is not required. */ 
    //fileDelim = escapeRegexChars(fileDelim); aa.print("File Delimiter: " + fileDelim); 
var firstRowHeader = (getParam("firstRowHeader") == "Y" ? true : false);  // Reg should always be Y for building line object
var localFilePath = "C:\\emse\\LJCMG\\";
var remoteFileName = getParam("remoteFileName");
var showFiltered = getParam("showFiltered");
((showFiltered && showFiltered == "Y") ? showFiltered = true : showFiltered = false);

/*-----------------------------------------------------------------------------/
 USER CONFIGURABLE PARAMETERS
/-----------------------------------------------------------------------------*/

var currentUserID = aa.getAuditID();
aa.env.setValue("CurrentUserID", "ADMIN");
if(currentUserID != null) systemUserObj = aa.person.getUser(currentUserID).getOutput(); // Current User Object
var sysDate = aa.date.getCurrentDate();
var br = "<br>";
var startDate = new Date();
var startTime = startDate.getTime();
var emailText = "";

batchJobName = "" + aa.env.getValue("BatchJobName");
var batchJobResult = aa.batchJob.getJobID();
var batchJobName = "" + aa.env.getValue("BatchJobName");
var batchJobID = 0;
if (batchJobResult.getSuccess()) {
    batchJobID = batchJobResult.getOutput();
    logDebug("Batch Job " + batchJobName + " Job ID is " + batchJobID + br);
} else {
    logDebug("Batch job ID not found " + batchJobResult.getErrorMessage() + br);
}

/*-----------------------------------------------------------------------------/
 Main
/-----------------------------------------------------------------------------*/

try {
	mainProcess();

	if(emailAddress.length) aa.sendMail("noreply@accela.com", emailAddress, "", aa.getServiceProviderCode() + " - " + batchJobName + " Results", emailText);

} catch (err) {
	logDebug("Main Process Error: " + err);
}

/*----------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------/
| MAIN FUNCTION
/-----------------------------------------------------------------------------*/

function mainProcess() {

	//FTP information
	var ftpSite = lookupLocal(sftpConfig,"SFTP_SERVER"); //"ftp.tolemi.com" //"35.172.22.131"
	var ftpUser = lookupLocal(sftpConfig,"SFTP_USER"); //"louisville-ky-rental"
	var ftpPassword = lookupLocal(sftpConfig,"SFTP_PASSWORD"); //"2Tx4sjwnYDFREsGU7*fcXJZG"
	var ftpPort = lookupLocal(sftpConfig,"SFTP_PORT"); //22
	var ftpDirectory = lookupLocal(sftpConfig,"SFTP_FOLDER"); // "/"

	logDebug("ftpSite: " + ftpSite);
	logDebug("ftpUser: " + ftpUser);
	logDebug("ftpPort: " + ftpPort);
	logDebug("ftpDirectory: " + ftpDirectory);
    logDebug("fileName: " + remoteFileName);

	try {
        var header = null, fileAvailable = false, procErr = 0, slateLastUpdated = null;

    /* Validate file availability */
    var listRes = aa.sftp.listFilesFromSFTP(sftpConfig);
    if(listRes.getSuccess()) {
        listRes = listRes.getOutput().toArray();
        // if(listRes.indexOf(remoteFileName) > -1) fileAvailable = true; //Not working
        // aa.print("Index: " + listRes.indexOf(String(remoteFileName)));
        for(var i in listRes) if(listRes[i] == remoteFileName) fileAvailable = true;
    } else {
        logDebug("listFilesFromSFTP failed: " + listRes.getErrorType() + " -> " + listRes.getErrorMessage());
    }


    /* Accela Last Run date/time */
    var lastRunSC = lookupLocal(sftpConfig,runName + " Last Run"), lastRunTime = null;
    if(lastRunSC && lastRunSC != "") lastRunTime = aa.date.parseDate(lastRunSC).getEpochMilliseconds();
    logDebug("Accela Batch Last Run On: " + lastRunSC + " " + lastRunTime);


    /* File retrieval and updates */
    if(fileAvailable) {
        var dL = aa.sftp.downloadFileFromSFTP(sftpConfig,remoteFileName,localFilePath);
        if(dL.getSuccess()) {
            var lnCo = 0;
            dL = dL.getOutput();
            logDebug("Download complete: " + dL + " - opening file: " + dL + "\\" + remoteFileName);

            var f = aa.io.File(dL + "\\" + remoteFileName);
            var jbr = aa.io.BufferedReader(f);
            var line = null;

            /*Update Actions Start*/
            while ((line = jbr.readLine()) != null) {

                var cap = null, capId = null, lineObj = {};
                lnCo++;

                /* testing */
                //aa.print("Line " + lnCo + " : " + line);

                /* Store header */
                var la = String(line).split(fileDelim);
                //aa.print("Line length: " + la.length);
                if(firstRowHeader && !header) {
                    header = la;
                    logDebug("Header stored with " + header.length + " columns");
                    continue;
                }

                if(firstRowHeader && header.length > 0 && (header.length != la.length)) {
                    logDebug("ERROR: line " + lnCo + " is Out of bounds with header: " + la.length + " columns instead of " + header.length);
                    procErr++;
                    continue;
                }

                /* Build line processing object */
                for(var i in header) lineObj[header[i]] = la[i];

                /* 
                    0 check column for last change date on Slate side, compare to batch job lastRunTime, skip if needed 
                    last run date becomes latest date available from the last_updated column in the CSV file
                */
                //aa.print(lineObj["registration_no"] + " last updated: " + lineObj["last_updated"])
                
                if(showFiltered) logDebug(lineObj["registration_no"] + ": Slate last updated on " + lineObj["last_updated"]);
                if(lineObj["last_updated"] != "") {
                    var aaSD = aa.date.parseDate(lineObj["last_updated"]);
                    if((aaSD && aaSD.getEpochMilliseconds() < lastRunTime)) {
                        if(showFiltered) logDebug("No Change on record since last run time");
                        continue;
                    }
                    if(aaSD && aaSD.getEpochMilliseconds()) {
                        if(!slateLastUpdated) {
                            slateLastUpdated = aaSD.getEpochMilliseconds(); /* aa.print("Set SC most recent update value " + slateLastUpdated); */
                        } else if(slateLastUpdated && slateLastUpdated < aaSD.getEpochMilliseconds()) {
                            slateLastUpdated = aaSD.getEpochMilliseconds(); /* aa.print("Updated SC most recent update value to " + slateLastUpdated); */
                        }
                    }
                }


                /* Process contact complete */
            }

            logDebug(br + br);
            logDebug("File processing complete");
            editLookupLocal(sftpConfig,runName + " Last Run", convertToISODateWithTZOffset(slateLastUpdated ? slateLastUpdated : lastRunTime));

        } else {
            logDebug("Download failed: " + dL.getErrorType() + " -> " + dL.getErrorMessage());
        }
    } else {
        logDebug("ERROR: " + remoteFileName + " was not found at " + ftpSite + ":" + ftpPort + "" + ftpDirectory);
    }

	} catch (err) {
		logDebug("Error processing file : " + err);
		return;
	}
    logDebug(br + br);
    logDebug("Main Process Finished");
    logDebug("Process Errors: " + procErr);
}

/*-----------------------------------------------------------------------------/
 FUNCTIONS
/-----------------------------------------------------------------------------*/

function escapeRegexChars(char) {
    return char.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&')
}

function lookupLocal(stdChoice, stdValue) {
	var strControl;
	var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice, stdValue);

	if (bizDomScriptResult.getSuccess() && bizDomScriptResult.getOutput().getAuditStatus() == "A") {
		var bizDomScriptObj = bizDomScriptResult.getOutput();
		strControl = "" + bizDomScriptObj.getDescription();
	}
	return strControl;
}

function editLookupLocal(stdChoice,stdValue,stdDesc) {
	var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice,stdValue);
	if (bizDomScriptResult.getSuccess()) {
		bds = bizDomScriptResult.getOutput();
	} else {
		logDebug("Std Choice(" + stdChoice + "," + stdValue + ") does not exist");
		return false;
	}
	var bd = bds.getBizDomain()
		
	bd.setDescription(stdDesc);
	var editResult = aa.bizDomain.editBizDomain(bd);
	
	if(editResult.getSuccess()) logDebug("Successfully edited Std Choice(" + stdChoice + "," + stdValue + ") = " + stdDesc);
	else logDebug("**ERROR editing Std Choice " + editResult.getErrorMessage());
}

function getApplicationLocal(appNum) {
    var getCapResult = aa.cap.getCapID(appNum);
    if (getCapResult.getSuccess()) return getCapResult.getOutput();
    else {
        //logDebug("Could not retrieve record for " + appNum + ": " + getCapResult.getErrorMessage()); 
        return false;
    }
}

function removeContact(conType, pCapId) {
    pContacts = getContactArray(pCapId);

    for(var c in pContacts) {
        pConType = "" + pContacts[c]["contactType"];
        if(conType == pConType) {
            logDebug("Removing " + conType + " Contact from " + pCapId.getCustomID() + ": " + pConType);
            aa.people.removeCapContact(pCapId, pContacts[c]["contactSeqNumber"]);
        }
    }
}

/* returns capcontactmodel if successful */
function createContact(pCapId, conType, fn, ln, bn, email, phone1) {
    logDebug(pCapId.getCustomID() + " createContact: Creating " + conType);
    var cm = aa.proxyInvoker.newInstance("com.accela.aa.aamain.people.CapContactModel").getOutput();
    cm.setCapID(pCapId);
    cm.setContactType(conType);

    //Slate
    cm.setFirstName(fn);
    cm.setLastName(ln);
    cm.setBusinessName(bn);
    cm.setEmail(email);
    cm.setPhone1(phone1);

	var createContactResult = aa.people.createCapContactWithAttribute(cm);
	if (createContactResult.getSuccess()) {
		return cm;
	} else {
		logDebug("Error creating contact: " + createContactResult.getErrorMessage());
		return false;
	}
}

function addTransactionalContactAddress(pCapId, contactModel, addrType, addrLine1, city, state, zip) {
    if(showFiltered) logDebug("addTransactionalContactAddress: Creating contact address");

    // var capContactResult = aa.people.getCapContactByCapID(pCapId);
    // if (capContactResult.getSuccess()) {
    //     var capContactArray = capContactResult.getOutput();
    //     for(var c in capContactArray) {
    //         var ccsm = capContactArray[c];
    //         var cm = ccsm.getCapContactModel();
    //         if(contactModel() == pConType) {
                var address = aa.proxyInvoker.newInstance("com.accela.orm.model.address.ContactAddressModel").getOutput();
                // var casm = aa.address.createContactAddressModel().getOutput();
                // var address = casm.getContactAddressModel()

                address.setEntityID(parseInt(contactModel.getContactSeqNumber()));
                address.setEntityType("CAP_CONTACT");
                address.setPrimary("Y");
                address.setAddressType(addrType);
                address.setAddressLine1(addrLine1);
                address.setCity(city);
                address.setState(state);
                address.setZip(zip);

                //casm.setContactAddressModel(address);
                
                var addressRes = aa.address.createCapContactAddress(pCapId, address);
                if(addressRes.getSuccess()) {
                    //logDebug("Successfully created contact address");
                    return true;
                } else {
                    logDebug("addTransactionalContactAddress Failed to create cap contact address: " + addressRes.getErrorMessage());
                    return false;
                }
    //         }
    //     }
    // } else {
    //     logDebug("addTransactionalContactAddress: Failed to retrieve contacts on " + pCapId);
    //     return false;
    // }
}

function convertToISODateWithTZOffset(dateMS) {
    var tzoffset = (new Date(dateMS)).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(dateMS - tzoffset)).toISOString().slice(0, -1);
    return localISOTime;
}

/**requires people template attribute "SLATEID" */
function compareContactHash2Slate(contactObj, slateObj, pCapId) {
    //if(showFiltered) logDebug("Checking for contact " + contactObj["contactType"] + " hash " + slateObj['id'] + " on " + pCapId.getCustomID());
    var conASI = getCapContactASIBySeqNbr(pCapId, contactObj["contactSeqNumber"], "Slate Contact ID");
    //if(showFiltered) logDebug("Found ASI with value: " + conASI);
    if(conASI && conASI == slateObj['id']) return true;
    return false;
}

function removeContactBySeqNbr(pCapId, pConSeqNbr) {
    var res = aa.people.removeCapContact(pCapId, pConSeqNbr);
    return res.getSuccess();
}

function editCapContactASIBySeqNbr(pCapId, conSeqNbr, asiName, asiValue) {

    var cContact = aa.people.getCapContactByPK(pCapId,conSeqNbr);
    if(!cContact.getSuccess()) {
        logDebug("editCapContactASIBySeqNbr: failed to retrieve contact on " + pCapId + " number " + conSeqNbr);
        return false;
    }
    cContact = cContact.getOutput();
    peopleModel = cContact.getPeople();
    peopleTemplate = peopleModel.getTemplate();
    if (peopleTemplate == null) return;
    var templateGroups = peopleTemplate.getTemplateForms(); //ArrayList
    if (!(templateGroups == null || templateGroups.size() == 0)) {
        thisGroup = templateGroups.get(0);
        var subGroups = templateGroups.get(0).getSubgroups();
        for (var subGroupIndex = 0; subGroupIndex < subGroups.size(); subGroupIndex++) {
            var subGroup = subGroups.get(subGroupIndex);
            var fArray = new Array();
            var fields = subGroup.getFields();
            for (var fieldIndex = 0; fieldIndex < fields.size(); fieldIndex++) {
                var field = fields.get(fieldIndex);
                fArray[field.getDisplayFieldName()] = field.getDefaultValue();
                if(field.getDisplayFieldName().toString().toUpperCase()==asiName.toString().toUpperCase()) {
                    field.setDefaultValue(asiValue);
                    fields.set(fieldIndex, field);  //set the field in the ArrayList of fields
                    subGroup.setFields(fields); 
                    subGroups.set(subGroupIndex, subGroup);
                    thisGroup.setSubgroups(subGroups);
                    templateGroups.set(0, thisGroup);
                    peopleTemplate.setTemplateForms(templateGroups);
                    peopleModel.setTemplate(peopleTemplate);
                    cContact.setPeople(peopleModel);
                    editResult = aa.people.editCapContact(cContact.getCapContactModel());
                    if (editResult.getSuccess()) {
                        return true;
                    } else {
                        logDebug("Failed to edit contact ASI " + asiName + " to " + asiValue);
                        return false;
                    }
                }
            }
        }
    }
}

function getCapContactASIBySeqNbr(pCapId, conSeqNbr, asiName) {
	try {
        var cContact = aa.people.getCapContactByPK(pCapId,conSeqNbr);
        if(!cContact.getSuccess()) {
            logDebug("getCapContactASIBySeqNbr: failed to retrieve contact on " + pCapId + " number " + conSeqNbr);
            return false;
        }
        cContact = cContact.getOutput();
		peopleModel = cContact.getPeople();
		peopleTemplate = peopleModel.getTemplate();
		if (peopleTemplate == null) return null;
		var templateGroups = peopleTemplate.getTemplateForms(); //ArrayList
		// var gArray = new Array(); 
		if (!(templateGroups == null || templateGroups.size() == 0)) {
			thisGroup = templateGroups.get(0);
			var subGroups = templateGroups.get(0).getSubgroups();
			for (var subGroupIndex = 0; subGroupIndex < subGroups.size(); subGroupIndex++) {
				var subGroup = subGroups.get(subGroupIndex);
				var fArray = new Array();
				var fields = subGroup.getFields();
				//per defect 48426. the function was failing when it would hit a sub group where the fields did not exist for our contact.
				if(fields!=null){
				for (var fieldIndex = 0; fieldIndex < fields.size(); fieldIndex++) {
					var field = fields.get(fieldIndex);
					fArray[field.getDisplayFieldName()] = field.getDefaultValue();
					if(field.getDisplayFieldName().toString().toUpperCase()==asiName.toString().toUpperCase()) {
						return field.getChecklistComment();
					}
				}
				}
			}
		}
	}
	catch (err) { logDebug(err);}
	return null;
}