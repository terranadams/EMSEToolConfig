/**************************************************
ASA Renewal Script
-Executes when the "Renew" button is clicked on the 
	Renewals tab
	
	ENTRY POINT IS ON ASA FOR RENEWAL RECORD (ASA:LICENSES/#/RENEWAL/# - include("APPLICATIONSUBMITAFTER4RENEW");)
***************************************************/

//Set incomleted CAPID (CAP id)  for test.
//Unit Test Parameters --> begin
/*
var myCapId = "14TMP-000064";
var parentCapId = "PET-000010";

var tmpID = aa.cap.getCapID(myCapId).getOutput();
if(tmpID != null){
	aa.env.setValue("PermitId1",tmpID.getID1());
	aa.env.setValue("PermitId2",tmpID.getID2());
	aa.env.setValue("PermitId3",tmpID.getID3());
}

var tmpParentID = aa.cap.getCapID(parentCapId).getOutput();
if(tmpParentID != null){
	//Set partent CAPID for test.
	var parentCapIDModel = aa.cap.getCapIDModel(tmpParentID.getID1(), tmpParentID.getID2(), tmpParentID.getID3());
	aa.env.setValue("ParentCapID", parentCapIDModel.getOutput());
}


var myUserId = "ADMIN"
aa.env.setValue("CurrentUserID",myUserId);


//Unit Test Parameter --> end 
*/

//showDebug = 1;
/*********************************************************
Get capIds
*********************************************************/
var partialCapId = getIncompleteCapId();
capId = partialCapId; //set target capId object for master script functions
var parentCapId = aa.env.getValue("ParentCapID"); //getParentLicenseForRenewal(partialCapId);

/********************************************************
Include the Master Script and Custom Script functions
*********************************************************/
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, true));
eval(getScriptText("INCLUDES_ACCELA_GLOBALS", null, true));
eval(getScriptText("INCLUDES_CUSTOM", null, true));
var SCRIPT_VERSION = 9.0;

function getScriptText(vScriptName, servProvCode, useProductScripts) {
    if (!servProvCode) {
        servProvCode = aa.getServiceProviderCode();
    }

    var vScriptName = vScriptName.toUpperCase();

    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();

    try {
        var emseScript;
        if (useProductScripts) {
            emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
        } else {
            emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
        }

        return emseScript.getScriptText() + "";
    } catch (err) {
        return "";
    }
}

/*********************************************************
Start License to Renewal Copy
*********************************************************/
if (matches(currentUserID, "ADMIN")) {
    showDebug = true;
    showMessage = true;

    aa.print("RENEWAL");
}

//1. Check to see if license is ready for renew
if (isRenewProcess(parentCapId, partialCapId)) {
    logDebug("capId (" + parentCapId + ") is ready for renew. PartialCap (" + partialCapId + ")");
    //2. Associate partial cap with parent CAP.
    var result = aa.cap.createRenewalCap(parentCapId, partialCapId, true);

    if (result.getSuccess()) {
        //3. Copy key information from parent license to partial cap
        copyKeyInfo(parentCapId, partialCapId);
        //4. Set B1PERMIT.B1_ACCESS_BY_ACA to "N" for partial CAP to not allow that it is searched by ACA user.
        aa.cap.updateAccessByACA(partialCapId, "N");
    } else {
        logDebug("ERROR: Associate partial cap with parent CAP. " + result.getErrorMessage());
    }
}

aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", "ApplicationSubmitAfter4Renew perform renewal process.");

function isRenewProcess(parentCapID, partialCapID) {
    //1. Check to see parent CAP ID is null.
    if (parentCapID == null || partialCapID == null || aa.util.instanceOfString(parentCapID)) {
        return false;
    }

    //2. Get CAPModel by PK for partialCAP.
    var result = aa.cap.getCap(partialCapID);

    if (result.getSuccess()) {
        var capScriptModel = result.getOutput();
        //2.1. Check to see if it is partial CAP.
        if (capScriptModel.isCompleteCap()) {
            logDebug("ERROR: It is not partial CAP(" + capScriptModel.getCapID() + ")");
            return false;
        }
    } else {
        logDebug("ERROR: Fail to get CAPModel (" + partialCapID + "): " + result.getErrorMessage());
        return false;
    }

    //3.  Check to see if the renewal was initiated before.
    result = aa.cap.getProjectByMasterID(parentCapID, "Renewal", "Incomplete");

    if (result.getSuccess()) {
        var partialProjects = result.getOutput();
        if (partialProjects != null && partialProjects.length > 0) {
            //Avoid to initiate renewal process multiple times.
            logDebug("Warning: Renewal process was initiated before. ( " + parentCapID + ")");
            return false;
        }
    }

    //4 . Check to see if parent CAP is ready for renew.
    return isReadyRenew(parentCapID);
}

