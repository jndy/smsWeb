'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:SysMonitorCtrl
 * @description
 * # SysMonitorCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('SysMonitorCtrl',['$scope', 'httpServices', 'dataService', function ($scope, httpServices, dataService) {
	/*导航栏的当前状态*/
    $scope.navCurrent = "sysMonitor";

    /*年月数据*/
    $scope.yearsList = yearsList; 
    $scope.monthList = monthList; 

    /*默认选中当前年月*/
    var oDate = new Date();
    angular.forEach($scope.yearsList, function(item){
        if(item.value == oDate.getFullYear()){
            $scope.selectYears = item;
        }
    });
    angular.forEach($scope.monthList, function(item){
        if(item.value == (oDate.getMonth()+1)){
            $scope.selectMonth = item;
        }
    });

    /*获取数据列表*/
    var getListData = function(){
        var postData = {};      
        postData.year = getValue($scope.selectYears);
        postData.month = getValue($scope.selectMonth);        
        $scope.monitorList = {};
        httpServices.Post('sms:getSmsStatusCount', postData).success(function(data){
            if(data["code"] == "S_OK"){
                var _list = data["var"]; 
                $scope.monitorList = data["var"]; 
                smsChartInit(); 
            }
        });

        $scope.monitorData = {};
        httpServices.Post('data:getMonitorData', {}).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.monitorData = data["var"]; 
            }
        });
    };
    getListData();    

    /*图表绘制及加载*/
    var smsChartInit = function(){
        // 基于准备好的dom，初始化echarts实例
        var smsChart = echarts.init(document.getElementById('SmsChart'));
        var successRate = ($scope.monitorList.countSuccess/$scope.monitorList.countAll*100).toFixed(2);
        var failRate = ($scope.monitorList.countFail/$scope.monitorList.countAll*100).toFixed(2);
        // 指定图表的配置项和数据
        var smsOption = {
            title : {
                text: '短信发送情况统计图',
                subtext: '成功量：'+successRate+'%；失败量：'+failRate+'%。',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                bottom: '10',
                data: ['发送成功量','发送失败量']
            },
            series : [
                {
                    name: '短信发送情况',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:$scope.monitorList.countSuccess, name:'发送成功量'},
                        {value:$scope.monitorList.countFail, name:'发送失败量'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        // 使用刚指定的配置项和数据显示图表。
        smsChart.setOption(smsOption);
    };

    /*搜索按钮事件*/
    $scope.searchData = function(){
        getListData();       
    };
}]);