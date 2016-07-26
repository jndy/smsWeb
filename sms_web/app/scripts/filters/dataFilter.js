'use strict';

/**
 * HTML filters 
 *
 * dependence smsWebApp
 */

/*时间显示*/
smsWebApp.filter('timeFormat', ['$filter', function ($filter) {
  return function (input) {
    if(input != null){
      var dateTime = new Date(input.replace("-", "/").replace("-", "/"));
      return $filter('date')(dateTime, 'yyyy-MM-dd HH:mm');
      //return input.substr(0, 16);
    }else{
      return '-';
    }
  };
}])
/*日期显示*/
.filter('dateFormat', ['$filter', function ($filter) {
  return function (input) {
    if(input != null){
      var dateTime = new Date(input.replace("-", "/").replace("-", "/")); 
      return $filter('date')(dateTime, 'yyyy-MM-dd');
      //return input.substr(0, 10);
    }else{
      return '-';
    }
  };
}])
/*首页公告*/
.filter('homeTitle', ['$filter', function ($filter) {
  return function (input) {
    if(input != null){
      return input.substring(0, 20);
    }
  };
}])
/*男女姓名*/
.filter('sexFormat', ['$filter', function ($filter) {
  return function (input) {
    if(input == '0'){
      return "男";
    }else if(input == '1'){
      return "女";
    }else{
      return "保密";
    }
  };
}])
/*服务状态*/
.filter('serviceState', ['$filter', function ($filter) {
  return function (input) {
    if(input == 'enable'){
      return "<span class='c-blue'>正常</span>";
    }else if(input == 'disable'){
      return "<span class='c-red'>服务不可用</span>";
    }else{
      return "<span>-</span>";
    }
  };
}])
/*用户状态*/
.filter('statusFormat', ['$filter', function ($filter) {
  return function (input) {
    if(input == '0'){
      return "停用";
    }else if(input == '1'){
      return "正常";
    }else{
      return "-";
    }
  };
}]).filter('statusOPFormat', ['$filter', function ($filter) {
  return function (input) {
    if(input == '0'){
      return "启用";
    }else if(input == '1'){
      return "停用";
    }else{
      return "-";
    }
  };
}]);

