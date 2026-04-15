showMessage = true;
showDebug = true;

var vDocumentModelArray = aa.env.getValue("DocumentModelList");

if (vDocumentModelArray.size() > 0) {
    for (var index = 0; index < vDocumentModelArray.size(); index++) {

        var fileName = String(vDocumentModelArray.get(index).getFileName());

        // Only shorten if the filename is longer than 120 characters
        if (fileName.length > 120) {

            // Extract the extension from the filename
            var extensionIndex = fileName.lastIndexOf(".");
            var extension = "";
            var baseName = fileName;

            if (extensionIndex > -1) {
                extension = fileName.substring(extensionIndex); // includes the "."
                baseName = fileName.substring(0, extensionIndex);
            }

            // Shorten the base name if necessary to ensure full fileName <= 120 chars
            var maxBaseLength = 120 - extension.length;
            if (baseName.length > maxBaseLength) {
                baseName = baseName.substring(0, maxBaseLength);
            }

            // Recombine the shortened base name with the extension
            var newFileName = baseName + extension;

            logDebug("Filename over 120 characters detected. Renaming file to: " + newFileName);

            var documentModel = vDocumentModelArray.get(index);
            documentModel.setFileName(newFileName);

            vSaveResult = aa.document.updateDocument(documentModel);
            if (vSaveResult.getSuccess()) {
                logDebug("Renamed document '" + fileName + "' to '" + newFileName + "'");
                logDebug(describe(vSaveResult));
                
            } else {
                logDebug("Failed to update report name");
                logDebug("Error: " + vSaveResult.getErrorMessage());
            }
        }
    }
}