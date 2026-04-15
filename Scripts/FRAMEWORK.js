function _typeof (obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof (obj) { return typeof obj; }; } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var $activity = function () {
  var activityService = com.accela.aa.util.EJBProxy.getActivityService();

  function _createActivity (activityModel) {
    var res = aa.activity.createActivity(activityModel);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: Create Activity: ' + res.getErrorMessage());
      return null;
    }
  }

  function _updateActivity (activityModel) {
    var res = aa.activity.updateActivity(activityModel);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: Create Activity: ' + res.getErrorMessage());
      return null;
    }
  }

  function _deleteActivities (activityId) {
    var res = aa.activity.deleteActivities(activityId);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: Create Activity: ' + res.getErrorMessage());
      return null;
    }
  }

  function _getActivityListBySR (recordId) {
    var activityList = activityService.getActivityListBySR(recordId);

    if (activityList) {
      return activityList.toArray();
    } else {
      return [];
    }
  }

  function _loadFormByGroupName (activityId, asiGroupName) {
    var result = [];
    var activitySpecInfoService = com.accela.aa.util.EJBProxy.getActivitySpecInfoService();
    var ASIList = activitySpecInfoService.getEditActivitySpeInfoAttributes(aa.getServiceProviderCode(), asiGroupName, 'RECORD', activityId);

    if (ASIList) {
      var list = ASIList.toArray();

      for (var l in list) {
        result[list[l].getASIName() + ''] = list[l].getDispASIValue() + '';
      }
    }

    return result;
  }

  return {
    getNewModel: function getNewModel () {
      return aa.activity.getNewActivityModel().getOutput();
    },
    add: function add (activityModel) {
      _createActivity(activityModel);
    },
    get4Record: function get4Record (recordId) {
      return _getActivityListBySR(recordId);
    },
    remove: function remove (activityId) {
      _deleteActivities(activityId);
    },
    update: function update (activityModel) {
      _updateActivity(activityModel);
    },
    loadForm: function loadForm (activityId, asiGroupName) {
      return _loadFormByGroupName(activityId, asiGroupName);
    }
  };
}();

var $address = function () {
  function _createXRefContactAddressModel () {
    var res = aa.address.createXRefContactAddressModel();

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: createXRefContactAddressModel: ' + res.getErrorMessage());
      return null;
    }
  }

  function _createXRefContactAddress (xfAddressModel) {
    var res = aa.address.createXRefContactAddress(xfAddressModel);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: createXRefContactAddress: ' + res.getErrorMessage());
      return null;
    }
  }

  function _editXRefContactAddress (xfAddressModel) {
    var res = aa.address.editXRefContactAddress(xfAddressModel);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: editXRefContactAddress: ' + res.getErrorMessage());
      return null;
    }
  }

  function _deleteXRefContactAddress (xfAddressModel) {
    var res = aa.address.deleteXRefContactAddress(xfAddressModel);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: deleteXRefContactAddress: ' + res.getErrorMessage());
      return null;
    }
  }

  function _getXRefContactAddressList (xfAddressModel) {
    var res = aa.address.getXRefContactAddressList(xfAddressModel);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: getXRefContactAddressList: ' + res.getErrorMessage());
      return [];
    }
  }

  function _createContactAddressModel () {
    var res = aa.address.createContactAddressModel();

    if (res.getSuccess()) {
      return res.getOutput().getContactAddressModel();
    } else {
      $logger.debug('**WARNING: createContactAddressModel: ' + res.getErrorMessage());
      return null;
    }
  }

  function _getContactAddressList (contactAddressModel) {
    var res = aa.address.getContactAddressList(contactAddressModel);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: getContactAddressList: ' + res.getErrorMessage());
      return null;
    }
  }

  function _editContactAddress (contactAddressModel) {
    var res = aa.address.editContactAddress(contactAddressModel);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: editContactAddress: ' + res.getErrorMessage());
      return null;
    }
  }

  function _deleteContactAddress (contactAddressModel) {
    var res = aa.address.deleteContactAddress(contactAddressModel);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: deleteContactAddress: ' + res.getErrorMessage());
      return null;
    }
  }

  function _getAddressWithAttributeByCapId (recordId) {
    var res = aa.address.getAddressWithAttributeByCapId(recordId);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: getAddressWithAttributeByCapId: ' + res.getErrorMessage());
      return [];
    }
  }

  function _editAddress (addressModel) {
    var res = aa.address.editAddress(addressModel);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: editAddress: ' + res.getErrorMessage());
      return null;
    }
  }

  function _removeAddress (recordId, addressId) {
    var res = aa.address.removeAddress(recordId, addressId);

    if (res.getSuccess()) {
      return res.getOutput();
    } else {
      $logger.debug('**WARNING: getAddressByCapId: ' + res.getErrorMessage());
      return null;
    }
  }

  return {
    getXRefAddress: function getXRefAddress () {
      return _createXRefContactAddressModel();
    },
    createXRefAddress: function createXRefAddress (xfAddress) {
      return _createXRefContactAddress(xfAddress.getXRefContactAddressModel());
    },
    deleteXRefAddress: function deleteXRefAddress (xfAddress) {
      return _deleteXRefContactAddress(xfAddress.getXRefContactAddressModel());
    },
    editXRefAddress: function editXRefAddress (xfAddress) {
      return _editXRefContactAddress(xfAddress.getXRefContactAddressModel());
    },
    searchByXRefAddress: function searchByXRefAddress (xfAddress) {
      return _getXRefContactAddressList(xfAddress.getXRefContactAddressModel());
    },
    getContactAddress: function getContactAddress () {
      return _createContactAddressModel();
    },
    editContactAddress: function editContactAddress (contactAddressModel) {
      return _editContactAddress(contactAddressModel);
    },
    deleteContactAddress: function deleteContactAddress (contactAddressModel) {
      return _deleteContactAddress(contactAddressModel);
    },
    searchByContactAddress: function searchByContactAddress (contactAddressModel) {
      return _getContactAddressList(contactAddressModel);
    },
    getByRecord: function getByRecord (recordId) {
      return _getAddressWithAttributeByCapId(recordId);
    },
    editAddress: function editAddress (addressModel) {
      return _editAddress(addressModel);
    },
    removeRecordAddressById: function removeRecordAddressById (recordId, addressId) {
      return _removeAddress(recordId, addressId);
    },
    getRefContactAddressById: function getRefContactAddressById (refContactId) {
      var contactAddressModel = this.getContactAddress();
      contactAddressModel.setEntityID(parseFloat(refContactId));
      contactAddressModel.setEntityType('CONTACT');
      return this.searchByContactAddress(contactAddressModel);
    }
  };
}();

