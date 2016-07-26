/*用户权限*/
exports.permissionCJ = ["HOME_PAGE","HOME_SERVICE_INFO","HOME_SMS_COUNT","SMS_MANAGEMENT","SMS_SENT","SMS_SENT_RECORD","SMS_TEMPLATES","SMS_RECEIVE","MMS_MANAGEMENT","MMS_SENT","MMS_SENT_RECORD","MMS_RECEIVE","DATA_MANAGEMENT","DATA_MANAGEMENT_ALL","DATA_MANAGEMENT_SELF","SYS_MANAGEMENT","USER_MANAGEMENT","USER_MANAGEMENT_XT","USER_MANAGEMENT_PT","ROLE_MANAGEMENT","ROLE_MANAGEMENT_EDIT","TASK_MANAGEMENT","CONTACT_MANAGEMENT","CONTACT_MANAGEMENT_VIEW","CONTACT_MANAGEMENT_EDIT","PIPE_MANAGEMENT","LOG_MANAGEMENT","LOG_MANAGEMENT_VIEW","LOG_MANAGEMENT_EXPORT","NOTICE_MANAGEMENT","NOTICE_MANAGEMENT_VIEW","NOTICE_MANAGEMENT_EDIT","MONITORING_MANAGEMENT","MONITORING_SMS","MONITORING_SERVICE","MONITORING_DATA","SYS_CONFIG","BLACK_MANAGEMENT"];
exports.permissionXT = ["HOME_PAGE","HOME_SERVICE_INFO","HOME_SMS_COUNT","SMS_MANAGEMENT","SMS_SENT","SMS_SENT_RECORD","SMS_TEMPLATES","SMS_RECEIVE","MMS_MANAGEMENT","MMS_SENT","MMS_SENT_RECORD","MMS_RECEIVE","DATA_MANAGEMENT","DATA_MANAGEMENT_ALL","DATA_MANAGEMENT_SELF","SYS_MANAGEMENT","USER_MANAGEMENT","USER_MANAGEMENT_PT","ROLE_MANAGEMENT","ROLE_MANAGEMENT_EDIT","CONTACT_MANAGEMENT","CONTACT_MANAGEMENT_VIEW","CONTACT_MANAGEMENT_EDIT","PIPE_MANAGEMENT","LOG_MANAGEMENT","LOG_MANAGEMENT_VIEW","LOG_MANAGEMENT_EXPORT","NOTICE_MANAGEMENT","NOTICE_MANAGEMENT_VIEW","NOTICE_MANAGEMENT_EDIT","MONITORING_MANAGEMENT","MONITORING_SMS","MONITORING_SERVICE","MONITORING_DATA","BLACK_MANAGEMENT"];
exports.permissionPT = ["HOME_PAGE","HOME_SERVICE_INFO","HOME_SMS_COUNT","SMS_MANAGEMENT","SMS_SENT","SMS_SENT_RECORD","SMS_RECEIVE","MMS_MANAGEMENT","MMS_SENT","MMS_SENT_RECORD","MMS_RECEIVE","DATA_MANAGEMENT","DATA_MANAGEMENT_SELF","SYS_MANAGEMENT","CONTACT_MANAGEMENT","CONTACT_MANAGEMENT_VIEW","LOG_MANAGEMENT","LOG_MANAGEMENT_VIEW","LOG_MANAGEMENT_EXPORT","NOTICE_MANAGEMENT","NOTICE_MANAGEMENT_VIEW","MONITORING_MANAGEMENT","MONITORING_SMS","MONITORING_SERVICE","MONITORING_DATA"];


/*角色列表*/
exports.roleList = [	
	{"companyId":1,"createTime":"2016-05-25 16:12:59","roleId":4,"roleName":"系统管理员角色4","roleType":2},
	{"companyId":1,"createTime":"2016-05-25 16:07:07","roleId":3,"roleName":"系统管理员角色","roleType":2},
	{"companyId":1,"createTime":"2016-05-18 18:12:35","roleId":1,"roleName":"超级管理员","roleType":1},
	{"companyId":1,"createTime":"2016-05-22 17:20:23","roleId":2,"roleName":"系统管理员","roleType":2},
	{"companyId":1,"createTime":"2016-05-25 16:46:00","roleId":5,"roleName":"普通管理员","roleType":3}
];

/*公司列表*/
exports.companyList = [
	{"comDesc":"南方电网测试数据","comId":1,"comName":"南方电网公司","createTime":"2016-05-22 15:34:02","isDel":0,"packId":1, "packName":"套餐一", "smsTotal": 10000, "mmsTotal":5000, "smsRemain": 20000, "mmsRemain": 10000, "mobileSmsTotal":20000,"unicomSmsTotal":30000,"telcomSmsTotal":4000,"mobileMmsTotal":5000,"unicomMmsTotal":8000,"telcomMmsTotal":1000,"mobileSmsRemain":20000,"unicomSmsRemain":30000,"telcomSmsRemain":4000,"mobileMmsRemain":5000,"unicomMmsRemain":8000,"telcomMmsRemain":1000},
	{"comDesc":"深圳电网测试数据","comId":2,"comName":"深圳电网公司","createTime":"2016-05-22 17:13:58","isDel":0,"packId":1, "packName":"套餐二", "smsTotal": 12000, "mmsTotal":6000, "smsRemain": 18000, "mmsRemain": 9000, "mobileSmsTotal":20000,"unicomSmsTotal":30000,"telcomSmsTotal":4000,"mobileMmsTotal":5000,"unicomMmsTotal":8000,"telcomMmsTotal":1000,"mobileSmsRemain":20000,"unicomSmsRemain":30000,"telcomSmsRemain":4000,"mobileMmsRemain":5000,"unicomMmsRemain":8000,"telcomMmsRemain":1000},
	{"comDesc":"广东电网测试数据","comId":3,"comName":"广东电网公司","createTime":"2016-05-22 17:13:58","isDel":0,"packId":1, "packName":"套餐二", "smsTotal": 12000, "mmsTotal":6000, "smsRemain": 18000, "mmsRemain": 9000, "mobileSmsTotal":20000,"unicomSmsTotal":30000,"telcomSmsTotal":4000,"mobileMmsTotal":5000,"unicomMmsTotal":8000,"telcomMmsTotal":1000,"mobileSmsRemain":20000,"unicomSmsRemain":30000,"telcomSmsRemain":4000,"mobileMmsRemain":5000,"unicomMmsRemain":8000,"telcomMmsRemain":1000}
];

