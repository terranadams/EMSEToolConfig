/*------------------------------------------------------------------------------------------------------/
| updateUserBillingRatesCSV.js
|   
|   
|   
/------------------------------------------------------------------------------------------------------*/
var SCRIPT_VERSION = "3.0";
var BATCH_NAME = "UpdateUserBillingRatesCSV";
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, true));
eval(getScriptText("INCLUDES_ACCELA_GLOBALS", null, true));
eval(getScriptText("INCLUDES_CUSTOM", null, true));
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

logMessage = function(etype, edesc) {
	aa.eventLog.createEventLog(etype, "Batch Process", BATCH_NAME, sysDate, sysDate, "", edesc, batchJobID);
	aa.print(etype + " : " + edesc);
	emailText += etype + " : " + edesc + "\n";
}


var inSeparator = ",";


var showDebug = true; // Set to true to see debug messages
var maxSeconds = 5 * 60; // number of seconds allowed for batch processing,
// usually < 5*60

var startDate = new Date();
var timeExpired = false;
var emailText = "";
var startTime = startDate.getTime(); // Start timer
var sysDate = aa.date.getCurrentDate();
var batchJobID = aa.batchJob.getJobID().getOutput();
var systemUserObj = aa.person.getUser("ADMIN").getOutput();
var servProvCode = aa.getServiceProviderCode();

aa.print("Start of Job");
processFile();


function runIt(inSQL)
	{
	try {
		var conn = aa.db.getConnection();
		var sStmt = conn.prepareStatement(inSQL);
		aa.print("executing : " + inSQL);
	//	sStmt.execute();
		} catch (err) {
			aa.print(err.message);
		}
	
	}

function processFile()
{
var csvFile = "https://cpc-m-adapt-02.sfgov.org/Textfiles/Staff_fy_SQL.csv";
var getout = aa.httpClient.get(csvFile);
if (getout.getSuccess()) {
   var docString = getout.getOutput();
   }
else
  { logMessage("**ERROR: communicating with it");
  }

// process file
if (docString)
	{	
	var lines = docString.split('\n');
	for(var i = 1; i < lines.length; i++)
		{
		runIt(lines[i]);
		//aa.print(lines[i].substr(0, lines[i].length() - 1));
		}
	}
}