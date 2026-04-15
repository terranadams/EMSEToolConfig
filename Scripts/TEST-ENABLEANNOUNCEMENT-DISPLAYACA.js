/* 
Batch Script
*/
//
// Header
//

aa.env.setValue("showDebug", "Y");
aa.env.setValue("BatchJobName", "Test Enable Announcement ACA");

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
    aa.print("Batch Job " + batchJobName + " Job ID is " + batchJobID);
}
else
    aa.print("Batch job ID not found " + batchJobResult.getErrorMessage());
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
aa.print("Today's Date:" + dTodaysDate);


/*----------------------------------------------------------------------------------------------------/
|
| End: BATCH PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
var startDate = new Date();
var timeExpired = false;
var startTime = startDate.getTime();   // Start timer
var systemUserObj = aa.person.getUser("ADMIN").getOutput(); //

aa.print("Start of Job");
 
aa.print("inMain");
        var noteTemplate = "TESTENABLEANNOUNCEDISPLAYACA";
        var eParams = aa.util.newHashtable();
 
            eParams.put("$$recordAlias$$", "testing Notice from Batch Script fun from Batch job");
            sendNotificationLocal("noreply@accela.com", "esheridan@accela.com", "", noteTemplate, eParams, null);


  aa.print("********************************");




 function sendNotificationLocal(emailFrom,emailTo,emailCC,templateName,params,reportFile)

{
	aa.print("in send");
	 var myCapId = "24CAP-00000021"; 
 
 var itemCap = aa.cap.getCapID(myCapId).getOutput(); 
 
	var id1 = itemCap.ID1;
 	var id2 = itemCap.ID2;
 	var id3 = itemCap.ID3;

	var capIDScriptModel = aa.cap.createCapIDScriptModel(id1, id2, id3);

	var result = null;
	result = aa.document.sendEmailAndSaveAsDocument(emailFrom, emailTo, emailCC, templateName, params, capIDScriptModel, reportFile);
	if(result.getSuccess())

	{
		aa.print("Sent email successfully!");
		return true;
	}

	else

	{
		aa.print("Failed to send mail. - " + result.getErrorType());
		return false;
	}
}