/*测试数据*/
exports.users = [
  {userId: 1, vendorId: 1, userName: '张三', email: 'zhangsan@sina.com', phone: '12345678', mobile: '12345678', status: 1, version: 12},
  {userId: 2, vendorId: 1, userName: '李四', email: 'lisi@sina.com', phone: '12345678', mobile: '12345678', status: 1, version: 12},
  {userId: 3, vendorId: 1, userName: '王五', email: 'wangwu@sina.com', phone: '12345678', mobile: '12345678', status: 0, version: 12}
];

/*公告管理*/
exports.noticeList= [
	{"noticeId": 1,"creator": "admin","noticeTitle": "站点更新期间将影响到部分用户，请见谅1111","noticeContent": "站点更新期间将影响到部分用户，请见谅,标题内容1111，站点更新期间将影响到部分用户，请见谅,标题内容1111，站点更新期间将影响到部分用户，请见谅,标题内容1111，站点更新期间将影响到部分用户，请见谅,标题内容1111","createTime": "2016-05-31 11:12:00"},
	{"noticeId": 2,"creator": "admin","noticeTitle": "站点更新期间将影响到部分用户部分用户请见谅2222","noticeContent": "站点更新期间将影响到部分用户，请见谅,标题内容22221wsa","createTime": "2016-05-31 11:12:00"},
	{"noticeId": 3,"creator": "admin","noticeTitle": "站点更新期间将影响到部分用户，请见谅3333","noticeContent": "站点更新期间将影响到部分用户，请见谅,标题内容2222das","createTime": "2016-05-31 11:12:00"},
	{"noticeId": 4,"creator": "admin","noticeTitle": "站点更新期间将影响到部分用户，请见谅4444","noticeContent": "站点更新期间将影响到部分用户，请见谅,标题内容2222","createTime": "2016-05-31 11:12:00"},
	{"noticeId": 5,"creator": "admin","noticeTitle": "站点更新期间将影响到部分用户，部分用户请见谅5555","noticeContent": "站点更新期间将影响到部分用户，请见谅,标题内容222211","createTime": "2016-05-31 11:12:00"},
	{"noticeId": 6,"creator": "admin","noticeTitle": "站点更新期间将影响到部分用户，请见谅6666","noticeContent": "站点更新期间将影响到部分用户，请见谅,标题内容9999dadsas","createTime": "2016-05-31 11:12:00"}   
];

/*用户列表*/
exports.userList =[
	{"companyId":1,"companyName":"南方电网","createBy":"liangwd","createTime":"2016-05-19 11:11:05","isDel":0,"isIpLimit":0,"lastLoginTime":"2016-05-25 16:13:02","phone":"13345678911","roleId": 1,"roleName":"超级管理员","roleType":"1","userId":1,"userName":"admin","userRealName":"梁万定","userStatus":1},
	{"companyId":1,"companyName":"南方电网","createBy":"admin","createTime":"2016-05-21 23:50:32","isDel":0,"isIpLimit":0,"lastLoginTime":"2016-05-25 14:08:33","phone":"10010","roleId": 2,"roleName":"超级管理员","roleType":"1","userId":13,"userName":"admin86","userRealName":"","userStatus":1},
	{"companyId":1,"companyName":"南方电网","createBy":"admin","createTime":"2016-05-23 14:34:37","isDel":0,"isIpLimit":0,"lastLoginTime":"2016-05-25 14:08:33","phone":"10010","roleId": 3,"roleName":"超级管理员","roleType":"1","userId":14,"userName":"admin15","userRealName":"","userStatus":1},
	{"companyId":1,"companyName":"南方电网","createBy":"admin","createTime":"2016-05-23 14:35:06","isDel":0,"isIpLimit":0,"lastLoginTime":"2016-05-25 14:08:33","phone":"10010","roleId": 3,"roleName":"超级管理员","roleType":"1","userId":15,"userName":"admin16","userRealName":"","userStatus":1},
	{"companyId":1,"companyName":"南方电网","createBy":"admin","createTime":"2016-05-24 09:48:02","isDel":0,"isIpLimit":0,"lastLoginTime":"2016-05-25 14:08:33","phone":"10010","roleId": 5,"roleName":"普通管理员","roleType":"3","userId":16,"userName":"user20","userRealName":"","userStatus":1},
	{"companyId":1,"companyName":"南方电网","createBy":"admin","createTime":"2016-05-24 09:50:03","isDel":0,"isIpLimit":0,"lastLoginTime":"2016-05-25 14:08:33","phone":"","roleId": 3,"roleName":"系统管理员","roleType":"2","userId":17,"userName":"admin21","userRealName":"","userStatus":1},
	{"companyId":1,"companyName":"南方电网","createBy":"admin","createTime":"2016-05-24 09:46:20","isDel":0,"isIpLimit":0,"lastLoginTime":null,"phone":"10010","roleId": 1,"roleId": 1,"roleName":"超级管理员","roleType":"1","userId":19,"userName":"admin23","userRealName":"","userStatus":1},
	{"companyId":1,"companyName":"南方电网","createBy":"admin","createTime":"2016-05-24 10:05:49","isDel":0,"isIpLimit":0,"lastLoginTime":null,"phone":"10086","roleId": 1,"roleName":"超级管理员","roleType":"1","userId":20,"userName":"admin86","userRealName":"","userStatus":1},
	{"companyId":1,"companyName":"南方电网","createBy":"admin22","createTime":"2016-05-25 13:37:24","isDel":0,"isIpLimit":0,"lastLoginTime":null,"phone":"13246635069","roleId": 3,"roleName":"系统管理员","roleType":"2","userId":23,"userName":"admin25","userRealName":"赵四","userStatus":1},
	{"companyId":1,"companyName":"南方电网","createBy":"admin22","createTime":"2016-05-25 13:30:33","isDel":0,"isIpLimit":0,"lastLoginTime":null,"phone":"13246635069","roleId": 3,"roleName":"系统管理员","roleType":"2","userId":24,"userName":"admin26","userRealName":"赵四","userStatus":1}
];

