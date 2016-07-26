'use strict';

/**
 * @ngdoc function 
 * @name smsWebApp.directive:stringHtml
 * @description 页面输出HTML
 * @author zxh 2016-06-20
 * # stringHtml
 * directive of the smsWebApp
 */

smsWebApp.directive('stringHtml' , function(){
  return function(scope , el , attr){
    if(attr.stringHtml){
      scope.$watch(attr.stringHtml , function(html){
        el.html(html || '');//更新html内容
      });
    }
  };
});