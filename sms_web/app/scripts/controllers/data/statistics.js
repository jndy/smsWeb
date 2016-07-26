'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:StatisticsCtrl
 * @description
 * # StatisticsCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('StatisticsCtrl', ['$scope', '$q', 'httpServices', function($scope, $q, httpServices) { 
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

    /*初始化数据*/
    var initData = function(){
        $scope.sendxAxis = [];
        $scope.sendCount = [];
        $scope.monthSendCount = 0;
        $scope.recievexAxis = [];
        $scope.recieveCount = [];
        $scope.monthRecieveCount = 0;
    }

    /*获取数据列表*/
    var getListData = function(){
        var postData = {};      
        postData.year = getValue($scope.selectYears);
        postData.month = getValue($scope.selectMonth);
        initData();
        httpServices.Post('sms:getSmsSendCount', postData).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.monthSendCount = data["var"]["countAll"]; 
                var sendCount = data["var"]["countList"];               
                angular.forEach(sendCount, function(item){
                    for(var key in item){ 
                        $scope.sendxAxis.push(key);
                        $scope.sendCount.push(item[key]);
                    }
                }); 
                sendChartInit(); 
            }
        });

        httpServices.Post('sms:getSmsRecieveCount', postData).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.monthRecieveCount = data["var"]["countAll"]; 
                var recieveCount = data["var"]["countList"];                
                angular.forEach(recieveCount, function(item){
                    for(var key in item){ 
                        $scope.recievexAxis.push(key);
                        $scope.recieveCount.push(item[key]);
                    }
                });
                recieveChartInit(); 
            }
        });
    };
    getListData();

    /*图表绘制及加载*/
    var sendChartInit = function(){
        // 基于准备好的dom，初始化echarts实例
        var sendChart = echarts.init(document.getElementById('SendChart'));
        // 指定图表的配置项和数据
        var sendOption = {
            title: {
                text: '短信发送量趋势统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['短信发送量']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: $scope.sendxAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'短信发送量',
                    type:'line',
                    stack: '总量',
                    data: $scope.sendCount
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        sendChart.setOption(sendOption);
    };
    var recieveChartInit = function(){
        // 基于准备好的dom，初始化echarts实例
        var recieveChart = echarts.init(document.getElementById('RecieveChart'));
        var recieveOption = {
            color: '#FFF',
            title: {
                text: '短信接收量趋势统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['短信接收量']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: $scope.recievexAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'短信接收量',
                    type:'line',
                    stack: '总量',
                    data: $scope.recieveCount
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        recieveChart.setOption(recieveOption);
    };

    /*搜索按钮事件*/
    $scope.searchData = function(){
        getListData();       
    };

    /*数据导出按钮*/
    $scope.exportData = function(){
        console.log('exportData');
    };
}]);