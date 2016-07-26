'use strict';

/**
 * Post,Get,Export httpServices module 
 *
 * No dependence smsWebApp
 */

smsWebApp.factory('httpServices', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
    var baseUrl = '/smsApi/data.do';
    var baseExport = '/smsApi/';
    var sid = $rootScope.sid;
    return {
        Get:function(func, params){
            // 如果不存在方法名称直接返回
            if(!func){
                return;
            }
            else{
                loadingDiv.show();
                return $http({
                        url: baseUrl + '?func=' + func + '&sid=' + sid,
                        method: 'GET',
                        params: params
                    }).success(function(data,header,config,status){
                        loadingDiv.hide();
                        return data;
                    }).error(function(data,header,config,status){
                        loadingDiv.hide();
                        Modal.alert({
                            msg: '数据接口请求出错：'+func,
                            title: '提示'
                        });
                    });
            }
        },
        Post:function(func, params){
            // 如果不存在方法名称直接返回
            if(!func){
                return;
            }
            else{
                loadingDiv.show();
                return $http({
                        url: baseUrl + '?func=' + func + '&sid=' + sid,
                        method: 'POST',
                        data: params
                    }).success(function(data,header,config,status){
                        loadingDiv.hide();
                        return data;
                    }).error(function(data,header,config,status){
                        loadingDiv.hide();
                        Modal.alert({
                            msg: '数据接口请求出错：'+func,
                            title: '提示'
                        });
                    });
            }
        },
        Export:function(url, params){
            // 如果url不存在直接返回
            if(!url){
                return;
            }
            else{
                var openUrl = baseExport + url + "?sid=" + $rootScope.sid;
                for(var key in params){
                   openUrl = openUrl + "&" + key + "=" + params[key];
                }
                return window.open(openUrl);
            }
        }
    }
}]);
