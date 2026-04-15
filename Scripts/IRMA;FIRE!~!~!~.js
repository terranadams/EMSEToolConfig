showDebug=true;
logDebug("in modify");
     aa.print("hello");

        inspResultObj = aa.inspection.getInspections(capId);
        inspList = inspResultObj.getOutput();
        for (xx in inspList){
		thisInspection= inspList[xx];
		preStatus=thisInspection.getInspectionStatus();
        aa.print("preStatus:"+ preStatus);
        thisInspection.setInspectionStatus("Awaiting PaymII");
        aa.inspection.editInspection(thisInspection);
		postStatus=thisInspection.getInspectionStatus();
 aa.print("postStatus:"+ postStatus);

		}