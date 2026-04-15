/* -------------- Load scripts -------------- */
function loadCustomScript (vScriptName) {
  var emseBiz = aa.proxyInvoker.newInstance('com.accela.aa.emse.emse.EMSEBusiness').getOutput()
  var emseScript = emseBiz.getAgencyScript(aa.getServiceProviderCode(), vScriptName.toUpperCase())
  if (emseScript) {
    return emseScript.getScriptText() + ''
  } else {
    return ''
  }
}
/* eslint-disable no-eval */
eval(loadCustomScript('Framework'))

/* -------------- Global variables -------------- */
var message = ''
var debug = ''
var showMessage = true
var showDebug = false
var cancel = false

var GLOBAL_PUBLICUSER_ID = aa.env.getValue('CurrentUserID')

var record = aa.env.getValue('CapModel')
var recordId = record.getCapID()
var recordType = record.getCapType() + ''
var $logger = new $Logger($Env.Pageflow)


var asptest = new $Form(record, 'ASP TEST', $FormType.Pageflow)
asptest.edit('dropdown list','ValueNotInList')

var asptestASIT = new $Table(record, 'ASP TEST', $TableType.Pageflow)
asptestASIT.clear()
var Test1 = new $Field('Test1', '')
var dropdownlist = new $Field('dropdown list', 'ValueNotInList')
asptestASIT.add(new $Row([Test1, dropdownlist]))
asptestASIT.save()
