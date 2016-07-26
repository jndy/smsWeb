'use strict';

/**
 * @ngdoc overview
 * @name smsWebApp
 * @description
 * # smsWebApp 路由配置
 *
 * Main router of the application.
 */

smsWebApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl', 
      controllerAs: 'home',
      permission: 'HOME_PAGE',
    })
    .when('/about', {
      templateUrl: 'views/about.html', 
      controller: 'AboutCtrl', 
      controllerAs: 'about'
    })
    .when('/unauthorized', {
      templateUrl: 'views/error.html',
      controller: 'ErrorCtrl',
      controllerAs: 'unauthorized'
    })    
    /*短信管理*/
    .when('/sms/sentSMS', {
      templateUrl: 'views/sms/sentSMS.html', 
      controller: 'SentSMSCtrl', 
      controllerAs: 'sentSMS',
      permission: 'SMS_SENT',
    })
    .when('/sms/sentSMS/:from/:guid', {
      templateUrl: 'views/sms/sentSMS.html', 
      controller: 'SentSMSCtrl', 
      controllerAs: 'sentSMS',
      permission: 'SMS_SENT',
    })
    .when('/sms/smsReceive', {
      templateUrl: 'views/sms/smsReceive.html', 
      controller: 'SmsReceiveCtrl', 
      controllerAs: 'smsreceive',
      permission: 'SMS_RECEIVE',
    })
    .when('/sms/smsDrafts', {
      templateUrl: 'views/sms/smsDrafts.html', 
      controller: 'SmsDraftsCtrl', 
      controllerAs: 'smsDrafts',
      permission: 'SMS_SENT',
    })
    .when('/sms/smsTemplate', {
      templateUrl: 'views/sms/smsTemplate.html', 
      controller: 'SmsTemplateCtrl', 
      controllerAs: 'smstemplate',
      permission: 'SMS_TEMPLATES',
    })
    .when('/sms/smsRecord', {
      templateUrl: 'views/sms/smsRecord.html', 
      controller: 'SmsRecordCtrl', 
      controllerAs: 'smsrecord',
      permission: 'SMS_SENT_RECORD',
    })
    /*彩信管理*/
    .when('/mms/sentMMS', {
      templateUrl: 'views/mms/sentMMS.html', 
      controller: 'SentMMSCtrl', 
      controllerAs: 'sentMMS',
      permission: 'MMS_SENT',
    })
    .when('/mms/mmsReceive', {
      templateUrl: 'views/mms/mmsReceive.html', 
      controller: 'MmsReceiveCtrl', 
      controllerAs: 'mmsreceive',
      permission: 'MMS_RECEIVE',
    })
    .when('/mms/mmsDrafts', {
      templateUrl: 'views/mms/mmsDrafts.html', 
      controller: 'MmsDraftsCtrl', 
      controllerAs: 'mmsdrafts',
      permission: 'MMS_SENT',
    })
    .when('/mms/mmsRecord', {
      templateUrl: 'views/mms/mmsRecord.html', 
      controller: 'MmsRecordCtrl', 
      controllerAs: 'mmsrecord',
      permission: 'MMS_SENT_RECORD',
    })
    /*数据统计*/
    .when('/data/statistics', {
      templateUrl: 'views/data/statistics.html', 
      controller: 'StatisticsCtrl', 
      controllerAs: 'statistics',
      permission: 'DATA_MANAGEMENT',
    })
    /*通讯录模块*/
    .when('/addr/contactList', {
      templateUrl: 'views/addr/contactList.html', 
      controller: 'ContactListCtrl', 
      controllerAs: 'contactlist',
      permission: 'CONTACT_MANAGEMENT',
    })
    /*系统管理 */
    .when('/sys/userInfo', {//用户管理
      templateUrl: 'views/sys/userInfo.html', 
      controller: 'UserInfoCtrl', 
      controllerAs: 'userinfo'
    })
    .when('/sys/userList', {//用户管理
      templateUrl: 'views/sys/userList.html', 
      controller: 'UserListCtrl', 
      controllerAs: 'userlist',
      permission: 'USER_MANAGEMENT',
    })
    .when('/sys/userRole', {//角色管理
      templateUrl: 'views/sys/userRole.html', 
      controller: 'UserRoleCtrl', 
      controllerAs: 'userrole',
      permission: 'ROLE_MANAGEMENT',
    })
    .when('/sys/taskList', {//任务管理
      templateUrl: 'views/sys/taskList.html', 
      controller: 'TaskListCtrl', 
      controllerAs: 'tasklist',
      permission: 'TASK_MANAGEMENT',
    })
    .when('/sys/logList', {//日志管理
      templateUrl: 'views/sys/logList.html', 
      controller: 'LogListCtrl', 
      controllerAs: 'loglist',
      permission: 'LOG_MANAGEMENT',
    })
    .when('/sys/noticeList', {//公告管理
      templateUrl: 'views/sys/noticeList.html', 
      controller: 'NoticeListCtrl', 
      controllerAs: 'noticelist',
      permission: 'NOTICE_MANAGEMENT',
    })
    .when('/sys/sysConfig', {//系统配置
      templateUrl: 'views/sys/sysConfig.html', 
      controller: 'SysConfigCtrl', 
      controllerAs: 'sysconfig',
      permission: 'SYS_CONFIG',
    })
    .when('/sys/sysMonitor', {//监控管理
      templateUrl: 'views/sys/sysMonitor.html', 
      controller: 'SysMonitorCtrl', 
      controllerAs: 'sysmonitor',
      permission: 'MONITORING_MANAGEMENT',
    })
    .when('/sys/pipeConfig', {//通道管理
      templateUrl: 'views/sys/pipeConfig.html', 
      controller: 'PipeConfigCtrl', 
      controllerAs: 'pipeconfig',
      permission: 'PIPE_MANAGEMENT',
    })
    .when('/sys/blackList', {//黑名单
      templateUrl: 'views/sys/blackList.html', 
      controller: 'BlackListCtrl', 
      controllerAs: 'blacklist',
      permission: 'BLACK_MANAGEMENT',
    })
    .otherwise({
	    redirectTo: '/'
    });
}]);