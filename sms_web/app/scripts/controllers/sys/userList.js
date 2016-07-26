'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('UserListCtrl', ['$scope', '$rootScope', 'httpServices', 'dataService', 'angularPermission',
    function ($scope, $rootScope, httpServices, dataService, angularPermission) {
	/*导航栏的当前状态*/
    $scope.navCurrent = "userList";  

    /*绑定事件*/
    var bindEvent = function(){
      $("#keyWord").keypress(function (event) {
        if (event.keyCode == '13') {
            searchDataList();  
        }
      });
    };
    bindEvent();

    /*清空查询条件*/
    var initSearch = function(){
        $scope.selectRole = "";
        $scope.selectCompany = "";
        $scope.keyWord = "";
    };
    initSearch();

    /*添加用户*/
    $scope.addUser = function(){
        $scope.modelName = "新增用户";
        $scope.addRole = {};
        $scope.addCompany = {};
        $scope.roleListForm = $scope.roleListFormAll;
        $('#addModal').modal('show');
    };
    
    /*添加用户 表单提交*/
    $scope.addFormData = {};
    $scope.submitAddForm = function(isValid, formData){
        if (!isValid) {
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }
        if($rootScope.isSuperAdmin){
            formData.companyId = getValue($scope.addCompany);    
        }        
        formData.roleId = getValue($scope.addRole);
        httpServices.Post('user:addUser', formData).success(function(data){
            if(data["code"] == "S_OK"){
                initSearch();
                $scope.addFormData = null;
                $scope.addRole = {};
                $scope.addCompany = {};
                $scope.paginationConf.currentPage = 1;
                $('#addModal').modal('hide');
                loadUserList($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }            
        });
    };

    /*修改资料*/
    $scope.editUser = function(item, type){
        $scope.editUserType = type;               
        if(type == "1"){
            $scope.editModelName = "修改用户信息";
            $scope.editFormData = angular.copy(item); 
            if($rootScope.isSuperAdmin){
                $scope.editCompany = setInitObj($scope.companyListForm, item.companyId);
                $scope.roleListForm = [];
                angular.forEach($scope.roleListFormAll, function(role){
                    if(role.companyId == item.companyId){
                        $scope.roleListForm.push(role);
                    }
                });
            } 
            $scope.editRole = setInitObj($scope.roleListForm, item.roleId);   
            $scope.editFormData.userRealName = html_decode($scope.editFormData.userRealName);       
            $('#editModal').modal('show');
        }else{
            $scope.editModelName = "修改用户密码";
            $scope.pwdFormData = item;             
            $scope.pwdFormData.userPwd = '';
            $scope.pwdFormData.userPwdAgain = '';
            $('#pwdModal').modal('show');
        }
    };
    /*修改资料 表单提交*/
    $scope.submitEditForm = function(isValid, formData, type){
        if (!isValid) {
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }        
        var editUser = {}, func = '';
        editUser.userId = formData.userId;
        editUser.userName = formData.userName;
        if(type == "1"){//修改手机
            if($rootScope.isSuperAdmin){
                editUser.companyId = getValue($scope.editCompany);    
            } 
            editUser.roleId = getValue($scope.editRole);
            editUser.userRealName = formData.userRealName;
            editUser.phone = formData.phone;
            func = 'user:manageUser';
        }else{//修改密码
            editUser.newUserPwd = formData.userPwd.replace(/[\u4E00-\u9FA5]/g, '');
            func = 'user:manageUserPwd';
        }
        httpServices.Post(func, editUser).success(function(data){
            if(data["code"] == "S_OK"){
                if(type == "1"){
                    $('#editModal').modal('hide');
                    $scope.editRole = {};
                    $scope.editCompany = {};
                }else{
                    $('#pwdModal').modal('hide');
                }
                loadUserList($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }
        });
    };

    /*删除用户*/
    $scope.delUser = function(item){
        Modal.confirm({
            msg: "确认删除该用户？"
        })
        .on( function (e) {
            if(e){
                var delUser = {};
                delUser.userName = item.userName;
                httpServices.Post('user:delUser', delUser).success(function(data){
                    if(data["code"] == "S_OK"){
                        loadUserList($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                    }else{
                        Modal.alert({msg: data["msg"], title: '错误提示'});
                    }
                });
            } 
        });
    };

    /*用户启停用*/
    $scope.changeUser = function(item){
        httpServices.Post('user:manageUserStatus', {'userId': item.userId}).success(function(data){
            if(data["code"] == "S_OK"){
                item.userStatus = data["var"]["userStatus"];
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }
        });
    };

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
    $scope.roleListForm = [];
    $scope.roleListFormAll = [];
    var initRole = {'title': '=用户角色=', 'value': '', 'roleType': ''};
    var queryRoleList = function(item){
        var pData = {};
        if(item && item.value){
            pData.companyId = item.value;
        }
        dataService.queryRoleList(pData, true).then(function (result) {
            $scope.selectRole = initRole;
            $scope.editRole = initRole;
            $scope.addRole = initRole;
            $scope.roleList = result;  
            angular.copy(result, $scope.roleListForm);
            $scope.roleListForm.splice(0, 1);  
            var arrAll = [];            
            if(!angularPermission.hasPermission('USER_MANAGEMENT_XT')){
                angular.forEach($scope.roleListForm, function(item){
                    if(item.roleType <= 2){                        
                        var idx = $scope.roleListForm.indexOf(item);
                        arrAll.unshift(idx);
                    }
                });
            }
            if(!angularPermission.hasPermission('USER_MANAGEMENT_PT')){
                angular.forEach($scope.roleListForm, function(item){
                    if(item.roleType <= 3){
                        var idx = $scope.roleListForm.indexOf(item);
                        arrAll.unshift(idx); 
                    }
                });
            }
            /*删除不可操作的角色*/
            if(arrAll.length>0){
                for(var i=0; i<arrAll.length; i++){
                    $scope.roleListForm.splice(arrAll[i], 1);
                }
            } 
            $scope.roleListFormAll = angular.copy($scope.roleListForm);
        });
    };
    queryRoleList(); 

    /*分页控件初始化*/
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
            loadUserList(this.currentPage, this.itemsPerPage);
        }
    };

    /*获取用户列表*/
    $scope.userList = [];
    var loadUserList = function(pageNo, pageSize){
        var postData = {};
        postData.pageNo = pageNo;
        postData.pageSize = pageSize;
        if($rootScope.isSuperAdmin){
            postData.companyId = getValue($scope.selectCompany);
        }        
        postData.roleId = getValue($scope.selectRole);
        postData.keyword = $scope.keyWord.trim();
        httpServices.Post('user:getAllUser', postData).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.userList = data["var"]["userList"];
                $scope.paginationConf.totalItems = data["var"]["listCount"]; 
            }
        });
    };

    /*搜索按钮事件*/
    var searchDataList = function(){
        $scope.paginationConf.currentPage = 1;
        loadUserList($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    }
    $scope.searchData = function(){
        searchDataList();
    };   

    /*判断用户操作权限*/
    $scope.checkPermission = function(item){
        if(item.roleType == '1'){//超级管理员不可以编辑
            return false;
        }else if(item.roleType == '2' && angularPermission.hasPermission('USER_MANAGEMENT_XT')){
            return true;    
        }else if(item.roleType == '3' && angularPermission.hasPermission('USER_MANAGEMENT_PT')){
            return true; 
        }else{
            return false;
        }
    };
}]);