function isReadyRenew(capid) {
    if (capid == null || aa.util.instanceOfString(capid)) {
        return false;
    }

    var result = aa.expiration.isExpiredLicenses(capid);

    if (result.getSuccess()) {
        return true;
    } else {
        logDebug("ERROR: Failed to get expiration with CAP(" + capid.getCustomID() + "): " + result.getErrorMessage());
    }
    return false;
}

function getIncompleteCapId() {
    var s_id1 = aa.env.getValue("PermitId1");
    var s_id2 = aa.env.getValue("PermitId2");
    var s_id3 = aa.env.getValue("PermitId3");

    var result = aa.cap.getCapIDModel(s_id1, s_id2, s_id3);
    if (result.getSuccess()) {
        return result.getOutput();
    } else {
        logDebug("ERROR: Failed to get capId: " + result.getErrorMessage());
        return null;
    }
}

function lookup(stdChoice, stdValue) {
    var strControl;
    var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice, stdValue);

    if (bizDomScriptResult.getSuccess()) {
        var bizDomScriptObj = bizDomScriptResult.getOutput();
        strControl = "" + bizDomScriptObj.getDescription(); // had to do this or it bombs.  who knows why?
        logDebug("lookup(" + stdChoice + "," + stdValue + ") = " + strControl);
    } else {
        logDebug("lookup(" + stdChoice + "," + stdValue + ") does not exist");
    }
    return strControl;
}

function copyKeyInfo(srcCapId, targetCapId) {
    //copy ASI infomation
    var AppSpecInfo = new Array();
    loadAppSpecific(AppSpecInfo, srcCapId);
    var recordType = "";

    var targetCapResult = aa.cap.getCap(targetCapId);
    var targetAppTypeString;
    if (!targetCapResult.getSuccess()) {
        logDebug("Could not get target cap object: " + targetCapId);
    } else {
        var targetCap = targetCapResult.getOutput();
        var targetAppType = targetCap.getCapType(); //create CapTypeModel object
        targetAppTypeString = targetAppType.toString();
        logDebug(targetAppTypeString);
    }

    var ignore = lookup("EMSE:ASI Copy Exceptions", targetAppTypeString);
    var ignoreArr = new Array();
    if (ignore != null) {
        ignoreArr = ignore.split("|");
        copyAppSpecificRenewal(AppSpecInfo, targetCapId, ignoreArr);
    } else {
        copyAppSpecificRenewal(AppSpecInfo, targetCapId);
    }
    //copy License information
    copyLicensedProfsExceptSelf(srcCapId, targetCapId);

    //copy AST information
    copyASITables(srcCapId, targetCapId, ["AGENCY SELECTION"]);

    //copy People information - AMC renewal contact copying will be handled via pageflow.
    if (!matches(getAppTypeStringByCapId(targetCapId), "Building/Nevans/Subtype/Denney Bldg", "Building/Nevans/Subtype/DenneyBldg2")) {
        copyPeople(srcCapId, targetCapId);
    }

    //copy Owner information
    copyOwner(srcCapId, targetCapId);

    //Copy CAP condition information
    copyCapCondition(srcCapId, targetCapId);

    //Copy additional info.
    copyAdditionalInfo(srcCapId, targetCapId);

    //Copy Fees info.
    copyFees(srcCapId, targetCapId);

    copyContEducationTable(srcCapId, targetCapId);
}

//@ts-check

function copyFees(sourceCapId, targetCapId) {
    var feeSeqArray = new Array();
    var feeA = loadFees(sourceCapId);

    for (var x in feeA) {
        var thisFee = feeA[x];

        logMessage("We have a fee " + thisFee.code + " status : " + thisFee.status);

        if (thisFee.status == "INVOICED") {
            addFee(thisFee.code, thisFee.sched, thisFee.period, thisFee.unit, "Y", targetCapId);

            feeSeqArray = new Array();
            var paymentPeriodArray = new Array();

            feeSeqArray.push(thisFee.sequence);
            paymentPeriodArray.push(thisFee.period);
            var invoiceResult_L = aa.finance.createInvoice(sourceCapId, feeSeqArray, paymentPeriodArray);

            if (!invoiceResult_L.getSuccess()) {
                aa.print("**ERROR: Invoicing the fee items voided " + thisFee.code + " was not successful.  Reason: " + invoiceResult_L.getErrorMessage());
            }
        }

        if (thisFee.status == "NEW") {
            addFee(thisFee.code, thisFee.sched, thisFee.period, thisFee.unit, "N", targetCapId);
        }
    }
}

