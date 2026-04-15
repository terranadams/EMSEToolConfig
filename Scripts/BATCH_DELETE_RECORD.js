var capId = aa.cap.getCapID("25CAP-00000007").getOutput();
aa.print("capId Class: " +capId.getClass());
//var deletRecordResult=aa.cap.removeRecord(capId);
//aa.print("Result: " +deletRecordResult.getSuccess());
aa.cap.removeRecord(capId);