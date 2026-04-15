var capIdparam = "24CAP-00000033";
var capId=aa.cap.getCapID(capIdparam).getOutput();
var vDeletRecordResult= aa.cap.removeRecord(capId);
aa.print("result: " + vDeletRecordResult);