function copyEducation(srcCapId, targetCapId) {
    if (srcCapId != null && targetCapId != null) {
        aa.education.copyEducationList(srcCapId, targetCapId);
    }
}

function copyContEducation(srcCapId, targetCapId) {
    if (srcCapId != null && targetCapId != null) {
        aa.continuingEducation.copyContEducationList(srcCapId, targetCapId);
    }
}

function copyContEducationTable(srcCapId, targetCapId) {
    removeASITable("AGENCY SELECTION", targetCapId);
    var tempArray = [];

    var currentEdu = loadASITable("AGENCY SELECTION", srcCapId);
    if (currentEdu && currentEdu.length > 0) {
        for (var ce in currentEdu) {
            if (String(currentEdu[ce]["Used On"]).equals("")) {
                tempArray.push(currentEdu[ce]);
            }
        }
    }

    addASITable("AGENCY SELECTION", tempArray, targetCapId);
    logDebug("ASI Table AGENCY SELECTION :");
}


function copyExamination(srcCapId, targetCapId) {
    if (srcCapId != null && targetCapId != null) {
        aa.examination.copyExaminationList(srcCapId, targetCapId);
    }
}

function copyAddress(srcCapId, targetCapId) {
    //1. Get address with source CAPID.
    var capAddresses = getAddress(srcCapId);
    if (capAddresses == null || capAddresses.length == 0) {
        return;
    }
    //2. Get addresses with target CAPID.
    var targetAddresses = getAddress(targetCapId);
    //3. Check to see which address is matched in both source and target.
    for (var loopk in capAddresses) {
        var sourceAddressfModel = capAddresses[loopk];
        //3.1 Set target CAPID to source address.
        sourceAddressfModel.setCapID(targetCapId);
        var targetAddressfModel = null;
        //3.2 Check to see if sourceAddress exist.
        if (targetAddresses != null && targetAddresses.length > 0) {
            for (var loop2 in targetAddresses) {
                if (isMatchAddress(sourceAddressfModel, targetAddresses[loop2])) {
                    targetAddressfModel = targetAddresses[loop2];
                    break;
                }
            }
        }
        //3.3 It is a matched address model.
        if (targetAddressfModel != null) {
            //3.3.1 Copy information from source to target.
            aa.address.copyAddressModel(sourceAddressfModel, targetAddressfModel);
            //3.3.2 Edit address with source address information.
            aa.address.editAddressWithAPOAttribute(targetCapId, targetAddressfModel);
            logDebug("Copying address");
        }
        //3.4 It is new address model.
        else {
            //3.4.1 Create new address.
            logDebug("Copying address");
            aa.address.createAddressWithAPOAttribute(targetCapId, sourceAddressfModel);
        }
    }
}

function isMatchAddress(addressScriptModel1, addressScriptModel2) {
    if (addressScriptModel1 == null || addressScriptModel2 == null) {
        return false;
    }
    var streetName1 = addressScriptModel1.getStreetName();
    var streetName2 = addressScriptModel2.getStreetName();
    if ((streetName1 == null && streetName2 != null) || (streetName1 != null && streetName2 == null)) {
        return false;
    }
    if (streetName1 != null && !streetName1.equals(streetName2)) {
        return false;
    }
    return true;
}

function getAddress(capId) {
    var capAddresses = null;
    var s_result = aa.address.getAddressByCapId(capId);
    if (s_result.getSuccess()) {
        capAddresses = s_result.getOutput();
        if (capAddresses == null || capAddresses.length == 0) {
            logDebug("WARNING: no addresses on this CAP:" + capId);
            capAddresses = null;
        }
    } else {
        logDebug("ERROR: Failed to address: " + s_result.getErrorMessage());
        capAddresses = null;
    }
    return capAddresses;
}