/*角色权限关键字列表*/
exports.roleModels = [
	{"createTime":"2016-05-19 10:29:57.0","modelDesc":"","modelId":1,"modelMid":"HOME_PAGE","modelName":"首页","modelParentId":0,"modelType":1,"sortId":1,"child":[		
		{"createTime":"2016-05-19 10:33:32.0","modelDesc":"","modelId":101,"modelMid":"HOME_SERVICE_INFO","modelName":"显示服务器信息","modelParentId":1,"modelType":2,"sortId":1},
		{"createTime":"2016-05-19 10:33:52.0","modelDesc":"","modelId":102,"modelMid":"HOME_SMS_COUNT","modelName":"显示短信发送信息","modelParentId":1,"modelType":2,"sortId":2}
	]},
	{"createTime":"2016-05-19 10:22:55.0","modelDesc":"","modelId":2,"modelMid":"SMS_MANAGEMENT","modelName":"短信管理","modelParentId":0,"modelType":1,"sortId":2,"child":[		
		{"createTime":"2016-05-19 10:34:57.0","modelDesc":"","modelId":201,"modelMid":"SMS_SENT","modelName":"发送短信","modelParentId":2,"modelType":2,"sortId":1},
		{"createTime":"2016-05-19 10:35:53.0","modelDesc":"","modelId":202,"modelMid":"SMS_TEMPLATES","modelName":"编辑模板","modelParentId":2,"modelType":2,"sortId":2},
		{"createTime":"2016-05-19 10:36:30.0","modelDesc":"","modelId":203,"modelMid":"SMS_RECEIVE","modelName":"查看短信接收","modelParentId":2,"modelType":2,"sortId":3}
	]},
	{"createTime":"2016-05-19 10:24:06.0","modelDesc":"","modelId":3,"modelMid":"MMS_MANAGEMENT","modelName":"彩信管理","modelParentId":0,"modelType":1,"sortId":3,"child":[
		{"createTime":"2016-05-19 10:37:25.0","modelDesc":"","modelId":301,"modelMid":"MMS_SENT","modelName":"发送彩信","modelParentId":3,"modelType":2,"sortId":1},
		{"createTime":"2016-05-19 10:37:27.0","modelDesc":"","modelId":302,"modelMid":"MMS_SENT_RECORD","modelName":"彩信发送记录","modelParentId":3,"modelType":2,"sortId":2},
		{"createTime":"2016-05-19 10:37:30.0","modelDesc":"","modelId":303,"modelMid":"MMS_RECEIVE","modelName":"彩信接收记录","modelParentId":3,"modelType":2,"sortId":3}
	]},	
	{"createTime":"2016-05-19 10:24:23.0","modelDesc":"","modelId":4,"modelMid":"DATA_MANAGEMENT","modelName":"数据权限","modelParentId":0,"modelType":1,"sortId":4,"child":[		
		{"createTime":"2016-05-19 10:40:11.0","modelDesc":"","modelId":401,"modelMid":"DATA_MANAGEMENT_ALL","modelName":"全部","modelParentId":4,"modelType":2,"sortId":1},
		{"createTime":"2016-05-19 10:40:37.0","modelDesc":"","modelId":402,"modelMid":"DATA_MANAGEMENT_SELF","modelName":"仅本人行为数据","modelParentId":4,"modelType":2,"sortId":2},
	]},
	{"createTime":"2016-05-19 10:41:41.0","modelDesc":"","modelId":5,"modelMid":"SYS_MANAGEMENT","modelName":"系统管理","modelParentId":0,"modelType":2,"sortId":5,"child":[]},
	{"createTime":"2016-05-19 10:26:17.0","modelDesc":"","modelId":6,"modelMid":"USER_MANAGEMENT","modelName":"用户管理","modelParentId":0,"modelType":1,"sortId":6,"child":[
		{"createTime":"2016-05-19 10:43:50.0","modelDesc":"","modelId":601,"modelMid":"USER_MANAGEMENT_XT","modelName":"新增/编辑系统管理员","modelParentId":6,"modelType":2,"sortId":1},
		{"createTime":"2016-05-19 10:44:15.0","modelDesc":"","modelId":602,"modelMid":"USER_MANAGEMENT_PT","modelName":"新增/编辑普通管理员","modelParentId":6,"modelType":2,"sortId":2}
	]},
	{"createTime":"2016-05-19 10:26:35.0","modelDesc":"","modelId":7,"modelMid":"ROLE_MANAGEMENT","modelName":"角色管理","modelParentId":0,"modelType":1,"sortId":7,"child":[
		{"createTime":"2016-05-19 10:45:08.0","modelDesc":"","modelId":701,"modelMid":"ROLE_MANAGEMENT_EDIT","modelName":"创建/修改角色","modelParentId":7,"modelType":2,"sortId":1}
	]},
	{"createTime":"2016-05-19 10:27:00.0","modelDesc":"","modelId":8,"modelMid":"CONTACT_MANAGEMENT","modelName":"通讯录","modelParentId":0,"modelType":1,"sortId":8,"child":[
		{"createTime":"2016-05-19 10:46:05.0","modelDesc":"","modelId":801,"modelMid":"CONTACT_MANAGEMENT_VIEW","modelName":"查看企业通讯录","modelParentId":8,"modelType":2,"sortId":1},
		{"createTime":"2016-05-19 10:46:29.0","modelDesc":"","modelId":802,"modelMid":"CONTACT_MANAGEMENT_EDIT","modelName":"管理企业通讯录","modelParentId":8,"modelType":2,"sortId":2}
	]},
	{"createTime":"2016-05-19 10:27:02.0","modelDesc":"","modelId":9,"modelMid":"PIPE_MANAGEMENT","modelName":"通道管理","modelParentId":0,"modelType":1,"sortId":9,"child":[
		{"createTime":"2016-05-19 10:47:18.0","modelDesc":"","modelId":901,"modelMid":"PIPE_MANAGEMENT","modelName":"通道管理","modelParentId":9,"modelType":2,"sortId":1}
	]},
	{"createTime":"2016-05-19 10:27:51.0","modelDesc":"","modelId":10,"modelMid":"LOG_MANAGEMENT","modelName":"日志管理","modelParentId":0,"modelType":1,"sortId":10,"child":[
		{"createTime":"2016-05-19 10:47:54.0","modelDesc":"","modelId":1001,"modelMid":"LOG_MANAGEMENT_VIEW","modelName":"浏览日志","modelParentId":10,"modelType":2,"sortId":1},
		{"createTime":"2016-05-19 10:48:18.0","modelDesc":"","modelId":1002,"modelMid":"LOG_MANAGEMENT_EXPORT","modelName":"导出日志","modelParentId":10,"modelType":2,"sortId":2}
	]},
	{"createTime":"2016-05-19 10:28:04.0","modelDesc":"","modelId":11,"modelMid":"NOTICE_MANAGEMENT","modelName":"公告管理","modelParentId":0,"modelType":2,"sortId":11,"child":[
		{"createTime":"2016-05-19 10:28:04.0","modelDesc":"","modelId":1101,"modelMid":"NOTICE_MANAGEMENT","modelName":"公告管理","modelParentId":11,"modelType":2,"sortId":1},
		{"createTime":"2016-05-19 10:50:18.0","modelDesc":"","modelId":1102,"modelMid":"NOTICE_MANAGEMENT_EDIT","modelName":"查看公告","modelParentId":11,"modelType":2,"sortId":2}	
	]},
	{"createTime":"2016-05-19 10:28:17.0","modelDesc":"","modelId":12,"modelMid":"MONITORING_MANAGEMENT","modelName":"监控管理","modelParentId":0,"modelType":1,"sortId":12,"child":[
		{"createTime":"2016-05-19 10:51:05.0","modelDesc":"","modelId":1201,"modelMid":"MONITORING_SMS","modelName":"短信发送情况","modelParentId":12,"modelType":2,"sortId":1},
		{"createTime":"2016-05-19 10:51:47.0","modelDesc":"","modelId":1202,"modelMid":"MONITORING_SERVICE","modelName":"服务器基本信息","modelParentId":12,"modelType":2,"sortId":2},
		{"createTime":"2016-05-19 10:52:23.0","modelDesc":"","modelId":1203,"modelMid":"MONITORING_DATA","modelName":"数据库监控","modelParentId":12,"modelType":2,"sortId":3}
	]}
];

