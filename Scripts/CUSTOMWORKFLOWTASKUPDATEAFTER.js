/*------------------------------------------------------------------------------------------------------/
| SVN $Id: WorkflowTaskUpdateAfter.js 6515 2012-03-16 18:15:38Z john.schomp $
| Program : WorkflowTaskUpdateAfter.js
| Event   : WorkflowTaskUpdateAfter
|
| Usage   : Master Script by Accela.  See accompanying documentation and release notes.
|
| Client  : N/A
| Action# : N/A
|
| Notes   :
|
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| START User Configurable Parameters
|
|     Only variables in the following section may be changed.  If any other section is modified, this
|     will no longer be considered a "Master" script and will not be supported in future releases.  If
|     changes are made, please add notes above.
/------------------------------------------------------------------------------------------------------*/
var controlString = "WorkflowTaskUpdateAfter"; 				// Standard choice for control
var preExecute = "PreExecuteForAfterEvents"				// Standard choice to execute first (for globals, etc)
var documentOnly = false;						// Document Only -- displays hierarchy of std choice steps

/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var SCRIPT_VERSION = 9.0;
var useCustomScriptFile = true;  // if true, use Events->Custom Script and Master Scripts, else use Events->Scripts->INCLUDES_*
var useSA = false;
var SA = null;
var SAScript = null;
var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE");
if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") {
	useSA = true;
	SA = bzr.getOutput().getDescription();
	bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT");
	if (bzr.getSuccess()) {
		SAScript = bzr.getOutput().getDescription();
	}
}

var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";
var doStdChoices = true; // compatibility default
var doScripts = false;
var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0;
if (bzr) {
	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE");
	doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT");
	doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
	var bvr3 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "USE_MASTER_INCLUDES");
	if (bvr3.getSuccess()) {if(bvr3.getOutput().getDescription() == "No") useCustomScriptFile = false}; 
}

if (SA) {
	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA,useCustomScriptFile));
	eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA,useCustomScriptFile));
	eval(getScriptText(SAScript, SA));
} else {
	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",null,useCustomScriptFile));
	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",null,useCustomScriptFile));
}

eval(getScriptText("INCLUDES_CUSTOM",null,useCustomScriptFile));  

if (documentOnly) {
	doStandardChoiceActions(controlString, false, 0);
	aa.env.setValue("ScriptReturnCode", "0");
	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");
	aa.abortScript();
}

var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", vEventName);

function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if (!servProvCode)  servProvCode = aa.getServiceProviderCode();
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

/*------------------------------------------------------------------------------------------------------/
| END Event Specific Variables
/------------------------------------------------------------------------------------------------------*/

if (preExecute.length) doStandardChoiceActions(preExecute,true,0); 	// run Pre-execution code

logGlobals(AInfo);

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/
//
//  Get the Standard choices entry we'll use for this App type
//  Then, get the action/criteria pairs for this app
//

//if (doStdChoices) doStandardChoiceActions(controlString,true,0);


//
//  Next, execute and scripts that are associated to the record type
//

//if (doScripts) doScriptActions();

var SetId = aa.env.getValue("SetID");
var set = aa.set.getSetByPK(SetId).getOutput();

logDebug("Start of Job");
logDebug("Processing Set: " + SetId);
var startTime = startDate.getTime();
var emailText = "";

