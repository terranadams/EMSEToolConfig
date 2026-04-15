try {

 

    if (contactType != "Refundee") {

        logDebug("Begin Test");

 

        // @ts-ignore

        var ccm = ContactObj;

       

        var vFirstName = ccm.getPeople().getFirstName();

        var vMiddleName = ccm.getPeople().getMiddleName();

        var vLastName = ccm.getPeople().getLastName();

        var vBusinessName = ccm.getPeople().getBusinessName();

        var vFullName = ccm.getPeople().getFullName();

 

        //Find refundee Mailing Address

        // @ts-ignore

        var vAddressList = ContactObj.getPeople().getContactAddressList();

 

        var exploreResult1 = exploreObject(vAddressList);

        logDebug("getContactAddressList(): " + vAddressList);

        logDebug("getContactAddressList() Explore Results: " + exploreResult1);

 

        logDebug("");

        // @ts-ignore

        var addressList2 = aa.address.getContactAddressListByCapContact(ContactObj)//.getOutput();

       

        var exploreResult2 = exploreObject(addressList2);

        logDebug("getContactAddressListByCapContact(): " + addressList2);

        logDebug("getContactAddressListByCapContact() Explore Results: " + exploreResult2);

 

        logDebug("");

 

        var exploreResult3 = exploreObject(addressList2.getOutput());

        logDebug(addressList2.getOutput());

        logDebug(exploreResult3);

 

        logDebug("");

 

        logDebug("Addresslist.length: " + addressList2.getOutput().length);

        logDebug("addressList2.getOutput()[0]: " + addressList2.getOutput()[0]);

 

        logDebug("");

 

        logDebug("vFirstName: " + vFirstName);

        logDebug("vMiddleName: " + vMiddleName);

        logDebug("vLastName: " + vLastName);

        logDebug("vBusinessName: " + vBusinessName);

        logDebug("vFullName: " + vFullName);

 

    }

 

} catch (err) {

    //dliDebug(capId.getCustomID() + ' ' + " CAB:~!~!~!~: " + err.message, "SEVERE", "", false, "");

    logDebug(debug + ":" + err)

}

 

function exploreObject(objExplore) {

    var rtnString = "";

 

    rtnString = "Methods: ";

    for (var x in objExplore) {

        if (typeof (objExplore[x]) == "function")

             rtnString = rtnString + "   " + x;

    }

 

    rtnString = rtnString + "   ";

    rtnString = rtnString + "Properties: ";

    for (var y in objExplore) {

        if (typeof (objExplore[y]) != "function")

            rtnString = rtnString + "   " + y + " = " + objExplore[y];

    }

 

    return rtnString;

}