/*当前角色拥有的权限列表*/
exports.rolePermiss = [
	{"createTime":"2016-05-19 10:29:57.0","modelDesc":"","modelId":1,"modelMid":"HOME_PAGE","modelName":"首页","modelParentId":0,"modelType":1,"sortId":1},
	{"createTime":"2016-05-19 10:22:55.0","modelDesc":"","modelId":2,"modelMid":"SMS_MANAGEMENT","modelName":"短信管理","modelParentId":0,"modelType":1,"sortId":2},
	{"createTime":"2016-05-19 10:24:06.0","modelDesc":"","modelId":3,"modelMid":"MMS_MANAGEMENT","modelName":"彩信管理","modelParentId":0,"modelType":1,"sortId":3},
	{"createTime":"2016-05-19 10:24:23.0","modelDesc":"","modelId":4,"modelMid":"DATA_MANAGEMENT","modelName":"数据权限","modelParentId":0,"modelType":1,"sortId":4},
	{"createTime":"2016-05-19 10:26:17.0","modelDesc":"","modelId":6,"modelMid":"USER_MANAGEMENT","modelName":"用户管理","modelParentId":0,"modelType":1,"sortId":6},
	{"createTime":"2016-05-19 10:26:35.0","modelDesc":"","modelId":7,"modelMid":"ROLE_MANAGEMENT","modelName":"角色管理","modelParentId":0,"modelType":1,"sortId":7},
	{"createTime":"2016-05-19 10:27:00.0","modelDesc":"","modelId":8,"modelMid":"CONTACT_MANAGEMENT","modelName":"通讯录","modelParentId":0,"modelType":1,"sortId":8},
	{"createTime":"2016-05-19 10:27:02.0","modelDesc":"","modelId":9,"modelMid":"PIPE_MANAGEMENT","modelName":"通道管理","modelParentId":0,"modelType":1,"sortId":9},
	{"createTime":"2016-05-19 10:27:51.0","modelDesc":"","modelId":10,"modelMid":"LOG_MANAGEMENT","modelName":"日志管理","modelParentId":0,"modelType":1,"sortId":10},
	{"createTime":"2016-05-19 10:28:17.0","modelDesc":"","modelId":12,"modelMid":"MONITORING_MANAGEMENT","modelName":"监控管理","modelParentId":0,"modelType":1,"sortId":12},
	{"createTime":"2016-05-19 10:33:32.0","modelDesc":"","modelId":101,"modelMid":"HOME_SERVICE_INFO","modelName":"显示服务器信息","modelParentId":1,"modelType":2,"sortId":1},
	{"createTime":"2016-05-19 10:33:52.0","modelDesc":"","modelId":102,"modelMid":"HOME_SMS_COUNT","modelName":"显示短信发送信息","modelParentId":1,"modelType":2,"sortId":2},
	{"createTime":"2016-05-19 10:34:57.0","modelDesc":"","modelId":201,"modelMid":"SMS_SENT","modelName":"发送短信","modelParentId":2,"modelType":2,"sortId":1},
	{"createTime":"2016-05-19 10:36:30.0","modelDesc":"","modelId":203,"modelMid":"SMS_RECEIVE","modelName":"查看短信接收","modelParentId":2,"modelType":2,"sortId":3},
	{"createTime":"2016-05-19 10:37:25.0","modelDesc":"","modelId":301,"modelMid":"MMS_SENT","modelName":"发送彩信","modelParentId":3,"modelType":2,"sortId":1},
	{"createTime":"2016-05-19 10:37:27.0","modelDesc":"","modelId":302,"modelMid":"MMS_SENT_RECORD","modelName":"彩信发送记录","modelParentId":3,"modelType":2,"sortId":2},
	{"createTime":"2016-05-19 10:37:30.0","modelDesc":"","modelId":303,"modelMid":"MMS_RECEIVE","modelName":"彩信接收记录","modelParentId":3,"modelType":2,"sortId":3},
	{"createTime":"2016-05-19 10:40:11.0","modelDesc":"","modelId":401,"modelMid":"DATA_MANAGEMENT_ALL","modelName":"全部","modelParentId":4,"modelType":2,"sortId":1},
	{"createTime":"2016-05-19 10:40:37.0","modelDesc":"","modelId":402,"modelMid":"DATA_MANAGEMENT_SELF","modelName":"仅本人行为数据","modelParentId":4,"modelType":2,"sortId":2},
	{"createTime":"2016-05-19 10:43:50.0","modelDesc":"","modelId":601,"modelMid":"USER_MANAGEMENT_XT","modelName":"新增/编辑系统管理员","modelParentId":6,"modelType":2,"sortId":1},
	{"createTime":"2016-05-19 10:44:15.0","modelDesc":"","modelId":602,"modelMid":"USER_MANAGEMENT_PT","modelName":"新增/编辑普通管理员","modelParentId":6,"modelType":2,"sortId":2},
	{"createTime":"2016-05-19 10:45:08.0","modelDesc":"","modelId":701,"modelMid":"ROLE_MANAGEMENT_EDIT","modelName":"创建/修改角色","modelParentId":7,"modelType":2,"sortId":1},
	{"createTime":"2016-05-19 10:46:05.0","modelDesc":"","modelId":801,"modelMid":"CONTACT_MANAGEMENT_VIEW","modelName":"查看企业通讯录","modelParentId":8,"modelType":2,"sortId":1},
	{"createTime":"2016-05-19 10:47:54.0","modelDesc":"","modelId":1001,"modelMid":"LOG_MANAGEMENT_VIEW","modelName":"浏览日志","modelParentId":10,"modelType":2,"sortId":1},
	{"createTime":"2016-05-19 10:48:18.0","modelDesc":"","modelId":1002,"modelMid":"LOG_MANAGEMENT_EXPORT","modelName":"导出日志","modelParentId":10,"modelType":2,"sortId":2},
	{"createTime":"2016-05-19 10:28:04.0","modelDesc":"","modelId":1101,"modelMid":"NOTICE_MANAGEMENT","modelName":"公告管理","modelParentId":11,"modelType":2,"sortId":1},
	{"createTime":"2016-05-19 10:50:18.0","modelDesc":"","modelId":1102,"modelMid":"NOTICE_MANAGEMENT_EDIT","modelName":"管理公告","modelParentId":11,"modelType":2,"sortId":2},
	{"createTime":"2016-05-19 10:51:05.0","modelDesc":"","modelId":1201,"modelMid":"MONITORING_SMS","modelName":"短信发送情况","modelParentId":12,"modelType":2,"sortId":1},
	{"createTime":"2016-05-19 10:51:47.0","modelDesc":"","modelId":1202,"modelMid":"MONITORING_SERVICE","modelName":"服务器基本信息","modelParentId":12,"modelType":2,"sortId":2}
];	

