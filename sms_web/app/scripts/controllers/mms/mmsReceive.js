'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:MmsReceiveCtrl
 * @description
 * # MmsReceiveCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('MmsReceiveCtrl',['$scope', function ($scope) {
    /*导航栏的当前状态*/
    $scope.navCurrent = "mmsReceive";
    
    /*数据分页*/
    $scope.paginationConf = {
    	floatAround: 'right',
        currentPage: 1,
        totalItems: 400,
        showTotal: true,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [10, 20, 30, 40, 50, 100],
        rememberPerPage: 'perPageItems',
        onChange: function(){
        	console.log('ChangePage:'+this.currentPage);
        }
    };
}]);