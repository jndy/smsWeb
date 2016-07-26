'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:SmsRecordCtrl
 * @description
 * # SmsRecordCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('SmsRecordCtrl',['$scope', 'httpServices', function ($scope, httpServices) {
    /*导航栏的当前状态*/
    $scope.navCurrent = "smsRecord";

    /*页面初始化*/
    var initData = function(){
        $scope.startDate = changeStr2Date(laydate.now(-7), "yyyy-MM-dd");
        $scope.endDate = changeStr2Date(laydate.now(), "yyyy-MM-dd");
        $scope.keyWord = '';

        $scope.recordList = [];        
    }
    initData();

    /*选择起始查询日期*/    
    $scope.startDateChoose = function(){
        laydate({
            elem: '#startDate', 
            isclear: false,
            max: $scope.endDate,
            choose: function(datas){
              $scope.$apply(function() {
                $scope.startDate = datas;                
              });
            }
        });
    };
    $scope.endDateChoose = function(){
        laydate({
            elem: '#endDate',
            isclear: false,
            min: $scope.startDate,
            choose: function(datas){
              $scope.$apply(function() {
                    $scope.endDate = datas;
              });
            }
        });
    }; 

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
        postData.startDate = $scope.startDate.trim();
        postData.endDate = $scope.endDate.trim();
        postData.keyword = $scope.keyWord.trim();
        httpServices.Post('sms:getSmsSendRecordList', postData).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.recordList = data["var"]["smsList"];
                $scope.paginationConf.totalItems = data["var"]["listCount"]; 
            }
        });
    };

    /*搜索按钮事件*/
    $scope.searchData = function(){
        $scope.paginationConf.currentPage = 1;
        getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    };

    /*数据导出按钮*/
    $scope.exportData = function(){
        var pData = {};
        pData.startDate = $scope.startDate.trim();
        pData.endDate = $scope.endDate.trim();
        pData.keyword = $scope.keyWord.trim();
        httpServices.Export('exportSmsSendrecord.do', pData);        
    };

    /*显示发送失败用户*/
    $scope.currentUuid = "";
    $scope.showFloatDiv = function(uuid){
        if($scope.currentUuid != uuid){
            $scope.currentUuid = uuid;
        }else{
            $scope.currentUuid = "";
        }        
    };

    /*失败号码重发*/
    $scope.failReSent = function(item){
        Modal.confirm({
            msg: "确认失败号码重新发送短信？"
        }).on( function (e) {
            if(e){
                httpServices.Post('sms:resendFailSms', {"contentUuid": item.contentUuid}).success(function(data){
                    if(data["code"] == "S_OK"){
                        Modal.alert({msg: "短信发送成功！", title: '提示'});
                        getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                    }else{
                        Modal.alert({msg: data["msg"], title: '错误提示'});
                    }
                });
            } 
        }); 
    }
}]);