function copyParcel(srcCapId, targetCapId) {
    //1. Get parcels with source CAPID.
    var copyParcels = getParcel(srcCapId);
    if (copyParcels == null || copyParcels.length == 0) {
        return;
    }
    //2. Get parcel with target CAPID.
    var targetParcels = getParcel(targetCapId);
    //3. Check to see which parcel is matched in both source and target.
    for (var i = 0; i < copyParcels.size(); i++) {
        var sourceParcelModel = copyParcels.get(i);
        //3.1 Set target CAPID to source parcel.
        sourceParcelModel.setCapID(targetCapId);
        var targetParcelModel = null;
        //3.2 Check to see if sourceParcel exist.
        if (targetParcels != null && targetParcels.size() > 0) {
            for (var j = 0; j < targetParcels.size(); j++) {
                if (isMatchParcel(sourceParcelModel, targetParcels.get(j))) {
                    targetParcelModel = targetParcels.get(j);
                    break;
                }
            }
        }
        //3.3 It is a matched parcel model.
        if (targetParcelModel != null) {
            //3.3.1 Copy information from source to target.
            var tempCapSourceParcel = aa.parcel.warpCapIdParcelModel2CapParcelModel(targetCapId, sourceParcelModel).getOutput();
            var tempCapTargetParcel = aa.parcel.warpCapIdParcelModel2CapParcelModel(targetCapId, targetParcelModel).getOutput();
            aa.parcel.copyCapParcelModel(tempCapSourceParcel, tempCapTargetParcel);
            //3.3.2 Edit parcel with sourceparcel.
            aa.parcel.updateDailyParcelWithAPOAttribute(tempCapTargetParcel);
        }
        //3.4 It is new parcel model.
        else {
            //3.4.1 Create new parcel.
            aa.parcel.createCapParcelWithAPOAttribute(aa.parcel.warpCapIdParcelModel2CapParcelModel(targetCapId, sourceParcelModel).getOutput());
        }
    }
}

function copyParcelGisObjects(srcCapId, targetCapId) {
    var gisObjArray = aa.gis.getCapGISObjects(srcCapId).getOutput();

    for (var b1 in gisObjArray) {
        var gisObjScriptModel = gisObjArray[b1];
        var gisObjArray2 = gisObjScriptModel.getGISObjects();

        for (var b2 in gisObjArray2) {
            var gisObjModel = gisObjArray2[b2].getGisObjectModel();
            var retval;

            if (gisObjModel.getPrimaryGISFlag() == "Y") {
                retval = aa.gis.addCapGISObject(targetCapId, gisObjModel.getServiceID(), gisObjModel.getLayerId(), gisObjModel.getGisId(), true);

                if (retval.getSuccess()) {
                    logDebug("Successfully added Cap GIS object: " + gisObjModel.getGisId());
                } else {
                    logDebug("**ERROR: Could not add Cap GIS Object.  Reason is: " + retval.getErrorType() + ":" + retval.getErrorMessage());
                }
            } else {
                retval = aa.gis.addCapGISObject(targetCapId, gisObjModel.getServiceID(), gisObjModel.getLayerId(), gisObjModel.getGisId());

                if (retval.getSuccess()) {
                    logDebug("Successfully added Cap GIS object: " + gisObjModel.getGisId());
                } else {
                    logDebug("**ERROR: Could not add Cap GIS Object.  Reason is: " + retval.getErrorType() + ":" + retval.getErrorMessage());
                }
            }
        }
    }
}

function isMatchParcel(parcelScriptModel1, parcelScriptModel2) {
    if (parcelScriptModel1 == null || parcelScriptModel2 == null) {
        return false;
    }
    if (parcelScriptModel1.getParcelNumber().equals(parcelScriptModel2.getParcelNumber())) {
        return true;
    }
    return false;
}

function getParcel(capId) {
    var capParcelArr = null;
    var s_result = aa.parcel.getParcelandAttribute(capId, null);
    if (s_result.getSuccess()) {
        capParcelArr = s_result.getOutput();
        if (capParcelArr == null || capParcelArr.length == 0) {
            logDebug("WARNING: no parcel on this CAP:" + capId);
            capParcelArr = null;
        }
    } else {
        logDebug("ERROR: Failed to parcel: " + s_result.getErrorMessage());
        capParcelArr = null;
    }
    return capParcelArr;
}

function copyPeople(srcCapId, targetCapId) {
    //1. Get people with source CAPID.
    var capPeoples = getPeople(srcCapId);

    if (capPeoples == null || capPeoples.length == 0) {
        return;
    }
    //2. Get people with target CAPID.
    var targetPeople = getPeople(targetCapId);
    //3. Check to see which people is matched in both source and target.
    for (var loopk in capPeoples) {
        // Skip 'Visibility Contact', will be added on CTRCA.
        if (capPeoples[loopk].getPeople().contactType == "Visibility Contact") {
            continue;
        }

        // Record type and contact type contact skipping.
        if (appMatch("Building/Nevans/Subtype/Denney Bldg", targetCapId)) {
            if (!matches(capPeoples[loopk].getPeople().contactType, "Primary Contact", "Applicant")) {
                continue;
            }
        }

        var sourcePeopleModel = capPeoples[loopk];
        //3.1 Set target CAPID to source people.
        sourcePeopleModel.getCapContactModel().setCapID(targetCapId);
        var targetPeopleModel = null;
        //3.2 Check to see if sourcePeople exist.
        if (targetPeople != null && targetPeople.length > 0) {
            for (var loop2 in targetPeople) {
                if (isMatchPeople(sourcePeopleModel, targetPeople[loop2])) {
                    targetPeopleModel = targetPeople[loop2];
                    break;
                }
            }
        }
        //3.3 It is a matched people model.
        if (targetPeopleModel != null) {
            //3.3.1 Copy information from source to target.
            aa.people.copyCapContactModel(sourcePeopleModel.getCapContactModel(), targetPeopleModel.getCapContactModel());
            //3.3.2 Edit People with source People information.
            aa.people.editCapContactWithAttribute(targetPeopleModel.getCapContactModel());
        }
        //3.4 It is new People model.
        else {
            //3.4.1 Create new people.
            if (sourcePeopleModel.getCapContactModel().getContactType() == "Education Provider") {
                sourcePeopleModel.getCapContactModel().setComponentName("Applicant");
            } else if (sourcePeopleModel.getCapContactModel().getContactType() == "Education Provider - Additional Contact") {
                sourcePeopleModel.getCapContactModel().setComponentName("Contact1");
            }
            aa.people.createCapContactWithAttribute(sourcePeopleModel.getCapContactModel());
        }
    }
}

