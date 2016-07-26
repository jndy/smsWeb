'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:ContactListCtrl
 * @description
 * # ContactListCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('ContactListCtrl',['$scope', '$rootScope', 'httpServices', 'angularPermission', function ($scope, $rootScope, httpServices, angularPermission) {
    /*数据初始化*/
    var initData = function(){
        $scope.keyWord = "";
    	$scope.addrCompanyAddrOrg = {};//企业树
    	$scope.addrPersonAddrOrg = {};//个人树
    	$scope.currentCompanyId = 0;

        $scope.addrType = "company";//通讯录类型
        $scope.actionType = "";//操作类型
        $scope.deptFormData = {};//dept表单编辑
        $scope.currentItem = {};//当前选中item

        $scope.contentList = [];
    };
    initData();

    /*绑定事件*/
    var bindEvent = function(){
      $("#keyWord").keypress(function (event) {
        if (event.keyCode == '13') {
           $("#btnSearch").click();       
        }
      });
    };
    bindEvent(); 

    /*检查当前Item的ParentIds*/
    var getCurrentItemPath = function(gIds, objs, item){
        angular.forEach(objs, function(obj){ 
            var strGIds = '';
            if(gIds == ''){
                strGIds = obj.groupId;
            }else{
                strGIds = gIds + ',' + obj.groupId;
            }
            if(obj.groupId == item.parentId){           
                $scope.currentItemPath = strGIds.toString().split(',');              
            }else if(obj.group_list && obj.group_list.length > 0){                 
                getCurrentItemPath(strGIds, obj.group_list, item);
            }
        }); 
    };

    /*检查当前选中Item是否匹配，如果匹配选中*/
    var currentItemCheck = function(objs, arrPath, addrType){
        if($scope.addrType = addrType){
            angular.forEach(objs, function(obj){
                if($.inArray(obj.groupId.toString(), arrPath) != -1){
                    obj.show = true;
                }
                if(obj.group_list){
                    currentItemCheck(obj.group_list, arrPath, addrType); 
                }
            });
        }        
    };

    /*获取企业通讯录组织树数据*/
    var getCompanyAddrOrg = function(showChild, isFisrt){
		var pData = {};
		pData.groupId = "";
		pData.recursion = 1;
		pData.showUsers = 0;//不显示用户列表
        $scope.addrCompanyAddrOrg.companyAddr = {};
        $scope.addrCompanyAddrOrg.userCount = 0;
		httpServices.Post('addr:companyAddr', pData).success(function(data){
			if(data["code"] == "S_OK"){                  
				$scope.addrCompanyAddrOrg = data["var"] || {};
                $scope.addrCompanyAddrOrg.show = showChild;
                if(isFisrt != undefined && isFisrt){
                    $scope.currentItem = $scope.addrCompanyAddrOrg;
                }else{
                    $scope.currentItemPath = [];
                    getCurrentItemPath('', $scope.addrCompanyAddrOrg.companyAddr.group_list, $scope.currentItem);   
                    currentItemCheck($scope.addrCompanyAddrOrg.companyAddr.group_list, $scope.currentItemPath, 'company');
                }
			}else{
				Modal.alert({msg: data["msg"], title: '错误提示'});
			}
		});
    };
    /*获取个人通讯录组织树数据*/
    var getPersonAddrOrg = function(showChild){
		var pData = {};
		pData.groupId = "";
		pData.recursion = 1;
		pData.showUsers = 0;//不显示用户列表  
        $scope.addrPersonAddrOrg.personAddr = {};
        $scope.addrPersonAddrOrg.userCount = 0;
		httpServices.Post('addr:personAddr', pData).success(function(data){
			if(data["code"] == "S_OK"){                          
				$scope.addrPersonAddrOrg = data["var"] || {};
                $scope.addrPersonAddrOrg.show = showChild;
            }else{
			 	Modal.alert({msg: data["msg"], title: '错误提示'});
			}
		});
    };
    /*加载树形结构数据*/    
    var initAddrTreeData = function(){         
        if(angularPermission.hasPermission("CONTACT_MANAGEMENT_VIEW")){
            getCompanyAddrOrg(true, true);
            getPersonAddrOrg(false);
        }else{
            getPersonAddrOrg(true);
            $scope.addrType = 'person';
        }        
    };
    initAddrTreeData();

    /*组织树当前选中状态*/    
    $scope.isOrgCurrent = function(item, addrType){
    	if($scope.currentItem.groupId == item.groupId && $scope.addrType == addrType){
    		return "current";
    	}else{
    		return "";
    	}
    };

    /*选中节点事件*/
    $scope.itemClick = function(item, addrType){
    	item.show = !item.show;
    	$scope.currentItem = item;
        $scope.addrType = addrType;      
        $scope.paginationConf.currentPage = 1;
        getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    };

    /*删除部门组织*/
    $scope.delOrg = function(item, addrType, e){
    	e.preventDefault(); 
        e.stopPropagation();
        $scope.addrType = addrType;
        $scope.actionType = "delete";
        $scope.deptFormData = {};
        $scope.deptFormData.groupId = item.groupId;
        if(addrType == "company"){
            Modal.confirm({
                msg: "确定要删除该企业通讯录中的部门？"
            }).on( function (e) {
                if(e){
                    deptOperate($scope.deptFormData, $scope.addrType, $scope.actionType);
                }
            });
        }else{
            deptOperate($scope.deptFormData, $scope.addrType, $scope.actionType);
        }  
    };

    /*添加部门组织*/
    $scope.addOrg = function(item, addrType, e){
    	e.preventDefault(); 
        e.stopPropagation();
        $scope.addrType = addrType;
        $scope.actionType = "add";
        $scope.deptFormData = {};
        $scope.deptFormData.parentId = (item && item != "") ? item.groupId : 0;
        $("#editDeptModal").modal("show");
    };

    /*修改部门组织*/
    $scope.editOrg = function(item, addrType, e){
        e.preventDefault(); 
        e.stopPropagation();
        $scope.addrType = addrType;
        $scope.actionType = "update";
        $scope.deptFormData = angular.copy(item);
        $("#editDeptModal").modal("show");
    };

    /*左侧组织树操作*/
    var deptOperate = function(formData, addrType, actionType){
        var funName = "", postData = {};
        if(addrType == "company"){
            funName = "addr:setCompanyGroup";
        }else{
            funName = "addr:setPersonGroup";
        }
        if(actionType == "add"){
            postData.parentId = formData.parentId;
            postData.groupName = formData.groupName;
        }else if(actionType == "update"){
            postData.groupId = formData.groupId;
            postData.groupName = formData.groupName;
        }else{
            postData.groupId = formData.groupId;
            if(addrType == "company"){postData.isDeleteAll = 1};
        }
        postData.operateType = actionType;        
        httpServices.Post(funName, postData).success(function(data){
            if(data["code"] == "S_OK"){
                if(addrType == "company"){
                    getCompanyAddrOrg(true);
                }else{
                    getPersonAddrOrg(true);
                }   
                if(actionType == "add" || actionType == "update"){
                    $("#editDeptModal").modal("hide");
                }
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }
        });
    };

    /*添加\修改部门群组信息*/
    $scope.submitDeptForm = function(isValid, formData, addrType, actionType){
        if(!isValid){
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }else{
            deptOperate(formData, addrType, actionType);
        }
    };

    /*获取右侧通讯录列表数据*/
    var getListData = function(pageNo, pageSize){
        var postData = {};
        postData.pageNo = pageNo;
        postData.pageSize = pageSize; 
        postData.keyword = $scope.keyWord.trim(); 
        if($scope.currentItem.groupId != undefined){
            postData.groupId = $scope.currentItem.groupId;
        }
        if($scope.addrType && $scope.addrType != ""){
            postData.addrType = $scope.addrType;
        }
        httpServices.Post('addr:searchContact', postData).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.addrCheckAll = false;
                $scope.contentList = data["var"]["contactList"];
                $scope.paginationConf.totalItems = data["var"]["listCount"];             
            }
        });
    };

    /*搜索通讯录*/
    $scope.searchData = function(){
        $scope.paginationConf.currentPage = 1;
        getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    };

    /*导出联系人*/
    $scope.exportContact = function(){
        var pData = {};
        pData.addrType = $scope.addrType;
        pData.groupId = ($scope.currentItem.groupId != undefined) ? $scope.currentItem.groupId : "";
        pData.keyword = $scope.keyWord.trim();
        httpServices.Export('exportPersonAddr.do', pData);
    };

    /*联系人数据分页*/
    $scope.paginationConf = {
        floatAround: 'right',
        showTotal: true,
        currentPage: 1,
        totalItems: 1,        
        itemsPerPage: 20,
        pagesLength: 15,
        perPageOptions: [10, 20, 30, 50, 100],
        rememberPerPage: 'perPageItems',
        onChange: function(){
            getListData(this.currentPage, this.itemsPerPage);
        }
    };

    /*新增联系人*/
    $scope.addnewContact = function(addrType){        
        $scope.addrType = addrType;
        $scope.actionType = "add";
        $scope.contactFormData = {};
        $scope.contactFormData.groupId = $scope.currentItem.groupId;
        $scope.contactFormData.groupName = ($scope.currentItem.groupName) ? $scope.currentItem.groupName : (addrType == 'company' ? $scope.currentItem.companyName : '未分组');
        $scope.contactFormData.addrSex = "2";     
        $("#editContactModal").modal("show");
    };

    /*联系人操作*/
    var contactOperate = function(formData, addrType, actionType){
        var funName = "", postData = {};
        if(addrType == "company"){
            funName = "addr:setCompanyAddr";
        }else{
            funName = "addr:setPersonAddr";
        }
        postData.operateType = actionType;        
        if(actionType == "add" || actionType == "update"){
            if(actionType == "update"){ postData.addrId = formData.addrId; }
            postData.groupId = formData.groupId;            
            postData.addrName = formData.addrName;
            postData.addrPhone = formData.addrPhone;
            postData.addrSex = formData.addrSex;
            postData.age = formData.age;
        }else{
            postData.ids = formData.groupIds;
        }        
        httpServices.Post(funName, postData).success(function(data){
            if(data["code"] == "S_OK"){                
                if(actionType == "add" || actionType == "delete"){
                    if(addrType == "company"){
                        getCompanyAddrOrg(true);
                    }else{
                        getPersonAddrOrg(true);
                    }   
                    $('input[name="ckbContact"]').attr("checked", false);                  
                }
                if(actionType == "add" || actionType == "update"){ 
                    $("#editContactModal").modal("hide");
                    $scope.paginationConf.currentPage = 1; 
                }
                getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);                              
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }
        });
    };

    /*提交表单保存联系人*/
    $scope.submitContactForm = function(isValid, formData, addrType, actionType){
        if(!isValid){
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }else{
            contactOperate(formData, addrType, actionType);
        }
    };

    /*删除联系人*/
    $scope.deleteContact = function(addrType){
        var addrId = '', formData = {}, chk_value = [];
        var actionType = "delete";      
        $('input[name="ckbContact"]:checked').each(function(){ 
            chk_value.push($(this).val()); 
        });
        if(chk_value.length == 0){
            Modal.alert({msg: '请先选择需要删除的联系人！', title: '提示'});
            return false;
        }
        formData.groupIds = chk_value;
        contactOperate(formData, addrType, actionType);
    };

    /*导入联系人*/
    $scope.importContact = function(addrType){
        $scope.addrType = addrType;
        $scope.actionType = "import";
        $scope.importFormData = {};
        $scope.importFormData.groupId = ($scope.currentItem.groupId != undefined) ? $scope.currentItem.groupId : '';
        $scope.importFormData.groupName = ($scope.currentItem.groupName) ? $scope.currentItem.groupName : (addrType == 'company' ? $scope.currentItem.companyName : '未分组');
        $("#importModal").modal("show"); 

        /*导入联系人数据*/
        $('#uploadFile').ajaxfileupload({
          'action': '/smsApi/uploadAddrList.do?sid=' + $rootScope.sid,
          'params': {
            'groupId': $scope.importFormData.groupId,
            'addrType': $scope.addrType
          },
          'valid_extensions': ['xls','xlsx'],
          'onComplete': function(response) {
            loadingDiv.hide();
            $("#btnUpFile").html('选择文件');
            if(response["code"] == "S_OK"){       
              $scope.$apply(function() {
                $("#importModal").modal("hide");
                if(response["msg"] != ''){
                    Modal.alert({msg: response["msg"], title: '提示'});
                }                
                if(addrType == "company"){
                    getCompanyAddrOrg(true);
                }else{
                    getPersonAddrOrg(true);
                } 
                $scope.paginationConf.currentPage = 1;
                getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);                
              });
            }else{
                Modal.alert({msg: response["msg"], title: '错误提示'});
            }  

            var oldElement = $('#uploadFile'); //得到页面中的<input type='file' />对象
            var newElement = $(oldElement).clone(); //克隆页面中的<input type='file' />对象
            $(oldElement).before(newElement).remove();  
          },
          'onStart': function() {
            //if(cancel) return false; // cancels upload
            loadingDiv.show();
            $("#btnUpFile").html('联系人导入中...');
          },
          'onCancel': function() {
            //('no file selected');
            $("#btnUpFile").html('选择文件');
          }
        });
    }; 
}]);
