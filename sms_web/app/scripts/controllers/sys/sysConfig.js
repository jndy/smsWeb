'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:SysConfigCtrl
 * @description
 * # SysConfigCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('SysConfigCtrl',['$scope', '$rootScope', 'httpServices', 'dataService', function ($scope, $rootScope, httpServices, dataService) {
	/*导航栏的当前状态*/
    $scope.navCurrent = "sysConfig";

    var initData = function(){
    	$scope.companyList = [];
    	$scope.companyListForm = [];
    	$scope.packageList = [];
    	$scope.packageListForm = [];
    	$scope.ipAccessList = [];
        $scope.wordList = [];
        $scope.keyWord = "";

        //$scope.sensitiveWord = "";
        $scope.sendEncrypt = false;
        $scope.receiveEncrypt = false;

        $scope.currentComId = "";
    };
    initData();

    /*全选、取消全选*/
    $scope.checkAll = function($event, ele){
        var checkbox = $event.target;      
        $('input[name="'+ele+'"]').prop("checked", checkbox.checked);
    };

    /*获取公司数据列表*/
    var getCorpData = function(pageNo, pageSize){
        var postData = {};
        postData.pageNo = pageNo;
        postData.pageSize = pageSize;    
        httpServices.Post('company:getCompanyList', postData).success(function(data){
            if(data["code"] == "S_OK"){            	          
                $scope.companyList = data["var"]["companyList"];
                $scope.paginationCorp.totalItems = data["var"]["listCount"];                 
            }
        });
    };
    /*公司列表分页*/   
    $scope.paginationCorp = {
        floatAround: 'right',
        showTotal: false,
        currentPage: 1,
        totalItems: 1,        
        itemsPerPage: 5,
        onChange: function(){
            getCorpData(this.currentPage, this.itemsPerPage);
        }
    };

    /*删除公司*/
    $scope.delCompany = function(){
    	var chk_value = [];
    	$('input[name="ckbCompany"]:checked').each(function(){ 
			chk_value.push({"comId": $(this).val()}); 
		});
		if(chk_value.length == 0){
			Modal.alert({msg: "请先选择需要删除的公司！", title: '提示'});
			return false;
		}
    	Modal.confirm({
        	msg: "确定要删除选中公司信息？"
	    }).on( function (e) {
	      	if(e){        		
        		httpServices.Post('company:delCompany', chk_value).success(function(data){
    				if(data["code"] == "S_OK"){
                        $('input[name="ckbCompany"]').attr("checked", false);
        				getCorpData($scope.paginationCorp.currentPage, $scope.paginationCorp.itemsPerPage);
    				}else{
    					Modal.alert({msg: data["msg"], title: '错误提示'});
    				}
    			});
	      	} 
    	}); 
    };

    /*添加公司*/
    $scope.addCompany = function(){
    	$scope.actionType = "add";
    	$scope.corpFormData = {};
    	$scope.companyPackage = "";
    	dataService.queryPackageList({}).then(function (result) {
	        $scope.packageListForm = result;
	        $("#editCorpModal").modal('show');
	    });    	
    };
    /*添加公司保存数据*/
    $scope.submitCorpForm = function(isValid, formData){
    	if(!isValid){
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }else{
        	formData.packId = getValue($scope.companyPackage);
        	httpServices.Post('company:addCompany', formData).success(function(data){
				if(data["code"] == "S_OK"){
					$("#editCorpModal").modal('hide');
					$scope.paginationCorp.currentPage = 1;
    				getCorpData($scope.paginationCorp.currentPage, $scope.paginationCorp.itemsPerPage);
				}else{
					Modal.alert({msg: data["msg"], title: '错误提示'});
				}
			});
        }
    };

    /*显示公司短彩信情况*/
    $scope.showFloatDiv = function(comId){
        if($scope.currentComId != comId){
            $scope.currentComId = comId;
        }else{
            $scope.currentComId = "";
        }        
    };

    /*修改短彩信量*/
    $scope.editCount = function(item){
        $scope.countFormData = {};
        $scope.countFormData.comId = item.comId;
        $scope.countFormData.comName = item.comName;
        $("#editCountModal").modal('show');
    };

    /*保存短彩信修改量*/
    $scope.submitCountForm = function(isValid, formData){
        if(!isValid){
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }else{
            httpServices.Post('company:addSmsMmsData', formData).success(function(data){
                if(data["code"] == "S_OK"){
                    $("#editCountModal").modal('hide');
                    getCorpData($scope.paginationCorp.currentPage, $scope.paginationCorp.itemsPerPage);
                }else{
                    Modal.alert({msg: data["msg"], title: '错误提示'});
                }
            });
        }
    };

    /*获取套餐数据列表*/
    var getPackData = function(pageNo, pageSize){
        var postData = {};
        postData.pageNo = pageNo;
        postData.pageSize = pageSize;    
        httpServices.Post('packages:getPackageList', postData).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.packageList = data["var"]["packageList"];
                $scope.paginationPack.totalItems = data["var"]["listCount"];                 
            }
        });
    };
    /*套餐配置分页*/
    $scope.paginationPack = {
        floatAround: 'right',
        showTotal: false,
        currentPage: 1,
        totalItems: 1,        
        itemsPerPage: 5,
        onChange: function(){
            getPackData(this.currentPage, this.itemsPerPage);
        }
    };

    /*删除套餐*/
    $scope.delPackage = function(){
    	var chk_value = [];
    	$('input[name="ckbPackage"]:checked').each(function(){ 
			chk_value.push({"packId": $(this).val()}); 
		});
		if(chk_value.length == 0){
			Modal.alert({msg: "请先选择需要删除的套餐！", title: '提示'});
			return false;
		}
    	Modal.confirm({
        	msg: "确定要删除选中套餐信息？"
	    }).on( function (e) {
	      	if(e){        		
        		httpServices.Post('packages:delPackage', chk_value).success(function(data){
    				if(data["code"] == "S_OK"){
                        $('input[name="ckbPackage"]').attr("checked", false);
        				getPackData($scope.paginationPack.currentPage, $scope.paginationPack.itemsPerPage);
    				}else{
    					Modal.alert({msg: data["msg"], title: '错误提示'});
    				}
    			});
	      	} 
    	}); 
    };

    /*添加套餐*/
    $scope.addPackage = function(){
    	$scope.actionType = "add";
    	$scope.packFormData = {};
    	$("#editPackModal").modal('show');
    };
    /*添加套餐保存数据*/
    $scope.submitPackForm = function(isValid, formData){
    	if(!isValid){
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }else{
        	httpServices.Post('packages:addPackage', formData).success(function(data){
				if(data["code"] == "S_OK"){
					$("#editPackModal").modal('hide');
					$scope.paginationPack.currentPage = 1;
    				getPackData($scope.paginationPack.currentPage, $scope.paginationPack.itemsPerPage);
				}else{
					Modal.alert({msg: data["msg"], title: '错误提示'});
				}
			});
        }
    };

    /*获取接入IP数据列表*/
    var getAccessData = function(pageNo, pageSize){
        var postData = {};
        postData.pageNo = pageNo;
        postData.pageSize = pageSize;    
        httpServices.Post('access:getIPAccessList', postData).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.ipAccessList = data["var"]["ipAccessList"];
                $scope.paginationAccess.totalItems = data["var"]["listCount"]; 
            }
        });
    };
    /*第三方接入IP分页*/
    $scope.paginationAccess = {
        floatAround: 'right',
        showTotal: false,
        currentPage: 1,
        totalItems: 1,        
        itemsPerPage: 5,
        onChange: function(){
            getAccessData(this.currentPage, this.itemsPerPage);
        }
    };

    /*删除接入IP*/
    $scope.delIPAccess = function(){
    	var chk_value = [];
    	$('input[name="ckbIPAccess"]:checked').each(function(){ 
			chk_value.push({"accessId": $(this).val()}); 
		});
		if(chk_value.length == 0){
			Modal.alert({msg: "请先选择需要删除的接入IP！", title: '提示'});
			return false;
		}
    	Modal.confirm({
        	msg: "确定要删除选中接入IP信息？"
	    }).on( function (e) {
	      	if(e){        		
        		httpServices.Post('access:delIPAccess', chk_value).success(function(data){
    				if(data["code"] == "S_OK"){
                        $('input[name="ckbIPAccess"]').attr("checked", false);
        				getAccessData($scope.paginationAccess.currentPage, $scope.paginationAccess.itemsPerPage);
    				}else{
    					Modal.alert({msg: data["msg"], title: '错误提示'});
    				}
    			});
	      	} 
    	}); 
    };

    /*添加接入IP*/
    $scope.addIPAccess = function(){
    	$scope.actionType = "add";
    	$scope.accessFormData = {};
    	$scope.accessCompany = "";
    	dataService.queryCompanyList({}).then(function (result) {
	        angular.copy(result, $scope.companyListForm);
	        $scope.companyListForm.splice(0, 1);
	        $("#editAccessModal").modal('show');
	    });    	
    };
    /*添加接入IP保存数据*/
    $scope.submitAccessForm = function(isValid, formData){
    	if(!isValid){
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }else{
        	formData.comId = getValue($scope.accessCompany);
            formData.comName = getTitle($scope.accessCompany);
        	httpServices.Post('access:addIPAccess', formData).success(function(data){
				if(data["code"] == "S_OK"){
					$("#editAccessModal").modal('hide');
					$scope.paginationAccess.currentPage = 1;
    				getAccessData($scope.paginationAccess.currentPage, $scope.paginationAccess.itemsPerPage);
				}else{
					Modal.alert({msg: data["msg"], title: '错误提示'});
				}
			});
        }
    };    

    /*其他配置项*/
    var getOtherConfig = function(){
    	httpServices.Post('config:getConfigList', {"configType": 0}).success(function(data){
            if(data["code"] == "S_OK"){
                var rData = data["var"];                
                //$scope.sensitiveWord = getConfigValue(rData, "sensitiveWord");
                $scope.sendEncrypt = getConfigValue(rData, "sendEncrypt") == "true" ? true : false;
                $scope.receiveEncrypt = getConfigValue(rData, "receiveEncrypt") == "true" ? true : false;
            }
        });
    };
    getOtherConfig();
    /*保存其他配置*/
    $scope.saveOtherConfig = function(){
    	var postData = [];
    	//postData.push({"configName": "sensitiveWord", "configValue": $scope.sensitiveWord ? $scope.sensitiveWord.trim() : ''});
    	postData.push({"configName": "sendEncrypt", "configValue": ($scope.sendEncrypt ? "true" : "false")});
    	postData.push({"configName": "receiveEncrypt", "configValue": ($scope.receiveEncrypt ? "true" : "false")});        
    	httpServices.Post('config:saveConfig', postData).success(function(data){
            if(data["code"] == "S_OK"){
                Modal.alert({msg: "其他配置项信息保存成功！", title: '提示'});
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }
        });
    };

    /*获取关键字数据列表*/
    var getWordData = function(pageNo, pageSize){
        var postData = {};
        postData.pageNo = pageNo;
        postData.pageSize = pageSize; 
        postData.keyword = $scope.keyWord.trim();   
        httpServices.Post('sensitive:getSensitiveWordList', postData).success(function(data){
            if(data["code"] == "S_OK"){                       
                $scope.wordList = data["var"]["wordList"];
                $scope.paginationWord.totalItems = data["var"]["listCount"];                 
            }
        });
    };
    /*公司列表分页*/   
    $scope.paginationWord = {
        floatAround: 'right',
        showTotal: false,
        currentPage: 1,
        totalItems: 1,        
        itemsPerPage: 5,
        onChange: function(){
            getWordData(this.currentPage, this.itemsPerPage);
        }
    };

    /*删除关键字*/
    $scope.delSensitiveWord = function(){
        var chk_value = [];
        $('input[name="ckbsWord"]:checked').each(function(){ 
            chk_value.push({"wordId": $(this).val()}); 
        });
        if(chk_value.length == 0){
            Modal.alert({msg: "请先选择需要删除的关键字！", title: '提示'});
            return false;
        }
        Modal.confirm({
            msg: "确定要删除选中关键字？"
        }).on( function (e) {
            if(e){              
                httpServices.Post('sensitive:delSensitiveWord', chk_value).success(function(data){
                    if(data["code"] == "S_OK"){
                        $('input[name="ckbsWord"]').attr("checked", false);
                        getWordData($scope.paginationWord.currentPage, $scope.paginationWord.itemsPerPage);
                    }else{
                        Modal.alert({msg: data["msg"], title: '错误提示'});
                    }
                });
            } 
        }); 
    };

    /*搜索关键字*/
    $scope.searchSensitiveWord = function(){
        $scope.paginationWord.currentPage = 1;
        getWordData($scope.paginationWord.currentPage, $scope.paginationWord.itemsPerPage);
    };

    /*导出关键字*/
    $scope.exportSensitiveWord = function(){
        httpServices.Export('exportSensitiveWord.do', {});
    };

    /*导入关键字*/
    var options = {
      'action': '/smsApi/uploadSensitiveWord.do?sid=' + $rootScope.sid,
      'params': {},
      'valid_extensions': ['xls','xlsx'],
      'onComplete': function(response) {
        loadingDiv.hide();
        $("#btnUpFile").html('导入');
        if(response["code"] == "S_OK"){       
          $scope.$apply(function() {
            $scope.paginationWord.currentPage = 1;
            getWordData($scope.paginationWord.currentPage, $scope.paginationWord.itemsPerPage);
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