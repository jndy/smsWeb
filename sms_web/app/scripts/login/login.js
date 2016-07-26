'use strict';

var LEM = {
    DEFAULT_CODE:"err_029",
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
        'err_001': '邮箱地址输入错误',
        'err_002': '您输入的用户名不存在',
        'err_003': '请输入您的用户名',
        'err_004': '用户名或密码错误',
        'err_005': '登录次数过于频繁，为保障安全，请输入图片验证码',
        'err_006': '验证码错误，请重新输入',
        'err_007': '对不起，您没有登录权限',
        'err_009': '请输入正确的企业邮箱帐号',
        'err_010': '域名输入错误',
        'err_011': '域名不存在或该域名已过期',
        'err_013': '请输入您的密码',
        'err_012': '密码错误次数过多，请稍后再试',
        'err_014': '证书不合法',
        'err_028': '用户登录失败，请与系统管理员联系',
        'err_029': '接口服务异常，请与系统管理员联系',
        'err_030': '用户已停用，请与系统管理员联系',
        'err_101': '登录状态已失效，请重新登录'
    }
};

String.prototype.format = function () {
    var args = arguments;
    var str = this;
    var pattern = new RegExp('{([0-' + args.length + '])}', 'g');
    return String(str).replace(pattern, function (match, index) {
        return args[index];
    });
};


