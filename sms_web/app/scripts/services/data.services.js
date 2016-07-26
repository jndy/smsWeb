'use strict';

/**
 * httpGet, httpPost module 
 *
 * dependence httpServices smsWebApp
 */

smsWebApp.factory('dataService',['$q', 'httpServices', function($q, httpServices) {
    var factory = {
      queryRoleList: function (params) {
        var deferred = $q.defer(); 
        httpServices.Post('role:getRoleList', params).success(function(result){
            var dataList = [];
            if(result["code"] == "S_OK"){              
              var roleList = result["var"]["roleList"];        
              dataList.push({'title': '=用户角色=', 'value': '', 'roleType': '', 'companyId': ''});
              angular.forEach(roleList, function(role) {
                  dataList.push({'title': role.roleName, 'value': role.roleId, 'roleType': role.roleType, 'companyId': role.companyId});
              });              
            }   
            deferred.resolve(dataList);   
        }); 
        return deferred.promise;
      },
      queryCompanyList: function (params) {
        var deferred = $q.defer(); 
        httpServices.Post('company:getCompanyList', params).success(function(result){
            var dataList = [];
            if(result["code"] == "S_OK"){              
              var companyList = result["var"]["companyList"];        
              dataList.push({'title': '=所属公司=', 'value': ''});
              angular.forEach(companyList, function(company) {
                  dataList.push({'title': company.comName, 'value': company.comId});
              });             
            }   
            deferred.resolve(dataList);   
        }); 
        return deferred.promise;
      },
      queryPackageList: function (params) {
        var deferred = $q.defer(); 
        httpServices.Post('packages:getPackageList', params).success(function(result){
            var dataList = [];
            if(result["code"] == "S_OK"){              
              var packageList = result["var"]["packageList"]; 
              angular.forEach(packageList, function(packages) {
                  dataList.push({'title': packages.packName, 'value': packages.packId});
              });             
            }   
            deferred.resolve(dataList);   
        }); 
        return deferred.promise;
      }
    };
    return factory; 
}]);