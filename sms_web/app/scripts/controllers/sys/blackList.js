'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:BlackListCtrl
 * @description
 * # BlackListCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('BlackListCtrl',['$scope', '$rootScope', 'httpServices', function ($scope, $rootScope, httpServices) {
	/*导航栏的当前状态*/
    $scope.navCurrent = "blackList";

    /*绑定事件*/
    var bindEvent = function(){
      $("#addMobile").keypress(function (event) {
        if (event.keyCode == '13') {
           $("#btnSingle").click();       
        }
      });
    };
    bindEvent();  

    /*页面初始化*/
    var initData = function(){
        $scope.searchKey = "";
        $scope.addMobile = "";

        $scope.mobileList = [];//移动
      	$scope.unicomList = [];//联通
      	$scope.telecomList = [];//电信
      	$scope.addMobileList = [];//只存手机号，校验重复
    };  

    /*全选复选框*/
    var initCheckBox = function(){
      $scope.chkAll1 = false;
      $scope.chkAll2 = false;
      $scope.chkAll3 = false;

      $scope.allMobileCheck = false;
      $scope.allUnicomCheck = false;
      $scope.allTelecomCheck = false;      

      $scope.MobileChecked = [];
      $scope.UnicomChecked = [];
      $scope.TelecomChecked = [];
    };

    /*全选复选框*/
    $scope.checkAll = function($index, type){
      var isChecked = !$index;
      if(isChecked){
        switch(type){
          case "1":
            $scope.allUnicomCheck = true;
            $scope.UnicomChecked = $scope.unicomList;
            break;
          case "2":
            $scope.allMobileCheck = true;
            $scope.MobileChecked = $scope.mobileList;
            break;
          case "3":
            $scope.allTelecomCheck = true;
            $scope.TelecomChecked = $scope.telecomList;
            break;
        }
      }else{
        switch(type){
          case "1":
            $scope.allUnicomCheck = false;
            $scope.UnicomChecked = [];
            break;
          case "2":
            $scope.allMobileCheck = false;
            $scope.MobileChecked = [];
            break;
          case "3":
            $scope.allTelecomCheck = false;
            $scope.TelecomChecked = [];
            break;
        }
      }
    };

    /*单个复选框*/
    $scope.ckbChange = function($index, item, type){
      //var checkbox = $event.target;
      var isChecked = $index;
      if(isChecked){
        switch(type){
          case "1":
            $scope.UnicomChecked.push(item);
            break;
          case "2":
            $scope.MobileChecked.push(item);
            break;
          case "3":
            $scope.TelecomChecked.push(item);
            break;
        }
      }else{
        switch(type){
          case "1":
            var idx = $scope.UnicomChecked.indexOf(item);
            $scope.UnicomChecked.splice(idx, 1);
            break;
          case "2":
            var idx = $scope.MobileChecked.indexOf(item);
            $scope.MobileChecked.splice(idx, 1);
            break;
          case "3":
            var idx = $scope.TelecomChecked.indexOf(item);
            $scope.TelecomChecked.splice(idx, 1);
            break;
        }
      }         
    };  

    /*判断是否当前搜索*/
    $scope.isSearchResult = function(item){
      var searchKey = $scope.searchKey.trim();      
      if(searchKey && item.phone.indexOf(searchKey) != -1){
        return "result";
      }
      return "";
    };

    /*添加单条记录*/
    var addSingleBlack = function(item){
    	var tcType = telecom.getType(item.phone);
      	switch(tcType){
        	case telecom.ChinaUnicom:
          	$scope.unicomList.push(item);
          	break;
        	case telecom.ChinaMobile:
          	$scope.mobileList.push(item);
          	break;
        	case telecom.ChinaTelecom:
          	$scope.telecomList.push(item);
          	break;
      	}
      	$scope.addMobileList.push(item.phone);
    };
    
    /*添加单条记录按钮*/
    $scope.btnAddSingle = function(){
	    var userMobile = $scope.addMobile.trim();
	    //手机格式错误
	    if(!telecom.reg.test(userMobile)){
	        Modal.alert({msg: '手机号格式错误！', title: '提示'});
	        return false;
	    }      
        //判断号码重复
        if($scope.addMobileList.indexOf(userMobile) >= 0){
        	Modal.alert({msg: '手机号已经存在，无需重复添加！', title: '提示'});
        	return false;
        }
        httpServices.Post('black:addBlackList', {"phone": userMobile}).success(function(data){
			if(data["code"] == "S_OK"){
			    var item = data["var"];
			    addSingleBlack(item);
			    $scope.addMobile = "";
          setTimeout(changeClass, 100);
			}else{
				Modal.alert({msg: data["msg"], title: '错误提示'});
			}
		});
    };  

    /*删除选中号码*/
    $scope.deleteSelected = function(){
    	var delList = [];
    	angular.forEach($scope.MobileChecked, function(item){
    		delList.push({"blackId": item.blackId});
    	});
    	angular.forEach($scope.UnicomChecked, function(item){
    		delList.push({"blackId": item.blackId});
    	});
    	angular.forEach($scope.TelecomChecked, function(item){
    		delList.push({"blackId": item.blackId});
    	});
    	if(delList.length == 0){
    		Modal.alert({msg: "请先选择需要删除的黑名单号码！", title: '提示'});
    		return false;
    	}
    	Modal.confirm({
        	msg: "确定要删除选中黑名单数据？"
      }).on( function (e) {
      	if(e){        		
        		httpServices.Post('black:delBlackList', {"blackList": delList}).success(function(data){
    				if(data["code"] == "S_OK"){
        				getListData();
    				}else{
    					Modal.alert({msg: data["msg"], title: '错误提示'});
    				}
    			});
      	} 
    	});    	
    };

    /*调整列表样式*/
    var changeClass = function(){
      var obj = document.getElementById("table-con-div");   
      if(obj.scrollHeight>obj.clientHeight || obj.offsetHeight>obj.clientHeight){ 
        $('#table-con-div').addClass('bllist'); 
      }else{
        $('#table-con-div').removeClass('bllist'); 
      }
    };

    /*获取数据列表*/
    var getListData = function(){   
    	initData();
    	initCheckBox();
        httpServices.Post('black:getBlackList', {}).success(function(data){
            if(data["code"] == "S_OK"){
                var _list = data["var"]["blackList"];
                angular.forEach(_list, function(item){
                	addSingleBlack(item);
                });                
                setTimeout(changeClass, 100); 
            }else{
            	Modal.alert({msg: data["msg"], title: '错误提示'});
            }
        });
    };
    getListData();

    /*导出黑名单*/
    $scope.exportData = function(){
      httpServices.Export('exportBlackList.do', {});
    };

    /*导入联系人数据*/
    var options = {
      'action': '/smsApi/uploadBlackList.do?sid=' + $rootScope.sid,
      'params': {},
      'valid_extensions': ['xls','xlsx'],
      'onComplete': function(response) {
        loadingDiv.hide();
      	$("#btnUpFile").html('导入');
      	if(response["code"] == "S_OK"){       
          $scope.$apply(function() {
            getListData();
          });
      	}else{
      		Modal.alert({msg: response["msg"], title: '错误提示'});
      	}
        var oldElement = $('#uploadFile'); 
        var newElement = $(oldElement).clone(); 
        $(oldElement).before(newElement).remove();   
        $(newElement).ajaxfileupload(options);     
      },
      'onStart': function() {
        loadingDiv.show();
        $("#btnUpFile").html('导入中...');        
      },
      'onCancel': function() {
        $("#btnUpFile").html('导入');
      }
    };
    $('#uploadFile').ajaxfileupload(options);
}]);