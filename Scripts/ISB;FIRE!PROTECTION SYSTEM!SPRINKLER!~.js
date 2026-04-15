var startDate = new Date();

aa.print("script executed: "+ startDate);
logDebug("script executed: "+ startDate);
var FROM = "noreply@accela.com";
		var TO = "esheridan@accela.com";
		var SUBJECT = "isb CAPID:" + capId + "startDate:" + startDate;
		var BODY_TEXT = "Parent CapId: " + parentCapId + " " + debug;
		aa.sendMail(FROM, TO, "", SUBJECT , BODY_TEXT);

showDebug=true;

comment("balance is due: " + balanceDue);
logDebug("you owe Money logDebug before If: " + balanceDue);
logDebug("feeBalance: " +feeBalanceLocal("FS009") );

if(balanceDue > 0){

//cancel=true;
showDebug=true;

logDebug("you owe Money logDebug after If: " + balanceDue);

}

function feeBalanceLocal(feestr) {
	// Searches payment fee items and returns the unpaid balance of a fee item
	// Sums fee items if more than one exists.  Optional second parameter fee schedule
	var amtFee = 0;
	var amtPaid = 0;
	var feeSch;

	if (arguments.length == 2)
		feeSch = arguments[1];

	var feeResult = aa.fee.getFeeItems(capId);
	if (feeResult.getSuccess()) {
		var feeObjArr = feeResult.getOutput();
	} else {
		logDebug("**ERROR: getting fee items: " + capContResult.getErrorMessage());
		return false
	}

	for (ff in feeObjArr){
		if ((!feestr || feestr.equals(feeObjArr[ff].getFeeCod())) && (!feeSch || feeSch.equals(feeObjArr[ff].getF4FeeItemModel().getFeeSchudle()))) {
			amtFee += feeObjArr[ff].getFee();
			aa.print("feeObjArr[" + ff + "]" + " getFee= " + feeObjArr[ff].getFee() + " totalAmtFee: " + amtFee);
			var exploreFeeObj=feeObjArr[ff];
				aa.print("**** feeObjofFF********");
				exploreLocal(exploreFeeObj);
			var pfResult = aa.finance.getPaymentFeeItems(capId, null);
			if (pfResult.getSuccess()) {
				var pfObj = pfResult.getOutput();
				for (ij in pfObj){
					var thisPfObj=pfObj[ij];
					aa.print("**** thisPfObj********");
					exploreLocal(thisPfObj);
					if (feeObjArr[ff].getFeeSeqNbr() == pfObj[ij].getFeeSeqNbr())
				amtPaid += pfObj[ij].getFeeAllocation();
			aa.print("pfObjfeeAllocation[" + ij + "]= " + pfObj[ij].getFeeAllocation() + " TotalFeeAllocation= " + amtPaid);
			
			}
			}
		}
	}
	return amtFee - amtPaid;
}

function exploreLocal(objExplore){

    aa.print("Properties:")
    for (x in objExplore) {
        if (typeof(objExplore[x]) != "function") aa.print("  <b> " + x + ": </b> " + objExplore[x]);
    }
}