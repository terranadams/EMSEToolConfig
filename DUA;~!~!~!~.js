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
