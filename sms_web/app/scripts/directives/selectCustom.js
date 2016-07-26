'use strict';

/**
 * @ngdoc function 
 * @name smsWebApp.directive:customSelect
 * @description 自定义下拉框
 * @author zxh 2016-05-24
 * # customSelect
 * directive of the smsWebApp
 */

smsWebApp.directive('selectCustom', [ function() {
    var option = {
  	  require: '?ngModel',
      restrict : 'EA',
      replace : true,
      transclude : true,
      scope : {
      	ngModel: '=',  
        ngChange: '&',        
        ngTitle : '@selectTitle',            
        selectItems : '='
      },
      template: '<div class="filter-choose">'+
                     '<span class="filter-txt">{{ngModel.title || ngTitle}}</span>'+
                     '<a href="javascript:;" ng-click="toggle($event)" class="btn-down"><i class="i-down"></i></a>'+
                     '<div class="filter-ddl hide">'+
                       '<a href="javascript:;" ng-if="selectItems.length > 0" ng-repeat="item in selectItems" ng-click="chooseItem(item, $event);">{{item.title}}</a>'+
                       '<a href="javascript:;" ng-if="selectItems.length == 0">暂无数据</a>'+
                     '</div>'+
                 '</div>',
     //  controller:['$scope', function($scope){
     //    	$scope.items = $scope.selectItems();    //调用无参函数 
    	// }],
      link: function(scope, element, attrs, ctrl) {
      	var ddl = element.find('.filter-ddl');
        scope.toggle = function toggle(e) {
        	e.preventDefault(); 
        	e.stopPropagation();
          
        	if(ddl.hasClass('hide')){
        		ddl.removeClass('hide');
        	}else{
        		ddl.addClass('hide');
        	}
        };
        scope.chooseItem = function chooseItem(item, e){ 
        	e.preventDefault(); 
        	e.stopPropagation();

        	scope.ngModel = item;
          ctrl.$setViewValue(item);
        	ddl.addClass('hide');
        };
        element.parents().find('body').bind('click', function() {            	
        	ddl.addClass('hide');
        });
      }
    };
    return option;
}]);