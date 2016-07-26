'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:PipeConfigCtrl
 * @description
 * # PipeConfigCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('PipeConfigCtrl',['$scope', 'httpServices', function ($scope, httpServices) {
	/*导航栏的当前状态*/
    $scope.navCurrent = "pipeConfig";    

    /*配置类型*/
    $scope.configType = 1;//1-移动网关配置，2-联通网关配置，3-电信网关
    $scope.tabCurrent = function(type){
    	$scope.configType = type;
    	getPipeConfig(type);
    };
    
    /*加载相应配置数据*/
    $scope.configList = [];
    var getPipeConfig = function(type){    	
    	httpServices.Post('config:getConfigList', {configType: type}).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.configList = data["var"];
            }
        });
    }
    getPipeConfig($scope.configType);

    /*保存配置项*/
    $scope.saveConfig = function(obj){
    	httpServices.Post('config:saveConfig', obj).success(function(data){
            if(data["code"] == "S_OK"){
                Modal.alert({msg: "通道配置项信息保存成功！", title: '提示'});
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }
        });
    };
}]);