/*用户登录*/
var Login = {
    ERROR_TIPS: "_error_tips",
    RETURN_CODE: "code",
    SID_DM: "sid_dm",
    USERID_DM: "userid_dm",
    USERNAME_DM: "username_dm",
    USERREALNAME_DM : "userrealname_dm",
    ISSUPERADMIN_DM: "issuperadmin_dm",
    ROLETYPE_DM: "roletype_dm",
    COMPANYID_DM: "companyid_dm",
    NEEDMODPWD_DM: "needmodpwd_dm",
    USERPERMISSION_DM: "userpermission_dm",
    REMEMBERUSER_DM: "rememberuser_dm",

    init: function (obj, reg, len, func) {
        this.code = '';
        this.oUserName = jQuery("#" + obj.username);
        this.oPassword = jQuery("#" + obj.userpwd);
        this.oRemember = jQuery("#" + obj.remember);
        this.oErrorTip = jQuery("#" + obj.errorTip);
        this.oForm = jQuery("#" + obj.form);
        this.func = func;

        //初始化验证数据
        this.reg = reg;
        this.len = len;

        //数据集
        this.attrs = {};

        var p = this;

        p.bindEvent();
        //cookie设置登录
        Login.initData();
    },
    /**
     * 绑定事件
     */
    bindEvent: function () {
        var p = this;
        // 回车事件
        p.oUserName.keypress(function (event) {
            if (event.keyCode == '13') {
                p.userLogin();                
            }
        });
        p.oPassword.keypress(function (event) {
            if (event.keyCode == '13') {
                p.userLogin();                
            }
        });
    },
    /**
     * 初始化
     */
    initData: function () {
        // 初始化表单信息
        var p = Login;
        var uid = $.cookie(p.USERID_DM);
        var rememberuser_dm = $.cookie(p.REMEMBERUSER_DM);

        if (rememberuser_dm == "true") {
            p.oUserName.val(uid);           
            
            p.oRemember.attr("checked", true);           
        } else {
            if (!p.oRemember.is(":checked")) {
                p.oUserName.val("");
            }
        }
        
        //清除cookie
        $.removeCookie(p.SID_DM);
        $.removeCookie(p.USERNAME_DM);
        $.removeCookie(p.USERREALNAME_DM);
        $.removeCookie(p.ISSUPERADMIN_DM);
        $.removeCookie(p.ROLETYPE_DM);
        $.removeCookie(p.COMPANYID_DM);
        $.removeCookie(p.NEEDMODPWD_DM);
        $.removeCookie(p.USERPERMISSION_DM);
    },
    setCookie: function () {
        // 记住用户名
        var p = Login;
        var path = window.webpath;

        //$.cookie('name', 'value', { expires: 7, path: '/' });
        $.cookie(p.USERID_DM, p.oUserName.val(), { expires: 7, path: path });        

        if (p.oRemember.is(":checked")) {
            $.cookie(p.REMEMBERUSER_DM, "true", { expires: 7, path: path });
        } else {
            $.cookie(p.REMEMBERUSER_DM, "false", { expires: 7, path: path });
        }
        //$.cookie("isFirstLogin", "", { expires: 7, path: path });
    },
    userLogin: function () {
        var p = Login;
        if(p.validate()){
            //TODO: 获取公钥
            if (window.top.isEncryptPwd == "1") {
                RSAKey && RSAKey.getPublicKey(function (publicKey) {
                    window.top.publicKey = publicKey;
                    p.doLogin();
                }, true);
            } else {
                p.doLogin();
            }
        }        
    },
    //数据验证
    validate: function () {
        var p = Login;

        p.oErrorTip.hide();        

        var userid_v = p.oUserName.val();
        var password_v = p.oPassword.val();

        var code = "";
        var param = "";
        var field = "";
        var isOk = true;
        var len = p.len;
        var $ = jQuery;

        // 校验用户id
        if (userid_v.length == 0) {
            code = "err_003";
            isOk = false;
        } else if (userid_v.length > len.userid_max) {
            code = "err_004";
            param = len.userid_max;
            isOk = false;
        } else if (userid_v.length < len.userid_min) {
            code = "err_004";
            param = len.userid_min;
            isOk = false;
        } else if (!userid_v.match(p.reg.userid)) {
            code = "err_004";
            isOk = false;
        }
        field = "userName";

        // 校验密码
        if (isOk) {
            if (password_v.length == 0) {
                code = "err_013";
                isOk = false;
            } else if (password_v.length > len.password_max) {
                code = "err_004";
                isOk = false;
                param = len.password_max;
            } else if (password_v.length < len.password_min) {
                code = "err_004";
                param = len.password_min;
                isOk = false;
            }
            field = "userPwd";
        }

        if (isOk) {
            p.setCookie();

            //TODO: 密码加密
            //RSAKey.encrypt , oPassword
            if (RSAKey && (window.top.cfgAuthMd5 == "1" || (window.top.isEncryptPwd == "1" && window.top.publicKey))) {
                p.oPassword.val(RSAKey.encrypt(p.oPassword.val(), window.top.publicKey));
            }
            return true;
        } else {
            p.showError(field, code, param);
            return false;
        }
    },
    showError: function (id, code, param) {
        var msg = LEM.getErrorMsg(code, "zh_CN");
        if (msg) {
            msg = msg.format(param);
            Login.setFocus();
            Login.oErrorTip.show().html("<i class='ico-tip'></i>" + msg.toString()); 
        }else {                
            Login.oErrorTip.hide();                
        }
    },
    /**
     * 密码登录
     */
    doLogin: function () {
        var p = Login;
        $(".btn-login").html('登录中...');
        //发送请求
        var postData = {};
        postData.userName = $.trim(p.oUserName.val());
        postData.userPwd = $.trim(p.oPassword.val());
        $.ajax({
            type:"POST", 
            url: "/smsApi/login.do", 
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(postData), 
            success: function(data){
                if(data["code"] == "S_OK"){
                    var rdt = data['var'];
                    var permissions = rdt['powerList'];
                    for (var i = 0; i < permissions.length; i++) {
                        permissions[i] = permissions[i].replace(/\s/g,"");
                    };  
                    $.cookie(p.SID_DM, rdt['sid']);       
                    $.cookie(p.USERNAME_DM, rdt['userName']);
                    $.cookie(p.USERREALNAME_DM, rdt['userRealName']);
                    $.cookie(p.ISSUPERADMIN_DM, rdt['isSuperAdmin']);
                    $.cookie(p.ROLETYPE_DM, rdt['roleType']);
                    $.cookie(p.COMPANYID_DM, rdt['companyId']);
                    $.cookie(p.NEEDMODPWD_DM, rdt['needModPwd']);
                    $.cookie(p.USERPERMISSION_DM, permissions);
                    window.location.href = './index.html';
                }else{
                    $(".btn-login").html('登录');
                    p.showError('', data["errorCode"], '');
                }
            },
            error: function(){                
                $(".btn-login").html('登录');
                p.showError('', 'err_029', '');                
            }
        });
    },
    /**
     * 设置焦点
     */
    setFocus: function () {
        var p = Login;
        if (p.oUserName.val()) {
            p.oPassword.focus();
        } else {
            p.oUserName.focus();
        }
    }
};	