function isMatchPeople(capContactScriptModel, capContactScriptModel2) {
    if (capContactScriptModel == null || capContactScriptModel2 == null) {
        return false;
    }
    var contactType1 = capContactScriptModel.getCapContactModel().getPeople().getContactType();
    var contactType2 = capContactScriptModel2.getCapContactModel().getPeople().getContactType();
    var firstName1 = capContactScriptModel.getCapContactModel().getPeople().getFirstName();
    var firstName2 = capContactScriptModel2.getCapContactModel().getPeople().getFirstName();
    var lastName1 = capContactScriptModel.getCapContactModel().getPeople().getLastName();
    var lastName2 = capContactScriptModel2.getCapContactModel().getPeople().getLastName();
    var fullName1 = capContactScriptModel.getCapContactModel().getPeople().getFullName();
    var fullName2 = capContactScriptModel2.getCapContactModel().getPeople().getFullName();
    if ((contactType1 == null && contactType2 != null) || (contactType1 != null && contactType2 == null)) {
        return false;
    }
    if (contactType1 != null && !contactType1.equals(contactType2)) {
        return false;
    }
    if ((firstName1 == null && firstName2 != null) || (firstName1 != null && firstName2 == null)) {
        return false;
    }
    if (firstName1 != null && !firstName1.equals(firstName2)) {
        return false;
    }
    if ((lastName1 == null && lastName2 != null) || (lastName1 != null && lastName2 == null)) {
        return false;
    }
    if (lastName1 != null && !lastName1.equals(lastName2)) {
        return false;
    }
    if ((fullName1 == null && fullName2 != null) || (fullName1 != null && fullName2 == null)) {
        return false;
    }
    if (fullName1 != null && !fullName1.equals(fullName2)) {
        return false;
    }
    return true;
}

function getPeople(capId) {
    var capPeopleArr = null;
    var s_result = aa.people.getCapContactByCapID(capId);
    if (s_result.getSuccess()) {
        capPeopleArr = s_result.getOutput();
        if (capPeopleArr == null || capPeopleArr.length == 0) {
            logDebug("WARNING: no People on this CAP:" + capId);
            capPeopleArr = null;
        }
    } else {
        logDebug("ERROR: Failed to People: " + s_result.getErrorMessage());
        capPeopleArr = null;
    }
    return capPeopleArr;
}

function copyOwner(srcCapId, targetCapId) {
    //1. Get Owners with source CAPID.
    var capOwners = getOwner(srcCapId);
    if (capOwners == null || capOwners.length == 0) {
        return;
    }
    //2. Get Owners with target CAPID.
    var targetOwners = getOwner(targetCapId);
    //3. Check to see which owner is matched in both source and target.
    for (var loopk in capOwners) {
        var sourceOwnerModel = capOwners[loopk];
        //3.1 Set target CAPID to source Owner.
        sourceOwnerModel.setCapID(targetCapId);
        var targetOwnerModel = null;
        //3.2 Check to see if sourceOwner exist.
        if (targetOwners != null && targetOwners.length > 0) {
            for (var loop2 in targetOwners) {
                if (isMatchOwner(sourceOwnerModel, targetOwners[loop2])) {
                    targetOwnerModel = targetOwners[loop2];
                    break;
                }
            }
        }
        //3.3 It is a matched owner model.
        if (targetOwnerModel != null) {
            //3.3.1 Copy information from source to target.
            aa.owner.copyCapOwnerModel(sourceOwnerModel, targetOwnerModel);
            //3.3.2 Edit owner with source owner information.
            aa.owner.updateDailyOwnerWithAPOAttribute(targetOwnerModel);
        }
        //3.4 It is new owner model.
        else {
            //3.4.1 Create new Owner.
            aa.owner.createCapOwnerWithAPOAttribute(sourceOwnerModel);
        }
    }
}

