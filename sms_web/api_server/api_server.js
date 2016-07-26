var express = require('express');
var bodyParser = require('body-parser');
var app = express()
  , fixtures = require('./fixtures');

var server = require('http').createServer(app);
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

//allow custom header and CORS
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /*让options请求快速返回*/
  }
  else {
    next();
  }
});

// 对网站首页的访问返回 "Hello World!" 字样
app.get('/smsApi/', function (req, res) {
  res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/smsApi/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/smsApi/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/smsApi/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

var server = app.listen(19000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

//测试GET数据
app.get('/smsApi/getList', function (req, res) {	
  res.send(fixtures.users);
});

/*用户登录*/
app.post('/smsApi/login.do', function (req, res) {
  var response;
  var userName = req.body.userName;
  if(userName == 'admin'){
    response = {'code': 'S_OK', 'errorCode': '', 'msg':'success', 'var': {'powerList': fixtures.permissionCJ , 'userId': '1', "userName": userName, 'userRealName': '超级管理员', isSuperAdmin: true, needModPwd: 0, sid: '1457asd45asd45asd8dasdas'}};
  }else if(userName == 'system'){
    response = {'code': 'S_OK', 'errorCode': '', 'msg':'success', 'var': {'powerList': fixtures.permissionXT , 'userId': '2', "userName": userName, 'userRealName': '系统管理员', isSuperAdmin: false, needModPwd: 1, sid: '1457asd45asd45asd8dasdas'}};
  }else if(userName == 'user'){
    response = {'code': 'S_OK', 'errorCode': '', 'msg':'success', 'var': {'powerList': fixtures.permissionPT , 'userId': '3', "userName": userName, 'userRealName': '测试用户', isSuperAdmin: false, needModPwd: 0, sid: '1457asd45asd45asd8dasdas'}};
  }else{
    response = {'code': 'FAIL', 'errorCode': 'err_007', 'msg':'account forbid login', 'var': {'powerList': [], isSuperAdmin: false, needModPwd: 0, sid: ''}};
  }
  // console.log(response);
  // console.log(req.params);
  // console.log(req.query);
  // console.log(req.body);
  res.send(response);
});

/*用户注销*/
app.post('/smsApi/logout.do', function (req, res) {
  res.send( {'code': 'S_OK', 'errorCode': '', 'msg':'用户注销成功'});
});

/*导入联系人*/
app.post('/smsApi/uploadSmsAddr.do', function (req, res) {
  res.send({"code": "S_OK", "errorCode": "", "msg": "导入联系人成功", "var": { "addrList": fixtures.exportAddrList}});
});

/*导入通讯录联系人*/
app.post('/smsApi/uploadAddrList.do', function (req, res) {
  res.send({"code": "S_OK", "errorCode": "", "msg": "导入通讯录联系人成功", "var": ""});
});

/*导入黑名单*/
app.post('/smsApi/uploadBlackList.do', function (req, res) {
  res.send({"code": "S_OK", "errorCode": "", "msg": "导入黑名单成功", "var": []});
});

/*导入关键字*/
app.post('/smsApi/uploadSensitiveWord.do', function (req, res) {
  res.send({"code": "S_OK", "errorCode": "", "msg": "导入关键字成功", "var": []});
});

/*请求数据接口*/
app.post('/smsApi/data.do', function (req, res) {
  // console.log(req.params);
  // console.log(req.query);
  // console.log(req.body);
  var response = '';
  switch(req.query.func){
    case 'user:addUser': //添加用户
      response = {'code': 'S_OK', 'errorCode': '', 'msg':'添加用户成功'};
      break;
    case 'user:manageUserStatus': //启停用
      response = {'code': 'S_OK', 'errorCode': '', 'msg':'启停用成功', "var": { "userStatus":0} };
      break;
    case 'role:getRoleList': //获取角色列表
      response = {'code': 'S_OK', 'errorCode': '', 'msg':'角色列表', "var": {'listCount': 3, 'roleList': fixtures.roleList}};
      break;
    case 'company:getCompanyList'://获取公司列表
      response = {'code': 'S_OK', 'errorCode': '', 'msg':'公司列表', "var": {'listCount': 5, 'companyList': fixtures.companyList}};
      break;      
    case 'company:delCompany':
      response = {"code": "S_OK", "errorCode": "", "msg": "公司删除成功！", "var": ""};
      break;
    case 'company:addCompany':
      response = {"code": "S_OK", "errorCode": "", "msg": "公司添加成功！", "var": ""};
      break;
    case 'company:addSmsMmsData':
      response = {"code": "S_OK", "errorCode": "", "msg": "公司短信量增加成功！", "var": ""};
      break;
    case 'company:getSmsMmsData':
      response = {"code": "S_OK", "errorCode": "", "msg": "公司短信使用情况", "var": {"smsUsage": 12000,"mmsUsage": 6000,"smsRemain": 18000,"mmsRemain": 9000, "smsWaitSend": 103,"mmsWaitSend": 0}};
      break;      
    case 'user:getAllUser'://获取用户列表
      response = {"code": "S_OK", "errorCode": "", "msg": "用户列表", "var": {'listCount': 16, 'userList': fixtures.userList}};
      break;
    case 'user:isUserExist':
      response = {"code": "S_OK", "errorCode": "", "msg": "添加成功！", "var": {"isUserExist": false}};
      break;
    case 'user:addUser':
      response = {"code": "S_OK", "errorCode": "", "msg": "添加成功！", "var": ""};
      break;
    case 'user:manageUser':
      response = {"code": "S_OK", "errorCode": "", "msg": "用户修改成功！", "var": ""};
      break;
    case 'user:manageUserPwd':
      response = {"code": "S_OK", "errorCode": "", "msg": "密码修改成功！", "var": ""};
      break;
    case 'user:delUser':
      response = {"code": "S_OK", "errorCode": "", "msg": "删除成功！", "var": ""};
      break;
    case 'user:getUserInfo':
      response = {'code': 'S_OK', 'errorCode': '', 'msg': '获取用户信息', "var": {'userName': req.body.userName, 'phone': '13011112222'}};
      break;
    case 'user:modUserInfo':
      response = {"code": "S_OK", "errorCode": "", "msg": "用户信息修改成功！", "var": ""};
      break;
    case 'role:setRole':
      response = {"code": "S_OK", "errorCode": "", "msg": "角色权限修改", "var": ""};
      break;
    case 'role:getModels':      
      response = {"code": "S_OK", "errorCode": "", "msg": "获取角色权限", "var": {"companyId":1,"createTime":"2016-05-18 18:12:35", "modelList": fixtures.roleModels, "roleId":1, "roleName":"系统管理员","roleType":2}};
      break;
    case 'role:getRole':
      response = {"code": "S_OK", "errorCode": "", "msg": "获取角色权限", "var": {"companyId":1,"createTime":"2016-05-18 18:12:35", "modelList": fixtures.rolePermiss, "roleId":1, "roleName":"系统管理员","roleType":2}};
      break;
    case 'sms:getSmsTemplate':
      response = {"code": "S_OK", "errorCode": "", "msg": "获取短信模板", "var": {"companyId":1, "listCount":5, "tempList": fixtures.templateList}};
      break;
    case 'sms:addSms':
      response = {"code": "S_OK", "errorCode": "", "msg": "短信发送保存成功", "var": ""};
      break;
    case 'addr:companyAddr':
      response = {"code": "S_OK", "errorCode": "", "msg": "企业通讯录", "var": {"companyId":1, "companyName": "南方电网公司", "groupId": 12, "userCount":1260, "companyAddr": fixtures.companyAddr}};
      break;
    case 'addr:personAddr':
      response = {"code": "S_OK", "errorCode": "", "msg": "个人通讯录", "var": {"userCount":123, "personAddr": fixtures.personAddr}};
      break;
    case 'addr:searchContact':
      response = {"code": "S_OK", "errorCode": "", "msg": "通讯录搜索", "var": {"listCount":32, "contactList": fixtures.searchContact}};
      break;
    case 'addr:setCompanyGroup':
      response = {"code": "S_OK", "errorCode": "", "msg": "企业通讯录修改成功", "var": ""};
      break;
    case 'addr:setPersonGroup':
      response = {"code": "S_OK", "errorCode": "", "msg": "个人通讯录修改成功", "var": ""};
      break;
    case 'addr:setCompanyAddr':
      response = {"code": "S_OK", "errorCode": "", "msg": "企业联系人修改成功", "var": ""};
      break;
    case 'addr:setPersonAddr':
      response = {"code": "S_OK", "errorCode": "", "msg": "个人联系人修改成功", "var": ""};
      break;
    case 'sms:getDraftList':
      response = {"code": "S_OK", "errorCode": "", "msg": "草稿箱列表", "var": {"listCount":23, "smsList": fixtures.draftsList}};
      break;
    case 'sms:editDraft':
      response = {"code": "S_OK", "errorCode": "", "msg": "编辑草稿箱", "var": {"contentUuid": req.body.contentUuid, "content": "尊敬的[uname]先生/女士，您好！感谢您使用我们的短信平台！[signature]", "signature":"南网", "phoneList": fixtures.exportAddrList}};
      break;
    case 'sms:delDraft':
      response = {"code": "S_OK", "errorCode": "", "msg": "短信删除成功", "var": ""};
      break;
    case 'sms:sendDraft':
      response = {"code": "S_OK", "errorCode": "", "msg": "短信发送成功", "var": ""};
      break;
    case 'sms:delTask':
      response = {"code": "S_OK", "errorCode": "", "msg": "任务删除成功", "var": ""};
      break;
      case 'sms:editTask':
      response = {"code": "S_OK", "errorCode": "", "msg": "任务修改成功", "var": ""};
      break;
    case 'sms:getTaskList':
      response = {"code": "S_OK", "errorCode": "", "msg": "短信发送成功", "var": {"listCount":35, "smsList": fixtures.smsTaskList}};
      break;
    case 'sms:getRecieveSmsList':
      response = {"code": "S_OK", "errorCode": "", "msg": "收信列表", "var": {"listCount":25, "smsList": fixtures.receiveList}};
      break;
    case 'sms:getSmsSendRecordList':
      response = {"code": "S_OK", "errorCode": "", "msg": "发信记录列表", "var": {"listCount":58, "smsList": fixtures.recordList}};
      break;
    case 'sms:recordDetail':
      response = {"code": "S_OK", "errorCode": "", "msg": "已发送详情", "var": {"contentUuid": req.body.contentUuid, "content": "尊敬的[uname]先生/女士，您好！感谢您使用我们的短信平台！[signature]", "signature":"南网", "phoneList": fixtures.exportAddrList}};
      break;
    case 'sms:resendFailSms':
      response = {"code": "S_OK", "errorCode": "", "msg": "短信发送成功", "var": ""};
      break;
    case 'sms:addTemplate':
      response = {"code": "S_OK", "errorCode": "", "msg": "短信模板添加成功", "var": ""};
      break;
    case 'sms:editTemplate':
      response = {"code": "S_OK", "errorCode": "", "msg": "短信模板修改成功", "var": ""};
      break;
    case 'sms:delTemplate':
      response = {"code": "S_OK", "errorCode": "", "msg": "短信模板删除成功", "var": ""};
      break;
    case 'sms:getReplaceTagList':
      response = {"code": "S_OK", "errorCode": "", "msg": "短信模板标签", "var": {"listCount":2, "tagList": fixtures.tempTagsList}};
      break;
    case 'notice:getNoticeList':
      response = {"code": "S_OK", "errorCode": "", "msg": "公告列表", "var": {"listCount":6, "noticeList": fixtures.noticeList}};
      break;
    case 'notice:addNotice':
      response = {"code": "S_OK", "errorCode": "", "msg": "公告添加成功", "var": ""};
      break;
    case 'notice:editNotice':
      response = {"code": "S_OK", "errorCode": "", "msg": "公告修改成功", "var": ""};
      break;
    case 'notice:delNotice':
      response = {"code": "S_OK", "errorCode": "", "msg": "公告删除成功", "var": ""};
      break;
    case 'actionlog:getActionLogList':
      response = {"code": "S_OK", "errorCode": "", "msg": "日志列表", "var": {"listCount":150, "logList": fixtures.logsList}};
      break;
    case 'black:getBlackList':
      response = {"code": "S_OK", "errorCode": "", "msg": "黑名单列表", "var": {"listCount":120, "blackList": fixtures.blackList}};
      break;
    case 'black:addBlackList':
      response = {"code":"S_OK","errorCode":"","msg":"添加成功","var":{"blackId": 101,"phone": req.body.phone}};
      break;
    case 'black:delBlackList':
      response = {"code":"S_OK","errorCode":"","msg":"删除成功","var":""};
      break;
    case 'black:getAllBlackPhone':
      response = {"code":"S_OK","errorCode":"","msg":"删除成功","var":{"blackList":["13246635067","13246635065","13246635074"]}};
      break;      
    case 'sms:getSmsStatusCount':
      response = {"code":"S_OK","errorCode":"","msg":"发信状态统计","var":{"countAll":470000, "countSuccess":450000,"countFail": 20000}};
      break;
    case 'sms:getSmsSendCount':
      response = {"code":"S_OK","errorCode":"","msg":"发信统计","var":{"countAll":4500,"countList": fixtures.SmsSendCount}};
      break;
    case 'sms:getSmsRecieveCount':
      response = {"code":"S_OK","errorCode":"","msg":"收信统计","var":{"countAll":1200,"countList": fixtures.SmsRecieveCount}};
      break;
    case 'packages:getPackageList':
      response = {"code":"S_OK","errorCode":"","msg":"套餐列表","var":{"listCount":3,"packageList": fixtures.packageList}};
      break;
    case 'packages:addPackage':
      response = {"code":"S_OK","errorCode":"","msg":"套餐添加成功","var":""};
      break;
    case 'packages:delPackage':
      response = {"code":"S_OK","errorCode":"","msg":"套餐删除成功","var":""};
      break;
    case 'access:getIPAccessList':
      response = {"code":"S_OK","errorCode":"","msg":"IP接入列表","var":{"listCount":3,"ipAccessList": fixtures.ipAccessList}};
      break;
    case 'config:getConfigList':
      response = {"code":"S_OK","errorCode":"","msg":"其他配置项","var": fixtures.configList[req.body.configType]};
      break;
    case 'access:addIPAccess':
      response = {"code":"S_OK","errorCode":"","msg":"接入IP添加成功","var":""};
      break;
    case 'access:delIPAccess':
      response = {"code":"S_OK","errorCode":"","msg":"接入IP删除成功","var":""};
      break;
    case 'config:saveConfig':
      response = {"code":"S_OK","errorCode":"","msg":"配置保存成功","var":""};
      break;
    case 'config:getSensitiveWordList':
      response = {"code":"S_OK","errorCode":"","msg":"获取非法关键字","var":{"wordList":["党","毛","习近平"]}};
      break;
    case 'data:getMonitorData':
      response = {"code":"S_OK","errorCode":"","msg":"服务及接口状态","var": fixtures.monitorData};
      break;
    case 'sensitive:getSensitiveWordList':
      response = {"code":"S_OK","errorCode":"","msg":"关键字列表", "var":{"listCount":13, "wordList": fixtures.sensitiveWordList}};
      break;
    case 'sensitive:delSensitiveWord':
      response = {"code":"S_OK","errorCode":"","msg":"关键字删除成功","var":""};
      break;
    // case '':
    //   response = 
    //   break;
    // case '':
    //   response = 
    //   break;
    default:
      response = {'code': 'FAIL', 'errorCode': 'err_001', 'msg':'interface does not exist'};
      break;
  }
  res.send(response);
});

