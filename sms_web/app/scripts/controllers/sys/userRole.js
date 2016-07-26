'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:UserRoleCtrl
 * @description
 * # UserRoleCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('UserRoleCtrl', ['$scope', '$rootScope', 'httpServices', 'dataService', 'angularPermission',
	function ($scope, $rootScope, httpServices, dataService, angularPermission) {
	/*导航栏的当前状态*/
    $scope.navCurrent = "userRole";

    /*获取公司列表*/
    $scope.companyList = [];
    $scope.companyListForm = [];
    if($rootScope.isSuperAdmin){
	    dataService.queryCompanyList({}).then(function (result) {
	        $scope.companyList = result;   
            angular.copy(result, $scope.companyListForm);
            $scope.companyListForm.splice(0, 1);                         
	    }); 
	}
    /*选择公司下拉框*/
    $scope.companyChange = function(item){
        queryRoleList(item); 
    };

    /*获取角色列表*/
    $scope.roleList = [];
    $scope.showPermiss = false;//显示权限
    var initRole = {'title': '=用户角色=', 'value': '', 'roleType': ''};
    var queryRoleList = function(item){
        var pData = {};
        if(item && item.value){
            pData.companyId = item.value;
        }
        dataService.queryRoleList(pData).then(function (result) {
            $scope.selectRole = initRole;
            $scope.roleList = result;    
            var arrAll = [];            
            if(!angularPermission.hasPermission('USER_MANAGEMENT_XT')){
                angular.forEach($scope.roleList, function(item){
                    if(item.roleType <= 2){                        
                        var idx = $scope.roleList.indexOf(item);
                        arrAll.unshift(idx);
                    }
                });
            }
            if(!angularPermission.hasPermission('USER_MANAGEMENT_PT')){
                angular.forEach($scope.roleList, function(item){
                    if(item.roleType <= 3){
                        var idx = $scope.roleList.indexOf(item);
                        arrAll.unshift(idx); 
                    }
                });
            }
            /*删除不可操作的角色*/
            if(arrAll.length>0){
                for(var i=0; i<arrAll.length; i++){
                    $scope.roleList.splice(arrAll[i], 1);
                }
            }                         
        });
    };
    queryRoleList();

    /*加载当前角色拥有的权限*/
    $scope.initRoleList = [];
    $scope.selectedTags = [];
    var getRolePermiss = function(roleId){
    	$scope.initRoleList = [];
    	$scope.selectedTags = [];
    	$scope.editRoleId = roleId;
    	httpServices.Post('role:getRole', {'roleId': roleId}).success(function(data){
            if(data["code"] == "S_OK"){
            	var _list = data["var"]["modelList"];  
            	angular.forEach(_list, function(item){
            		$scope.initRoleList.push(item.modelId);
            		$scope.selectedTags.push({'modelId': item.modelId});
            	});      	
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }            
        }); 
    };

    /*加载当前角色类型可操作的权限*/
    $scope.modelList = [];
    var getRoleModels = function(roleType){
    	$scope.modelList = [];    	
    	httpServices.Post('role:getModels', {'roleType': roleType}).success(function(data){
            if(data["code"] == "S_OK"){
                // var _list = data["var"];
                // var mapping = [];
                // _list.forEach(function(item, index){
                //     if(item.modelParentId == 0){
                //         mapping[index] = item.modelId;
                //         $scope.modelList[index] = item;
                //         $scope.modelList[index].child = [];
                //     }
                // });
                // _list.forEach(function(item){
                //     if(item.modelParentId > 0){
                //         var index = mapping.indexOf(item.modelParentId);                       
                //         if(index > -1){
                //             $scope.modelList[index].child.push(item);
                //         }
                //     }                       
                // });

            	$scope.modelList = data["var"]["modelList"];                      	
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }            
        });
    };

    /*选择角色下拉框*/    
    $scope.roleChange = function(item){
    	$scope.showPermiss = false;
    	var roleId = getValue(item);
    	var roleType = getRoleType(item);
    	if(roleId != ""){
    		$scope.showPermiss = true;
    		getRolePermiss(roleId);
    		getRoleModels(roleType);   		
    	}
    };

    /*添加角色*/    
    $scope.addRole = function(){
    	$scope.formData = {};
    	$scope.formData.roleType = "3";
        $('#addModal').modal('show');
    };
    /*添加角色 表单提交*/
    $scope.addFormSubmit = function(isValid, formData){
        if (!isValid) {
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }
        if($rootScope.isSuperAdmin){
            formData.companyId = getValue($scope.editCompany);    
        }  
        formData.type = "add";
        formData.modelList = [];
    	httpServices.Post('role:setRole', formData).success(function(data){
            if(data["code"] == "S_OK"){  
            	$scope.showPermiss = false;          	
                queryRoleList($scope.editCompany);
                $('#addModal').modal('hide');
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }            
        });
    };
    
    /*判断是否选中*/
    $scope.isSelected = function(id){
    	return $scope.initRoleList.indexOf(id) >= 0;
    };
    /*Checkbox选中事件*/
    var updateSelected = function(action, id, pname){
        if(action == 'add' && $scope.initRoleList.indexOf(id) == -1){
			$scope.initRoleList.push(id);
			$scope.selectedTags.push({'modelId': id});
        }
		if(action == 'remove' && $scope.initRoleList.indexOf(id) != -1){
			var idx = $scope.initRoleList.indexOf(id);
			$scope.initRoleList.splice(idx, 1);
			$scope.selectedTags.splice(idx, 1);
        }
    }
    $scope.ckbChange = function($event, id, bl){    	
    	var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id, checkbox.name);
        if(bl){
            $('.sys-check.'+id).prop("checked", checkbox.checked);
        }
    };

    /*保存角色对应权限*/
    $scope.saveRolePermiss = function(roleId){    	
    	var pData = {};
    	pData.roleId = roleId;
    	pData.type = "update";
    	//pData.modelList = $scope.selectedTags;//权限列表
        pData.modelList = [];
        $('input[name="modelId"]:checked').each(function(){ 
            pData.modelList.push({"modelId": $(this).val()}); 
        });
    	httpServices.Post('role:setRole', pData).success(function(data){
            if(data["code"] == "S_OK"){
            	Modal.alert({msg: '角色权限修改成功！', title: '提示'});
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }            
        }); 
    };

    /*删除角色*/
    $scope.deleteRole = function(roleId){
        Modal.confirm({
            msg: "确认要删除该角色？"
        })
        .on( function (e) {
            if(e){
                var pData = {};
                pData.roleId = roleId;
                pData.type = "delete";
                httpServices.Post('role:setRole', pData).success(function(data){
                    if(data["code"] == "S_OK"){
                        $scope.showPermiss = false;
                        queryRoleList($scope.selectCompany);
                        Modal.alert({msg: '用户角色删除成功！', title: '提示'});
                    }else{
                        Modal.alert({msg: data["msg"], title: '错误提示'});
                    }            
                });
            } 
        });
    };
}]);
