var reportName =  "testRunAdhocWork";
var templateParameters= aa.util.newHashtable();
templateParameters.put("$$altID$$", capIDString);
var reportParameters= aa.util.newHashMap();
reportParameters.put("RECORD_ID", capIDString); //this works
var emailTemplate="RUNREPORTASYNCHGENERICTEMPLATE";
//runReportAndSendAsyncLocal(theReport, "FIRE", capId, reportParameters, "noreply@accela.com", "esheridan@accela.com",emailTemplate, templateParameters, "esheridan@accela.com");


 
var debug = "";
var error = "";
var br = "<BR/>";
var systemMailFrom = "noreply@accela.com";



// Main Function to send report
		var reportResult = runReport(reportName, reportParameters, "Fire");
		var reportFile = aa.reportManager.storeReportToDisk(reportResult);
		reportFile = reportFile.getOutput();
		var fileStream = aa.io.FileInputStream(reportFile);
		var reportDocument = createNewDocumentFromFileStreamGeneric(fileStream, "testAttach", "Fire", "Fire", "Correspondence", "application/pdf");
	aa.sendMail(systemMailFrom, "esheridan@accela.com", "", "createdDocModel.getDocStatus(): " +fileStream +  " ended", reportDocument + " pop dcm withFS");

function createNewDocumentFromFileStreamGeneric(fileStream, fileName, module, docGroup, docCategory, docType) {
  /*
   * returns a document model and saves it in document tab from Filestream
   * with given fileName and Group/Category
   */
   /* Pass Doc group and category as null to save them as blank */
 try {
   var documentContentModel = aa.document.newDocumentContentModel().getOutput();
   documentContentModel.setDocInputStream(fileStream);
   var documentModel = aa.document.newDocumentModel().getOutput();
   documentModel.setDocumentContent(documentContentModel);
   documentModel.setServiceProviderCode(aa.getServiceProviderCode());
   documentModel.setCapID(capId);
   documentModel.setEntityID(capId);
   documentModel.setModuleName(module); /* Module */
   documentModel.setSourceName("ADS"); /* EDMS */
   documentModel.setRecStatus("A");
   documentModel.setDocGroup(docGroup); /* Document Group */
   documentModel.setDocCategory(docCategory); /* Category */
   documentModel.setFileName(fileName);
   documentModel.setDocType(docType);
   documentModel.setEntityType("CAP");
  var docResult = aa.document.createDocument(documentModel);
  if (docResult.getSuccess()) {
    var createdDocModel = docResult.getOutput();
    if (createdDocModel != null && createdDocModel.getDocStatus() != null) {
      var updatedDocStatus = "Uploaded";
      var createdBy = currentUserID;
      createdDocModel.setDocStatus(updatedDocStatus);
      createdDocModel.setFileUpLoadBy(createdBy);
      var updateDocResult = aa.document.updateDocument(createdDocModel);
      if (updateDocResult.getSuccess()) {
        logDebug("Successfully updated document review status: "
          + updatedDocStatus);
      } else {
        logDebug("Failed to update document. "
          + updateDocResult.getErrorMessage());
      }
    }
    return createdDocModel;
  } else {
    logDebug("Failed to generate doc: " + docResult.getErrorMessage());
  }
}
   catch(err){
      logDebug("ERROR on custom function createNewDocumentFromFileStreamGeneric(). Error: " + err);
  }
}//END createNewDocumentFromFileStreamGeneric




function runReport(aaReportName,parameters,rModule) {
   var reportName = aaReportName;
	 
   report = aa.reportManager.getReportInfoModelByName(reportName);
   report = report.getOutput();
 
   report.setModule(rModule);
   report.setCapId(capId);

   report.setReportParameters(parameters);

   var permit = aa.reportManager.hasPermission(reportName,currentUserID);

   if(permit.getOutput().booleanValue()) {
	  var reportResult = aa.reportManager.getReportResult(report);
	
	  if(reportResult) {
		reportResult = reportResult.getOutput();
		logMessage("Report Result: "+ reportResult);
		return reportResult;
	  } else {
		logMessage("Unable to run report: "+ reportName + " for Admin" + systemUserObj);
		return false;
	  }
   } else {
		logMessage("No permission to report: "+ reportName + " for Admin" + systemUserObj);
		return false;
   }
}

function handleEnvParamters() {
	if(servProvCode == null) servProvCode = "";	
	if(capIDString == null) capIDString = "";
	if(capId == null) capId = "";
	if(reportName == null) reportName = "";
	if(module == null) module = "";
	if(reportUser == null) reportUser = "";
	if(errorEmailTo == null) errorEmailTo = "";
	if(debugEmailTo == null) debugEmailTo = "";
	if(emailFrom == null) emailFrom = "";
	if(emailTo == null) emailTo = "";
	if(emailTemplate == null) emailTemplate = "";
}

function logDebug(dstr) {
	debug += dstr + br;	
}

function logError(dstr) {
	error += dstr + br;
	logDebug(dstr);
}

function printEnv() {
    //Log All Environmental Variables as  globals
    var params = aa.env.getParamValues();
    var keys =  params.keys();
    var key = null;
    while(keys.hasMoreElements())
    {
     key = keys.nextElement();
     eval("var " + key + " = aa.env.getValue(\"" + key + "\");");
     logDebug(key + " = " + aa.env.getValue(key));
    }
}

function convertStringToHashMap(theString) {
    var retObj = aa.util.newHashMap();
    theString = theString.replace(/^\{|\}$/g,'').split(',');
    for(var i=0,cur,pair;cur=theString[i];i++){
        pair = cur.split('=');
        var key = pair[0].trim().toString()
        if (pair[1]) var val = pair[1].toString(); else val = "";
        retObj.put(key,val);
    }
    return retObj;
}

function convertStringToHashTable(theString) {
    var retObj = aa.util.newHashtable();
    theString = theString.replace(/^\{|\}$/g,'').split(',');
    for(var i=0,cur,pair;cur=theString[i];i++){
        pair = cur.split('=');
        var key = pair[0].trim().toString()
        if (pair[1]) var val = pair[1].toString(); else val = "";
        retObj.put(key,val);
    }
    return retObj;
}

function matches(eVal,argList) {
   for (var i=1; i<arguments.length;i++)
   	if (arguments[i] == eVal)
   		return true;

}

function explore(objExplore) {
    aa.print("Methods:")
    for (x in objExplore) {
        if (typeof(objExplore[x]) == "function") {
          //aa.print("<font color=blue><u><b>" + x + "</b></u></font> ");
            aa.print("   " + objExplore[x] + "<br>");
        }
    }
    aa.print("");
    aa.print("Properties:")
    for (x in objExplore) {
        if (typeof(objExplore[x]) != "function") aa.print("  <b> " + x + ": </b> " + objExplore[x]);
    }
}