/*收信列表*/
exports.receiveList = [
    { "smsSender": "132466635068", "content": "你好,欢迎使用短信平台111", "createTime": "2016-06-01 15:11:00", "srcno": 542387, "replyContent":2 },
    { "smsSender": "132466635068", "content": "你好,欢迎使用短信平台222", "createTime": "2016-06-01 15:11:00", "srcno": 547787, "replyContent":1 },
    { "smsSender": "132466635068", "content": "你好,欢迎使用短信平台333", "createTime": "2016-06-01 15:11:00", "srcno": 547787, "replyContent":2 },
    { "smsSender": "132466635068", "content": "李先生，你好，欢迎您参与我司**项目评估欢迎欢迎您参与我司**项目评估欢迎您参与我司**项目评估您参", "createTime": "2016-06-01 15:11:00", "srcno": 547787, "replyContent":2 },
    { "smsSender": "132466635068", "content": "你好,欢迎使用短信平台444", "createTime": "2016-06-01 15:11:00", "srcno": 547742, "replyContent":4 }
];

/*短信任务列表*/
exports.smsTaskList = [
    { "contentUuid": "saas132466635068", "content": "你好,欢迎使用短信平台111", "createTime": "2016-06-01 15:11:00","sendTime": "2016-06-01 11:11:00", "userCount": 5487 },
    { "contentUuid": "dasd132466635068", "content": "你好,欢迎使用短信平台222", "createTime": "2016-06-01 15:11:00","sendTime": "2016-06-01 11:11:00", "userCount": 787 },
    { "contentUuid": "fasf132466635068", "content": "你好,欢迎使用短信平台333", "createTime": "2016-06-01 15:11:00","sendTime": "2016-06-01 13:11:00", "userCount": 547 },
    { "contentUuid": "ffsf132466635068", "content": "李先生，你好，欢迎您参与我司**项目评估欢迎欢迎您参与我司**项目评估欢迎您参与我司**项目评估您参", "createTime": "2016-06-01 15:11:00","sendTime": "2016-06-02 15:11:00", "userCount": 242},
    { "contentUuid": "fajj132466635068", "content": "你好,欢迎使用短信平台444", "createTime": "2016-06-01 15:11:00","sendTime": "2016-06-03 15:11:00", "userCount": 42 }
];

/*草稿箱列表*/
exports.draftsList = [
    { "contentUuid": "ada13da3dasad32rea111", "content": "你好,欢迎使用短信平台111", "createTime": "2016-06-01 15:11:00", "userCount": 12 },
    { "contentUuid": "ada13da3dasad32rea123", "content": "你好,欢迎使用短信平台222", "createTime": "2016-06-01 15:11:00", "userCount": 140 },
    { "contentUuid": "ada13da3dasad32rea141", "content": "你好,欢迎使用短信平台333", "createTime": "2016-06-01 15:11:00", "userCount": 12 },
    { "contentUuid": "ada13da3dasad32rea121", "content": "李先生，你好，欢迎您参与我司**项目评估欢迎欢迎您参与我司**项目评估欢迎您参与我司**项目评估您参", "createTime": "2016-06-01 15:11:00", "userCount": 120 },
    { "contentUuid": "ada13da3dasad32rea231", "content": "你好,欢迎使用短信平台444", "createTime": "2016-06-01 15:11:00", "userCount": 1890 }
];

/*发信记录列表*/
exports.recordList = [
    { "contentUuid": "ada13da3dasad32rea111", "content": "你好,欢迎使用短信平台111", "createTime": "2016-06-01 15:11:00", "userCount": 12, "successCount":110,
"failCount":3, "waitSendCount": 0, "sendingCount": 3, "phoneList":[
		{"u_name":"王先生","u_phone":"18622221111","u_sex":"0"},
		{"u_name":"王先生","u_phone":"13622223241","u_sex":"1"},
		{"u_name":"黄女士","u_phone":"13822224491","u_sex":"0"}
	]},
    { "contentUuid": "ada13da3dasad32rea123", "content": "你好,欢迎使用短信平台222", "createTime": "2016-06-01 15:11:00", "userCount": 140, "successCount":110,
"failCount":0, "waitSendCount": 3, "sendingCount": 0, "phoneList":[]},
    { "contentUuid": "ada13da3dasad32rea141", "content": "你好,欢迎使用短信平台333", "createTime": "2016-06-01 15:11:00", "userCount": 12, "successCount":110,
"failCount":0, "waitSendCount": 5, "sendingCount": 0, "phoneList":[]},
    { "contentUuid": "ada13da3dasad32rea121", "content": "李先生，你好，欢迎您参与我司**项目评估欢迎欢迎您参与我司**项目评估欢迎您参与我司**项目评估您参", "createTime": "2016-06-01 15:11:00", "userCount": 120 , "successCount":110,
"failCount":0, "waitSendCount": 0, "sendingCount": 2, "phoneList":[]},
    { "contentUuid": "ada13da3dasad32rea231", "content": "你好,欢迎使用短信平台444", "createTime": "2016-06-01 15:11:00", "userCount": 1890, "successCount":110,
"failCount":2, "waitSendCount": 0, "sendingCount": 0, "phoneList":[
		{"u_name":"王先生","u_phone":"18622221111","u_sex":"0"},
		{"u_name":"黄女士","u_phone":"13822224491","u_sex":"0"}
	]}
];

