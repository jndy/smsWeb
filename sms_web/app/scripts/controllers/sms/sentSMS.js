'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:SentSMSCtrl
 * @description
 * # SentSMSCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('SentSMSCtrl',['$scope', '$rootScope', '$routeParams', '$q', '$location', 'httpServices', 'angularPermission', 
  function ($scope, $rootScope, $routeParams, $q, $location, httpServices, angularPermission) {
    /*导航栏的当前状态*/
    $scope.navCurrent = "sentSMS";

    /*草稿或已发送过来传递值*/
    $scope.fromModel = '';
    $scope.contentUuid = '';
    if(!$.isEmptyObject($routeParams)){
      $scope.fromModel = $routeParams.from;
      $scope.contentUuid = $routeParams.guid;
    } 

    /*绑定事件*/
    var bindEvent = function(){
      $("#addMobile").keypress(function (event) {
        if (event.keyCode == '13') {
           $("#btnSingle").click();       
        }
      });
    };
    bindEvent();

    /*初始化数据*/
    var initData = function(){
      /*号码搜索关键词*/
      $scope.searchKey = "";//搜索关键字
      /*发送号码列表*/
      $scope.mobileList = [];//移动
      $scope.unicomList = [];//联通
      $scope.telecomList = [];//电信

      $scope.addMobileList = [];//只存手机号，校验重复
      $scope.allMobileList = [];//存通讯录信息
      $scope.addName = "";//联系人姓名
      $scope.addMobile = "";//联系人手机号

      $scope.smsContent = "";//短信内容，可从模板中选择
      $scope.smsSignature = "";
      $scope.sendTime = "";//定时发送时间
    };
    initData();  

    /*获取草稿箱信息*/
    var getDraftsInfo = function(contentUuid){
      httpServices.Post('sms:editDraft', {'contentUuid': contentUuid}).success(function(data){
        if(data["code"] == "S_OK"){
          $scope.contentUuid = data["var"]["contentUuid"];
          $scope.smsContent = html_decode(data["var"]["content"]);
          $scope.smsSignature = data["var"]["signature"] || "";
          var phoneList = data["var"]["phoneList"];
          angular.forEach(phoneList, function(item){
            addSingleReceive(item.u_phone, item);
          });
        }else{
          Modal.alert({msg: data["msg"], title: '错误提示'});
        }
      });      
    };

    /*获取已发送信息*/
    var getRecordInfo = function(contentUuid){
      httpServices.Post('sms:recordDetail', {'contentUuid': contentUuid}).success(function(data){
        if(data["code"] == "S_OK"){
          $scope.contentUuid = '';
          $scope.smsContent = html_decode(data["var"]["content"]);
          $scope.smsSignature = data["var"]["signature"] || "";
          var phoneList = data["var"]["phoneList"];
          angular.forEach(phoneList, function(item){
            addSingleReceive(item.u_phone, item);
          });
        }else{
          Modal.alert({msg: data["msg"], title: '错误提示'});
        }
      });
    };

    /*草稿箱或是发送记录页面跳转过来*/
    if($scope.fromModel != '' && $scope.contentUuid != ''){
      var contentUuid = $scope.contentUuid;
      switch($scope.fromModel){
        case "drafts"://草稿箱
          getDraftsInfo(contentUuid);
          break;
        case "record"://已发送
          getRecordInfo(contentUuid);
          break;
      }
    }

    /*判断是否当前搜索*/
    $scope.isSearchResult = function(item){
      var searchKey = $scope.searchKey.trim(); 
      var phoneBlackList = $rootScope.PhoneBlackList;     
      if(searchKey && item.u_phone.indexOf(searchKey) != -1){// || item.u_name.indexOf(searchKey) != -1){
        return "result";
      }else if(phoneBlackList.length > 0){  
        for(var i=0; i<phoneBlackList.length; i++){
          if(phoneBlackList[i] == item.u_phone){
            return "black";
          }
        }
      }else{
        return "";
      }      
    };

    /*删除选中号码*/
    $scope.deleteSelected = function(){
      var arrAll = [], arrAdd = [], i = 0;
      var delList = function(item){
        var idx = $scope.allMobileList.indexOf(item);
        arrAll.unshift(idx);

        var idx2 = $scope.addMobileList.indexOf(item.u_phone);
        arrAdd.unshift(idx2);
      };
      /*删除移动列表*/
      if($scope.MobileChecked.length > 0){
        var arr = [];
        angular.forEach($scope.MobileChecked, function(item){
          var idx = $scope.mobileList.indexOf(item);          
          arr.unshift(idx);//arr.push(idx); arr.sort(function(a, b) {return b-a;});
          delList(item);
        });
        for(i=0; i<arr.length; i++){
          $scope.mobileList.splice(arr[i], 1);
        }
        $scope.chkAll2 = false;
        $scope.allMobileCheck = false;
        $scope.MobileChecked = [];
      }
      /*删除联通列表*/
      if($scope.UnicomChecked.length > 0){
        var arr = [];
        angular.forEach($scope.UnicomChecked, function(item){
          var idx = $scope.unicomList.indexOf(item);          
          arr.unshift(idx);
          delList(item);
        });       
        for(i=0; i<arr.length; i++){
          $scope.unicomList.splice(arr[i], 1);
        }
        $scope.chkAll1 = false;
        $scope.allUnicomCheck = false;
        $scope.UnicomChecked = [];
      }
      /*删除电信列表*/
      if($scope.TelecomChecked.length > 0){        
        var arr = [];
        angular.forEach($scope.TelecomChecked, function(item){
          var idx = $scope.telecomList.indexOf(item);          
          arr.unshift(idx);
          delList(item);
        });       
        for(i=0; i<arr.length; i++){
          $scope.telecomList.splice(arr[i], 1);
        }
        $scope.chkAll3 = false;
        $scope.allTelecomCheck = false;  
        $scope.TelecomChecked = [];
      }
      /*删除对象列表*/
      if(arrAll.length>0){
        for(i=0; i<arrAll.length; i++){
          $scope.allMobileList.splice(arrAll[i], 1);
        }
      }      
      /*删除手机号列表*/
      if(arrAdd.length){
        for(i=0; i<arrAdd.length; i++){
          $scope.addMobileList.splice(arrAdd[i], 1);
        }
      }      
    };

    /*全选复选框*/
    var initCheckBox = function(){
      $scope.chkAll1 = false;
      $scope.chkAll2 = false;
      $scope.chkAll3 = false;

      $scope.allMobileCheck = false;
      $scope.allUnicomCheck = false;
      $scope.allTelecomCheck = false;      

      $scope.MobileChecked = [];
      $scope.UnicomChecked = [];
      $scope.TelecomChecked = [];
    };
    initCheckBox();

    /*全选复选框*/
    $scope.checkAll = function($index, type){
      var isChecked = !$index;
      if(isChecked){
        switch(type){
          case "1":
            $scope.allUnicomCheck = true;
            $scope.UnicomChecked = $scope.unicomList;
            break;
          case "2":
            $scope.allMobileCheck = true;
            $scope.MobileChecked = $scope.mobileList;
            break;
          case "3":
            $scope.allTelecomCheck = true;
            $scope.TelecomChecked = $scope.telecomList;
            break;
        }
      }else{
        switch(type){
          case "1":
            $scope.allUnicomCheck = false;
            $scope.UnicomChecked = [];
            break;
          case "2":
            $scope.allMobileCheck = false;
            $scope.MobileChecked = [];
            break;
          case "3":
            $scope.allTelecomCheck = false;
            $scope.TelecomChecked = [];
            break;
        }
      }
    };

    /*单个复选框*/
    $scope.ckbChange = function($index, item, type){
      //var checkbox = $event.target;
      var isChecked = $index;
      if(isChecked){
        switch(type){
          case "1":
            $scope.UnicomChecked.push(item);
            break;
          case "2":
            $scope.MobileChecked.push(item);
            break;
          case "3":
            $scope.TelecomChecked.push(item);
            break;
        }
      }else{
        switch(type){
          case "1":
            var idx = $scope.UnicomChecked.indexOf(item);
            $scope.UnicomChecked.splice(idx, 1);
            break;
          case "2":
            var idx = $scope.MobileChecked.indexOf(item);
            $scope.MobileChecked.splice(idx, 1);
            break;
          case "3":
            var idx = $scope.TelecomChecked.indexOf(item);
            $scope.TelecomChecked.splice(idx, 1);
            break;
        }
      }         
    };

    /*添加收件人记录*/   
    var addSingleReceive = function(mobile, item){
      var tcType = telecom.getType(mobile);
      switch(tcType){
        case telecom.ChinaUnicom:
          $scope.unicomList.push(item);
          break;
        case telecom.ChinaMobile:
          $scope.mobileList.push(item);
          break;
        case telecom.ChinaTelecom:
          $scope.telecomList.push(item);
          break;
      }
      $scope.addMobileList.push(mobile);
      $scope.allMobileList.push(item);
    }

    /*添加单条记录按钮*/
    $scope.btnAddSingle = function(){
      var userMobile = $scope.addMobile.trim();
      var userName = $scope.addName.trim();
      var userSex = "2";//未知
      //手机格式错误
      if(!telecom.reg.test(userMobile)){
        Modal.alert({msg: '手机号格式错误！', title: '提示'});
        return false;
      }      
      //判断号码重复
      if($scope.addMobileList.indexOf(userMobile) >= 0){
        Modal.alert({msg: '手机号已经存在，无需重复添加！', title: '提示'});
        return false;
      }
      var item = {"u_phone": userMobile, "u_name": userName, "u_sex": userSex};
      addSingleReceive(userMobile, item);
      $scope.addName = "";
      $scope.addMobile = "";
    };

    /*加载模板数据*/    
    $scope.tempList = [];
    var getSmsTemplate = function(){
      httpServices.Post('sms:getSmsTemplate', {}).success(function(data){
        if(data["code"] == "S_OK"){
          $scope.tempList = data["var"]["tempList"];
        }
      });  
    };
    getSmsTemplate();   

    /*选中模板并显示*/
    $scope.selectTemplate = function(item){
      $scope.smsContent = item.tempContent;
      $scope.smsSignature = item.tempSignature;
      $scope.showTemplate = false;
    };

    /*获取通讯录数据*/
    $scope.addrTreeData = {};//可选择
    $scope.addrSelected = [];//已选择    
    var getAddrTreeData = function(){
      var pData = {};
      pData.groupId = "";
      pData.recursion = 1;
      pData.showUsers = 1;
      var defData = {};
      var deferred = $q.defer();  
      if(angularPermission.hasPermission("CONTACT_MANAGEMENT_VIEW")){    
        httpServices.Post('addr:companyAddr', pData).success(function(data){
          if(data["code"] == "S_OK"){   
            defData.companyAddr = data["var"]["companyAddr"] || {};
            localStorage['companyAddrTreeData'] = JSON.stringify(data["var"]["companyAddr"]);
            deferred.resolve(defData);
          }else{
            Modal.alert({msg: data["msg"], title: '错误提示'});
          }
        });
      }
      httpServices.Post('addr:personAddr', pData).success(function(data){
        if(data["code"] == "S_OK"){          
          defData.personAddr = data["var"]["personAddr"] || {};
          localStorage['personAddrTreeData'] = JSON.stringify(data["var"]["personAddr"]);
          deferred.resolve(defData);
        }else{
          Modal.alert({msg: data["msg"], title: '错误提示'});
        }
      });
      return deferred.promise;
    }
    /*加载树形结构数据*/    
    var initAddrTreeData = function(){      
      if(window.localStorage && localStorage['companyAddrTreeData'] && localStorage['personAddrTreeData']){
        try{
          $scope.addrTreeData.companyAddr = JSON.parse(localStorage['companyAddrTreeData']);
          $scope.addrTreeData.personAddr = JSON.parse(localStorage['personAddrTreeData']);
        }catch(e){}
      }
      if($.isEmptyObject($scope.addrTreeData)){
        getAddrTreeData().then(function (result) {
          $scope.addrTreeData = result;
        });
      }      
    }
    initAddrTreeData();

    /*刷新树形结构数据*/  
    $scope.refreshAddrData = function(){
      getAddrTreeData().then(function (result) {
        $scope.addrTreeData = result;
      });
    };
    
    /*打开联系人选择器*/
    $scope.openAddrSelect = function(){
      localStorage['companyAddrTreeData'] = $scope.addrTreeData;
      $('#addrModal').modal('show');
    };

    /*从通讯录添加回调*/
    $scope.addFromContact = function(){
      if($scope.addrSelected && $scope.addrSelected.length > 0){
        angular.forEach($scope.addrSelected, function(item){
          var mobile = item.u_phone;
          if($scope.addMobileList.indexOf(mobile) == -1){
            addSingleReceive(mobile, item);
          }
        });
      } 
      $('#addrModal').modal('hide');     
    };
    
    /*选择定时发送时间*/ 
    $scope.chooseDate = function(){
      laydate({
        elem: '#sendTime',
        format: 'YYYY-MM-DD hh:mm',
        min: laydate.now(0, 'YYYY-MM-DD hh:00'),
        istime: true,
        choose: function(datas){
          $scope.$apply(function() {
            if(datas!=undefined){
              $scope.sendTime = datas;
            }            
          });
        }
      });
    };   

    /*判断按钮Disabled属性*/
    $scope.isDisabled = function(type){
      if(type == '1'){
        return ($scope.smsContent.trim() != "" && $scope.allMobileList.length > 0);
      }else{
        return ($scope.smsContent.trim() != "" && $scope.sendTime.trim() != "" && $scope.allMobileList.length > 0);
      }      
    };

    /*即时发送*/
    $scope.currentSend = function(){
      Modal.confirm({
        msg: "确定要立即发送短信？"
      }).on( function (e) {
        if(e){
          var sendObj = {};
          sendObj.content = $scope.smsContent.trim();
          sendObj.signature = $scope.smsSignature.trim();
          sendObj.phoneList = $scope.allMobileList;
          sendObj.smsStatus = 2;//0-存草稿，2：直接发送，3：定时发送
          sendObj.sendTime = ""; 
          sendObj.contentUuid = $scope.contentUuid;
          addSmsFunc(sendObj, "短信成功开始发送！");
        } 
      });
    };

    /*存草稿*/
    $scope.saveSend = function(){
      var sendObj = {};
      sendObj.content = $scope.smsContent.trim();
      sendObj.signature = $scope.smsSignature.trim();
      sendObj.phoneList = $scope.allMobileList;
      sendObj.smsStatus = 0;
      sendObj.sendTime = ""; 
      sendObj.contentUuid = $scope.contentUuid;
      addSmsFunc(sendObj, "短信成功存入草稿！");
    };

    /*定时发送*/  
    $scope.regularlySend = function(){
      var difference = 5;//加5分钟
      var time1 = new Date($scope.sendTime.replace("-", "/"));
      var time2 = (new Date()).addMilliseconds(difference*60000);
      if(time1 < time2){
        Modal.alert({msg: '定时发送时间应大于当前时间至少'+difference+'分钟！', title: '提示'});
        return false;
      }      
      var sendObj = {};
      sendObj.content = $scope.smsContent.trim();
      sendObj.signature = $scope.smsSignature.trim();
      sendObj.phoneList = $scope.allMobileList;
      sendObj.smsStatus = 3;
      sendObj.sendTime = time1.format("yyyy-MM-dd hh:mm:ss");//$scope.sendTime.trim(); 
      sendObj.contentUuid = $scope.contentUuid;
      addSmsFunc(sendObj, "定时发送短信添加成功！");
    };

    /*检查非法关键词*/
    var checkSensitiveWord = function(pData){  
      var sensitiveWord = $rootScope.SensitiveWord;    
      var smsContent = pData.content;
      var hits = [];
      angular.forEach(sensitiveWord, function(item){
        if(smsContent.indexOf(item) != -1){
          hits.push(item);
        }
      });
      if(hits.length > 0){
        Modal.alert({msg: '短信内容包含非法关键字：'+hits.join(';')+' <br/>请修改短信内容后再发送！', title: '错误提示'});
        return false;
      }
      return true;
    };

    /*检查号码黑名单*/
    var checkPhoneBlackList = function(pData){
      var phoneBlackList = $rootScope.PhoneBlackList;
      var smsPhoneList = pData.phoneList;
      var hits = [];
      angular.forEach(phoneBlackList, function(item){
        angular.forEach(smsPhoneList, function(user){
          if(item == user.u_phone){
            hits.push(item);
          }
        });
      });
      if(hits.length > 0){
        Modal.alert({msg: '收信号码中包含黑名单：'+hits.join(';')+' <br/>请修改收信号码后再发送！', title: '错误提示'});
        return false;
      }
      return true;
    };

    /*保存发送短信任务*/
    var addSmsFunc = function(pData, smsg){
      if(checkSensitiveWord(pData) && checkPhoneBlackList(pData)){  
        httpServices.Post('sms:addSms', pData).success(function(data){
          if(data["code"] == "S_OK"){          
            Modal.alert({msg: smsg, title: '提示'});    
            if($scope.fromModel == ''){
              initData();
              initCheckBox();
            }else{
              $location.path('/sms/sentSMS');
            } 
          }else{
            Modal.alert({msg: data["msg"], title: '错误提示'});
          }
        });
      }
    };

    /*导入联系人数据*/
    var options = {
      'action': '/smsApi/uploadSmsAddr.do?sid=' + $rootScope.sid,
      'params': {},
      'valid_extensions': ['xls','xlsx'],
      'onComplete': function(response) {
        loadingDiv.hide();
        $("#btnUpFile").html('导入');
        if(response["code"] == "S_OK"){
          var addrList = response["var"]["addrList"];          
          $scope.$apply(function() {
            if(addrList && addrList.length > 0){
              addrList.forEach(function(item){
                var mobile = item.u_phone;
                if($scope.addMobileList.indexOf(mobile) == -1){
                  addSingleReceive(mobile, item);
                }
              });
            } 
          });
        }else{
          Modal.alert({msg: response["msg"], title: '错误提示'});
        }  
        var oldElement = $('#uploadFile'); 
        var newElement = $(oldElement).clone(); 
        $(oldElement).before(newElement).remove();   
        $(newElement).ajaxfileupload(options); 
      },
      'onStart': function() {
        loadingDiv.show();
        $("#btnUpFile").html('导入中...');
      },
      'onCancel': function() {
        $("#btnUpFile").html('导入');
      }
    };
    $('#uploadFile').ajaxfileupload(options);
}]);