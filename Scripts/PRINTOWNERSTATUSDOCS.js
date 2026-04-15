var getReport = aa.reportManager.hasPermission(reportName, reportUser);
if(getReport.getOutput().booleanValue())
{
    var reportResult = aa.reportManager.getReportResult(report);
    
    if(reportResult)
    {
        //Get report output
        reportResult = reportResult.getOutput();
        //comment(reportResult.getName());
        var reportFile = aa.reportManager.storeReportToDisk(reportResult);
        reportFile = reportFile.getOutput();
        
        //Upload to FTP server
        filehandle = aa.io.File(reportFile);
        reportFile_length = reportFile.length();
        var ftp_results = aa.util.ftpUpload(ftpsite, "21", ftplogin, ftppassword, ftppath, filehandle);
        
        if (ftp_results.getSuccess()) {
            aa.print("Successfully uploaded file to FTP site: "+ftp_results.getSuccess());
            return true;
        } else {
            comment("FTP upload error: "+ftp_results.getErrorMessage());
            return false;
        }
    }
}
else {
    }
}
//}