var success = false;
showDebug = true;
showMessage = true;

   var capCount = 0;
    var setStatus = set.getSetStatus();

    var setDetailScriptModel = aa.set.getSetDetailsScriptModel().getOutput();
    setDetailScriptModel.setSetID(SetId);
    var memberList = aa.set.getSetMembers(setDetailScriptModel).getOutput();
    logDebug("INFO: Number of records in Set: " + memberList.size() + ".");
    emailText += "INFO: Number of records in Set: " + memberList.size() + ".";
    var sysDate = aa.date.getCurrentDate();
	logDebug("try 2");
	
	
    for (var index = 0; index < memberList.size(); index++) {
        var setMember = memberList.get(index);
        var capId = null;
        var altID = "";
        var cap = null;
        var capIdObj = aa.cap.getCapID(setMember.getID1(), setMember.getID2(), setMember.getID3());

			aa.print("success: "+ capIdObj.getSuccess());
       
            capId = capIdObj.getOutput();
            capId = aa.cap.getCapID(capId.getID1(), capId.getID2(), capId.getID3()).getOutput();
            altID = capId.getCustomID();
            cap = aa.cap.getCap(capId).getOutput();
			aa.print("capId: " + capId + " altid: " + altID + " cap: " +cap);
            var capDetailObjResult = aa.cap.getCapDetail(capId);
            capDetail = capDetailObjResult.getOutput();
invoiceFeeLocal("SPRINKDOWN","final");

	}//delete

//invoiceFeeLocal("SPRINKDOWN","final");

//@ts-check
/**
 * Invoices all assessed fees with fee code of fcode and fee period of fperiod.
 * @param {string} fcode Fee code of the fee to invoice.
 * @param {string} fperiod Fee period of the fee to invoice.
 * @returns {boolean} Returns true if the function finds the assessed. Otherwise, returns false.
 */
function invoiceFeeLocal(fcode, fperiod) {
	//invoices all assessed fees having fcode and fperiod
	// SR5085 LL
	if (typeof capId === typeof undefined) {
        logDebug("'invoiceFee' requires global 'capId' be defined.");
        return false;
    }
	// REMOVE check on type 'string'. Replace with undefined check.
	if (typeof fcode === typeof undefined) {
        logDebug("'invoiceFee' parameter 'fcode' must be present.");
        return false;
    }

	if (typeof feeSeqList === typeof undefined) {
        feeSeqList = new Array();
    }
	if (typeof paymentPeriodList === typeof undefined) {
		paymentPeriodList = new Array();
    }

	var feeFound = false;
	aa.print("capId: " +capId + " fcode: " +fcode + " fperiod: " + fperiod);
	var getFeeResult = aa.finance.getFeeItemsByFeeCodeAndPeriod(capId, fcode, fperiod, "NEW");
	if (getFeeResult.getSuccess()) {
		var feeList = getFeeResult.getOutput();
		for (var feeNum in feeList)
			if (feeList[feeNum].getFeeitemStatus().equals("NEW")) {
				var feeSeq = feeList[feeNum].getFeeSeqNbr();
				feeSeqList.push(feeSeq);
				paymentPeriodList.push(fperiod);
				feeFound = true;
				logDebug("Assessed fee " + fcode + " found and tagged for invoicing");
			}
	} else {
		logDebug("**ERROR: getting fee items (" + fcode + "): " + getFeeResult.getErrorMessage())
	}
	return feeFound;
} 


// this controller replaces lookups for STANDARD_SOLUTIONS and CONFIGURABLE_RULESETS
//doConfigurableScriptActions();

//
// Check for invoicing of fees
//
aa.print("line204:  " +feeSeqList.length);
aa.print("feeSeqList:"+ feeSeqList);
aa.print("paymentPeriodList: " +paymentPeriodList);
if (feeSeqList.length)
	{
	invoiceResult = aa.finance.createInvoice(capId, feeSeqList, paymentPeriodList);
	aa.print("invoiceResult.getSuccess():" +invoiceResult.getSuccess());
	if (invoiceResult.getSuccess())
		logDebug("Invoicing assessed fee items is successful.");
	else
		logDebug("**ERROR: Invoicing the fee items assessed to app # " + capIDString + " was not successful.  Reason: " +  invoiceResult.getErrorMessage());
	}

/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

if (debug.indexOf("**ERROR") > 0)
	{
	aa.env.setValue("ScriptReturnCode", "1");
	aa.env.setValue("ScriptReturnMessage", debug);
	}
else
	{
	aa.env.setValue("ScriptReturnCode", "0");
	if (showMessage) aa.env.setValue("ScriptReturnMessage", message);
	if (showDebug) 	aa.env.setValue("ScriptReturnMessage", debug);
	}


/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/