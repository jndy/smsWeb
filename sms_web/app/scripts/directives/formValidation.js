'use strict';

/**
 * @ngdoc function 
 * @name smsWebApp.directive
 * @description 表单校验
 * @author zxh 2016-05-26
 * # LFV   语言包
 * # Reg   正则表达式
 * directive of the smsWebApp
 */
var LFV = {
    DEFAULT_CODE:"empty",
    DEFAULT_LANG:"zh_CN",
    
    getErrorMsg:function(code, lang){
        lang = lang || this.DEFAULT_LANG;
        var em = this["ERRORMSG_"+lang];
        em = em ||  this["ERRORMSG_zh_CN"];
        var msg = em[code];
        if(msg){
            return msg;
        }else{
            return em[this.DEFAULT_CODE];                       
        }
    },
    ERRORMSG_zh_CN: {
        'empty': '不能为空',
        'mobile': '手机号格式错误',
        'phone': '电话号码格式错误',
        'user': '字母数字下划线组成,字母开头,4-20位',
        'email': 'Email格式错误',
        'IDCard': '身份证号码格式错误',
        'ip': 'IP地址格式错误',
        'zip': '邮政编码格式错误',
        'cppw': '两次输入的密码不一致',
        'name': '只能输入数字、汉字和字母',
        'ckzh': '密码不可输入中文'      
    }
};

/*
* 正则表达式列表
* mobile 手机号
* phone 固定电话
* IDCard 身份证(15位或18位)
* user  字母、数字、下划线组成，字母开头，4-20位。
* email Email
* ip  IP地址
* zip 邮政编码
* 可自定义添加
*/
var Reg = {
    'mobile': /^1[3|4|5|7|8]\d{9}$/,
    'phone': /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
    'user': /^[a-zA-z]\w{3,19}$/,
    'email': /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    'IDCard': /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
    'ip': /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/,
    'zip': /^[1-9][0-9]{5}$/,
    'name': /^[\u4e00-\u9fa5a-z0-9]+$/,  ///  /^[\\\/\:\?\"<>\*\|]+$/
    'ckzh': /[\u4E00-\u9FA5\uF900-\uFA2D]/
};