/*获取短信模板*/
exports.templateList = [
	{"createTime":"2016-05-19 10:51:47.0","tempId":1001,"tempName":"短信模板测试标题1101","tempContent":"尊敬的[uname]先生/女士，您好！感谢您使用我们的短信平台！[signature]", "creator": "admin","createTime":"2016-05-19 10:51:47", "tempSignature":"南网"},
	{"createTime":"2016-05-19 10:51:47.0","tempId":1002,"tempName":"短信模板测试标题1201","tempContent":"尊敬的[uname]先生/女士，您好！感谢您使用我们的移动OA邮箱系统！[signature]", "creator": "admin","createTime":"2016-05-19 10:51:47", "tempSignature":"南网"},
	{"createTime":"2016-05-19 10:51:47.0","tempId":1003,"tempName":"短信模板测试标题1501","tempContent":"尊敬的[uname]先生/女士，您好！感谢您使用我们的139门户系统！[signature]", "creator": "xitong","createTime":"2016-05-19 10:51:47", "tempSignature":"南网"},
	{"createTime":"2016-05-19 10:51:47.0","tempId":1004,"tempName":"短信模板测试标题4101","tempContent":"尊敬的[uname]先生/女士，您好！感谢您使用我们的系统，提醒您会员账号已过期！[signature]", "creator": "admin","createTime":"2016-05-19 10:51:47", "tempSignature":"南网"},
	{"createTime":"2016-05-19 10:51:47.0","tempId":1005,"tempName":"短信模板测试标题5504","tempContent":"尊敬的[uname]先生/女士，您好！感谢您使用我们的短信与网关平台！[signature]", "creator": "admin","createTime":"2016-05-19 10:51:47", "tempSignature":"南网"}
];

/*短信模板Tags*/
exports.tempTagsList = [
    {"tagId": 1, "tagName": "姓名", "tagContent": "[uname]"},
    {"tagId": 2, "tagName": "性别", "tagContent": "[usex]"},
    {"tagId": 3, "tagName": "签名", "tagContent": "[signature]"}
];


/*企业通讯录*/
exports.companyAddr = {
	"group_list":[
		{"createTime":"2016-05-19 10:51:47","groupId":101,"groupName":"南网集团公司","parentId":"0","userCount":130,
			"group_list":[
				{"createTime":"2016-05-19 10:51:47","groupId":1011,"groupName":"董事会","parentId":"101","userCount":2,"group_list":[],
					"user_list":[
						{"createTime":"2016-05-19 10:51:47","addrId":10111,"u_name":"王懂事","u_phone":"18622221111","u_sex":"0"},
						{"createTime":"2016-05-19 10:51:47","addrId":10112,"u_name":"黄懂事","u_phone":"13822224491","u_sex":"0"}
					]
				},
				{"createTime":"2016-05-19 10:51:47","groupId":1012,"groupName":"办公室","parentId":"101","userCount":0,"group_list":[],"user_list":[]},
				{"createTime":"2016-05-19 10:51:47","groupId":1013,"groupName":"财务部","parentId":"101","userCount":0,"group_list":[],"user_list":[]}
			],
			"user_list":[
				{"createTime":"2016-05-19 10:51:47","addrId":1011,"u_name":"周先生","u_phone":"13322221671","u_sex":"0"},
				{"createTime":"2016-05-19 10:51:47","addrId":1012,"u_name":"王女士","u_phone":"13722224434","u_sex":"1"},
				{"createTime":"2016-05-19 10:51:47","addrId":1013,"u_name":"张女士","u_phone":"13922224434","u_sex":"2"}
			]
		},
		{"createTime":"2016-05-19 10:51:47","groupId":102,"groupName":"南网广州公司","parentId":"0","userCount":0,"group_list":[],"user_list":[]},
		{"createTime":"2016-05-19 10:51:47","groupId":103,"groupName":"南网深圳公司","parentId":"0","userCount":0,"group_list":[],"user_list":[]}
	],
	"user_list":[
		{"createTime":"2016-05-19 10:51:47","addrId":1001,"u_name":"张三","u_phone":"13122221111","u_sex":"2"},
		{"createTime":"2016-05-19 10:51:47","addrId":1002,"u_name":"李四","u_phone":"13522224411","u_sex":"2"}
	]
};

/*个人通讯录*/
exports.personAddr = {
	"group_list":[
		{"createTime":"2016-05-19 10:51:47","groupId":1011,"groupName":"自定义分组1","parentId":"0","userCount":13,
			"user_list":[
				{"createTime":"2016-05-19 10:51:47","addrId":1011,"u_name":"周先生","u_phone":"13322221671","u_sex":"0"},
				{"createTime":"2016-05-19 10:51:47","addrId":1012,"u_name":"王女士","u_phone":"13722224434","u_sex":"1"},
				{"createTime":"2016-05-19 10:51:47","addrId":1013,"u_name":"张女士","u_phone":"13922224434","u_sex":"2"}
			]
		},
		{"createTime":"2016-05-19 10:51:47","groupId":1012,"groupName":"自定义分组3","parentId":"0","userCount":2,
			"user_list":[
				{"createTime":"2016-05-19 10:51:47","addrId":10111,"u_name":"王懂事","u_phone":"18622221111","u_sex":"0"},
				{"createTime":"2016-05-19 10:51:47","addrId":10112,"u_name":"黄懂事","u_phone":"13822224491","u_sex":"0"}
			]
		},
		{"createTime":"2016-05-19 10:51:47","groupId":1013,"groupName":"常联系","parentId":"0","userCount":2,"user_list":[]},
		{"createTime":"2016-05-19 10:51:47","groupId":1020,"groupName":"未分组","parentId":"0","userCount":2,
			"user_list":[
				{"createTime":"2016-05-19 10:51:47","addrId":1002,"u_name":"测试10","u_phone":"13922221671","u_sex":"2"},
				{"createTime":"2016-05-19 10:51:47","addrId":1003,"u_name":"测试11","u_phone":"18922221671","u_sex":"2"}
			]
		}
	]
};

