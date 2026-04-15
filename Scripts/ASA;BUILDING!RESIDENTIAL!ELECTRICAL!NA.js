//1. Retrieve the selected type of work (custom field) and if it is Alteration output message comment
    var typeOfWork =  getAppSpecific("Type of Work");
    logDebug("Type of Work: " + typeOfWork);
    
    if (typeOfWork == "Alteration"){
        //logDebug("Inside if statement");
        
        //Display message to user
        showMessage = true;

        comment("Check record location for historic district");

    }

//Add condition and apply condition type and name 

addStdCondition("Building Permit", "Utility Locate" );