smsWebApp
/*检查form表单值是否为空*/
.directive('formValidation', [ function(){
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl){
            var template = '<span class="valid-error">{0}</span>';
            var showError = function(v, msg) {
                if(v){
                    if(elem.next('span') && elem.next('span').html() == msg){
                        elem.next('span').remove();
                    }                    
                }else{
                    var str = template.format(msg);
                    elem.next('span').remove();
                    elem.after(str);
                }
            }
            /*非空校验*/
            var showEmptyError = function() {
                scope.$watch(attrs.ngModel, function(){
                    if(!elem.hasClass('ng-hide')){//表单中隐藏的控件不校验
                        var v = (elem.val() != undefined && elem.val() != "");
                        ctrl.$setValidity('empty', v); 
                    }                                                 
                });
                elem.on('blur', function () {   
                    if(!elem.hasClass('ng-hide')){                 
                        scope.$apply(function () {
                            var value = elem.val();
                            var v = (value != undefined && value != "");
                            ctrl.$setValidity('empty', v);
                            //ctrl.$setValidity('error', v);
                            showError(v, LFV.getErrorMsg('empty'));
                        });
                    }
                });                  
            };
            /*非空校验 自定义下拉控件*/
            var showEmptySCError = function(ngModel) {
                scope.$watch(attrs.ngModel, function(){
                    if(!elem.hasClass('ng-hide')){
                        //var v = (elem.val() != undefined && elem.val() != "");
                        var value = (scope[ngModel]) ? scope[ngModel].value : "";
                        var v = (value != undefined && value != "");
                        ctrl.$setValidity('empty', v); 
                    }                             
                });
                elem.on('mouseenter mouseleave', function() {   
                    if(!elem.hasClass('ng-hide')){                     
                        scope.$apply(function () {
                            var value = (scope[ngModel]) ? scope[ngModel].value : "";
                            var v = (value != undefined && value != "");
                            ctrl.$setValidity('empty', v);
                            //ctrl.$setValidity('error', v);
                            showError(v, LFV.getErrorMsg('empty'));
                        });
                    }
                });          
            };
            /*正则表达式校验*/
            var showRegError = function(reg, type){
                scope.$watch(attrs.ngModel, function(){
                    if(!elem.hasClass('ng-hide')){//表单中隐藏的控件不校验                        
                        if(elem.val() != ""){
                            var v = reg.test(elem.val());
                            ctrl.$setValidity('error', v);
                            showError(v, LFV.getErrorMsg(type)); 
                        }
                    }                                                 
                });
                elem.on('blur', function () {
                    if(!elem.hasClass('ng-hide')){
                        scope.$apply(function () {
                            if(elem.val() != ""){
                                var v = reg.test(elem.val());
                                ctrl.$setValidity('error', v);
                                showError(v, LFV.getErrorMsg(type)); 
                            }                    
                        });
                    }
                });                
            }
            var validations = attrs.formValidation.split(" ");
            //var isShow = (attrs.ngShow || !attrs.ngHide); 
            var ngModel = attrs.ngModel; 
            angular.forEach(validations, function(valid){
                switch(valid){
                    case 'empty'://校验非空
                        showEmptyError();
                        break;
                    case 'emptySC'://自定义下拉控件 校验非空
                        showEmptySCError(ngModel);
                        break;
                    default://正则校验
                        showRegError(Reg[valid], valid);
                        break;
                }
            });          
        }
    }
}])
/*判断密码是否符合规范及强度*/
.directive('pwdCheck', [ function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var template = '<span class="strength {0}">{1}</span>';
            var template2 = '<span class="valid-error">{0}</span>';
            var level = attrs.pwdCheck;//要求的密码强度
            var showError = function(msg, cls) {                
                var str = template.format(cls, msg);                    
                elem.next('span').remove();                    
                elem.after(str);                
            };
            var showErrorMsg = function(v, msg) {
                if(v){
                    if(elem.next('span') && elem.next('span').html() == msg){
                        elem.next('span').remove();
                    }                    
                }else{
                    var str = template2.format(msg);
                    elem.next('span').remove();
                    elem.after(str);
                }
            };
            elem.on('keyup', function () {
                scope.$apply(function () {
                    var v, zh, msg, cls, val = elem.val();//.replace(/[\u4E00-\u9FA5]/g, '')
                    zh = Reg['ckzh'].test(val);
                    if(zh){//密码不可包含中文
                        ctrl.$setValidity('strength', false);
                        showErrorMsg(false, LFV.getErrorMsg('ckzh'));                                              
                    }else{
                        var aLvTxt = ['','低','中','高'];
                        var aLvCls = ['','psw-weak','psw-medium','psw-strong'];
                        var pwdLevel = 0;
                        if(val.match(/[a-z]/g)){ pwdLevel++; }
                        if(val.match(/[0-9]/g)){ pwdLevel++; }
                        if(val.match(/(.[^a-z0-9])/g)){ pwdLevel++; }
                        if(val.length < 6){ pwdLevel = 1; }
                        if(val.length < 8 && pwdLevel > 2){ pwdLevel = 2; }
                        if(pwdLevel > 3){ pwdLevel = 3; }
                        v = (pwdLevel >= level);
                        ctrl.$setValidity('strength', v);                    
                        showError(aLvTxt[pwdLevel], aLvCls[pwdLevel]);
                    }
                });
            });
        }
    }
}])
/*判断确认密码是否一致*/
.directive('cppwCheck', [ function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var template = '<span class="valid-error">{0}</span>';
            var firstPassword = '#' + attrs.cppwCheck;
            var showError = function(v, msg) {
                if(v){
                    if(elem.next('span') && elem.next('span').html() == msg){
                        elem.next('span').remove();
                    }                    
                }else{
                    var str = template.format(msg);
                    elem.next('span').remove();
                    elem.after(str);
                }
            };
            var checkPwd = function(){
                scope.$apply(function () {
                    var v = (elem.val() === $(firstPassword).val());
                    var msg = LFV.getErrorMsg('cppw');                                                        
                    ctrl.$setValidity('compare', v);                    
                    showError(v, msg);
                });
            };
            elem.add(firstPassword).on('keyup', function () {
                if(elem.val() != "") checkPwd();
            })
            elem.on('keyup', function () {//'keyup blur'
                checkPwd();
            });
        }
    }
}])
/*检查用户名重复性*/
.directive('isUnique', ['httpServices', function(httpServices){
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl){
            var template = '<span class="valid-error">{0}</span>';
            var showError = function(v) {
                if(v){
                    elem.next('span').remove();
                }else{
                    var str = template.format('用户名已经存在');
                    elem.next('span').remove();
                    elem.after(str);
                } 
            };
            scope.$watch(attrs.ngModel, function(){
                if(attrs.ngMinlength && elem.val().length >= attrs.ngMinlength){
                    var pData = {};
                    pData.userName = elem.val();
                    if(attrs.userId != undefined && attrs.userId != ""){
                        pData.userId = attrs.userId.trim();
                    }
                    httpServices.Post('user:isUserExist', pData).success(function(data){
                        if(data["code"] == "S_OK"){
                            var v = data["var"].isUserExist;
                            ctrl.$setValidity('unique', !v); 
                            showError(!v);
                        }
                    }).error(function(data){
                        ctrl.$setValidity('unique', false);
                    });
                }
            });
        }
    }
}]);