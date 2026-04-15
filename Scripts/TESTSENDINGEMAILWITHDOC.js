/* 
Batch Script
*/
//
// Header
//

aa.env.setValue("showDebug", "Y");
aa.env.setValue("BatchJobName", "testemail);
aa.env.setValue("sCapGroup", "Licenses");



//
// Body
//
/*------------------------------------------------------------------------------------------------------/
| Program: All Caps WFtask AR issue Fix.js  Trigger: Batch
| 
| Version 1.0 - Base Version. 
| Note: FA 07-09-2014. Application Review/Amendment Review issue fix. NYELS-50508
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
|
| START: USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
emailText = "";
maxSeconds = 4.5 * 60;                      // number of seconds allowed for batch processing, usually < 5*60
message = "";
br = "<br>";
var debug = "";        // Debug String
/*------------------------------------------------------------------------------------------------------/
| BEGIN Includes
/------------------------------------------------------------------------------------------------------*/
SCRIPT_VERSION = 2.0
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));
eval(getScriptText("INCLUDES_BATCH"));
eval(getScriptText("INCLUDES_CUSTOM"));

function getScriptText(vScriptName) {
    vScriptName = vScriptName.toUpperCase();
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
    return emseScript.getScriptText() + "";
}
/*------------------------------------------------------------------------------------------------------/
|
| END: USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
showDebug = aa.env.getValue("showDebug").substring(0, 1).toUpperCase().equals("Y");
sysDate = aa.date.getCurrentDate();
batchJobResult = aa.batchJob.getJobID()
batchJobName = "" + aa.env.getValue("BatchJobName");
wfObjArray = null;

batchJobID = 0;
if (batchJobResult.getSuccess()) {
    batchJobID = batchJobResult.getOutput();
    logDebug("Batch Job " + batchJobName + " Job ID is " + batchJobID);
}
else
    logDebug("Batch job ID not found " + batchJobResult.getErrorMessage());
/*----------------------------------------------------------------------------------------------------/
|
| Start: BATCH PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
var dTodaysDate = month + "/" + day + "/" + year;
logDebug("Today's Date:" + dTodaysDate);
var sCapGroup = aa.env.getValue("sCapGroup");                 // cap Cap Group


var useAppSpecificGroupName = false;
/*----------------------------------------------------------------------------------------------------/
|
| End: BATCH PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
var startDate = new Date();
var timeExpired = false;
var startTime = startDate.getTime();   // Start timer
var systemUserObj = aa.person.getUser("ADMIN").getOutput(); //

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/
logDebug("Start of Job");
if (!timeExpired) mainProcess();
logDebug("End of Job: Elapsed Time : " + elapsed() + " Seconds");
/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/
function mainProcess() {
    var capFilterType = 0
    var capCount = 0;
    var capIDlst = "";
    //build empty cap list

var myCapId = "DUB21-00000-0000D"; 
var tmpID = aa.cap.getCapID(myCapId).getOutput(); 
if(tmpID != null){aa.env.setValue("PermitId1",tmpID.getID1()); 	aa.env.setValue("PermitId2",tmpID.getID2()); 	
aa.env.setValue("PermitId3",tmpID.getID3());} 
aa.env.setValue("CurrentUserID",myUserId); 
//getCapDocumentList(com.accela.aa.aamain.cap.CapIDModel capID, java.lang.String currentUserID)
var docResult = aa.document.getCapDocumentList(capId, "Admin");	
var docOutput= docResult.getOutput();
aa.print("result: " + docOutput);
thisDoc=docOutput[0];
aa.print(thisDoc);

aa.document.downloadFile2Disk(thisDoc, "fire", "admin", "Adm1n10", true);

var toDisk=aa.document.downloadFile2Disk(thisDoc, "fire", "admin", "Adm1n10", true);

aa.print("toDisk: "+toDisk.getOutput());

var emailParams = aa.util.newHashtable();
        addParameter(emailParams, "$$altID$$", cap.getCapModel().getAltID());

var files = new Array();
files[0]=toDisk.getOutput();
//files[0]="";
aa.print("file"+ files[0]);

aa.document.sendEmailByTemplateName("noreply@accela.com", "esheridan@accela.com", "", "sendEmailFromBatch", emailParams, files);


    logDebug("********************************");
    logDebug("Total CAPS processed: " + capCount);
    logDebug("All CAPS processed list: " + capIDlst);
}