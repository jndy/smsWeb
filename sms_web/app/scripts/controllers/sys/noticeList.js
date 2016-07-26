'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:NoticeListCtrl
 * @description
 * # NoticeListCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('NoticeListCtrl',['$scope', 'httpServices', function ($scope, httpServices) {
	/*导航栏的当前状态*/
    $scope.navCurrent = "noticeList";

    /*页面初始化*/
    var initData = function(){
        $scope.keyWord = '';
        $scope.noticeList = [];        
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
        httpServices.Post('notice:getNoticeList', postData).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.noticeList = data["var"]["noticeList"];
                $scope.paginationConf.totalItems = data["var"]["listCount"]; 
            }
        });
    };

    /*搜索按钮事件*/
    $scope.searchData = function(){
        $scope.paginationConf.currentPage = 1;
        getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    };

    /*展示公告信息*/
    $scope.showNotice = function(item){
        var reg = new RegExp("\n","g");
        $scope.noticeTitle = item.noticeTitle;
        $scope.noticeContent = item.noticeContent.replace(reg,'<br/>');
        $scope.createTime = item.createTime;
        $scope.creator = item.creator;
        $("#viewModal").modal("show");
    };

    /*删除公告信息*/
    $scope.delNotice = function(item){
        Modal.confirm({
            msg: "确认要删除该公告信息？"
        }).on( function (e) {
            if(e){
                httpServices.Post('notice:delNotice', {"noticeId": item.noticeId}).success(function(data){
                    if(data["code"] == "S_OK"){
                        getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                    }else{
                        Modal.alert({msg: data["msg"], title: '错误提示'});
                    }
                });
            } 
        }); 
    };

    /*新增或公告信息*/
    $scope.editNotice = function (item) {
        if(item != undefined && item != ''){            
            $scope.editType = "edit";
            $scope.formData = angular.copy(item);
        }else{
            $scope.editType = "add";
            $scope.formData = {};
        }
        $('#editModal').modal('show');        
    };

    /*保存表单数据*/
    $scope.submitForm = function(isValid, formData, type){
        if(!isValid){
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }else{
            var funcName = "";
            if(type == "add"){
                delete formData.noticeId; 
                funcName = "notice:addNotice";
            }else{
                delete formData.creator; 
                delete formData.companyId;
                delete formData.createTime;
                delete formData.modifyTime;
                funcName = "notice:editNotice";
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
}]);
