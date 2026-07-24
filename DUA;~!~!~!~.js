if (matches(currentUserID, "ADMIN", "KRICE", "WSTENERSON", "BYRNE")) { showMessage = true; showDebug = true; }

logDebug('|==========================================DUA Event started =================================================|');

aa.print('|==========================================DUA Event started =================================================|');

 

try {

    /*  Byrne Item 22 - Documents SCHOOL EXEMPTION LETTER and SCHOOL IMPACT FEE CREDIT  */

    if (appMatch("Building/*/*/*")) {

        if (isTaskStatus("Reviewer Routing", "Assign to Reviewers") || isTaskStatus("Reviewer Routing", "Assign Reviewers")) {

            if (findCapDocumentByType(capId, ["School Exemption Letter", "School Impact Fee Credit"])) {

                var docList = "";

                var documentList = aa.env.getValue("DocumentModelList");

                var hasDocument = false;

 

                if (!documentList) {

                    ;//none

                }

                else {

                    for (var counter = 0; counter < documentList.size(); counter++) {

                        var doc = documentList.get(counter);

 

                        if (String(doc.getDocCategory()).trim().equalsIgnoreCase(String("School Exemption Letter")) || String(doc.getDocCategory()).trim().equalsIgnoreCase(String("School Impact Fee Credit"))) {

                            //if(matches(isTaskActive("School District Impact Fee Review","BLD_ADHOC"),undefined,"undefined",null,"null"))

                            if (!checkAdHocTaskCustom("School District Impact Fee Review")) {

                                addAdHocTask("BLD_ADHOC", "School District Impact Fee Review", "", "PMILLER");

                                editTaskDueDate("School District Impact Fee Review", dateAdd(null, 7), "BLD_ADHOC");

                            }

 

                            break;

                        }

                    }

                }

            }

        }

    }

    /*  Byrne Item 22 - End  */

}

catch (e) {

    logDebug("ERROR DUA~!~!~!~ Item 22: " + e + ", " + e.lineNumber + ", " + e.message + ", " + e.stack + ", " + e.fileName);

    aa.print("ERROR DUA~!~!~!~ Item 22: " + e + ", " + e.lineNumber + ", " + e.message + ", " + e.stack + ", " + e.fileName);

}

 

//10/11/2024 - Byrne Item 18 - Jose Yanez - Conditionally Show/Hide documents based on record type, Doc type and S119 status

try {

    checkDocumentsAndApplyACAPermissionsSingle(capId);

}

catch (e) {

    logDebug("ERROR DUA;~!~!~!~: ITEM 18 " + e + ", " + e.lineNumber + ", " + e.message + ", " + e.stack + ", " + e.fileName);

    aa.print("ERROR DUA;~!~!~!~: ITEM 18 " + e + ", " + e.lineNumber + ", " + e.message + ", " + e.stack + ", " + e.fileName);

}

//Byrne Item 18 Ends

 

var thisSysDate = aa.date.getCurrentDate();

var thisSysDateMMDDYYYY = dateFormatted(thisSysDate.getMonth(), thisSysDate.getDayOfMonth(), thisSysDate.getYear(), "");

aa.print("DUA;~!~!~!~: " + thisSysDateMMDDYYYY + ":" + thisSysDate.getHourOfDay() + ":" + thisSysDate.getMinute() + ":" + thisSysDate.getSecond());

logDebug("DUA;~!~!~!~: " + thisSysDateMMDDYYYY + ":" + thisSysDate.getHourOfDay() + ":" + thisSysDate.getMinute() + ":" + thisSysDate.getSecond());

 

var group = appTypeArray[0].toUpperCase(),

    type = appTypeArray[1].toUpperCase(),

    subtype = appTypeArray[2].toUpperCase(),

    category = appTypeArray[3].toUpperCase();

 

 

var $utils = bs.utils;

 

if ($utils.accela.matchARecordType(["PLANNING/*/*/*"], appTypeString)) {

    //bs.emse.revisionsSubmitted_62();

    kr_SendEmailForDocUploadCLOS();

 

    if ($utils.accela.matchARecordType(["Planning/Application/Bond Surety/NA", "Planning/Application/Sub Bond/NA", "Planning/Special Request/Time Extension/NA"], appTypeString)) {

        SendEmailForDocUpload();

    }

 

    if (!Dpr.isProject(capId) || !Dpr.projectExists(Dpr.getAdminUser(), capId)) {

        DocUploadedPlnScript_62();

    }

}

 