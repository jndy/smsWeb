'use strict';

/**
 * @ngdoc function 
 * @name smsWebApp.directive:selectAddr
 * @description 选择联系人
 * @author zxh 2016-05-24
 * # selectAddr
 * directive of the smsWebApp
 */

smsWebApp.directive('selectAddr', [ function() {
	var option = {
  	  require: '?ngModel',
      restrict : 'EA',
      replace : true,
      transclude : true,
      scope : {
      	ngModel: '=',
      	selectAddr: '=',
        refreshAddr: '=',
        callBack: '='
      },
      templateUrl: './views/public/addr.html',
      link: function(scope, element, attrs, ctrl) {
        /*初始化数据*/
        scope.showCompanyAddr = false;
        scope.showPersonAddr = false;
        scope.searchKey = '';
        scope.searchList = [];
        /*刷新通讯录*/
        scope.refresh = function refresh(){
          if(scope.refreshAddr){
            scope.refreshAddr();
            scope.searchKey = '';
            scope.searchList = [];
          }
        };        
        /*搜索通讯录*/
        var searchRecursion = function(group_list, user_list, groupName){
          var key = scope.searchKey.trim();
          if(user_list && user_list.length>0){
            user_list.forEach(function(item){
              if(item.u_name.indexOf(key) != -1 || item.u_phone.indexOf(key) != -1){
                item.groupName = groupName;
                scope.searchList.push(item);
              }              
            });
          }
          if(group_list && group_list.length>0){
            group_list.forEach(function(item){
              searchRecursion(item.group_list, item.user_list, item.groupName);
            })
          }
        };
        /*递归搜索*/
        var searchAddr = function(){  
          var key = scope.searchKey.trim();        
          if(key){
            scope.searchList = [];
            searchRecursion(scope.selectAddr.companyAddr.group_list, scope.selectAddr.companyAddr.user_list, '企业通讯录');
            searchRecursion(scope.selectAddr.personAddr.group_list, scope.selectAddr.personAddr.user_list, '个人通讯录');
          }else{
            scope.searchList = [];
          }
        };
        scope.btnSearch = function btnSearch(){
          searchAddr();
        };
        element.find('#searchKey').on('keypress', function ($event) {
          if($event.keyCode == '13') {
            scope.$apply(function () {
              searchAddr();              
            });                     
          }
        });
        /*选择条目*/
        scope.selectItem = function selectItem(item){
          if(scope.ngModel.indexOf(item) == -1){
            scope.ngModel.push(item);
          }          
        };
        /*清空单条*/
        scope.removeItem = function removeItem(item){
          var idx = scope.ngModel.indexOf(item);
          scope.ngModel.splice(idx, 1);
        };
        /*清空全部*/
        scope.removeAll = function removeAll(){
          scope.ngModel = [];
        };
        /*确定按钮回调*/
        scope.btnCallBack = function btnCallBack(){
          if(scope.callBack){
            scope.callBack();
          }
        };
      }
    };
    return option;
}]);