function isMatchOwner(ownerScriptModel1, ownerScriptModel2) {
    if (ownerScriptModel1 == null || ownerScriptModel2 == null) {
        return false;
    }
    var fullName1 = ownerScriptModel1.getOwnerFullName();
    var fullName2 = ownerScriptModel2.getOwnerFullName();
    if ((fullName1 == null && fullName2 != null) || (fullName1 != null && fullName2 == null)) {
        return false;
    }
    if (fullName1 != null && !fullName1.equals(fullName2)) {
        return false;
    }
    return true;
}

function getOwner(capId) {
    var capOwnerArr = null;
    var s_result = aa.owner.getOwnerByCapId(capId);
    if (s_result.getSuccess()) {
        capOwnerArr = s_result.getOutput();
        if (capOwnerArr == null || capOwnerArr.length == 0) {
            logDebug("WARNING: no Owner on this CAP:" + capId);
            capOwnerArr = null;
        }
    } else {
        logDebug("ERROR: Failed to Owner: " + s_result.getErrorMessage());
        capOwnerArr = null;
    }
    return capOwnerArr;
}

function copyCapCondition(srcCapId, targetCapId) {
    //1. Get Cap condition with source CAPID.
    var capConditions = getCapConditionByCapID(srcCapId);
    if (capConditions == null || capConditions.length == 0) {
        return;
    }
    //2. Get Cap condition with target CAPID.
    var targetCapConditions = getCapConditionByCapID(targetCapId);
    //3. Check to see which Cap condition is matched in both source and target.
    for (var loopk in capConditions) {
        var sourceCapCondition = capConditions[loopk];
        //3.1 Set target CAPID to source Cap condition.
        sourceCapCondition.setCapID(targetCapId);
        var targetCapCondition = null;
        //3.2 Check to see if source Cap condition exist in target CAP.
        if (targetCapConditions != null && targetCapConditions.length > 0) {
            for (var loop2 in targetCapConditions) {
                if (isMatchCapCondition(sourceCapCondition, targetCapConditions[loop2])) {
                    targetCapCondition = targetCapConditions[loop2];
                    break;
                }
            }
        }
        //3.3 It is a matched Cap condition model.
        if (targetCapCondition != null) {
            //3.3.1 Copy information from source to target.
            sourceCapCondition.setConditionNumber(targetCapCondition.getConditionNumber());
            //3.3.2 Edit Cap condition with source Cap condition information.
            aa.capCondition.editCapCondition(sourceCapCondition);
        }
        //3.4 It is new Cap condition model.
        else {
            //3.4.1 Create new Cap condition.
            aa.capCondition.createCapCondition(sourceCapCondition);
        }
    }
}

function isMatchCapCondition(capConditionScriptModel1, capConditionScriptModel2) {
    if (capConditionScriptModel1 == null || capConditionScriptModel2 == null) {
        return false;
    }
    var description1 = capConditionScriptModel1.getConditionDescription();
    var description2 = capConditionScriptModel2.getConditionDescription();
    if ((description1 == null && description2 != null) || (description1 != null && description2 == null)) {
        return false;
    }
    if (description1 != null && !description1.equals(description2)) {
        return false;
    }

    var conGroup1 = capConditionScriptModel1.getConditionGroup();
    var conGroup2 = capConditionScriptModel2.getConditionGroup();

    if ((conGroup1 == null && conGroup2 != null) || (conGroup1 != null && conGroup2 == null)) {
        return false;
    }
    if (conGroup1 != null && !conGroup1.equals(conGroup2)) {
        return false;
    }

    return true;
}

function getCapConditionByCapID(capId) {
    var capConditionScriptModels = null;

    var s_result = aa.capCondition.getCapConditions(capId);

    if (s_result.getSuccess()) {
        capConditionScriptModels = s_result.getOutput();

        if (capConditionScriptModels == null || capConditionScriptModels.length == 0) {
            logDebug("WARNING: no cap condition on this CAP:" + capId);
            capConditionScriptModels = null;
        }
    } else {
        logDebug("ERROR: Failed to get cap condition: " + s_result.getErrorMessage());
        capConditionScriptModels = null;
    }

    return capConditionScriptModels;
}

