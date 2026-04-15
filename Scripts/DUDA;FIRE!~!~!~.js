showDebug=true;
for (i in aa.env) {aa.print("method: " + i);}

aa.print("Doc Model: " + documentModel);	


aa.print("doc# : " +documentModel.getDocumentNo());
var downLoadDir=aa.document.downloadFile2Disk(documentModel, "FIRE", "", "", true);
aa.print("downLoadDir: " + downLoadDir.getOutput());