/*通讯录搜索*/
exports.searchContact = [
	{"createTime":"2016-05-19 10:51:47","addrId":1011,"u_name":"周先生","u_phone":"13322221671","u_sex":"0","age":25,"u_dept":"财务部"},
	{"createTime":"2016-05-19 10:51:47","addrId":1012,"u_name":"王女士","u_phone":"13722224434","u_sex":"1","age":25,"u_dept":"财务部"},
	{"createTime":"2016-05-19 10:51:47","addrId":1013,"u_name":"张女士","u_phone":"13922224434","u_sex":"2","age":25,"u_dept":"财务部"},
	{"createTime":"2016-05-19 10:51:47","addrId":1014,"u_name":"王懂事","u_phone":"18622221111","u_sex":"0","age":25,"u_dept":"办公室"},
	{"createTime":"2016-05-19 10:51:47","addrId":1015,"u_name":"黄懂事","u_phone":"13822224491","u_sex":"0","age":25,"u_dept":"办公室"},
	{"createTime":"2016-05-19 10:51:47","addrId":1016,"u_name":"测试10","u_phone":"13922221671","u_sex":"2","age":25,"u_dept":"办公室"},
	{"createTime":"2016-05-19 10:51:47","addrId":1017,"u_name":"测试11","u_phone":"18922221671","u_sex":"2","age":25,"u_dept":"办公室"},
	{"createTime":"2016-05-19 10:51:47","addrId":1018,"u_name":"张三","u_phone":"13122221111","u_sex":"2","age":25,"u_dept":"自定义分组"},
	{"createTime":"2016-05-19 10:51:47","addrId":1019,"u_name":"李四","u_phone":"13522224411","u_sex":"2","age":25,"u_dept":"自定义分组"},
	{"createTime":"2016-05-19 10:51:47","addrId":1020,"u_name":"王五","u_phone":"13522224411","u_sex":"2","age":25,"u_dept":"自定义分组"},
	{"createTime":"2016-05-19 10:51:47","addrId":1011,"u_name":"周先生","u_phone":"13322221671","u_sex":"0","age":25,"u_dept":"财务部"},
	{"createTime":"2016-05-19 10:51:47","addrId":1012,"u_name":"王女士","u_phone":"13722224434","u_sex":"1","age":25,"u_dept":"财务部"},
	{"createTime":"2016-05-19 10:51:47","addrId":1013,"u_name":"张女士","u_phone":"13922224434","u_sex":"2","age":25,"u_dept":"财务部"},
	{"createTime":"2016-05-19 10:51:47","addrId":1014,"u_name":"王懂事","u_phone":"18622221111","u_sex":"0","age":25,"u_dept":"办公室"},
	{"createTime":"2016-05-19 10:51:47","addrId":1015,"u_name":"黄懂事","u_phone":"13822224491","u_sex":"0","age":25,"u_dept":"办公室"},
	{"createTime":"2016-05-19 10:51:47","addrId":1016,"u_name":"测试10","u_phone":"13922221671","u_sex":"2","age":25,"u_dept":"办公室"},
	{"createTime":"2016-05-19 10:51:47","addrId":1017,"u_name":"测试11","u_phone":"18922221671","u_sex":"2","age":25,"u_dept":"办公室"},
	{"createTime":"2016-05-19 10:51:47","addrId":1018,"u_name":"张三","u_phone":"13122221111","u_sex":"2","age":25,"u_dept":"自定义分组"},
	{"createTime":"2016-05-19 10:51:47","addrId":1019,"u_name":"李四","u_phone":"13522224411","u_sex":"2","age":25,"u_dept":"自定义分组"},
	{"createTime":"2016-05-19 10:51:47","addrId":1020,"u_name":"王五","u_phone":"13522224411","u_sex":"2","age":25,"u_dept":"自定义分组"}
];

/*导入联系人*/
exports.exportAddrList = [
	{ "u_name": "张三", "u_phone": "13246663509", "u_sex": "1"},
    { "u_name": "李四", "u_phone": "13646663069", "u_sex": "2"},
    { "u_name": "王五", "u_phone": "18946635659", "u_sex": "0"}
];

/*日志列表*/
exports.logsList = [
	{"logId": 1, "actionUser": "admin", "actionDesc": "添加通讯录","createTime": "2016-05-31 12:10:11"},
	{"logId": 2, "actionUser": "admin", "actionDesc": "修改通讯录","createTime": "2016-05-31 12:13:11"},
	{"logId": 3, "actionUser": "admin", "actionDesc": "登录系统","createTime": "2016-05-31 12:13:11"},
	{"logId": 4, "actionUser": "admin", "actionDesc": "退出系统","createTime": "2016-05-31 12:16:11"}
];

/*黑名单列表*/
exports.blackList = [
	{"blackId": 1,"phone": "13146635068"},
	{"blackId": 2,"phone": "13246635068"},
	{"blackId": 3,"phone": "13346635068"},
	{"blackId": 4,"phone": "13446635068"},
	{"blackId": 5,"phone": "13546635068"},
	{"blackId": 6,"phone": "13646635068"},
	{"blackId": 7,"phone": "13746635068"},
	{"blackId": 8,"phone": "13846635068"},
	{"blackId": 9,"phone": "15546635068"},
	{"blackId": 10,"phone": "18846635068"},
	{"blackId": 11,"phone": "18946635068"}
];

/*短信发送统计*/
exports.SmsSendCount = [
	{"1": 123},{"2": 34},{"3": 553},{"4": 1334},{"5": 234},{"6": 567},
	{"7": 1332},{"8": 342},{"9": 234},{"10": 122},{"11": 31},{"12": 21},
	{"13": 3421},{"14": 23},{"15": 12},{"16": 456},{"17": 56},{"18": 34},
	{"19": 1234},{"20": 32},{"21": 421},{"22": 1234},{"23": 123},{"24": 455}
];

