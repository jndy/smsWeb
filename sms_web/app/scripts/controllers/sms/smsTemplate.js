'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:SmsTemplateCtrl
 * @description
 * # SmsTemplateCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('SmsTemplateCtrl',['$scope', 'httpServices', function ($scope, httpServices) {
    /*导航栏的当前状态*/
    $scope.navCurrent = "smsTemplate";   

    /*获取TAG列表*/
    var getReplaceTagsList = function(){
        httpServices.Post('sms:getReplaceTagList', {}).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.tagsList = data["var"]["tagList"];
            }
        });
    };  

    /*页面初始化*/
    var initData = function(){
        $scope.phoneNum = '';
        $scope.keyWord = '';
        $scope.formData = {};
        $scope.templateList = []; 
        $scope.tagsList = [];
        getReplaceTagsList(); 

    }
    initData();       

    /*数据分页*/   
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

    /*获取数据列表*/
    var getListData = function(pageNo, pageSize){
        var postData = {};
        postData.pageNo = pageNo;
        postData.pageSize = pageSize;          
        postData.keyword = $scope.keyWord.trim();
        httpServices.Post('sms:getSmsTemplate', postData).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.templateList = data["var"]["tempList"];
                $scope.paginationConf.totalItems = data["var"]["listCount"]; 
            }
        });
    };

    /*搜索按钮事件*/
    $scope.searchData = function(){
        $scope.paginationConf.currentPage = 1;
        getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    };

    /*插入选中Tag*/
    $scope.selectTag = function(tag){
        $scope.formData.tempContent = $scope.formData.tempContent.trim() + tag.tagContent;
    };

    /*新增或编辑模板*/
    $scope.editTemplate = function (item) {
        if(item != undefined && item != ''){            
            $scope.editType = "edit";
            $scope.formData = angular.copy(item);
            $scope.formData.tempName = html_decode($scope.formData.tempName);
            $scope.formData.tempContent = html_decode($scope.formData.tempContent);
        }else{
            $scope.editType = "add";
            $scope.formData = {};
            $scope.formData.tempContent = "";
        }
        $('#editModal').modal('show');        
    };

    /*保存模板数据*/
    $scope.submitForm = function(isValid, formData, type){
        if(!isValid){
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }else{
            var funcName = "";
            if(type == "add"){
                delete formData.tempId; 
                funcName = "sms:addTemplate";
            }else{
                delete formData.creator; 
                delete formData.companyId;
                delete formData.createTime;
                delete formData.modifyTime;
                funcName = "sms:editTemplate";
            }
            httpServices.Post(funcName, formData).success(function(data){
                if(data["code"] == "S_OK"){
                    $scope.formData = {};                    
                    $('#editModal').modal('hide');
                    if(type == "add"){
                        $scope.paginationConf.currentPage = 1;
                    }
                    getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                }else{
                    Modal.alert({msg: data["msg"], title: '错误提示'});
                }            
            });
        }
    };

    /*删除短信模板*/
    $scope.delTemplate = function(item){
        Modal.confirm({
            msg: "确定要删除该短信模板？"
        }).on( function (e) {
            if(e){
                httpServices.Post('sms:delTemplate', {"tempId": item.tempId}).success(function(data){
                    if(data["code"] == "S_OK"){
                        getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                    }else{
                        Modal.alert({msg: data["msg"], title: '错误提示'});
                    }
                });
            } 
        }); 
    };
}]);