function copyAdditionalInfo(srcCapId, targetCapId) {
    //1. Get Additional Information with source CAPID.  (BValuatnScriptModel)
    var additionalInfo = getAdditionalInfo(srcCapId);

    if (additionalInfo == null) {
        return;
    }
    //2. Get CAP detail with source CAPID.
    var capDetail = getCapDetailByID(srcCapId);
    //3. Set target CAP ID to additional info.
    additionalInfo.setCapID(targetCapId);
    if (capDetail != null) {
        capDetail.setCapID(targetCapId);
    }
    //4. Edit or create additional infor for target CAP.
    aa.cap.editAddtInfo(capDetail, additionalInfo);
}

//Return BValuatnScriptModel for additional info.
function getAdditionalInfo(capId) {
    var bvaluatnScriptModel = null;
    var s_result = aa.cap.getBValuatn4AddtInfo(capId);
    if (s_result.getSuccess()) {
        bvaluatnScriptModel = s_result.getOutput();
        if (bvaluatnScriptModel == null) {
            logDebug("WARNING: no additional info on this CAP:" + capId);
            bvaluatnScriptModel = null;
        }
    } else {
        logDebug("ERROR: Failed to get additional info: " + s_result.getErrorMessage());
        bvaluatnScriptModel = null;
    }
    // Return bvaluatnScriptModel
    return bvaluatnScriptModel;
}

function getCapDetailByID(capId) {
    var capDetailScriptModel = null;
    var s_result = aa.cap.getCapDetail(capId);
    if (s_result.getSuccess()) {
        capDetailScriptModel = s_result.getOutput();
        if (capDetailScriptModel == null) {
            logDebug("WARNING: no cap detail on this CAP:" + capId);
            capDetailScriptModel = null;
        }
    } else {
        logDebug("ERROR: Failed to get cap detail: " + s_result.getErrorMessage());
        capDetailScriptModel = null;
    }
    // Return capDetailScriptModel
    return capDetailScriptModel;
}

function logDebug(dstr) {
    var vLevel = 1;
    if (arguments.length > 1) {
        vLevel = arguments[1];
    }
    if ((showDebug & vLevel) == vLevel || vLevel == 1) {
        debug += dstr + br;
    }
    if ((showDebug & vLevel) == vLevel) {
        aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), dstr);
    }
}

function getParentLicenseForRenewal(capId) {
    var relatedCapsResult = aa.cap.getProjectByChildCapID(capId, "Renewal", "");
    aa.print(relatedCapsResult);

    if (relatedCapsResult.getSuccess()) {
        var parentArray = relatedCapsResult.getOutput();

        if (parentArray.length) {
            var licenseCapId;
            for (var project in parentArray) {
                aa.print(parentArray[project]);
                var curProject = parentArray[project];
                licenseCapId = curProject.getProjectID();

                if (licenseCapId) {
                    return licenseCapId;
                }
            }
        } else {
            aa.print("**WARNING: GetParent found no parent license for this renewal");
            return false;
        }
    } else {
        aa.print("**WARNING: getting parent license:  " + relatedCapsResult.getErrorMessage());
        return false;
    }

    return false;
}

function editLookup(stdChoice, stdValue, stdDesc) {
    //check if stdChoice and stdValue already exist; if they do, update;
    var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice, stdValue);
    var bds;

    if (bizDomScriptResult.getSuccess()) {
        bds = bizDomScriptResult.getOutput();
    } else {
        logDebug("Std Choice(" + stdChoice + "," + stdValue + ") does not exist to edit, adding...");
        addLookup(stdChoice, stdValue, stdDesc);

        return false;
    }

    var bd = bds.getBizDomain();
    bd.setDescription(stdDesc);

    var editResult = aa.bizDomain.editBizDomain(bd);

    if (editResult.getSuccess()) {
        logDebug("Successfully edited Std Choice(" + stdChoice + "," + stdValue + ") = " + stdDesc);
        return true;
    } else {
        logDebug("**ERROR editing Std Choice " + editResult.getErrorMessage());
    }

    return false;
}

