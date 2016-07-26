'use strict';

/**
 * @ngdoc overview
 * @name smsWebApp
 * @description
 * # smsWebApp
 *
 * Main module of the application.
 */

/*init 初始化应用程序*/
var smsWebApp =
  angular.module('smsWebApp', [  	
  	'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute'
  ]);

//初始化数据
smsWebApp.run(['$rootScope', '$location', function($rootScope, $location){
  $rootScope.sid = $.cookie('sid_dm') || "";
  $rootScope.userName = $.cookie('username_dm') || "";
  $rootScope.userRealName = $.cookie('userrealname_dm') || $rootScope.userName ||"匿名";
  $rootScope.isSuperAdmin = ($.cookie('issuperadmin_dm') == 'true') ? true : false;
  $rootScope.roleType = $.cookie('roletype_dm') || "";
  $rootScope.companyId = $.cookie('companyid_dm') || "";
  $rootScope.needModPwd = ($.cookie('needmodpwd_dm') == '1') ? true : false;
  if($rootScope.needModPwd){
    $rootScope.userPermissionList = "";
    $location.path("/sys/userInfo");
  }else{
    $rootScope.userPermissionList = $.cookie('userpermission_dm') || "";
  }
}]);

/*入口Ctrl*/
smsWebApp.controller('MainCtrl', ['$scope', '$location', '$rootScope', '$log', '$http', 'httpServices', function($scope, $location, $rootScope, $log, $http, httpServices) {
  //设置左侧菜单当前状态
  $scope.$on('$routeChangeStart', function(scope, next, current) {  
    var location = $location.$$url;
    $scope.checkCurrent = function(value){
      if(location == "/" && value == ""){
        return "current";
      }else if(location.indexOf(value) > -1 && value != ""){
        return "current";
      }else{
        return "";
      }
    }
  });  

  /*清空通讯录本地缓存*/
  if(window.localStorage){
    localStorage.removeItem("companyAddrTreeData");
    localStorage.removeItem("personAddrTreeData");
  }

  //locationChange与routeChange事件
  var locationChangeStartOff = $rootScope.$on('$locationChangeStart', locationChangeStart);
  var locationChangeSuccessOff = $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);

  var routeChangeStartOff = $rootScope.$on('$routeChangeStart', routeChangeStart);
  var routeChangeSuccessOff = $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

  function locationChangeStart(event) {
    loadingDiv.show();
    // $log.log('locationChangeStart');
    // $log.log(arguments);
  }

  function locationChangeSuccess(event) {
    loadingDiv.hide();
    // $log.log('locationChangeSuccess');
    // $log.log(arguments);
  }

  function routeChangeStart(event) {    
    // $log.log('routeChangeStart');
    // $log.log(arguments);
  }

  function routeChangeSuccess(event) {
    // $log.log('routeChangeSuccess');
    // $log.log(arguments);
  }

  /*注销登录*/
  $scope.logout = function(){
    $http({
      url: '/smsApi/logout.do?sid=' + $rootScope.sid,
      method: 'POST',
      data: {}
    }).success(function(data){
      window.location.href = './login.html';        
    });    
  };

  /*定时检查用户登录状态*/
  var checkUserStatus = function(){
    httpServices.Post('user:getUserInfo', {'userName': $rootScope.userName}).success(function(data){
        if(data["code"] == "FAIL" && data["errorCode"] == "session_invalid"){
          Modal.confirm({
            msg: "用户未登录或登录超时，点击确定返回登录！"
          }).on( function (e) {
            if(e){            
              window.location.href = './login.html'; 
            } 
          });
        }            
    });
  };
  var sid = window.setInterval(checkUserStatus, 300000);

  /*获取非法关键字*/
  $rootScope.SensitiveWord = [];
  var getSensitiveWord = function(){
    httpServices.Post('config:getSensitiveWordList', {}).success(function(data){
      if(data["code"] == "S_OK"){
        $rootScope.SensitiveWord = data['var']['wordList'];
      }
    }); 
  };
  getSensitiveWord();

  /*获取号码黑名单*/
  $rootScope.PhoneBlackList = [];
  var getPhoneBlackList = function(){
    httpServices.Post('black:getAllBlackPhone', {}).success(function(data){
      if(data["code"] == "S_OK"){
        $rootScope.PhoneBlackList = data['var']['blackList'];
      }
    });
  };
  getPhoneBlackList();
}]);
