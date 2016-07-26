'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the smsWebApp
 */

smsWebApp.controller('HomeCtrl', ['$scope', 'httpServices', 'angularPermission', function($scope, httpServices, angularPermission) {    
    /*初始化数据*/
    $scope.noticeList = [];
    $scope.SmsMmsData = {};
    
    /*获取数据*/
    var getHomeData = function(){
        /*获取前六条公告*/
        var postData = {};   
        if(angularPermission.hasPermission('NOTICE_MANAGEMENT_VIEW')) {
            postData = {pageNo: '1', pageSize: '6'};
            httpServices.Post('notice:getNoticeList', postData).success(function(data){
                if(data["code"] == "S_OK"){
                    $scope.noticeList = data["var"]["noticeList"];
                }
            });  
        }

        /*获取公司短信使用情况*/        
        if(angularPermission.hasPermission('HOME_SMS_COUNT')) {
            postData = {};
            httpServices.Post('company:getSmsMmsData', postData).success(function(data){
                if(data["code"] == "S_OK"){
                    $scope.SmsMmsData = data["var"];
                }
            }); 
        }
    }; 
	getHomeData();

    /*展示公告信息*/
    $scope.showNotice = function(item){
        var reg=new RegExp("\n","g");
    	$scope.noticeTitle = item.noticeTitle;
    	$scope.noticeContent = item.noticeContent.replace(reg,'<br/>');
    	$scope.createTime = item.createTime;
    	$scope.creator = item.creator;
    	$("#viewModal").modal("show");
    };
}]);