function copyContactsWithAddress(pFromCapId, pToCapId) {
    // Copies all contacts from pFromCapId to pToCapId and includes Contact Address objects

    var vToCapId;
    if (pToCapId == null) {
        vToCapId = capId;
    } else {
        vToCapId = pToCapId;
    }

    var capContactResult = aa.people.getCapContactByCapID(pFromCapId);
    var copied = 0;

    if (capContactResult.getSuccess()) {
        var Contacts = capContactResult.getOutput();

        for (var yy in Contacts) {
            var newContact = Contacts[yy].getCapContactModel();

            var addressList = aa.address.getContactAddressListByCapContact(newContact).getOutput();
            newContact.setCapID(vToCapId);
            aa.people.createCapContact(newContact);
            var newerPeople = newContact.getPeople();
            // contact address copying
            if (addressList) {
                for (var add in addressList) {
                    var transactionAddress = false;
                    var contactAddressModel = addressList[add].getContactAddressModel();
                    if (contactAddressModel.getEntityType() == "CAP_CONTACT") {
                        transactionAddress = true;
                        contactAddressModel.setEntityID(parseInt(newerPeople.getContactSeqNumber()));
                    }
                    // Commit if transaction contact address
                    if (transactionAddress) {
                        var newPK = new com.accela.orm.model.address.ContactAddressPKModel();
                        contactAddressModel.setContactAddressPK(newPK);
                        aa.address.createCapContactAddress(vToCapId, contactAddressModel);
                    }
                    // Commit if reference contact address
                    else {
                        // build model
                        var Xref = aa.address.createXRefContactAddressModel().getOutput();
                        Xref.setContactAddressModel(contactAddressModel);
                        Xref.setAddressID(addressList[add].getAddressID());
                        Xref.setEntityID(parseInt(newerPeople.getContactSeqNumber()));
                        Xref.setEntityType(contactAddressModel.getEntityType());
                        Xref.setCapID(vToCapId);
                        // commit address
                        aa.address.createXRefContactAddress(Xref.getXRefContactAddressModel());
                    }
                }
            }
            // end if

            copied++;
            logDebug("Copied contact from " + pFromCapId.getCustomID() + " to " + vToCapId.getCustomID());
        }
    } else {
        logMessage("**ERROR: Failed to get contacts: " + capContactResult.getErrorMessage());
        return false;
    }

    return copied;
}

function copyASITables(pFromCapId, pToCapId) {
    // Function dependencies on addASITable()
    // par3 is optional 0 based string array of table to ignore
    var itemCap = pFromCapId;

    var gm = aa.appSpecificTableScript.getAppSpecificTableGroupModel(itemCap).getOutput();
    var ta = gm.getTablesArray();
    var tai = ta.iterator();
    var ignoreArr = new Array();
    var limitCopy = false;
    if (arguments.length > 2) {
        ignoreArr = arguments[2];
        limitCopy = true;
    }

    while (tai.hasNext()) {
        var tsm = tai.next();

        var tempObject = new Array();
        var tempArray = new Array();
        var tn = tsm.getTableName() + "";
        var numrows = 0;

        //Check list
        if (limitCopy) {
            var ignore = false;
            for (var i = 0; i < ignoreArr.length; i++) {
                if (ignoreArr[i] == tn) {
                    ignore = true;
                    break;
                }
            }

            if (ignore) {
                continue;
            }
        }
        if (!tsm.rowIndex.isEmpty()) {
            var tsmfldi = tsm.getTableField().iterator();
            var tsmcoli = tsm.getColumns().iterator();
            var readOnlyi = tsm.getAppSpecificTableModel().getReadonlyField().iterator(); // get Readonly filed
            numrows = 1;

            while (tsmfldi.hasNext()) {
                // cycle through fields
                if (!tsmcoli.hasNext()) {
                    // cycle through columns
                    tsmcoli = tsm.getColumns().iterator();
                    tempArray.push(tempObject); // end of record
                    tempObject = new Array(); // clear the temp obj
                    numrows++;
                }
                var tcol = tsmcoli.next();
                var tval = tsmfldi.next();

                var readOnly = "N";

                if (readOnlyi.hasNext()) {
                    readOnly = readOnlyi.next();
                }

                var fieldInfo = new asiTableValObj(tcol.getColumnName(), tval, readOnly);
                tempObject[tcol.getColumnName()] = fieldInfo;
                //tempObject[tcol.getColumnName()] = tval;
            }

            tempArray.push(tempObject); // end of record
        }

        addASITable(tn, tempArray, pToCapId);
        logDebug("ASI Table Array : " + tn + " (" + numrows + " Rows)");
    }
}

function copyAppSpecificRenewal(AInfo, newCap) {
    // copy all App Specific info into new Cap, 1 optional parameter for ignoreArr
    var ignoreArr = new Array();
    var limitCopy = false;
    if (arguments.length > 2) {
        ignoreArr = arguments[2];
        limitCopy = true;
    }

    for (var asi in AInfo) {
        //Check list
        if (limitCopy) {
            var ignore = false;
            for (var i = 0; i < ignoreArr.length; i++) {
                if (ignoreArr[i] == asi) {
                    ignore = true;
                    logDebug("Skipping ASI Field: " + ignoreArr[i]);
                    break;
                }
            }

            if (ignore) {
                continue;
            }
        }
        //logDebug("Copying ASI Field: " + asi);
        editAppSpecific(asi, AInfo[asi], newCap);
    }
}