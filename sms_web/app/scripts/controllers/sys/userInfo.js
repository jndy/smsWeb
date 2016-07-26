'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:UserInfoCtrl
 * @description
 * # UserInfoCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('UserInfoCtrl', ['$scope', '$rootScope', 'httpServices', function ($scope, $rootScope, httpServices) {
	/*导航栏的当前状态*/
    $scope.navCurrent = "userInfo";

    /*获取个人信息*/
    $scope.formData = {};
    httpServices.Post('user:getUserInfo', {'userName': $rootScope.userName}).success(function(data){
        if(data["code"] == "S_OK"){
        	var userInfo = data["var"];
            $scope.formData.phone = userInfo.phone;
        }else{
            Modal.alert({msg: data["msg"], title: '错误提示'});
        }            
    });

    /*修改个人信息*/
    $scope.submitForm = function(isValid, formData){
        if (!isValid) {
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }  
        formData.newUserPwd = formData.newUserPwd.replace(/[\u4E00-\u9FA5]/g, '');
        httpServices.Post('user:modUserInfo', formData).success(function(data){
            if(data["code"] == "S_OK"){
                if($rootScope.needModPwd){
                    $.cookie('needmodpwd_dm', '0');
                    Modal.alert({msg: '个人密码修改成功!', title: '提示'});                    
                    setTimeout(function(){ 
                        window.location.href = './index.html'; 
                    }, 1000);
                }else{
                    Modal.alert({msg: '个人信息修改成功!', title: '提示'});
                }                
            }else{
                Modal.alert({msg: data["msg"], title: '错误提示'});
            }            
        });
    };
}]);