/*短信接收统计*/
exports.SmsRecieveCount = [
	{"1": 13},{"2": 34},{"3": 55},{"4": 133},{"5": 214},{"6": 17},
	{"7": 33},{"8": 32},{"9": 34},{"10": 22},{"11": 21},{"12": 11},
	{"13": 141},{"14": 22},{"15": 10},{"16": 56},{"17": 6},{"18": 4},
	{"19": 134},{"20": 22},{"21": 42},{"22": 123},{"23": 23},{"24": 55}
];


/*套餐列表*/
exports.packageList = [
	{"packId": 1,"packName":"套餐一","packDetail":"该套餐包括移动短信10万条，联通短信5万条，电信短信","mobileSmsValue":20000,"unicomSmsValue":30000,"telcomSmsValue":4000,"mobileMmsValue":5000,"unicomMmsValue":8000,"telcomMmsValues":1000},
	{"packId": 2,"packName":"套餐二","packDetail":"该套餐包括移动短信10万条，联通短信5万条，电信短信","mobileSmsValue":22000,"unicomSmsValue":30000,"telcomSmsValue":4000,"mobileMmsValue":5000,"unicomMmsValue":8000,"telcomMmsValues":1000},
	{"packId": 3,"packName":"套餐三","packDetail":"该套餐包括移动短信10万条，联通短信5万条，电信短信","mobileSmsValue":24000,"unicomSmsValue":30000,"telcomSmsValue":4000,"mobileMmsValue":5000,"unicomMmsValue":8000,"telcomMmsValues":1000},
	{"packId": 4,"packName":"套餐四","packDetail":"该套餐包括移动短信10万条，联通短信5万条，电信短信","mobileSmsValue":25000,"unicomSmsValue":30000,"telcomSmsValue":4000,"mobileMmsValue":5000,"unicomMmsValue":8000,"telcomMmsValues":1000},
	{"packId": 5,"packName":"套餐五","packDetail":"该套餐包括移动短信10万条，联通短信5万条，电信短信","mobileSmsValue":25000,"unicomSmsValue":30000,"telcomSmsValue":4000,"mobileMmsValue":5000,"unicomMmsValue":8000,"telcomMmsValues":1000}
];

/*第三方IP接入列表*/
exports.ipAccessList = [
	{"accessId": 1,"comId": 1,"comName":"南方电网","ipAddress":"192.168.33.225"},
	{"accessId": 2,"comId": 1,"comName":"南方电网","ipAddress":"192.168.33.215"},
	{"accessId": 3,"comId": 1,"comName":"南方电网","ipAddress":"192.168.33.25"},
	{"accessId": 4,"comId": 2,"comName":"广东电网","ipAddress":"192.168.31.225"},
	{"accessId": 5,"comId": 3,"comName":"深圳电网","ipAddress":"192.168.32.225"}
];

/*配置项的值*/
exports.configList	= [
	[//其他配置项
		{ "configId":1,"configName":"sensitiveWord", "configValue":"毛泽东;习近平;党;","configDesc":"这是敏感词"},
		{ "configId":2,"configName":"sendEncrypt", "configValue":true, "configDesc":"这是加密的"},
		{ "configId":3,"configName":"receiveEncrypt", "configValue":false}
	],
	[//移动网关
		{"configDesc":"网关地址","configId":9,"configName":"mobileHost","configType":1,"configValue":"0.0.0.0","createTime":"2016-06-28 16:15:22","creator":"admin"},
		{"configDesc":"网关端口","configId":10,"configName":"mobilePort","configType":1,"configValue":"0000","createTime":"2016-06-28 16:16:01","creator":"admin"},
		{"configDesc":"客户ID","configId":11,"configName":"mobileClientId","configType":1,"configValue":"000000","createTime":"2016-06-28 16:16:52","creator":"admin"},
		{"configDesc":"服务ID","configId":12,"configName":"mobileServiceId","configType":1,"configValue":"0000","createTime":"2016-06-28 16:17:24","creator":"admin"}
	],
	[//联通网关
		{"configDesc":"网关地址","configId":13,"configName":"unicomHost","configType":2,"configValue":"0.0.0.0","createTime":"2016-06-28 16:15:22","creator":"admin"},
		{"configDesc":"网关端口","configId":14,"configName":"unicomPort","configType":2,"configValue":"0000","createTime":"2016-06-28 16:16:01","creator":"admin"},
		{"configDesc":"客户ID","configId":15,"configName":"unicomClientId","configType":2,"configValue":"000000","createTime":"2016-06-28 16:16:52","creator":"admin"},
		{"configDesc":"服务ID","configId":16,"configName":"unicomServiceId","configType":2,"configValue":"0000","createTime":"2016-06-28 16:17:24","creator":"admin"}
	],
	[//电信网关
		{"configDesc":"网关地址","configId":5,"configName":"telcomHost","configType":3,"configValue":"124.126.119.17","createTime":"2016-06-28 16:10:32","creator":"admin"},
		{"configDesc":"网关端口","configId":6,"configName":"telcomPort","configType":3,"configValue":"8890","createTime":"2016-06-28 16:11:47","creator":"admin"},
		{"configDesc":"客户ID","configId":7,"configName":"telcomClientId","configType":3,"configValue":"10690805","createTime":"2016-06-28 16:12:34","creator":"admin"},
		{"configDesc":"服务ID","configId":8,"configName":"telcomServiceId","configType":3,"configValue":"HELP","createTime":"2016-06-28 16:14:12","creator":"admin"}
	]
];

/*服务器状态*/
exports.monitorData = {
	"mobileGatewayTime":0.5,
	"unicomGatewayTime":0.5,
	"telcomGatewayTime":1,
	"tomcatPid":11509,
	"smsState":"disable",
	"smsWsState":"enable",
	"mobileState":"disable",
	"unicomState":"disable",
	"telcomState":"enable"
};

/*关键字列表*/
exports.sensitiveWordList = [
	{"wordId":101, "wordContent":"党"},
	{"wordId":102, "wordContent":"毛泽东"},
	{"wordId":103, "wordContent":"习近平"},
	{"wordId":104, "wordContent":"毛泽东"},
	{"wordId":105, "wordContent":"江泽民"},
	{"wordId":106, "wordContent":"革命"},
	{"wordId":107, "wordContent":"共产党"},
	{"wordId":108, "wordContent":"法轮功"}
];