var $asi = function () {
  function _getCustomFields (recordId, subgroup) {
    var result = aa.appSpecificInfo.getAppSpecificInfos(recordId, subgroup, null);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get custom fields for [' + recordId + '] ' + result.getErrorMessage());
      return [];
    }

    var asiMods = result.getOutput();
    return _conver2Fields(asiMods);
  }

  function _editCustomField (recordId, subgroup, field) {
    var result = aa.appSpecificInfo.editSingleAppSpecific(recordId, field.name, field.toString(), subgroup);

    if (!result.getSuccess()) {
      $logger.debug('Failed to update custom fields for [' + recordId + '] ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _getCustomFieldsSubgroup4Pageflow (record, subgroup) {
    var subgroupds = record.getAppSpecificInfoGroups();

    if (subgroupds != null) {
      var subgroupIt = subgroupds.iterator();

      while (subgroupIt.hasNext()) {
        var subgroupMod = subgroupIt.next();

        if (subgroupMod.getGroupName() + '' === subgroup) {
          return subgroupMod;
        }
      }
    }

    return null;
  }

  function _getCustomFields4Pageflow (record, subgroup) {
    var subgroupMod = _getCustomFieldsSubgroup4Pageflow(record, subgroup);

    if (subgroupMod == null || subgroupMod.getFields() == null) {
      return [];
    }

    var asiMods = subgroupMod.getFields().toArray();
    return _conver2Fields(asiMods);
  }

  function _getCustomField4Pageflow (subgroupMod, name) {
    if (subgroupMod == null) {
      return null;
    }

    var asiMods = subgroupMod.getFields();

    if (asiMods == null) {
      return null;
    }

    var asiModsIt = asiMods.iterator();

    while (asiModsIt.hasNext()) {
      var asiMod = asiModsIt.next();

      if (asiMod.getCheckboxDesc() + '' === name) {
        return asiMod;
      }
    }

    return null;
  }

  function _editCustomField4Pageflow (record, subgroup, field) {
    var subgroupMod = _getCustomFieldsSubgroup4Pageflow(record, subgroup);

    var asiMod = _getCustomField4Pageflow(subgroupMod, field.name);

    if (asiMod != null) {
      asiMod.setChecklistComment(field.toString());
    }
  }

  function _getCustomFields4ASB (asiMods, subgroup) {
    if ($common.isEmptyArray(asiMods)) {
      return [];
    }

    var fields = [];

    for (var i = 0; i < asiMods.length; i++) {
      var field = asiMods[i];
      var subgroupName = field.getCheckboxType() + '';

      if (subgroupName === subgroup) {
        fields.push(field);
      }
    }

    return _conver2Fields(fields);
  }

  function _conver2Fields (asiMods) {
    var fields = {};

    for (var i = 0; i < asiMods.length; i++) {
      var asiMod = asiMods[i];
      var name = asiMod.getCheckboxDesc() + '';
      var type = asiMod.getFieldType() + '';
      var originalValue = asiMod.getChecklistComment() + '';
      var value = $FieldHelper.convert($common.avoidNull(originalValue), type);
      fields[name] = new $Field(name, value, type);
    }

    return fields;
  }

  return {
    get: function get (recordId, subgroup) {
      return _getCustomFields(recordId, subgroup.toUpperCase(), null);
    },
    edit: function edit (recordId, subgroup, field) {
      _editCustomField(recordId, subgroup.toUpperCase(), field);
    },
    get4Pageflow: function get4Pageflow (record, subgroup) {
      return _getCustomFields4Pageflow(record, subgroup.toUpperCase());
    },
    edit4Pageflow: function edit4Pageflow (record, subgroup, field) {
      _editCustomField4Pageflow(record, subgroup.toUpperCase(), field);
    },
    get4ASB: function get4ASB (asiMods, subgroup) {
      return _getCustomFields4ASB(asiMods, subgroup);
    }
  };
}();

var $asit = function () {
  function _getTable (recordId, name) {
    var asitMod = _getASITModel(recordId, name);

    if (asitMod == null || asitMod.getRowIndex().isEmpty()) {
      return [];
    }

    return _covertASITModel(asitMod);
  }

  function _editTable (recordId, name, data) {
    var asitMod = _getASITModel(recordId, name);

    var fieldList = aa.util.newArrayList();

    if (!$common.isEmptyTable(data)) {
      for (var i = 0; i < data.length; i++) {
        var row = data[i];

        if (!asitMod.getColumns()) {
          for (var columnName in row) {
            fieldList.add(row[columnName].toString());
          }
        } else {
          var columnsIt = asitMod.getColumns().iterator();

          while (columnsIt.hasNext()) {
            var column = columnsIt.next();
            var colName = column.getColumnName();
            fieldList.add($common.avoidNull(row[colName]) + '');
          }
        }
      }

      asitMod.setTableField(fieldList);
      var result = aa.appSpecificTableScript.editAppSpecificTableInfos(asitMod, recordId, aa.getAuditID());

      if (!result.getSuccess()) {
        $logger.debug('Failed to update custom list for [' + recordId + '] ' + '[' + name + ']' + result.getErrorMessage());
        return false;
      }
    } else {
      return _removeTable(recordId, name);
    }

    return true;
  }

  function _removeTable (recordId, name) {
    var result = aa.appSpecificTableScript.removeAppSpecificTableInfos(name, recordId, aa.getAuditID());

    if (!result.getSuccess()) {
      $logger.debug('Failed to remove custom list for [' + recordId + '] ' + '[' + name + ']' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _getASITModel (recordId, name) {
    var result = aa.appSpecificTableScript.getAppSpecificTableModel(recordId, name);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get custom list for [' + recordId + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput().getAppSpecificTableModel();
  }

  function _getTable4Pageflow (record, name) {
    var asitMod = _getASITModel4Pageflow(record, name);

    if (asitMod == null || asitMod.getTableFields() == null) {
      return [];
    }

    return _covertASITModel4Pageflow(asitMod);
  }

  function _editTable4Pageflow (record, name, table) {
    var subgroupMod = _getASITModel4Pageflow(record, name);

    var rowIndex = -1;
    var fields = aa.util.newArrayList();
    var fieldsReadonly = aa.util.newArrayList();

    if ($common.isEmptyArray(table)) {
      subgroupMod.setTableFields(null);
      subgroupMod.setReadonlyField(null);
      subgroupMod.setTableIndex(0);
    } else {
      for (var i = 0; i < table.length; i++) {
        var columns = subgroupMod.getColumns().iterator();
        var row = table[i];

        while (columns.hasNext()) {
          var column = columns.next();
          var columnName = column.getColumnName() + '';
          var field = row[columnName];
          var value = '';
          var readonly = false;

          if (!field) {
            $logger.debug('Cannot find field ' + columnName + ' in the table data');
          } else {
            value = field.toString();
            readonly = field.readonly;
          }

          var asitField = aa.proxyInvoker.newInstance('com.accela.aa.aamain.appspectable.AppSpecificTableField', [value, column]).getOutput();
          asitField.setRowIndex(rowIndex);
          asitField.setFieldLabel(columnName);
          asitField.setFieldGroup(name.replace(/ /g, '+'));
          asitField.setReadOnly(readonly);
          fields.add(asitField);
          fieldsReadonly.add(readonly ? 'Y' : 'N');
        }

        rowIndex--;
        subgroupMod.setTableFields(fields);
        subgroupMod.setReadonlyField(fieldsReadonly);
      }
    }
  }

  function _getASITModel4Pageflow (capModel, name) {
    var groupMod = capModel.getAppSpecificTableGroupModel();
    var ta = groupMod.getTablesMap();
    var tai = ta.values().iterator();

    while (tai.hasNext()) {
      var tsm = tai.next();
      var tn = tsm.getTableName() + '';

      if (tn === name) {
        return tsm;
      }
    }

    return null;
  }

  function _getTable4ASB (groupMod, name) {
    var asitMod = _getASITModel4ASB(groupMod, name);

    if (asitMod == null) {
      return [];
    }

    return _covertASITModel(asitMod);
  }

  function _getASITModel4ASB (groupMod, name) {
    if (!groupMod) {
      return [];
    }

    var ta = groupMod.getTablesMap().values();
    var tai = ta.iterator();

    while (tai.hasNext()) {
      var tsm = tai.next();
      if (tsm.rowIndex.isEmpty()) continue;
      var tn = tsm.getTableName() + '';

      if (tn === name) {
        return tsm;
      }
    }
  }

  function _covertASITModel (asitMod) {
    var table = [];
    var fields = asitMod.getTableField().iterator();
    var columns = asitMod.getColumns().iterator();
    var row = [];

    while (fields.hasNext()) {
      if (!columns.hasNext()) {
        columns = asitMod.getColumns().iterator();
        table.push(row);
        row = [];
      }

      var column = columns.next();
      var columnName = column.getColumnName() + '';
      var value = fields.next();
      row.push(_covert2Field(columnName, value, column.getColumnType() + ''));
    }

    table.push(row);
    return table;
  }

  function _covertASITModel4Pageflow (asitMod) {
    var table = [];
    var fields = asitMod.getTableFields().iterator();
    var columns = asitMod.getColumns().iterator();
    var row = [];

    while (fields.hasNext()) {
      if (!columns.hasNext()) {
        columns = asitMod.getColumns().iterator();
        table.push(row);
        row = [];
      }

      var column = columns.next();
      row.push(_covert2Field(column.getColumnName() + '', fields.next().getInputValue() + '', column.getColumnType() + ''));
    }

    table.push(row);
    return table;
  }

  function _covert2Field (name, vaule, type) {
    var tmpVal = $FieldHelper.convert($common.avoidNull(vaule + ''), type);
    return new $Field(name, tmpVal, type);
  }

  return {
    get: function get (recordId, name) {
      return _getTable(recordId, name.toUpperCase());
    },
    edit: function edit (recordId, name, table) {
      _editTable(recordId, name.toUpperCase(), table);
    },
    get4Pageflow: function get4Pageflow (record, name) {
      return _getTable4Pageflow(record, name.toUpperCase());
    },
    edit4Pageflow: function edit4Pageflow (record, name, table) {
      _editTable4Pageflow(record, name.toUpperCase(), table);
    },
    get4ASB: function get4ASB (groupMod, name) {
      return _getTable4ASB(groupMod, name);
    },
    getModel: function getModel (recordId, name) {
      return _getASITModel(recordId, name);
    },
    getModel4Pageflow: function getModel4Pageflow (record, name) {
      return _getASITModel4Pageflow(record, name);
    }
  };
}();

var $communication = function () {
  function _getAssociateEnities (entityId) {
    var list = aa.util.newArrayList();

    if (!$common.isEmptyString(entityId)) {
      var messageEntityModel = new com.accela.orm.model.communication.MessageEntityModel();
      messageEntityModel.entityType = 'RECORD';
      messageEntityModel.entityId = entityId;
      list.add(messageEntityModel);
    }

    return list;
  }

  function _associateEnities (cmId, entityId, entityType) {
    var result = aa.communication.associateEnities(cmId, entityId, entityType);

    if (!result.getSuccess()) {
      $logger.debug('Failed to associate communication for [' + entityId + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getNotificationTemplateByName (name) {
    var communicationBiz = aa.proxyInvoker.newInstance('com.accela.aa.communication.CommunicationImpl').getOutput();
    var template = communicationBiz.getNotificationTemplateByName(aa.getServiceProviderCode(), name, false);
    return template || '';
  }

  function _getFiles (fileNames) {
    return fileNames.map(function (name) {
      return aa.io.File(name);
    });
  }

  return {
    sendEamil: function sendEamil (from, to, cc, template, variables, files, entityId) {
      var cmService = aa.proxyInvoker.newInstance('com.accela.aa.communication.business.CommunicationBusiness').getOutput();

      var templateModel = _getNotificationTemplateByName(template);

      var associateEnities = _getAssociateEnities(entityId);

      var emailTemplate = templateModel.getEmailTemplateModel();

      if (!$common.isEmptyString(to)) {
        emailTemplate.setTo(to);
      }

      if (!$common.isEmptyString(from)) {
        emailTemplate.setFrom(from);
      }

      templateModel.setSmsTemplateModel(null);
      return cmService.sendMessage(templateModel, variables, _getFiles(files), null, associateEnities);
    },
    sendSMS: function sendSMS (from, to, template, variables, entityId) {
      var cmService = aa.proxyInvoker.newInstance('com.accela.aa.communication.business.CommunicationBusiness').getOutput();

      var templateModel = _getNotificationTemplateByName(template);

      var associateEnities = _getAssociateEnities(entityId);

      var smsTemplate = templateModel.getSmsTemplateModel();

      if (!$common.isEmptyString(to)) {
        smsTemplate.setTo(to);
      }

      if (!$common.isEmptyString(from)) {
        smsTemplate.setFrom(from);
      }

      templateModel.setEmailTemplateModel(null);
      return cmService.sendMessage(templateModel, variables, null, null, associateEnities);
    },
    sendMessage: function sendMessage (templateModel, variables, files, entityId) {
      var cmService = aa.proxyInvoker.newInstance('com.accela.aa.communication.business.CommunicationBusiness').getOutput();

      var associateEnities = _getAssociateEnities(entityId);

      return cmService.sendMessage(templateModel, variables, _getFiles(files), '', associateEnities);
    },
    getNotificationTemplate: function getNotificationTemplate (name) {
      return _getNotificationTemplateByName(name);
    },
    getEmailToAddress: function getEmailToAddress (template) {
      var emailTemplate = template.getEmailTemplateModel();
      return emailTemplate ? emailTemplate.getTo() + '' : '';
    },
    getEmailTitle: function getEmailTitle (template) {
      var emailTemplate = template.getEmailTemplateModel();
      return emailTemplate ? emailTemplate.getTitle() + '' : '';
    },
    getEmailContent: function getEmailContent (template) {
      var emailTemplate = template.getEmailTemplateModel();
      return emailTemplate ? emailTemplate.getContentText() + '' : '';
    },
    getSMSToAddress: function getSMSToAddress (template) {
      var smsTemplate = template.getSmsTemplateModel();
      return smsTemplate ? smsTemplate.getTo() + '' : '';
    },
    getSMSContnet: function getSMSContnet (template) {
      var smsTemplate = template.getSmsTemplateModel();
      return smsTemplate ? smsTemplate.getContentText() + '' : '';
    },
    setEmailContent: function setEmailContent (template, content) {
      var emailTemplate = template.getEmailTemplateModel();
      emailTemplate.setContentText(content);
    },
    associateEnities: function associateEnities (cmId, entityId, entityType) {
      return _associateEnities(cmId, entityId, entityType);
    }
  };
}();

var $condition = function () {
  function _getRecordConditions (recordId) {
    var result = aa.capCondition.getCapConditions(recordId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to retrieving condition list by record [' + recordId + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _createRecordCondition (model) {
    var result = aa.capCondition.createCapCondition(model);

    if (!result.getSuccess()) {
      $logger.debug('Failed to create condition [' + model + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _editRecordConditions (model) {
    var result = aa.capCondition.editCapCondition(model);

    if (!result.getSuccess()) {
      $logger.debug('Failed to edit condition [' + model + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _deleteRecordConditions (recordId, conditionId) {
    var result = aa.capCondition.deleteCapCondition(recordId, conditionId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to remove condition [' + conditionId + ']  from  record [' + recordId + ']' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _getConditionsByGroup (vGroup) {
    var result = aa.capCondition.getStandardConditionsByGroup(vGroup);

    if (!result.getSuccess()) {
      $logger.debug('Failed to condition list by group [' + vGroup + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _getRecordConditionsWithTemplate (recordId) {
    var condArr = _getRecordConditions(recordId);

    for (var i = 0; i < condArr.length; i++) {
      var condSMod = condArr[i];
      var entityPKMod = condSMod.getEntityPK();
      condSMod.setTemplateModel($template.getModelByPK(entityPKMod));
    }

    return condArr;
  }

  function _cloneConditions (recordId, conditions) {
    var currentDate = $date.now();
    var sCurrentDate = $date.convertToScriptDate(currentDate);

    for (var i = 0; i < conditions.length; i++) {
      var condition = conditions[i];
      condition.setCapID(recordId);
      condition.setIssuedDate(currentDate);
      condition.setStatusDate(sCurrentDate);

      _createRecordCondition(condition);
    }
  }

  function _addCommonCondition (entityID, entityType, conditionGroup, conditionType, conditionName, comment) {
    var newCondition = aa.commonCondition.getNewCommonConditionModel().getOutput();
    newCondition.setServiceProviderCode(aa.getServiceProviderCode());
    newCondition.setEntityType(entityType);
    newCondition.setEntityID(entityID);
    newCondition.setConditionDescription(conditionName);
    newCondition.setConditionGroup(conditionGroup);
    newCondition.setConditionType(conditionType);
    newCondition.setAuditStatus('A');
    newCondition.setAuditID(aa.getAuditID());
    newCondition.setAdditionalInformation(comment);
    newCondition.setImpactCode('Notice');
    newCondition.setConditionStatus('Applied');
    var result = aa.commonCondition.addCommonCondition(newCondition);

    if (!result.getSuccess()) {
      $logger.debug('Failed to create condition ' + result.getErrorMessage());
      return false;
    }

    return result.getOutput();
  }

  function _editCommonCondition (condMod) {
    var result = aa.commonCondition.editCommonCondition(condMod);

    if (!result.getSuccess()) {
      $logger.debug('Failed to edit condition ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _get4RefContact (refContId, type) {
    var result = aa.commonCondition.getCommonConditions('CONTACT', refContId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get conditions for [' + refContId + '] ' + result.getErrorMessage());
      return [];
    }

    var condMods = [];
    result.getOutput().forEach(function (condMod) {
      if (condMod.getAuditStatus() + '' === 'A') {
        condMods.push(condMod);
      }
    });
    return condMods;
  }

  function _remove4RefContact (refContId, condId) {
    var result = aa.commonCondition.removeCommonCondition('CONTACT', refContId, $number.parseFloat(condId));

    if (!result.getSuccess()) {
      $logger.debug('Failed to remove condition for [' + refContId + '] ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _addStdCondition2Record (recordId, stdConditionNum) {
    var result = aa.capCondition.createCapConditionFromStdCondition(recordId, stdConditionNum);

    if (!result.getSuccess()) {
      $logger.debug('Failed to add condition for [' + recordId.getCustomID() + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getRecordCondition (recordId, condNum) {
    var result = aa.capCondition.getCapCondition(recordId, condNum);

    if (!result.getSuccess()) {
      $logger.debug('Failed to retrieving condition list by record [' + recordId + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  return {
    get: function get (recordId) {
      return _getRecordConditions(recordId);
    },
    getByConditionNum: function getByConditionNum (recordId, condNum) {
      return _getRecordCondition(recordId, condNum);
    },
    getWithTemplate: function getWithTemplate (recordId) {
      return _getRecordConditionsWithTemplate(recordId);
    },
    getByGroup: function getByGroup (group) {
      return _getConditionsByGroup(group);
    },
    add: function add (condMod) {
      return _createRecordCondition(condMod);
    },
    addStdCondition: function addStdCondition (recordId, stdConditionNum) {
      return _addStdCondition2Record(recordId, stdConditionNum);
    },
    edit: function edit (condMod) {
      return _editRecordConditions(condMod);
    },
    remove: function remove (recordId, conditionId) {
      return _deleteRecordConditions(recordId, conditionId);
    },
    clone: function clone (recordId, conditions) {
      _cloneConditions(recordId, conditions);
    },
    addCommonCondition: function addCommonCondition (entityID, entityType, conditionGroup, conditionType, conditionName, comment) {
      return _addCommonCondition(entityID, entityType, conditionGroup, conditionType, conditionName, comment);
    },
    editCommonCondition: function editCommonCondition (condMod) {
      return _editCommonCondition(condMod);
    },
    get4RefContact: function get4RefContact (refContId) {
      return _get4RefContact(refContId);
    },
    remove4RefContact: function remove4RefContact (refContId, condId) {
      return _remove4RefContact(refContId, condId);
    }
  };
}();

var $contact = function () {
  function _getRecordContacts (recordId) {
    var result = aa.people.getCapContactByCapID(recordId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to retrieving contact list by record [' + recordId + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _filterRecordContacts (contacts, options) {
    var types = options && options.types ? options.types : [];
    var primary = options && options.primary;
    var result = [];

    for (var i = 0; i < contacts.length; i++) {
      var contact = contacts[i].getCapContactModel();
      var type = contact.getContactType() + '';
      var auditStatus = contact.getPeople().getAuditStatus() + '';
      var flag = contact.getPeople().getFlag() + '';

      if (!$common.isEmptyArray(types) && types.indexOf(type) === -1) {
        continue;
      }

      if (auditStatus !== 'A') {
        continue;
      }

      if (primary && flag !== 'Y') {
        continue;
      }

      result.push(contact);
    }

    return result;
  }

  function _create4RefContact (recordId, refContact) {
    var result = aa.people.createCapContactWithRefPeopleModel(recordId, refContact);

    if (!result.getSuccess()) {
      $logger.debug('Failed to create contact for [' + recordId + '] ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _createRecordContact (contact) {
    var result = aa.people.createCapContact(contact);

    if (!result.getSuccess()) {
      $logger.debug('Failed to create contact ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _getRecordContact (recordId, contactNumber) {
    var result = aa.people.getCapContactByPK(recordId, contactNumber);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get contact ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput().getCapContactModel();
  }

  function _editRecordContact (contact) {
    var result = aa.people.editCapContact(contact);

    if (!result.getSuccess()) {
      $logger.debug('Failed to edit contact ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _getPeople (refContId) {
    var result = aa.people.getPeople(refContId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to reference contact ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  return {
    add: function add (contact) {
      return _createRecordContact(contact);
    },
    addRefContact: function addRefContact (recordId, refContact) {
      return _create4RefContact(recordId, refContact);
    },
    getContacts: function getContacts (recordId, options) {
      return _filterRecordContacts(_getRecordContacts(recordId), options);
    },
    get: function get (recordId, contactNumber) {
      return _getRecordContact(recordId, contactNumber);
    },
    getRef: function getRef (refContId) {
      return _getPeople(refContId);
    },
    edit: function edit (contact) {
      return _editRecordContact(contact);
    },
    setPrimary: function setPrimary (recordId, contactNumber) {
      var contact = _getRecordContact(recordId, contactNumber);

      if (contact) {
        var people = contact.getPeople();
        people.setFlag('Y');

        _editRecordContact(contact);
      }
    }
  };
}();

var $document = function () {
  function _getDocuments4ACA (recordId) {
    var result = aa.document.getDocumentListByEntity(recordId, 'TMP_CAP');

    if (!result.getSuccess()) {
      $logger.debug('Failed to get documents for [' + recordId + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput().toArray();
  }

  function _filterDocuments (documents, options) {
    var result = [];
    var category = options && options.category ? options.category : null;

    for (var i = 0; i < documents.length; i++) {
      var doc = documents[i];
      var docCategory = doc.getDocCategory() + '';

      if ($common.isEmptyString(category) || !$common.isEmptyString(category) && category === docCategory) {
        result.push(doc);
      }
    }

    return result;
  }

  function _getDocumentsByEntity (entityId, type) {
    var result = aa.document.getDocumentListByEntity(entityId, type);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get documents for [' + entityId + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput().toArray();
  }

  function _editDocument (doc) {
    var result = aa.document.updateDocument(doc);

    if (!result.getSuccess()) {
      $logger.debug('Failed to update document ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _downloadDocument (doc, module, userName, password, useDefalueUser) {
    var result = aa.document.downloadFile2Disk(doc, module, userName, password, useDefalueUser);

    if (!result.getSuccess()) {
      $logger.debug('Failed to download document ' + result.getErrorMessage());
      return '';
    }

    return result.getOutput();
  }

  return {
    get4ACA: function get4ACA (recordId, options) {
      return _filterDocuments(_getDocuments4ACA(recordId), options);
    },
    getByEntity: function getByEntity (entityId, type) {
      return _getDocumentsByEntity(entityId, type);
    },
    edit: function edit (doc) {
      _editDocument(doc);
    },
    download: function download (doc, module, userName, password, useDefalueUser) {
      return _downloadDocument(doc, module, userName, password, useDefalueUser);
    }
  };
}();

var $drillDown = function () {
  function _getASITableDrillDSeriesModel () {
    var result = aa.asiDrillDown.getASITableDrillDSeriesModel();

    if (!result.getSuccess()) {
      $logger.debug('Error getting ASITableDrillDSeriesModel: ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getASITableDrillDownModel () {
    var result = aa.asiDrillDown.getASITableDrillDownModel();

    if (!result.getSuccess()) {
      $logger.debug('Error getting ASITableDrillDownModel: ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getASIDrillDownSeries (strId) {
    var result = aa.asiDrillDown.getASIDrillDownSeries(strId);

    if (!result.getSuccess()) {
      $logger.debug('Error getting ASIDrillDownSeries: ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput().toArray();
  }

  function _getASIDrillDown (model) {
    var result = aa.asiDrillDown.getASIDrillDown(model);

    if (!result.getSuccess()) {
      $logger.debug('Error getting ASIDrillDown: ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput().toArray();
  }

  function _deleteASIDrillDown (id) {
    var result = aa.asiDrillDown.deleteASIDrillDown([id]);

    if (!result.getSuccess()) {
      $logger.debug('Error deleting ASIDrillDown: ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _createASIDrillDown (model) {
    var result = aa.asiDrillDown.createASIDrillDown(model);

    if (!result.getSuccess()) {
      $logger.debug('Error creating ASIDrillDown: ' + result.getErrorMessage());
      return false;
    }

    return result.getOutput();
  }

  function _getASITableDrillDValMapModel () {
    var result = aa.asiDrillDown.getASITableDrillDValMapModel();

    if (!result.getSuccess()) {
      $logger.debug('Error getting ASITableDrillDValMapModel: ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _createASITableDrillDValMap (arraylist) {
    var result = aa.asiDrillDown.createASITableDrillDValMap(arraylist);

    if (!result.getSuccess()) {
      $logger.debug('Error createASITableDrillDValMap ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _createASIDrillDownSeries (arraylist) {
    var result = aa.asiDrillDown.createASIDrillDownSeries(arraylist);

    if (!result.getSuccess()) {
      $logger.debug('Error createASIDrillDownSeries ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  return {
    getValMapModel: function getValMapModel () {
      return _getASITableDrillDValMapModel();
    },
    addValMaps: function addValMaps (arraylist) {
      return _createASITableDrillDValMap(arraylist);
    },
    getModel: function getModel () {
      return _getASITableDrillDownModel();
    },
    getSeriesModel: function getSeriesModel () {
      return _getASITableDrillDSeriesModel();
    },
    createSeries: function createSeries (arraylist) {
      return _createASIDrillDownSeries(arraylist);
    },
    get: function get (drillDownListName) {
      var searchModel = this.getModel();
      searchModel.setDrillName(drillDownListName);
      return _getASIDrillDown(searchModel);
    },
    create: function create (model) {
      return _createASIDrillDown(model);
    },
    getSeriesById: function getSeriesById (id) {
      return _getASIDrillDownSeries(id);
    },
    remove: function remove (drillDownListName) {
      var model = this.get(drillDownListName);

      if (model[0]) {
        return _deleteASIDrillDown(model[0].drillId + '');
      }

      return false;
    }
  };
}();

var $expression = function () {
  return {
    CP_SPEAR: 'CP_SPEAR',
    ACA: 'ACA',
    CP: 'CP',
    getEnv: function getEnv (altId) {
      if ($common.isEmptyString(altId)) {
        return this.CP_SPEAR;
      }

      var record = $record.getRecord($record.getId(altId));
      var capClass = record.getCapClass() + '';
      return $common.isEmptyString(capClass) || capClass === 'COMPLETE' ? $expression.CP : $expression.ACA;
    }
  };
}();

var $fee = function () {
  function _getFees (recordId) {
    var result = aa.fee.getFeeItems(recordId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get fees for [' + recordId + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _filterFees (fees, options) {
    var result = [];
    var status = options && options.status ? options.status : null;

    for (var i = 0; i < fees.length; i++) {
      var fee = fees[i];
      var feeStatus = fee.getFeeitemStatus() + '';

      if ($common.isEmptyString(status) || feeStatus === status) {
        result.push(fee);
      }
    }

    return result;
  }

  function _addFee (recordId, schedule, code, period, quantity) {
    var result = aa.finance.createFeeItem(recordId, schedule, code, period, quantity);

    if (!result.getSuccess()) {
      $logger.debug('Failed to add fees for [' + recordId + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getFeeConfig (schedule, code, periodGroup, expDate) {
    var result = aa.fee.getRefFeeItemByFeeCode(schedule, code, periodGroup, expDate);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get fee config ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _voidFeeItem (recordId, feeSeq) {
    var result = aa.finance.voidFeeItem(recordId, feeSeq);

    if (!result.getSuccess()) {
      $logger.debug('Failed to void fee ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  return {
    get: function get (recordId, options) {
      var fees = _getFees(recordId);

      return _filterFees(fees, options);
    },
    add: function add (recordId, schedule, code, period, quantity) {
      return _addFee(recordId, schedule, code, period, quantity);
    },
    getRef: function getRef (schedule, code, periodGroup, expDate) {
      periodGroup = periodGroup || null;
      expDate = expDate ? $date.convertToScriptDate(expDate) : $date.convertToScriptDate($date.today());
      return _getFeeConfig(schedule, code, periodGroup, expDate);
    },
    "void": function _void (recordId, feeSeq) {
      return _voidFeeItem(recordId, feeSeq);
    }
  };
}();

var $gis = function () {
  function _addGISObject2Record (recordId, service, layer, objectId) {
    var result = aa.gis.addCapGISObject(recordId, service, layer, objectId);

    if (!result.getSuccess()) {
      $logger.debug('Error linking GIS Object to [' + recordId + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getRecordGISObjects (recordId) {
    var result = aa.gis.getCapGISObjects(recordId);

    if (!result.getSuccess()) {
      $logger.debug('Error getting GIS Object for [' + recordId + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getRecordGISObjectIds (recordId) {
    var result = _getRecordGISObjects(recordId);

    var returnArr = [];

    if (!result) {
      return null;
    }

    for (var gi in result) {
      var obj = result[gi].getGISObjects()[0];

      if (obj) {
        returnArr.push(obj.getGisId());
      }
    }

    return returnArr;
  }

  return {
    attach2Record: function attach2Record (recordId, gisService, layer, objectIds) {
      return objectIds.forEach(function (objectId) {
        _addGISObject2Record(recordId, gisService, layer, objectId);
      });
    },
    getRecordGISObjects: function getRecordGISObjects (recordId) {
      return _getRecordGISObjects(recordId);
    },
    getRecordGISObjectIds: function getRecordGISObjectIds (recordId) {
      return _getRecordGISObjectIds(recordId);
    }
  };
}();

var $http = function () {
  function _httpPost (url, parameter) {
    var result = aa.util.httpPost(url, parameter);

    if (!result.getSuccess()) {
      $logger.debug('Error send post request: ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _prepareParams (params) {
    var res = '';

    for (var ep in params) {
      res += '&' + ep + '=' + params[ep];
    }

    return res;
  }

  return {
    post: function post (url, params) {
      return _httpPost(url, _prepareParams(params));
    }
  };
}();

var $invoice = function () {
  function _createInvoice (recordId, fees, periods) {
    var result = aa.finance.createInvoice(recordId, fees, periods);

    if (!result.getSuccess()) {
      $logger.debug('Failed to create invoice for [' + recordId + '] ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _getDefaultPaymentPeriods (fees) {
    var periods = [];
    var defaultPeriod = 'FINAL';

    for (var i = 0; i < fees.length; i++) {
      periods.push(defaultPeriod);
    }

    return periods;
  }

  function _getInvoiceNumByFee (recordId, fee) {
    var result = aa.finance.getFeeItemInvoiceByFeeNbr(recordId, fee, aa.util.newQueryFormat());

    if (!result.getSuccess()) {
      $logger.debug('Failed to get invoice ' + result.getErrorMessage());
      return null;
    }

    var invoicedFees = result.getOutput();
    return !$common.isEmptyArray(invoicedFees) ? invoicedFees[0].getX4FeeItemInvoice() : null;
  }

  function _editInvoice (recordId, invoice) {
    var result = aa.invoice.editInvoice(recordId, invoice);

    if (!result.getSuccess()) {
      $logger.debug('Failed to edit invoice ' + result.getErrorMessage());
    }
  }

  function _getInvoice (recordId, invoiceNbr) {
    var result = aa.cashier.getInvoice(recordId, invoiceNbr);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get invoice ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getFeeItemInvoiceByInvoiceNbr (recordId, invoiceNbr) {
    var result = aa.finance.getFeeItemInvoiceByInvoiceNbr(recordId, invoiceNbr, aa.util.newQueryFormat());

    if (!result.getSuccess()) {
      $logger.debug('Failed to get invoice fee item(s)' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _getTotalPaidFeeItem (recordId, feeItemSeqNo) {
    var result = aa.finance.getTotalPaidFeeItem(recordId, feeItemSeqNo);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get total paid for fee item' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  return {
    create: function create (recordId, fees, periods) {
      if (!$common.isEmptyArray(fees)) {
        var paymentPeriods = periods || _getDefaultPaymentPeriods(fees);

        if (_createInvoice(recordId, fees, paymentPeriods)) {
          return _getInvoiceNumByFee(recordId, fees[0]);
        }
      }

      return null;
    },
    get: function get (recordId, invoiceNbr) {
      return _getInvoice(recordId, invoiceNbr);
    },
    edit: function edit (recordId, invoice) {
      _editInvoice(recordId, invoice);
    },
    getFeeItems: function getFeeItems (recordId, invoiceNbr) {
      return _getFeeItemInvoiceByInvoiceNbr(recordId, invoiceNbr);
    },
    getPaidAmountForFee: function getPaidAmountForFee (recordId, feeItemSeqNo) {
      return _getTotalPaidFeeItem(recordId, feeItemSeqNo);
    }
  };
}();

var $lp = function () {
  function _createRefLP (licNum, type, licState) {
    var licSMod = aa.licenseScript.createLicenseScriptModel();
    licSMod.setStateLicense(licNum);
    licSMod.setLicenseType(type);
    licSMod.setAuditStatus('A');
    licSMod.setLicState(licState);
    var result = aa.licenseScript.createRefLicenseProf(licSMod);

    if (!result.getSuccess()) {
      $logger.debug('Failed to create reference license professional ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getRefLPsByLicenceNum (licNum) {
    var result = aa.licenseScript.getRefLicensesProfByLicNbr(aa.getServiceProviderCode(), licNum);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get reference license professional ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput() === null ? [] : result.getOutput();
  }

  function _getRefLP (seqNum) {
    var result = aa.licenseScript.getRefLicenseProfBySeqNbr(aa.getServiceProviderCode(), seqNum);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get reference license professional ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput().getLicenseModel();
  }

  function _createTransactionalLP (recordId, licMod) {
    var lpSMod = aa.licenseProfessional.getLicenseProfessionScriptModel().getOutput();
    var lpMod = lpSMod.getLicenseProfessionalModel();
    lpSMod.setCapID(recordId);
    lpSMod.setLicenseType(licMod.getLicenseType());
    lpSMod.setLicenseNbr(licMod.getStateLicense());
    lpSMod.setAuditID(aa.getAuditID());
    lpSMod.setPrintFlag('N');
    lpSMod.setSerDes('Description');
    lpMod.setLicSeqNbr(licMod.getLicSeqNbr());
    lpMod.setPrintFlag('N');
    lpMod.setCreateByACA('N');
    var result = aa.licenseProfessional.createLicensedProfessional(lpSMod);

    if (!result.getSuccess()) {
      $logger.debug('Failed to create license professional ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getTransactionalLP (recordId, licNum, type) {
    var searchMod = aa.licenseProfessional.getLicenseProfessionScriptModel().getOutput();
    searchMod.setCapID(recordId);
    searchMod.setLicenseType(type);
    searchMod.setLicenseNbr(licNum);
    searchMod.setSerDes('Description');
    var result = aa.licenseProfessional.getLicensedProfessionalsByPK(searchMod);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get transactional license professional ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getRecordLinkedLP (recordId) {
    var result = aa.licenseProfessional.getLicensedProfessionalsByCapID(recordId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get license professional ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _removeRefLP4Record (lpSMod) {
    var result = aa.licenseProfessional.removeLicensedProfessional(lpSMod);

    if (!result.getSuccess()) {
      $logger.debug('Failed to remove transactional license professional ' + result.getErrorMessage());
      return false;
    }

    return result.getOutput();
  }

  function _getPublicUserLinkedLP (userId) {
    var result = aa.licenseScript.getRefLicProfByOnlineUser(userId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get license professional ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _addRefLP2PublicUser (userSeqNum, licMod) {
    var result = aa.contractorLicense.issueContrLicWithExpired(userSeqNum, licMod, true, true);

    if (!result.getSuccess()) {
      $logger.debug('Failed to link license professional to public user ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _removeRefLP4PublicUser (userSeqNum, licMod) {
    var contractorLicenseBusiness = aa.proxyInvoker.newInstance('com.accela.pa.people.license.ContractorLicenseBusiness').getOutput();
    contractorLicenseBusiness.deleteContractorLicense(userSeqNum, licMod.getLicenseType(), aa.getServiceProviderCode(), licMod.getLicSeqNbr());
  }

  function _getPublicUserLinkedLPByLicenceNum (licNum, userSeqNum) {
    var result = aa.contractorLicense.getContrLicenseByLicSeqNBR(licNum, userSeqNum);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get license professional linked to public user ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  return {
    create: function create (licNum, type, licState) {
      return _createRefLP(licNum, type, licState);
    },
    get: function get (seqNum) {
      return _getRefLP(seqNum);
    },
    getRefLPsByLicence: function getRefLPsByLicence (licNum) {
      return _getRefLPsByLicenceNum(licNum);
    },
    getTransactional: function getTransactional (recordId, licNum, type) {
      return _getTransactionalLP(recordId, type, licNum);
    },
    get4Record: function get4Record (recordId) {
      return _getRecordLinkedLP(recordId);
    },
    get4User: function get4User (userId) {
      return _getPublicUserLinkedLP(userId);
    },
    linkRecord: function linkRecord (recordId, refLP) {
      return _createTransactionalLP(recordId, refLP);
    },
    linkUser: function linkUser (userSeqNum, refLP) {
      return _addRefLP2PublicUser(userSeqNum, refLP);
    },
    unlinkRecord: function unlinkRecord (lpSMod) {
      return _removeRefLP4Record(lpSMod);
    },
    unlinkUser: function unlinkUser (userSeqNum, refLP) {
      return _removeRefLP4PublicUser(userSeqNum, refLP);
    },
    isLinked2Record: function isLinked2Record (recordId, licNum, type) {
      return _getTransactionalLP(recordId, licNum, type) !== null;
    },
    isLinked2User: function isLinked2User (licNum, userSeqNum) {
      return _getPublicUserLinkedLPByLicenceNum(licNum, userSeqNum) !== null;
    }
  };
}();

var $pageflow = function () {
  function _getPageComponents (recordId, step, page) {
    var result = aa.acaPageFlow.getPageComponents(recordId, step, page);

    if (!result.getSuccess()) {
      return null;
    }

    return result.getOutput();
  }

  function _clearData (recordId, step, page) {
    var components = _getPageComponents(recordId, step, page);

    if (!$common.isEmptyArray(components)) {
      aa.acaPageFlow.hideCapPage4ACA(recordId, step, page);
    }
  }

  return {
    fromRevewPage: function fromRevewPage () {
      return aa.env.getValue('fromReviewPage') + '' === 'Y';
    },
    hidePage: function hidePage () {
      aa.env.setValue('ReturnData', "{'PageFlow': {'HidePage' : 'Y'}}");
    },
    "goto": function goto (step, page) {
      aa.env.setValue('ReturnData', "{'PageFlow': {'StepNumber': '" + step + "', 'PageNumber':'" + page + "'}}");
    },
    clearPage: function clearPage (recordId, step, page) {
      _clearData(recordId, step, page);
    },
    handleErrors: function handleErrors () {
      if (debug.indexOf('**ERROR') > 0) {
        aa.env.setValue('ErrorCode', '1');
        aa.env.setValue('ErrorMessage', debug);
      } else {
        if (cancel) {
          aa.env.setValue('ErrorCode', '-1');
          if (showMessage) aa.env.setValue('ErrorMessage', message);
          if (showDebug) aa.env.setValue('ErrorMessage', debug);
        } else {
          aa.env.setValue('ErrorCode', '0');
          if (showMessage) aa.env.setValue('ErrorMessage', message);
          if (showDebug) aa.env.setValue('ErrorMessage', debug);
        }
      }
    }
  };
}();

var $parcel = function () {
  function _createCapParcel (capParcelMod) {
    var result = aa.parcel.createCapParcel(capParcelMod);

    if (!result.getSuccess()) {
      $logger.debug('Failed to link parcel ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _initCapParcel (recordId, parcel) {
    var result = aa.parcel.warpCapIdParcelModel2CapParcelModel(recordId, parcel);

    if (!result.getSuccess()) {
      $logger.debug('Failed to init cap parcel model ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _linkParcelToCap (recordId, parcelId) {
    var parcels = _getParcels(parcelId);

    if (!$common.isEmptyArray(parcels)) {
      parcels.forEach(function (parcel) {
        var capParcelMod = _initCapParcel(recordId, parcel.getParcelModel());

        capParcelMod.setUID(parcel.getParcelModel().getUID());

        _createCapParcel(capParcelMod);
      });
    }
  }

  function _getParcels (parcelId) {
    var result = aa.parcel.getParceListForAdmin(parcelId, null, null, null, null, null, null, null, null, null);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get parcel ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getParcels4Record (recordId) {
    var result = aa.parcel.getParcelByCapId(recordId, aa.util.newQueryFormat());

    if (!result.getSuccess()) {
      $logger.debug('Failed to get parcels ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  return {
    link2Record: function link2Record (recordId, parcelIds) {
      parcelIds.forEach(function (parcelId) {
        _linkParcelToCap(recordId, parcelId);
      });
    },
    getParcels4Record: function getParcels4Record (recordId) {
      return _getParcels4Record(recordId);
    }
  };
}();

var $payment = function () {
  function _makePayment (recordId, amount, outstandingAmount, charge, comment, method, transNum, tranCode, date) {
    var p = aa.finance.createPaymentScriptModel();
    p.setAuditDate(aa.date.getCurrentDate());
    p.setAuditStatus('A');
    p.setCapID(recordId);
    p.setCashierID(aa.getAuditID());
    p.setPaymentAmount(amount);
    p.setAmountNotAllocated(outstandingAmount);
    p.setPaymentChange(charge);
    p.setPaymentComment(comment);
    p.setPaymentMethod(method);
    p.setPaymentRefNbr(transNum);
    p.setTranCode(tranCode);
    p.getPaymentModel().setPaymentDate(date);
    p.setPaymentStatus('Paid');
    var result = aa.finance.makePayment(p);

    if (!result.getSuccess()) {
      $logger.error('Failed to create payment: ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getPayment (recordId, paymentSeq) {
    var result = aa.finance.getPaymentByPK(recordId, paymentSeq, aa.getAuditID());

    if (!result.getSuccess()) {
      $logger.error('Failed to get payment: ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _generateReceipt (recordId, payment) {
    var result = aa.finance.generateReceipt(recordId, payment.getPaymentDate(), payment.getPaymentSeqNbr(), payment.getCashierID(), payment.getRegisterNbr());

    if (!result.getSuccess()) {
      $logger.error('Failed to generate receipt: ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _applyPayment (recordId, paymentSMod, fees, invoices, amounts) {
    var result = aa.finance.applyPayment(recordId, paymentSMod, fees, invoices, amounts, 'PAID', 'PAID', '0');

    if (!result.getSuccess()) {
      $logger.error('Failed to apply payment: ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _processInvoices (invoiceObjs) {
    var fees = [];
    var invoices = [];
    var amounts = [];

    for (var i = 0; i < invoiceObjs.length; i++) {
      var invoiceObj = invoiceObjs[i];
      fees.push(invoiceObj.feeSeq);
      invoices.push(invoiceObj.invoiceNo);
      amounts.push(invoiceObj.amount);
    }

    return {
      fees: fees,
      invoices: invoices,
      amounts: amounts
    };
  }

  return {
    get: function get (recordId, paymentSeq) {
      return _getPayment(recordId, paymentSeq);
    },
    create: function create (recordId, paymentObj) {
      var amount = paymentObj.amount;
      var outstandingAmount = paymentObj.outstandingAmount || 0;
      var charge = paymentObj.charge || 0;
      var paymentDate = paymentObj.date || $date.today();
      var comment = paymentObj.comment || 'Payment made via script';
      var method = paymentObj.method || 'Credit card';
      var transNum = paymentObj.transNum || 0;
      var tranCode = paymentObj.tranCode || 0;
      return _makePayment(recordId, amount, outstandingAmount, charge, comment, method, transNum, tranCode, paymentDate);
    },
    generateReceipt: function generateReceipt (recordId, paymentMod) {
      return _generateReceipt(recordId, paymentMod);
    },
    applyPayment: function applyPayment (recordId, paymentSMod, invoiceObjs) {
      return _applyPayment(recordId, paymentSMod, invoiceObjs.fees, invoiceObjs.invoices, invoiceObjs.amounts);
    }
  };
}();

var $publicUser = function () {
  function _getLinkedContacts (userSeq) {
    var result = aa.people.getUserAssociatedContact(userSeq);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get related contacts for public user for [' + userSeq + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getPublicUser (userId) {
    var result = aa.publicUser.getPublicUserByPUser(userId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get public user model for [' + userId + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getPublicUserByEmail (email) {
    var result = aa.publicUser.getPublicUserByEmail(email);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get public user model for [' + email + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getRefContactNumByEmail (email) {
    var publicUser = $publicUser.getByEmail(email);
    return _getRefContactNum(publicUser);
  }

  function _getRefContactNumById (userId) {
    var publicUser = $publicUser.get(userId);
    return _getRefContactNum(publicUser);
  }

  function _getRefContactNum (publicUser) {
    if (publicUser) {
      var contacts = $publicUser.getContacts(publicUser.getUserSeqNum());
      return contacts != null && contacts.size() > 0 ? contacts.get(0).getContactSeqNumber() + '' : '';
    }

    return '';
  }

  function _getByRefContactId (refContactId) {
    var result = aa.publicUser.getPublicUserListByContactNBR(refContactId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get public user model for [' + refContactId + '] ' + result.getErrorMessage());
      return null;
    }

    var publicUsers = result.getOutput().toArray();
    return publicUsers.length > 0 ? publicUsers[0] : null;
  }

  return {
    get: function get (userId) {
      return _getPublicUser(userId);
    },
    getByEmail: function getByEmail (email) {
      return _getPublicUserByEmail(email);
    },
    getContacts: function getContacts (userSeq) {
      return _getLinkedContacts(userSeq);
    },
    getRefContactNumByEmail: function getRefContactNumByEmail (email) {
      return _getRefContactNumByEmail(email);
    },
    getRefContactNumById: function getRefContactNumById (userId) {
      return _getRefContactNumById(userId);
    },
    getByRefContactId: function getByRefContactId (refContactId) {
      return _getByRefContactId(refContactId);
    }
  };
}();

var $query = function () {
  var MAX_ROWS = 10000;

  function _query (name, params, start, end) {
    var result = aa.genericQuery.query(name, params, start, end);

    if (!result.getSuccess()) {
      $logger.debug('Failed to execute query [' + name + '] ' + result.getErrorMessage());
      return null;
    }

    var queryResult = result.getOutput().getResult() + '';

    if ($common.isEmptyString(queryResult)) {
      return null;
    }

    return JSON.parse(queryResult);
  }

  function _prepareParams (params) {
    var paramList = aa.util.newArrayList();

    for (var i = 0; i < params.length; i++) {
      var paramObj = params[i];

      for (var name in paramObj) {
        var param = aa.genericQuery.getParameterModel(name, paramObj[name]).getOutput();
        paramList.add(param);
      }
    }

    return paramList;
  }

  return {
    get: function get (name, params, start, end) {
      start = start || 0;
      end = end || MAX_ROWS;
      return _query(name, _prepareParams(params), start, end);
    }
  };
}();

var $recipient = function () {
  function _create () {
    return {
      refNum: '',
      name: '',
      email: '',
      mobile: '',
      phone: '',
      preferredMethod: 'Email'
    };
  }

  return {
    byEmails: function byEmails (emails) {
      if ($common.isEmptyArray(emails)) {
        return [];
      }

      return emails.map(function (email) {
        var recipient = _create();

        recipient.email = email;
        return recipient;
      });
    },
    byMobiles: function byMobiles (mobiles) {
      if ($common.isEmptyArray(mobiles)) {
        return [];
      }

      return mobiles.map(function (mobile) {
        var recipient = _create();

        recipient.mobile = mobile;
        return recipient;
      });
    },
    byContacts: function byContacts (contacts) {
      if ($common.isEmptyArray(contacts)) {
        return [];
      }

      return contacts.map(function (contact) {
        var refNum = contact.getRefContactNumber() + '';
        var isIndividul = contact.getGender() + '' !== 'O';
        var name = isIndividul ? contact.getFullName() + '' : contact.getBusinessName() + '';
        var email = contact.getEmail() + '';
        var preferredMethod = contact.getPreferredChannel() + '' === '1' ? 'Email' : 'Post';
        var phone1 = contact.getPhone1CountryCode() + $common.avoidNull(contact.getPhone1()) + '';
        var phone2 = contact.getPhone2CountryCode() + $common.avoidNull(contact.getPhone2()) + '';

        var recipient = _create();

        recipient.refNum = refNum;
        recipient.name = name;
        recipient.email = email;
        recipient.mobile = phone1;
        recipient.phone = phone2;
        recipient.preferredMethod = preferredMethod;
        return recipient;
      });
    }
  };
}();

var $record = function () {
  function _getChildRecords (recordId) {
    var result = aa.cap.getChildByMasterID(recordId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to retrieve child records for [' + recordId + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _filterRecords (records, options) {
    if ($common.isEmptyArray(records)) {
      return [];
    }

    var result = [];
    var type = options && options.type ? options.type : '';
    var status = options && options.status ? options.status : '';
    var returnId = options && options.returnId;
    var includeTemp = options && options.includeTemp;

    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      var recordType = record.getCapType() + '';
      var recordStatus = record.getCapStatus() + '';
      var recordClass = record.getCapClass() + '';

      if (!_matchTypes(recordType, type) || !_matchStatus(recordStatus, status)) {
        continue;
      }

      if (!includeTemp && !_matchStatus(recordClass, 'COMPLETE') && !$common.isEmptyString(recordClass)) {
        continue;
      }

      if (returnId) {
        result.push(record.getCapID());
      } else {
        result.push(record);
      }
    }

    return result;
  }

  function _matchStatus (recordStatus, status) {
    return $common.isEmptyString(status) || recordStatus === status;
  }

  function _matchTypes (recordType, type) {
    return $common.isEmptyString(type) || recordType === type;
  }

  function _getExpiration (recordId) {
    var result = aa.expiration.getLicensesByCapID(recordId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to retrieve expriation info for [' + recordId + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput().getB1Expiration();
  }

  function _setExpiration (expMod) {
    var result = aa.expiration.editB1Expiration(expMod);

    if (!result.getSuccess()) {
      $logger.debug('Failed to update expriation info ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _getWorksDecription (recordId) {
    var result = aa.cap.getCapWorkDesByPK(recordId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to retrieve works description for [' + recordId + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput().getCapWorkDesModel();
  }

  function _edittWorksDecription (worksDescription) {
    var result = aa.cap.editCapWorkDes(worksDescription);

    if (!result.getSuccess()) {
      $logger.debug('Failed to update works description ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _getParentRecords (recordId) {
    var result = aa.cap.getProjectByChildCapID(recordId, null, null);

    if (!result.getSuccess()) {
      $logger.debug('Failed to retrieve parent records for [' + recordId + '] ' + result.getErrorMessage());
      return [];
    }

    var parents = [];
    result.getOutput().forEach(function (p) {
      var parent = $record.getRecord(p.getProjectID());

      if (parent && (parent.getCapClass() + '' === 'COMPLETE' || $common.isEmptyString(parent.getCapClass() + ''))) {
        parents.push(parent);
      }
    });
    return parents;
  }

  return {
    getId: function getId (id) {
      var result = aa.cap.getCapID(id);

      if (!result.getSuccess()) {
        $logger.debug('Failed to retrieve CapIDModel for [' + id + '] ' + result.getErrorMessage());
        return null;
      }

      return result.getOutput();
    },
    getIdByPK: function getIdByPK (id1, id2, id3) {
      var result = aa.cap.getCapID(id1, id2, id3);

      if (!result.getSuccess()) {
        $logger.debug('Failed to retrieve CapIDModel ' + result.getErrorMessage());
        return null;
      }

      return result.getOutput();
    },
    getRecord: function getRecord (recordId) {
      var result = aa.cap.getCapBasicInfo(recordId);

      if (!result.getSuccess()) {
        $logger.debug('Failed to retrieve CapModel for [' + recordId + '] ' + result.getErrorMessage());
        return null;
      }

      return result.getOutput().getCapModel();
    },
    getStatus: function getStatus (recordId) {
      var record = this.getRecord(recordId);
      return record ? record.getCapStatus() + '' : '';
    },
    getParent: function getParent (recordId) {
      var records = _getParentRecords(recordId);

      if (!$common.isEmptyArray(records)) {
        return records[0];
      }

      return null;
    },
    getParents: function getParents (recordId, options) {
      var records = _getParentRecords(recordId);

      return _filterRecords(records, options);
    },
    getChildren: function getChildren (recordId, options) {
      var records = _getChildRecords(recordId);

      return _filterRecords(records, options);
    },
    getModuleName: function getModuleName (recordId) {
      var record = this.getRecord(recordId);
      return record ? record.getModuleName() + '' : '';
    },
    getType: function getType (recordId) {
      var record = this.getRecord(recordId);
      return record.getCapType();
    },
    getRecordDetail: function getRecordDetail (recordId) {
      var result = aa.cap.getCapDetail(recordId);

      if (!result.getSuccess()) {
        $logger.debug('Failed to get record detail for [' + recordId + '] ' + result.getErrorMessage());
        return false;
      }

      return result.getOutput().getCapDetailModel();
    },
    getRecordTypes: function getRecordTypes () {
      var result = aa.cap.getCapTypeList(aa.util.newQueryFormat());
      return result && result.getSuccess() ? result.getOutput() : [];
    },
    editId: function editId (recordId, newId) {
      var result = aa.cap.updateCapAltID(recordId, newId);
      recordId.setCustomID(newId);

      if (!result.getSuccess()) {
        $logger.debug('Failed to update custom id [' + newId + '] ' + result.getErrorMessage());
        return false;
      }

      return true;
    },
    editRecord: function editRecord (record) {
      var result = aa.cap.editCapByPK(record);

      if (!result.getSuccess()) {
        $logger.debug('Failed to update record for [' + record.getCapID() + '] ' + result.getErrorMessage());
        return false;
      }

      return true;
    },
    editStatus: function editStatus (recordId, status, comment, user) {
      var result = aa.cap.updateAppStatus(recordId, 'APPLICATION', status, aa.date.getCurrentDate(), comment, user);

      if (!result.getSuccess()) {
        $logger.debug('Failed to update record status for [' + recordId + '] ' + result.getErrorMessage());
        return false;
      }

      return true;
    },
    editRecordDetail: function editRecordDetail (recordDetail) {
      var result = aa.cap.editCapDetail(recordDetail);

      if (!result.getSuccess()) {
        $logger.debug('Failed to update record detail ' + result.getErrorMessage());
        return false;
      }

      return true;
    },
    addChild: function addChild (parentId, childId) {
      var result = aa.cap.createAppHierarchy(parentId, childId);

      if (!result.getSuccess()) {
        $logger.debug('Failed to add ' + childId + ' as child of ' + parentId + ' ' + result.getErrorMessage());
        return false;
      }

      return true;
    },
    addChildren: function addChildren (parentId, recordIds) {
      if (!$common.isEmptyArray(recordIds)) {
        for (var i = 0; i < recordIds.length; i++) {
          this.addChild(parentId, recordIds[i]);
        }
      }
    },
    covert2ScriptModel: function covert2ScriptModel (recordId) {
      return aa.cap.createCapIDScriptModel(recordId.getID1(), recordId.getID2(), recordId.getID3());
    },
    createRecord: function createRecord (group, type, subtype, category, name, option) {
      name = name || '';
      var result = aa.cap.createApp(group, type, subtype, category, name);

      if (!result.getSuccess()) {
        $logger.debug('Failed to create record ' + result.getErrorMessage());
        return null;
      }

      var recordId = result.getOutput();
      this.createRecordDetail(recordId);
      return recordId;
    },
    createRecordDetail: function createRecordDetail (recordId) {
      var capSModel = aa.cap.newCapScriptModel().getOutput();
      var capDetailModel = capSModel.getCapModel().getCapDetailModel();
      capDetailModel.setCapID(recordId);
      var result = aa.cap.createCapDetail(capDetailModel);

      if (!result.getSuccess()) {
        $logger.debug('Failed to create record detail ' + result.getErrorMessage());
        return false;
      }

      return true;
    },
    "delete": function _delete (recordId) { },
    isCreatedByACA: function isCreatedByACA (recordId) {
      var record = this.getRecord(recordId);
      return record && record.getCreatedByACA() + '' === 'Y';
    },
    removeChild: function removeChild (parentId, recordId) {
      var result = aa.cap.removeAppHierarchy(parentId, recordId);

      if (!result.getSuccess()) {
        return false;
      }

      return true;
    },
    removeChildren: function removeChildren (parentId, recordIds) {
      if (!$common.isEmptyArray(recordIds)) {
        for (var i = 0; i < recordIds.length; i++) {
          this.removeChild(parentId, recordIds[i]);
        }
      }
    },
    setExpiryDate: function setExpiryDate (recordId, expriyDate) {
      var expMod = _getExpiration(recordId);

      expMod.setExpDate(expriyDate);
      return _setExpiration(expMod);
    },
    setDescription: function setDescription (recordId, description) {
      var worksDescription = _getWorksDecription(recordId);

      worksDescription.setDescription(description);

      _edittWorksDecription(worksDescription);
    }
  };
}();

var $refactivity = function () {
  function _addRefActivity (type, name, desc, refType, refId) {
    var refActivityModel = aa.proxyInvoker.newInstance('com.accela.aa.aamain.activityspecinfo.RefActivityModel').getOutput();
    var activityBusiness = aa.proxyInvoker.newInstance('com.accela.aa.aamain.activityspecinfo.ActivitySpecInfoBusiness').getOutput();
    refActivityModel.setServiceProviderCode(aa.getServiceProviderCode());
    refActivityModel.setActivityType(type);
    refActivityModel.setActivityName(name);
    refActivityModel.setActivityDescription(desc);
    refActivityModel.setReferenceType(refType);
    refActivityModel.setReferenceId(refId);
    refActivityModel.setAuditDate($date.today());
    refActivityModel.setAuditid(aa.getAuditID());
    refActivityModel.setAuditStatus('A');
    activityBusiness.createRefActivity(refActivityModel);
  }

  function _getRefActivities (type, name, refType, refId) {
    var activityBusiness = aa.proxyInvoker.newInstance('com.accela.aa.aamain.activityspecinfo.ActivitySpecInfoBusiness').getOutput();
    var activities = activityBusiness.getRefActivitiesByRefrenceId(aa.getServiceProviderCode(), refType, refId, false).toArray();
    var filterActivities = activities.filter(function (act) {
      return act.getActivityType() + '' === type && act.getActivityName() + '' === name;
    });
    return filterActivities;
  }

  function _removeRefActivities (type, name, refType, refId) {
    var activityBusiness = aa.proxyInvoker.newInstance('com.accela.aa.aamain.activityspecinfo.ActivitySpecInfoBusiness').getOutput();

    var activities = _getRefActivities(type, name, refType, refId);

    var ids = [];

    for (var a in activities) {
      ids.push(activities[a].getRefActivityId());
    }

    if (ids.length > 0) activityBusiness.deleteRefActivity(aa.getServiceProviderCode(), refType, ids);
  }

  return {
    add: function add (type, name, desc, refType, refId) {
      _addRefActivity(type, name, desc, refType, refId);
    },
    get: function get (type, name, refType, refId) {
      return _getRefActivities(type, name, refType, refId);
    },
    remove: function remove (type, name, refType, refId) {
      _removeRefActivities(type, name, refType, refId);
    }
  };
}();

var $refcontact = function () {
  return {
    get: function get (id) {
      var result = aa.people.getPeople(id);

      if (!result.getSuccess()) {
        $logger.debug('Failed to get reference contact for [' + id + '] ' + result.getErrorMessage());
        return null;
      }

      return result.getOutput();
    },
    edit: function edit (peopleMod) {
      var result = aa.people.editPeople(peopleMod);

      if (!result.getSuccess()) {
        $logger.debug('Failed to update reference contact ' + result.getErrorMessage());
        return false;
      }

      return result.getOutput();
    }
  };
}();

var $report = function () {
  function _runReport4Record (recordId, name, moudule, param) {
    var report = aa.reportManager.getReportInfoModelByName(name).getOutput();

    if (report == null) {
      return null;
    }

    report.setCapId(recordId);
    report.setModule(moudule);
    report.getEDMSEntityIdModel().setAltId(recordId.getCustomID());
    report.setReportParameters(param);
    var result = aa.reportManager.getReportResult(report);

    if (!result.getSuccess()) {
      $logger.debug('Failed to generate for [' + recordId.getCustomID() + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _saveReport (report) {
    if (report == null) {
      return null;
    }

    var result = aa.reportManager.storeReportToDisk(report);

    if (!result.getSuccess()) {
      $logger.debug('Failed to save report ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput() + '';
  }

  return {
    generate4Record: function generate4Record (recordId, name, moudule, param) {
      return _runReport4Record(recordId, name, moudule, param);
    },
    save: function save (report) {
      return _saveReport(report);
    }
  };
}();

var $sc = function () {
  function _getStandardChoiceDesc (name, key) {
    var result = aa.bizDomain.getBizDomainByValue(name, key);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get standard choice for [' + name + '] ' + result.getErrorMessage());
      return '';
    }

    var bizSMod = result.getOutput();
    return $common.avoidNull(bizSMod.getDescription() + '');
  }

  function _getStandardChoice (name) {
    var result = aa.bizDomain.getBizDomain(name);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get standard choice for [' + name + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput().toArray();
  }

  function _getStandardChoiceValueAndDesc (name) {
    var bizSMods = _getStandardChoice(name);

    var map = {};

    for (var i = 0; i < bizSMods.length; i++) {
      var bizSMod = bizSMods[i];
      var value = $common.avoidNull(bizSMod.getBizdomainValue() + '');
      var desc = $common.avoidNull(bizSMod.getDescription() + '');

      if (!$common.isEmptyString(value)) {
        map[value] = desc;
      }
    }

    return map;
  }

  function _getStandardChoiceValues (name) {
    var bizSMods = _getStandardChoice(name);

    var values = [];

    for (var i = 0; i < bizSMods.length; i++) {
      var bizSMod = bizSMods[i];
      var value = $common.avoidNull(bizSMod.getBizdomainValue() + '');

      if (!$common.isEmptyString(value)) {
        values.push(value);
      }
    }

    return values;
  }

  function _createStandardChoiceValue (name, value, desc) {
    var createDDValue = aa.bizDomain.createBizDomain(name, value, 'A', desc);

    if (createDDValue.getSuccess()) {
      return true;
    }

    return false;
  }

  function _editBizDomain (bizDomain) {
    var result = aa.bizDomain.editBizDomain(bizDomain);

    if (result.getSuccess()) {
      return true;
    }

    return false;
  }

  function _getBizDomainByValue (name, value) {
    var result = aa.bizDomain.getBizDomainByValue(name, value);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get standard choice for [' + name + '] ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _deleteBizDomainValue (name, value) {
    var bizDomainBiz = aa.proxyInvoker.newInstance('com.accela.aa.aamain.systemConfig.BizDomainBusiness').getOutput();
    return bizDomainBiz.deleteBizDomianValue(aa.getServiceProviderCode(), name, value);
  }

  return {
    get: function get (name) {
      return _getStandardChoiceValueAndDesc(name);
    },
    getValues: function getValues (name) {
      return _getStandardChoiceValues(name);
    },
    getDesc: function getDesc (name, value) {
      return _getStandardChoiceDesc(name, value);
    },
    getEnv: function getEnv () {
      var values = $sc.getValues(aa.getServiceProviderCode() + '_ENV');
      return values.length === 1 ? values[0] : 'DEV';
    },
    getModels: function getModels (name) {
      return _getStandardChoice(name);
    },
    getModel: function getModel (name, value) {
      return _getBizDomainByValue(name, value);
    },
    create: function create (name, value, desc) {
      return _createStandardChoiceValue(name, value, desc);
    },
    edit: function edit (bizDomain) {
      return _editBizDomain(bizDomain);
    },
    "delete": function _delete (name, value) {
      return _deleteBizDomainValue(name, value);
    }
  };
}();

var $sys = function () {
  return {
    cancel: function (_cancel) {
      function cancel () {
        return _cancel.apply(this, arguments);
      }

      cancel.toString = function () {
        return _cancel.toString();
      };

      return cancel;
    }(function () {
      cancel = true;
    }),
    enableMessage: function enableMessage () {
      showMessage = true;
    },
    enableDebugMessage: function enableDebugMessage () {
      showDebug = true;
    },
    disableMessage: function disableMessage () {
      showMessage = false;
    },
    disableDebugMessage: function disableDebugMessage () {
      showDebug = false;
    },
    getCurrentUser: function getCurrentUser () {
      return aa.person.getUser(aa.getAuditID()).getOutput();
    }
  };
}();

var $template = function () {
  function _getGenericTemplate (vEntityPK) {
    var result = aa.genericTemplate.getTemplate(vEntityPK);

    if (!result.getSuccess()) {
      return null;
    }

    return result.getOutput();
  }

  function _loadASI (template) {
    var result = {};
    if (!template) return result;
    var formGroupsObj = template.getTemplateForms();

    if (formGroupsObj) {
      formGroupsObj.toArray().forEach(function (form) {
        form.getSubgroups().toArray().forEach(function (subGroup) {
          var sgrpName = subGroup.getSubgroupName() + '';
          result[sgrpName] = {};
          subGroup.getFields().toArray().forEach(function (field) {
            result[sgrpName][field.getFieldName() + ''] = field.getDefaultValue() + '';
          });
        });
      });
    }

    return result;
  }

  function _loadASIT () { }

  function _setASI (gtmp, subGroup, name, value) {
    this.template = gtmp;
    var formGroupsObj = template.getTemplateForms();
    var formGroups = new Array();

    if (formGroupsObj != null) {
      formGroups = formGroupsObj.toArray();

      for (grp in formGroups) {
        var subgroupsObj = formGroups[grp].getSubgroups();

        if (subgroupsObj != null) {
          var subgroups = subgroupsObj.toArray();

          for (sgrp in subgroups) {
            var sgrpName = subgroups[sgrp].getSubgroupName() + '';

            if (sgrpName == subGroup) {
              var fields = subgroups[sgrp].getFields().toArray();

              for (fld in fields) {
                var fieldName = fields[fld].getFieldName() + '';

                if (fieldName == name) {
                  fields[fld].setDefaultValue(value);
                  return;
                }
              }
            }
          }
        }
      }
    }
  }

  function _setASIT () { }

  return {
    getModelByGroupName: function getModelByGroupName (groupName) {
      var result = aa.genericTemplate.getTemplateStructureByGroupName(groupName);

      if (!result.getSuccess()) {
        return null;
      }

      return result.getOutput();
    },
    getModelByPK: function getModelByPK (vEntityPK) {
      return _getGenericTemplate(vEntityPK);
    },
    loadByEntityPK: function loadByEntityPK (vEntityPK) {
      return {
        asi: _loadASI(_getGenericTemplate(vEntityPK))
      };
    },
    setField: function setField (gtmp, subGroup, name, value) {
      _setASI(gtmp, subGroup, name, value);
    }
  };
}();

var $tsi = function () {
  function _getTaskSpecificInfo (recordId, task) {
    var processId = task.getProcessID();
    var step = task.getStepNumber();
    var result = aa.taskSpecificInfo.getTaskSpecificInfoByTask(recordId, processId, step);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get task specific info fields for [' + recordId + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _editTaskSpecificInfo (recordId, task, fields) {
    var tsiMods = _getTaskSpecificInfo(recordId, task);

    var changed = [];

    for (var i = 0; i < tsiMods.length; i++) {
      var tsiMod = tsiMods[i].getTaskSpecificInfoModel();
      var name = tsiMod.getCheckboxDesc() + '';
      var value = fields[name];

      if (typeof value !== 'undefined') {
        tsiMod.setChecklistComment(value);
        changed.push(tsiMod);
      }
    }

    if (!$common.isEmptyArray(changed)) {
      var result = aa.taskSpecificInfo.editTaskSpecInfos(changed);

      if (!result.getSuccess()) {
        $logger.debug('Failed to update task specific info fields : ' + result.getErrorMessage());
        return false;
      }

      return true;
    }

    return false;
  }

  function _conver2Fields (tsiMods) {
    var fields = {};

    for (var i = 0; i < tsiMods.length; i++) {
      var tsiMod = tsiMods[i];
      var name = tsiMod.getCheckboxDesc() + '';
      var type = tsiMod.getFieldType() + '';
      var originalValue = tsiMod.getChecklistComment() + '';
      var value = $FieldHelper.convert($common.avoidNull(originalValue), type);
      fields[name] = new $Field(name, value, type);
    }

    return fields;
  }

  return {
    get: function get (recordId, task, options) {
      var tasks = $workflow.getTasks(recordId, task, options);

      if ($common.isEmptyArray(tasks)) {
        return {};
      }

      return _conver2Fields(_getTaskSpecificInfo(recordId, tasks[0]));
    },
    edit: function edit (recordId, task, fields, options) {
      var tasks = $workflow.getTasks(recordId, task, options);

      if (!$common.isEmptyArray(tasks)) {
        _editTaskSpecificInfo(recordId, tasks[0], fields);
      }
    }
  };
}();

var $user = function () {
  function _getUsers4Department (department) {
    var result = aa.people.getSysUserListByDepartmentName(department);

    if (!result.getSuccess()) {
      return null;
    }

    return result.getOutput();
  }

  function _getUserByName (firstName, middleName, lastName) {
    var result = aa.person.getUser(firstName, middleName, lastName);

    if (!result.getSuccess()) {
      return null;
    }

    return result.getOutput();
  }

  function _getUser (id) {
    var result = aa.person.getUser(id);

    if (!result.getSuccess()) {
      return null;
    }

    return result.getOutput();
  }

  return {
    get: function get (id) {
      return _getUser(id);
    },
    getByName: function getByName (firstName, middleName, lastName) {
      return _getUserByName(firstName, middleName, lastName);
    },
    getByDepartment: function getByDepartment (department) {
      return _getUsers4Department(department);
    },
    isSame: function isSame (user1, user2) {
      return user1.getDeptOfUser() + '' === user2.getDeptOfUser() + '' && $common.avoidNull(user1.getFirstName() + '') === $common.avoidNull(user2.getFirstName() + '') && $common.avoidNull(user1.getMiddleName() + '') === $common.avoidNull(user2.getMiddleName() + '') && $common.avoidNull(user1.getLastName() + '') === $common.avoidNull(user2.getLastName() + '');
    }
  };
}();

var $workflow = function () {
  function _getTasks (recordId, process, name, status, complete, active) {
    var result = aa.workflow.getTaskItems(recordId, name, process, complete, status, active);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get workflow task for [' + recordId + '] ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _editTaskStatus (recordId, task, status, note, comment, actionBy) {
    task.setDisposition(status);
    task.setDispositionDate($date.now());
    task.setStatusDate($date.now());
    task.setDispositionNote(note);
    task.setDispositionComment(comment);
    task.setSysUser(actionBy);
    var result = aa.workflow.handleDisposition(task, recordId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get workflow task status ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _addSubProcess (task, process, required) {
    var result = aa.workflow.insertSubProcess(task, process, required);

    if (!result.getSuccess()) {
      $logger.debug('Failed to add sub workflow process ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _getSubProcess (task) {
    var result = aa.workflow.getProcessRelationByPK(task.getCapID(), task.getStepNumber(), task.getProcessID(), aa.getAuditID());

    if (!result.getSuccess()) {
      $logger.debug('Failed to get sub workflow process ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _activeTask (task) {
    var daysDue = task.getDaysDue() == null ? 0 : task.getDaysDue();
    var today = $date.now();
    today.setDate(today.getDate() + daysDue);
    var result = aa.workflow.adjustTask(task.getCapID(), task.getStepNumber(), task.getProcessID(), 'Y', 'N', null, $date.convertToScriptDate(today));

    if (!result.getSuccess()) {
      $logger.debug('Failed to active workflow task ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _getAssignedUser (task) {
    var assignedUser = task.getAssignedStaff();

    if (!assignedUser) {
      return null;
    }

    var users = $user.getByDepartment(assignedUser.getDeptOfUser());

    if ($common.isEmptyArray(users)) {
      return null;
    }

    for (var i = 0; i < users.length; i++) {
      var user = users[i];

      if ($user.isSame(assignedUser, user)) {
        return user;
      }
    }

    return null;
  }

  function _closeTask (task) {
    var result = aa.workflow.adjustTask(task.getCapID(), task.getStepNumber(), task.getProcessID(), 'N', 'Y', null, null);

    if (!result.getSuccess()) {
      $logger.debug('Failed to deactive workflow task ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _queryTasks (name, status) {
    var result = aa.workflow.getTasks(name, status);

    if (!result.getSuccess()) {
      $logger.debug('Failed to query workflow task ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _getSubTask (recordId, name, processId) {
    var result = aa.workflow.getTaskItemByTaskDes(recordId, name, processId);

    if (!result.getSuccess()) {
      $logger.debug('Failed to get workflow task ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  function _filterTasks (tasks, options) {
    var processId = options && options.processId ? options.processId : null;
    var result = [];

    for (var i = 0; i < tasks.length; i++) {
      var taskSMod = tasks[i];
      var task = taskSMod.getTaskItem();
      var taskProcessId = task.getProcessID() + '';

      if (!$common.isEmptyString(processId) && processId !== taskProcessId) {
        continue;
      }

      result.push(taskSMod);
    }

    return result;
  }

  function _removeSubProcess (task) {
    var result = aa.workflow.removeSubProcess(task);

    if (!result.getSuccess()) {
      $logger.debug('Failed to remove sub process ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _getProcessRelations (recordId) {
    var result = aa.workflow.getProcessRelationByCapID(recordId, aa.util.newQueryFormat());

    if (!result.getSuccess()) {
      $logger.debug('Failed to get workflow task relationship ' + result.getErrorMessage());
      return [];
    }

    return result.getOutput();
  }

  function _assigneTask (task) {
    var result = aa.workflow.assignTask(task);

    if (!result.getSuccess()) {
      $logger.debug('Failed to assign workflow task ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _editTask (task) {
    var result = aa.workflow.editTask(task);

    if (!result.getSuccess()) {
      $logger.debug('Failed to edit workflow task ' + result.getErrorMessage());
      return false;
    }

    return true;
  }

  function _deactivateTask (task) {
    var result = aa.workflow.adjustTask(task.getCapID(), task.getStepNumber(), task.getProcessID(), 'N', 'N', null, null);

    if (!result.getSuccess()) {
      $logger.debug('Failed to deactive workflow task ' + result.getErrorMessage());
      return null;
    }

    return result.getOutput();
  }

  return {
    getTasks: function getTasks (recordId, name, options) {
      var process = options && options.process ? options.process : null;
      var status = options && options.status ? options.status : null;
      var complete = options && options.complete ? 'Y' : null;
      var active = options && options.active ? 'Y' : null;
      return _filterTasks(_getTasks(recordId, process, name, status, complete, active), options);
    },
    getSubTask: function getSubTask (recordId, parentName, name, options) {
      var tasks = this.getTasks(recordId, parentName, options);

      if (!$common.isEmptyArray(tasks)) {
        var subProcess = _getSubProcess(tasks[0].getTaskItem());

        if (subProcess) {
          var subProcessId = subProcess.getProcessID();
          return _getSubTask(recordId, name, subProcessId);
        }
      }

      return null;
    },
    getAssignedUser: function getAssignedUser (task) {
      return _getAssignedUser(task);
    },
    editTaskStatus: function editTaskStatus (recordId, name, status, note, comment, actionBy, options) {
      var tasks = this.getTasks(recordId, name, options);

      if (!$common.isEmptyArray(tasks)) {
        _editTaskStatus(recordId, tasks[0].getTaskItem(), status, note, comment, actionBy);
      }
    },
    assignTask: function assignTask (recordId, name, assignee, options) {
      var tasks = this.getTasks(recordId, name, options);

      if (!$common.isEmptyArray(tasks)) {
        var task = tasks[0].getTaskItem();
        task.setAssignedUser(assignee);

        _assigneTask(task);
      }
    },
    assignSubTask: function assignSubTask (recordId, parentName, name, assignee, options) {
      var taskSMod = this.getSubTask(recordId, parentName, name, options);

      if (taskSMod) {
        var task = taskSMod.getTaskItem();
        task.setAssignedUser(assignee);

        _assigneTask(task);
      }
    },
    activeTask: function activeTask (recordId, name, options) {
      var tasks = this.getTasks(recordId, name, options);

      if (!$common.isEmptyArray(tasks)) {
        _activeTask(tasks[0].getTaskItem());
      }
    },
    activeSubTask: function activeSubTask (recordId, parentName, name) {
      var subTask = this.getSubTask(recordId, parentName, name);

      if (subTask) {
        _activeTask(subTask);
      }
    },
    hasSubProcess: function hasSubProcess (recordId, name, options) {
      var tasks = this.getTasks(recordId, name, options);

      if (!$common.isEmptyArray(tasks)) {
        return _getSubProcess(tasks[0].getTaskItem()) !== null;
      }

      return false;
    },
    addSubProcess: function addSubProcess (recordId, name, subProcess, required) {
      var tasks = this.getTasks(recordId, name);

      if (!$common.isEmptyArray(tasks)) {
        _addSubProcess(tasks[0], subProcess, required);
      }
    },
    closeTask: function closeTask (recordId, name, options) {
      var tasks = this.getTasks(recordId, name, options);

      if (!$common.isEmptyArray(tasks)) {
        _closeTask(tasks[0].getTaskItem());
      }
    },
    closeSubTask: function closeSubTask (recordId, parentName, name) {
      var subTask = this.getSubTask(recordId, parentName, name);

      if (subTask) {
        _closeTask(subTask);
      }
    },
    closeActiveTasks: function closeActiveTasks (recordId) {
      var tasks = this.getTasks(recordId, null, {
        complete: false,
        active: true
      });

      for (var i = 0; i < tasks.length; i++) {
        _closeTask(tasks[i].getTaskItem());
      }
    },
    deactivateTask: function deactivateTask (recordId, name, options) {
      var tasks = this.getTasks(recordId, name, options);

      if (!$common.isEmptyArray(tasks)) {
        _deactivateTask(tasks[0].getTaskItem());
      }
    },
    queryTasks: function queryTasks (name, status) {
      return _queryTasks(name, status);
    },
    getParentTask: function getParentTask (recordId, processCode, processId) {
      var relations = _getProcessRelations(recordId);

      if (!$common.isEmptyArray(relations)) {
        for (var i = 0; i < relations.length; i++) {
          var relation = relations[i];
          var code = relation.getProcessCode() + '';
          var id = relation.getProcessID() + '';

          if (!$common.isEmptyString(processCode) && code !== processCode) {
            continue;
          }

          if (!$common.isEmptyString(processId) && id !== processId) {
            continue;
          }

          var parentProcessId = relation.getParentProcessID() + '';
          var parentTaskName = relation.getParentTaskName() + '';
          var tasks = this.getTasks(recordId, parentTaskName, {
            processId: parentProcessId
          });

          if (!$common.isEmptyArray(tasks)) {
            return tasks[0];
          }
        }
      }

      return null;
    },
    removeSubProcess: function removeSubProcess (recordId, name) {
      var tasks = this.getTasks(recordId, name);

      if (!$common.isEmptyArray(tasks)) {
        _removeSubProcess(tasks[0]);
      }
    },
    editTask: function editTask (task) {
      return _editTask(task);
    }
  };
}();

function $Config () {
  this._env = $sc.getEnv();
}

$Config.prototype.get = function (name, key) {
  var configName = aa.getServiceProviderCode() + '_' + name + '_' + this._env;

  return $sc.getDesc(configName, key);
};

function $Context () {
  this._variables = {};
}

$Context.prototype.get = function (name) {
  return this._variables[name];
};

$Context.prototype.set = function (name, value) {
  this._variables[name] = value;
};

function $Field (name, value, type) {
  this.name = name;
  this.value = value;
  this.type = type || '';
  this.readonly = false;
  this.required = false;
  this.hidden = false;
  this.message = '';
}

$Field.prototype.disable = function () {
  this.readonly = true;
};

$Field.prototype.enable = function () {
  this.readonly = false;
};

$Field.prototype.show = function () {
  this.hidden = true;
};

$Field.prototype.hide = function () {
  this.hidden = false;
};

$Field.prototype.mandatory = function () {
  this.required = true;
};

$Field.prototype.optional = function () {
  this.required = false;
};

$Field.prototype.setMessage = function (message) {
  this.message = message;
};

$Field.prototype.isEmpty = function () {
  return this.value === '';
};

$Field.prototype.equal = function (field) {
  return field && this.value === field.value;
};

$Field.prototype.toString = function () {
  if (typeof this.value === 'string') {
    if ($common.isEmptyString(this.value)) {
      if (this.type === $FieldType.Checkbox) {
        return '';
      } else if (this.type === $FieldType.Redio) {
        return '';
      }
    }

    return this.value;
  }

  var value = '';

  switch (this.type) {
    case $FieldType.Redio:
      value = this.value ? 'Yes' : 'No';
      break;

    case $FieldType.Checkbox:
      value = this.value ? 'CHECKED' : 'UNCHECKED';
      break;

    case $FieldType.Date:
      value = $date.format(this.value);
      break;

    default:
      value = this.value + '';
  }

  return $common.avoidNull(value);
};

$Field.prototype.clone = function () {
  var newField = new $Field(this.name, this.value, this.type);
  newField.readonly = this.readonly;
  newField.required = this.required;
  newField.hidden = this.hidden;
  newField.message = this.message;
  return newField;
};

$Field.prototype.print = function () {
  $logger.info(this.name + ': ' + this.toString());
};

function $Form (entity, subgroup, type) {
  this._entity = entity;
  this._subgroup = subgroup;
  this._type = type || $FormType.Record;
  this._fields = _init(this._entity, this._subgroup, this._type);

  function _init (entity, subgroup, type) {
    if (type === $FormType.Pageflow) {
      return $asi.get4Pageflow(entity, subgroup);
    } else if (type === $FormType.ASB) {
      return $asi.get4ASB(entity, subgroup);
    }

    return $asi.get(entity, subgroup);
  }
}

$Form.prototype.get = function (name) {
  if (!this._fields[name]) {
    $logger.debug('Failed to get field: ' + name);
    return 'undefined';
  }

  return this._fields[name].value;
};

$Form.prototype.edit = function (name, value) {
  var field = this._fields[name];

  if (!field) {
    $logger.debug('Failed to edit field: ' + name);
    return;
  }

  field.value = value;

  if (this._type === $FormType.Pageflow) {
    $asi.edit4Pageflow(this._entity, this._subgroup, field);
  } else if (this._type === $FormType.Record) {
    $asi.edit(this._entity, this._subgroup, field);
  }
};

$Form.prototype.editJSON = function (data) {
  if (!$common.isEmptyObject(data)) {
    for (var name in data) {
      this.edit(name, data[name]);
    }
  }
};

$Form.prototype.copy = function (source, options) {
  var mapping = options && options.mapping ? options.mapping : null;

  for (var targetName in this._fields) {
    var sourceName = targetName;

    if (mapping && !mapping[targetName]) {
      continue;
    }

    if (mapping && mapping[targetName]) {
      sourceName = mapping[targetName];
    }

    this.edit(targetName, source.get(sourceName));
  }
};

$Form.prototype.clear = function (fields) {
  for (var name in this._fields) {
    if ($common.isEmptyArray(fields) || !$common.isEmptyArray(fields) && fields.indexOf(name) > -1) {
      this.edit(name, '');
    }
  }
};

$Form.prototype.equal = function (form) {
  if ($common.isEmptyObject(this._fields)) {
    return false;
  }

  for (var name in this._fields) {
    var field = this._fields[name];

    if (!field.equal(form._fields[name])) {
      return false;
    }
  }

  return true;
};

$Form.prototype.print = function () {
  $logger.info('=======================' + this._subgroup + '======================');

  for (var name in this._fields) {
    this._fields[name].print();
  }
};

function $Logger (env) {
  var BR = '<BR>';
  var self = {};
  self._agency = aa.getServiceProviderCode();
  self._userId = aa.getAuditID();
  self._env = env;
  self._level = $LogLevel.Info;
  self._debug = false;

  function _linebreak () {
    return self._env === $Env.EB || self._env === $Env.Test ? '' : BR;
  }

  function _prefix (type) {
    return type === $LogLevel.Error ? '**ERROR ' : '';
  }

  function _append (msg) {
    debug += msg + '\n';
  }

  function _print (msg) {
    $common.print(msg);
  }

  function _write (msg) {
    java.lang.System.out.println(msg);
  }

  function _message (type, msg) {
    return _prefix(type) + msg + _linebreak();
  }

  function _log (type, msg) {
    if (self._level < type) {
      return;
    }

    var message = _message(type, msg);

    if (self._env === $Env.Test || self._env === $Env.Batch) {
      _print(message);
    } else {
      _append(message);
    }

    if (self._debug) {
      _write(message);
    }
  }

  function _appendMemssage (msg) {
    message += msg + _linebreak();
  }

  function _replaceVariable (msg, args) {
    if ($common.isEmptyArray(args)) {
      return msg;
    }

    return msg.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  }

  this.enableDebug = function () {
    self._debug = true;
    self._level = $LogLevel.Debug;
  };

  this.error = function (msg) {
    msg = _replaceVariable(msg, Array.prototype.slice.call(arguments, 1));

    _log($LogLevel.Error, msg);
  };

  this.warning = function (msg) {
    msg = _replaceVariable(msg, Array.prototype.slice.call(arguments, 1));

    _log($LogLevel.Warning, msg);
  };

  this.info = function (msg) {
    msg = _replaceVariable(msg, Array.prototype.slice.call(arguments, 1));

    _log($LogLevel.Info, msg);
  };

  this.message = function (msg) {
    msg = _replaceVariable(msg, Array.prototype.slice.call(arguments, 1));

    _appendMemssage(msg);
  };

  this.debug = function (msg) {
    msg = _replaceVariable(msg, Array.prototype.slice.call(arguments, 1));

    _log($LogLevel.Debug, msg);
  };

  this.generate = function (msg) {
    return _replaceVariable(msg, Array.prototype.slice.call(arguments, 1));
  };
}

function $Notification (template, type, from, recipients) {
  this._template = template;
  this._type = type;
  this._from = from || null;
  this._recipients = _processRecipients(_convertRecipients(type, recipients)) || [];
  this._variables = aa.util.newHashtable();
  this._files = [];
  this._entity = null;
  this._templateModel = $communication.getNotificationTemplate(template);
  this._useTemplateModel = false;

  function _processRecipients (recipients) {
    var existing = {};
    var result = [];

    for (var i = 0; i < recipients.length; i++) {
      var recipient = recipients[i];
      var refNum = recipient.refNum;
      var name = recipient.name;
      var email = recipient.email;
      var mobile = recipient.mobile;
      var preferredMethod = recipient.preferredMethod;

      if (preferredMethod === 'Post') {
        continue;
      }

      var key = refNum + '$' + name + '$' + email + '$' + mobile;

      if (!existing[key]) {
        existing[key] = true;
        result.push(recipient);
      }
    }

    return result;
  }

  function _convertRecipients (type, recipients) {
    if (!$common.isEmptyArray(recipients) && typeof recipients[0] === 'string') {
      return type === $NotificationType.SMS ? $recipient.byMobiles(recipients) : $recipient.byEmails(recipients);
    }

    return recipients;
  }
}

$Notification.prototype.addAttachments = function (files) {
  for (var i = 0; i < files.length; i++) {
    this._files.push(files[i]);
  }
};

$Notification.prototype.attach2Record = function (recordId) {
  var capSMod = $record.covert2ScriptModel(recordId);
  capSMod.setCustomID(recordId.getCustomID());
  this._entity = capSMod;
};

$Notification.prototype.addVariables = function (variables) {
  for (var key in variables) {
    this._variables.put(key, variables[key]);
  }
};

$Notification.prototype.getEmailContent = function () {
  return $communication.getEmailContent(this._templateModel);
};

$Notification.prototype.setEmailContent = function (content) {
  this._useTemplateModel = true;
  $communication.setEmailContent(this._templateModel, content);
};

$Notification.prototype.send = function () {
  var entityId = this._entity ? this._entity.getCustomID() + '' : null;

  for (var i = 0; i < this._recipients.length; i++) {
    var recipient = this._recipients[i];

    if ($common.isEmptyString(recipient.email) && $common.isEmptyString(recipient.mobile)) {
      continue;
    }

    var refNum = recipient.refNum;
    var name = recipient.name;
    var email = recipient.email;
    var mobile = recipient.mobile;

    if (!$common.isEmptyString(name)) {
      this.addVariables({
        '$Contact.Name$': name
      });
    }

    if (!$common.isEmptyString(refNum)) {
      this.addVariables({
        '$Contact.RefNum$': refNum
      });
    }

    if (!this._useTemplateModel) {
      if (this._type === $NotificationType.SMS) {
        $communication.sendSMS(null, mobile, this._template, this._variables, entityId);
      } else if (this._type === $NotificationType.Email) {
        $communication.sendEamil(this._from, email, '', this._template, this._variables, this._files, entityId);
      }
    } else if (this._useTemplateModel && this._type === $NotificationType.Email) {
      var emailTemplate = this._templateModel.getEmailTemplateModel();

      emailTemplate.setTo(email);
      emailTemplate.setHeader('<invalidTag http-equiv=Content-Type content=text/html; charset=UTF-8>');
      emailTemplate.setContentType('content=text/html; charset=UTF-8');
      $communication.sendMessage(this._templateModel, this._variables, this._files, entityId);
    }
  }
};

function $Table (entity, subgroup, type) {
  this._entity = entity;
  this._subgroup = subgroup;
  this._type = type || $TableType.Event;
  this._rows = _init(this._entity, this._subgroup, this._type);

  function _init (entity, subgroup, type) {
    var table = [];

    if (type === $TableType.Pageflow) {
      table = $asit.get4Pageflow(entity, subgroup);
    } else if (type === $TableType.ASB) {
      table = $asit.get4ASB(entity, subgroup);
    } else {
      table = $asit.get(entity, subgroup);
    }

    var rows = [];

    for (var i = 0; i < table.length; i++) {
      var row = new $Row(table[i]);
      rows.push(row);
    }

    return rows;
  }
}

$Table.prototype.add = function (row) {
  this._rows.push(row);
};

$Table.prototype.addRows = function (rows) {
  if (!$common.isEmptyArray(rows)) {
    this._rows = this._rows.concat(rows);
  }
};

$Table.prototype.addJSON = function (objs) {
  this._rows = this._rows.concat(this.convertJSON2Rows(objs));
};

$Table.prototype.convertJSON2Rows = function (objs) {
  var rows = [];

  for (var i = 0; i < objs.length; i++) {
    var obj = objs[i];
    var fields = [];

    for (var name in obj) {
      fields.push(new $Field(name, obj[name]));
    }

    rows.push(new $Row(fields));
  }

  return rows;
};

$Table.prototype.merge = function (rows, options) {
  var keys = options && options.keys ? options.keys : [];
  var fieldsNotMerge = options && options.fieldsNotMerge ? options.fieldsNotMerge : [];

  var remove = _getRemoveOption(options);

  var add = _getAddOption(options);

  var addedRows = [];
  var removedRows = [];

  if ($common.isEmptyArray(this._rows)) {
    this.addRows(rows);
  } else {
    var cMap = _covert2Map(this._rows, keys);

    var sMap = _covert2Map(rows, keys);

    _mergeMatchedRows(cMap, sMap, fieldsNotMerge);

    if (remove) {
      removedRows = _getUnmatchedRows4Target(cMap, sMap);
    }

    if (add) {
      addedRows = _getUnmatchedRows4Source(cMap, sMap);
    }
  }

  this.addRows(addedRows);
  this.removeRows(removedRows);

  function _mergeMatchedRows (cMap, sMap, fieldsNotMerge) {
    for (var key in sMap) {
      var row = cMap[key];

      if (row) {
        var sRow = sMap[key];
        row.merge(sRow, fieldsNotMerge);
      }
    }
  }

  function _getUnmatchedRows4Source (cMap, sMap) {
    var unmatched = [];

    for (var key in sMap) {
      if (!cMap[key]) {
        unmatched.push(sMap[key]);
      }
    }

    return unmatched;
  }

  function _getUnmatchedRows4Target (cMap, sMap) {
    var unmatched = [];

    for (var key in cMap) {
      if (!sMap[key]) {
        unmatched.push(cMap[key]);
      }
    }

    return unmatched;
  }

  function _covert2Map (rows, keys) {
    var map = {};

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];

      var key = _getUniqueKey(row, keys);

      map[key] = row;
    }

    return map;
  }

  function _getUniqueKey (row, keys) {
    var result = [];

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = row.get(key);
      result.push(value);
    }

    return result.join('$$');
  }

  function _getRemoveOption (options) {
    if (options && options.remove === false) {
      return false;
    }

    return true;
  }

  function _getAddOption (options) {
    if (options && options.add === false) {
      return false;
    }

    return true;
  }
};

$Table.prototype.removeRows = function (removedRows) {
  var i = this._rows.length;

  while (i--) {
    if (_isRemoved(this._rows[i], removedRows)) {
      this._rows.splice(i, 1);
    }
  }

  function _isRemoved (row, removedRows) {
    for (var i = 0; i < removedRows.length; i++) {
      if (removedRows[i].equal(row)) {
        return true;
      }
    }

    return false;
  }
};

$Table.prototype.get = function (criteria) {
  var rows = [];

  for (var i = 0; i < this._rows.length; i++) {
    var row = this._rows[i];

    if (row.matched(criteria)) {
      rows.push(row);
    }
  }

  return rows;
};

$Table.prototype.first = function (criteria) {
  var rows = this.get(criteria);

  if (!$common.isEmptyArray(rows)) {
    return rows[0];
  }

  return null;
};

$Table.prototype.getJSON = function (criteria) {
  var rows = this.get(criteria);
  var data = [];

  for (var i = 0; i < rows.length; i++) {
    data.push(rows[i].toJSON());
  }

  return data;
};

$Table.prototype.mergeJSON = function (objs, options) {
  this.merge(this.convertJSON2Rows(objs), options);
};

$Table.prototype.edit = function (values, criteria) {
  var rows = this.get(criteria);

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    for (var name in values) {
      row.edit(name, values[name]);
    }
  }
};

$Table.prototype.makeReadOnly = function (columns, criteria) {
  var rows = this.get(criteria);

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    columns.forEach(function (name) {
      row.makeReadOnly(name);
    });
  }
};

$Table.prototype.save = function () {
  var table = [];

  for (var i = 0; i < this._rows.length; i++) {
    table.push(this._rows[i]._fields);
  }

  if (this._type === $TableType.Pageflow) {
    $asit.edit4Pageflow(this._entity, this._subgroup, table);
  } else {
    $asit.edit(this._entity, this._subgroup, table);
  }
};

$Table.prototype.getEmptyJSON = function () {
  var result = {};
  var asitModel = null;

  if (this._type === $TableType.Pageflow) {
    asitModel = $asit.getModel4Pageflow(this._entity, this._subgroup);
  } else {
    asitModel = $asit.getModel(this._entity, this._subgroup);
  }

  if (asitModel) {
    var columns = asitModel.getColumns() ? asitModel.getColumns().toArray() : null;

    if (columns) {
      columns.forEach(function (column) {
        result[column.columnName + ''] = '';
      });
    }
  }

  return result;
};

$Table.prototype.exists = function (criteria) {
  var rows = this.get(criteria);
  return rows.length > 0;
};

$Table.prototype.count = function () {
  return this._rows.length;
};

$Table.prototype.clear = function () {
  this._rows = [];
};

$Table.prototype.isEmpty = function () {
  return this._rows.length === 0;
};

$Table.prototype.copy = function (rows, options) {
  var mapping = options && options.mapping ? options.mapping : null;

  if (!$common.isEmptyArray(rows)) {
    if (mapping == null) {
      mapping = rows[0].names();
    }

    var names = [];

    for (var name in mapping) {
      names.push(name);
    }

    for (var i = 0; i < rows.length; i++) {
      var newRow = this.createRow(names);
      newRow.copy(rows[i], mapping);

      this._rows.push(newRow);
    }
  }
};

$Table.prototype.createRow = function (names) {
  var fields = [];

  for (var i = 0; i < names.length; i++) {
    fields.push(new $Field(names[i], ''));
  }

  return new $Row(fields);
};

$Table.prototype.sort = function (name, options) {
  var desc = options && options.desc;
  var type = options && options.type ? options.type : '';

  this._rows.sort(function compare (a, b) {
    var ta = $FieldHelper.convert(a.get(name), type);
    var tb = $FieldHelper.convert(b.get(name), type);

    if (ta === tb) {
      return 0;
    }

    var result = ta > tb ? 1 : -1;
    return desc ? result * -1 : result;
  });
};

$Table.prototype.print = function () {
  for (var i = 0; i < this._rows.length; i++) {
    this._rows[i].print();
  }
};

function $Row (fields) {
  this._fields = _init(fields);

  function _init (fields) {
    var map = {};

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      map[field.name] = field;
    }

    return map;
  }
}

$Row.prototype.matched = function (criteria) {
  if (!criteria) {
    return true;
  }

  for (var name in criteria) {
    var field = this._fields[name];

    if (!field) {
      return false;
    }

    var compareValue = criteria[name];
    var value = field.value;

    if (typeof compareValue === 'string') {
      value = field.toString();
    }

    if (value !== compareValue) {
      return false;
    }
  }

  return true;
};

$Row.prototype.get = function (name) {
  if (!this._fields[name]) {
    $logger.debug('Failed to get field: ' + name);
    return 'undefined';
  }

  return this._fields[name].value;
};

$Row.prototype.edit = function (name, value, readonly) {
  this._fields[name].value = value;

  if (readonly) {
    this._fields[name].readonly = readonly;
  }
};

$Row.prototype.makeReadOnly = function (name) {
  this._fields[name].readonly = true;
};

$Row.prototype.names = function () {
  var names = {};

  for (var name in this._fields) {
    names[name] = name;
  }

  return names;
};

$Row.prototype.toJSON = function () {
  var data = {};

  for (var name in this._fields) {
    data[name] = this._fields[name].toString();
  }

  return data;
};

$Row.prototype.copy = function (source, mapping) {
  for (var targetName in mapping) {
    var sourceName = mapping[targetName];

    if (!$common.isEmptyString(sourceName)) {
      this._fields[targetName] = source._fields[sourceName].clone();
    } else {
      this._fields[targetName] = new $Field(targetName, '');
    }
  }
};

$Row.prototype.merge = function (source, fieldsNotMerge) {
  var names = this.names();

  for (var name in names) {
    if (fieldsNotMerge.indexOf(name) > -1) {
      continue;
    }

    this._fields[name].value = source._fields[name].value;
  }
};

$Row.prototype.equal = function (source) {
  var names = this.names();

  for (var name in names) {
    if (!this._fields[name].equal(source._fields[name])) {
      return false;
    }
  }

  return true;
};

$Row.prototype.print = function () {
  for (var name in this._fields) {
    this._fields[name].print();
  }
};

function $ValidateResult (result, message) {
  this._result = result;
  this._message = message;
}

$ValidateResult.prototype.success = function () {
  return this._result;
};

$ValidateResult.prototype.message = function () {
  return this._message;
};

function $Variable () {
  this._map = {
    Record: {},
    Contact: {},
    ContactName: {},
    WF: {},
    Form: {},
    Table: {}
  };
}

$Variable.prototype.addRecord = function (recordId) {
  var record = $record.getRecord(recordId);
  this._map.Record['ID'] = recordId.getCustomID() + '';
  this._map.Record['Type'] = record.getCapType().getAlias() + '';
  this._map.Record['Status'] = record.getCapStatus() + '';
  var auditDate = $date.convertJava2JS(record.getAuditDate());
  this._map.Record['CreatedDate'] = $date.format(auditDate, $date.AU);
  this._map.Record['CreatedTime'] = $date.format(auditDate, 'hh:mm aaa');
  this._map.Record['Parent.ID'] = '';
  this._map.Record['Parent.Type'] = '';
  this._map.Record['Parent.Status'] = '';
  this._map.Record['Parents'] = '';
  var parents = $record.getParents(recordId);

  if (!$common.isEmptyArray(parents)) {
    var parent = parents[0];
    this._map.Record['Parent.ID'] = parent.getCapID().getCustomID() + '';
    this._map.Record['Parent.Type'] = parent.getCapType().getAlias() + '';
    this._map.Record['Parent.Status'] = parent.getCapStatus() + '';
    this._map.Record['Parents'] = parents.map(function (parent) {
      return parent.getCapID().getCustomID() + '';
    }).join(',');
  }
};

$Variable.prototype.addForm = function () { };

$Variable.prototype.addTable = function () { };

$Variable.prototype.addEnv = function () { };

$Variable.prototype.addWorkflow = function (recordId) {
  var tasks = $workflow.getTasks(recordId, '', {
    active: true
  });

  if (!$common.isEmptyArray(tasks)) {
    var activeTask = tasks[0];
    this._map.WF = _generate(activeTask);
  }

  function _generate (activeTask) {
    var variables = {};
    var assignedUser = $workflow.getAssignedUser(activeTask);
    variables['Assigned.User'] = assignedUser ? $recipient.byEmails([$common.avoidNull(assignedUser.getEmail() + '')]) : '';
    return variables;
  }
};

$Variable.prototype.addContacts = function (recordId) {
  var contacts = $contact.getContacts(recordId);
  var parent = $record.getParent(recordId);
  this._map.Contact = _generate(contacts);

  _addContactNames(this._map.ContactName, contacts);

  if (parent != null) {
    var parentContacts = $contact.getContacts(parent.getCapID());
    $common.copyMap(this._map.Contact, _generate(parentContacts, 'Parent'));

    _addContactNames(this._map.ContactName, parentContacts);
  }

  function _generate (contacts, prefix) {
    var variables = {};

    for (var i = 0; i < contacts.length; i++) {
      var contact = contacts[i];

      var variable = _generateContactVariable(contact);

      if (!variable) {
        continue;
      }

      var key = $common.isEmptyString(prefix) ? variable.key : prefix + '.' + variable.key;

      if (!variables[key]) {
        variables[key] = [];
      }

      variables[key].push(variable.value);
      var primary = contact.getPeople().getFlag() + '' === 'Y';

      if (primary) {
        variables[key + '.Primary'] = [variable.value];
      }
    }

    return variables;
  }

  function _generateContactVariable (contact) {
    var email = contact.getEmail() + '';

    if ($common.isEmptyString(email)) {
      return null;
    }

    var type = contact.getContactType() + '';
    var isIndividul = contact.getGender() + '' !== 'O';
    var name = isIndividul ? contact.getFullName() + '' : contact.getBusinessName() + '';
    var preferredMethod = contact.getPreferredChannel() + '' === '1' ? 'Email' : 'Post';
    var phone1 = contact.getPhone1CountryCode() + $common.avoidNull(contact.getPhone1()) + '';
    var phone2 = contact.getPhone2CountryCode() + $common.avoidNull(contact.getPhone2()) + '';
    return {
      key: type,
      value: {
        refNum: contact.getRefContactNumber() + '',
        email: email,
        name: name,
        preferredMethod: preferredMethod,
        mobile: phone1,
        phone: phone2
      }
    };
  }

  function _addContactNames (contactNames, contacts) {
    contacts.forEach(function (contact) {
      var email = contact.getEmail() + '';

      if (!$common.isEmptyString(email)) {
        var isIndividul = contact.getGender() + '' !== 'O';
        var name = isIndividul ? contact.getFullName() + '' : contact.getBusinessName() + '';
        contactNames[email] = name;
      }
    });
  }
};

$Variable.prototype.toMap = function () {
  var map = {};

  for (var prefix in this._map) {
    var component = this._map[prefix];

    if ($common.isEmptyObject(component)) {
      continue;
    }

    for (var name in component) {
      var value = component[name];
      var key = $VariableHelper.generatekey(prefix, name);
      map[key] = value;
    }
  }

  return map;
};

var $ActivityType = {
  Address: 'ADDRESS',
  Owner: 'OWNER',
  Parcel: 'PARCEL',
  Contact: 'CONTACT',
  Professional: 'PROFESSIONAL'
};
var $Env = {
  Event: 'Event',
  Pageflow: 'Pageflow',
  EB: 'EB',
  Batch: 'Batch',
  Test: 'Test'
};
var $FieldType = {
  Text: '1',
  Date: '2',
  Redio: '3',
  Number: '4',
  Dropdown: '5',
  Textarea: '6',
  Time: '7',
  Money: '8',
  Checkbox: '9'
};
var $FormType = {
  Record: 'Record',
  Pageflow: 'Pageflow',
  Contact: 'Contact',
  RefContact: 'RefContact',
  Workflow: 'Workflow',
  ASB: 'ASB'
};
var $LogLevel = {
  Error: '0',
  Warning: '1',
  Info: '2',
  Debug: '3'
};
var $NotificationType = {
  Email: 'Email',
  SMS: 'SMS',
  Post: 'Post'
};
var $TableType = {
  Record: 'Record',
  Pageflow: 'Pageflow',
  Contact: 'Contact',
  RefContact: 'RefContact',
  ASB: 'ASB'
};
var $FieldHelper = {
  convert: function convert (v, type, opt) {
    var value = '';

    if ($common.isEmptyString(v)) {
      return '';
    }

    switch (type) {
      case $FieldType.Redio:
        value = v === 'Yes';
        break;

      case $FieldType.Checkbox:
        value = v === 'CHECKED';
        break;

      case $FieldType.Date:
        var dateFormat = opt && opt.dateFormat ? opt.dateFormat : $date.US;
        value = $date.parse(v, dateFormat);
        break;

      case $FieldType.Number:
      case $FieldType.Money:
        value = $number.parseFloat(v);
        break;

      default:
        value = v;
    }

    return value;
  }
};
var $VariableHelper = {
  generatekey: function generatekey (prefix, name) {
    return '$' + prefix + '.' + name + '$';
  }
};
var $array = {
  isEmpty: function isEmpty (arr) {
    return arr == null || arr === undefined || arr.length === 0;
  },
  append: function append (existing, newArray) {
    if (!this.isEmpty(newArray)) {
      return existing.concat(newArray);
    }

    return existing;
  },
  removeDuplicates: function removeDuplicates (array) {
    if (this.isEmpty(array)) {
      return [];
    }

    var existing = {};
    var result = [];

    for (var i = 0; i < array.length; i++) {
      var t = array[i];

      if (!existing[t]) {
        result.push(t);
      }
    }

    return result;
  }
};
var $common = {
  isEmptyString: function isEmptyString (str) {
    return str == null || str === '' || str === undefined || str === 'null' || str === 'undefined';
  },
  isEmptyArray: function isEmptyArray (arr) {
    return arr == null || arr === undefined || arr.length === 0;
  },
  isEmptyTable: function isEmptyTable (table) {
    if (table !== undefined && table.length !== undefined && table.length > 0) {
      return false;
    }

    return true;
  },
  isEmptyObject: function isEmptyObject (obj) {
    if (obj == null || obj === undefined) {
      return true;
    }

    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  },
  avoidNull: function avoidNull (str) {
    return this.isEmptyString(str) ? '' : str;
  },
  addPrefixZero: function addPrefixZero (str, size) {
    var s = size || 2;
    var tmp = this.avoidNull(str + '');
    var length = tmp.length;

    for (var i = 0; i < s - length; i++) {
      tmp = '0' + tmp;
    }

    return tmp;
  },
  copyMap: function copyMap (target, source) {
    if (!this.isEmptyObject(source)) {
      for (var key in source) {
        target[key] = source[key];
      }
    }
  },
  deleteFile: function deleteFile (file) {
    if (!this.isEmptyString(file)) {
      aa.util.deleteFile(file);
    }
  },
  deleteFiles: function deleteFiles (files) {
    if (!$common.isEmptyArray(files)) {
      for (var i = 0; i < files.length; i++) {
        $common.deleteFile(files[i]);
      }
    }
  },
  convertJSMap2HashTable: function convertJSMap2HashTable (map) {
    var table = aa.util.newHashtable();

    for (var key in map) {
      table.put(key, map[key]);
    }

    return table;
  },
  convertMap2Array: function convertMap2Array (map) {
    if (this.isEmptyObject(map)) {
      return [];
    }

    var array = [];

    for (var key in map) {
      array.push(map[key]);
    }

    return array;
  },
  print: function print () {
    var len = arguments.length;

    if (len === 1) {
      aa.print(arguments[0]);
    } else if (len === 2) {
      aa.print(arguments[0] + ': ' + arguments[1]);
    } else if (len > 2) {
      var str = arguments[0];

      for (var i = 1; i < len; i++) {
        str += ', ' + arguments[i];
      }

      aa.print(str);
    }
  },
  printObject: function printObject (obj) {
    var _this = this;

    var methods = [];
    var props = [];

    for (var i in obj) {
      var item = obj[i];

      if (typeof item === 'function') {
        methods.push(item.name);
      }

      if (_typeof(item) === 'object') {
        props[i] = item;
      }
    }

    methods.forEach(function (e) {
      return _this.print('function', e);
    });

    for (var k in props) {
      this.print(k, props[k]);
    }
  }
};
var $date = {
  US: 'MM/dd/yyyy',
  AU: 'dd/MM/yyyy',
  US_DATE_TIME: 'MM/dd/yyyy HH:mm',
  AU_DATE_TIME: 'dd/MM/yyyy HH:mm',
  now: function now () {
    return new Date(aa.util.now().getTime());
  },
  today: function today () {
    var date = aa.util.now();
    return new Date(date.getYear() + 1900, date.getMonth(), date.getDate());
  },
  format: function format (d, _format) {
    if ($common.isEmptyString(d)) {
      return '';
    }

    var f = _format || this.US;
    return aa.util.formatDate(d, f) + '';
  },
  toAU: function toAU (d) {
    return this.format(d, this.AU);
  },
  toUS: function toUS (d) {
    return this.format(d, this.US);
  },
  toHHMM: function toHHMM (d) {
    if ($common.isEmptyString(d)) {
      return '00:00';
    }

    return $common.addPrefixZero(d.getHours()) + ':' + $common.addPrefixZero(d.getMinutes());
  },
  parse: function parse (str, format) {
    if ($common.isEmptyString(str)) {
      return null;
    }

    var f = format || this.US;
    var df = new java.text.SimpleDateFormat(f);
    var d = df.parse(str);
    return new Date(d.getTime());
  },
  compare: function compare (d1, d2, opt) {
    return opt && opt.inclusive ? d2.getTime() >= d1.getTime() : d2.getTime() > d1.getTime();
  },
  inRange: function inRange (date, from, to, opt) {
    var equalFrom = opt && opt.from === true;
    var equalTo = opt && opt.to === true;
    return this.compare(from, date, {
      inclusive: equalFrom
    }) && this.compare(date, to, {
      inclusive: equalTo
    });
  },
  convertJS2Java: function convertJS2Java (d) {
    return new java.util.Date(d.getTime());
  },
  convertJava2JS: function convertJava2JS (d) {
    return new Date(d.getTime());
  },
  convertToScriptDate: function convertToScriptDate (d) {
    return aa.date.getScriptDateTime(this.convertJS2Java(d));
  },
  convertScriptDate2JS: function convertScriptDate2JS (d) {
    return new Date(d.getEpochMilliseconds());
  },
  days: function days (year) {
    var cal = aa.util.getCalendar();
    cal.set(1, year);
    return cal.getActualMaximum(6);
  },
  daysOfMonth: function daysOfMonth (year, month) {
    var c = aa.util.getCalendar();
    c.set(year, month - 1, 1);
    return c.getActualMaximum(5);
  },
  isLeapYear: function isLeapYear (year) {
    return this.days(year) === 366;
  },
  calculateDays: function calculateDays (d1, d2, opt) {
    var oneDay = 24 * 60 * 60 * 1000;
    var ignoreLeapYear = opt && opt.leapYear === true;

    if (ignoreLeapYear) {
      var year = 2010;
      var tmpDate1 = new Date(year, d1.getMonth(), d1.getDate());
      var tmpDate2 = new Date(year, d2.getMonth(), d2.getDate());
      return Math.round((tmpDate2.getTime() - tmpDate1.getTime()) / oneDay) + 365 * (d2.getFullYear() - d1.getFullYear());
    }

    var cd1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    var cd2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
    return Math.round((cd2.getTime() - cd1.getTime()) / oneDay);
  },
  universalCompare: function universalCompare (d1, d2) {
    var result = {};
    var flag = 1;

    if (d2.getTime() < d1.getTime()) {
      flag = -1;
    }

    var days = Math.abs(this.calculateDays(d1, d2));
    var tmpYears = Math.abs(d2.getFullYear() - d1.getFullYear());
    var months = Math.abs(d2.getMonth() - d1.getMonth());
    months += tmpYears * 12;
    var year = Math.floor(Math.abs(days) / 365);
    var weeks = Math.floor(days / 7);
    result['Years'] = year * flag;
    result['Months'] = months * flag;
    result['Weeks'] = weeks * flag;
    result['Days'] = days * flag;
    return result;
  },
  getDuration: function getDuration (d1, d2) {
    var start = new Date(d1.getTime());
    var end = new Date(d2.getTime());

    if (d1 > d2) {
      start = new Date(d2.getTime());
      end = new Date(d1.getTime());
    }

    var days = $date.calculateDays(start, end);
    var diffInYears = 0;
    var diffInMonths = 0;
    var diffInDays = 0;
    var year = start.getFullYear();
    var month = 1;

    while (days > 0) {
      var daysOfYear = $date.days(year);

      if (days >= daysOfYear) {
        days = days - daysOfYear;
        diffInYears++;
        year++;
      } else {
        var daysOfMonth = $date.daysOfMonth(year, month);

        if (days >= daysOfMonth) {
          days = days - daysOfMonth;
          diffInMonths++;
          month++;
        } else {
          diffInDays = days;
          break;
        }
      }
    }

    return {
      Years: diffInYears,
      Months: diffInMonths,
      Days: diffInDays
    };
  },
  hasOverLap: function hasOverLap (start1, end1, start2, end2) {
    return !(end1.getTime() < start2.getTime() || end2.getTime() < start1.getTime());
  },
  editDate: function editDate (date, year, month, day) {
    var _year = year || 0;

    var _month = month || 0;

    var _day = day || 0;

    var d = new Date(date.getTime());
    d.setFullYear(d.getFullYear() + _year);
    d.setMonth(d.getMonth() + _month);
    d.setDate(d.getDate() + _day);
    return d;
  }
};
var $math = {
  add: function add (a, b) {
    var len = arguments.length;
    var result = aa.util.add(a, b);

    if (len > 2) {
      for (var i = 2; i < len; i++) {
        result = aa.util.add(arguments[i], result);
      }
    }

    return result;
  },
  subtract: function subtract (a, b) {
    return aa.util.subtract(a, b);
  },
  multiply: function multiply (a, b) {
    return aa.util.multiply(a, b);
  },
  divide: function divide (a, b, scale) {
    var s = scale || 2;
    return aa.util.divide(a, b, s);
  },
  round: function round (a, scale) {
    var s = scale || 2;
    return aa.util.round(a, s);
  }
};
var $number = {
  parseInt: function parseInt (a) {
    return isNaN(a) || $common.isEmptyString(a) ? 0 : parseFloat(a);
  },
  parseFloat: function (_parseFloat) {
    function parseFloat (_x) {
      return _parseFloat.apply(this, arguments);
    }

    parseFloat.toString = function () {
      return _parseFloat.toString();
    };

    return parseFloat;
  }(function (a) {
    return isNaN(a) || $common.isEmptyString(a) ? 0 : parseFloat(a);
  }),
  formatFee: function formatFee (a) {
    return aa.util.formatFee(a) + '';
  },
  formatNumber: function formatNumber (a) {
    return aa.util.numberFormat(a) + '';
  },
  compare: function compare (a, b) {
    return aa.util.compare(a, b);
  },
  inRange: function inRange (val, min, max, opt) {
    var inclusiveMin = opt && opt.min === true;
    var inclusiveMax = opt && opt.max === true;
    return (min == null || inclusiveMin && min <= val || min < val) && (max == null || inclusiveMax && val <= max || val < max);
  }
};
var $tools = {
  generateRecordTypesMapping: function generateRecordTypesMapping () {
    var recordTypes = $record.getRecordTypes();

    for (var i = 0; i < recordTypes.length; i++) {
      var recordType = recordTypes[i].getCapType();
      var group = recordType.getGroup() + '';
      var type = recordType.getType() + '';
      var subType = recordType.getSubType() + '';
      var category = recordType.getCategory() + '';
      var alias = recordType.getAlias() + '';
      $common.print(group + '/' + type + '/' + subType + '/' + category, alias.replace(/\s|-/g, ''));
    }
  }
};