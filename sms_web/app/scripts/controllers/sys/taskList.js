'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:TaskListCtrl
 * @description
 * # TaskListCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('TaskListCtrl',['$scope', '$rootScope', 'httpServices', function ($scope, $rootScope, httpServices) {
	/*导航栏的当前状态*/
    $scope.navCurrent = "taskList";

    /*页面初始化*/
    var initData = function(){
        $scope.startDate = changeStr2Date(laydate.now(-7), "yyyy-MM-dd");
        $scope.endDate = changeStr2Date(laydate.now(), "yyyy-MM-dd");
        $scope.taskList = [];  
    }
    initData();

    /*选择起始查询日期*/    
    $scope.startDateChoose = function(){
        laydate({
            elem: '#startDate', 
            isclear: false,
            max: $scope.endDate,
            choose: function(datas){
              $scope.$apply(function() {
                $scope.startDate = datas;                
              });
            }
        });
    };
    $scope.endDateChoose = function(){
        laydate({
            elem: '#endDate',
            isclear: false,
            min: $scope.startDate,
            choose: function(datas){
              $scope.$apply(function() {
                    $scope.endDate = datas;
              });
            }
        });
    }; 

    /*数据分页*/   
    $scope.paginationConf = {
        floatAround: 'right',
        showTotal: true,
        currentPage: 1,
        totalItems: 1,        
        itemsPerPage: 20,
        pagesLength: 15,
        perPageOptions: [10, 20, 30, 50, 100],
        rememberPerPage: 'perPageItems',
        onChange: function(){
            getListData(this.currentPage, this.itemsPerPage);
        }
    };

    /*获取数据列表*/
    var getListData = function(pageNo, pageSize){
        var postData = {};
        postData.pageNo = pageNo;
        postData.pageSize = pageSize;   
        postData.startDate = $scope.startDate.trim();
        postData.endDate = $scope.endDate.trim();  
        httpServices.Post('sms:getTaskList', postData).success(function(data){
            if(data["code"] == "S_OK"){
                $scope.taskList = data["var"]["smsList"];
                $scope.paginationConf.totalItems = data["var"]["listCount"]; 
            }
        });
    };

    /*搜索按钮事件*/
    $scope.searchData = function(){
        $scope.paginationConf.currentPage = 1;
        getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    };

    /*修改任务*/
    $scope.editTask = function(item){
        $scope.formData = angular.copy(item);
        $scope.formData.sendTime = ($scope.formData.sendTime != null) ? (new Date($scope.formData.sendTime.replace("-", "/"))).format('yyyy-MM-dd hh:mm') : new Date().format('yyyy-MM-dd hh:mm');
        $scope.formData.content = html_decode($scope.formData.content);
        $('#editModal').modal('show');  
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

    /*保存表单数据*/
    $scope.submitForm = function(isValid, formData){
        if(!isValid){
            Modal.alert({msg: '表单校验失败！', title: '提示'});
        }else{
            var difference = 5;//加5分钟
            var time1 = new Date($scope.formData.sendTime.replace("-", "/"));
            var time2 = (new Date()).addMilliseconds(difference*60000);
            if(time1 < time2){
                Modal.alert({msg: '发送时间应大于当前时间至少'+difference+'分钟！', title: '提示'});
                return false;
            }
            if(checkSensitiveWord(formData)){
                delete formData.createTime;
                delete formData.userCount;
                formData.sendTime = time1.format("yyyy-MM-dd hh:mm:ss");
                httpServices.Post("sms:editTask", formData).success(function(data){
                    if(data["code"] == "S_OK"){
                        $scope.formData = {};                   
                        $('#editModal').modal('hide');                    
                        getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                    }else{
                        Modal.alert({msg: data["msg"], title: '错误提示'});
                    }            
                });
            }
        }
    };

    /*选择定时发送时间*/ 
    $scope.chooseDate = function(){
      laydate({
        elem: '#sendTime',
        format: 'YYYY-MM-DD hh:mm',
        min: laydate.now(0, 'YYYY-MM-DD hh:mm'),
        isclear: false,
        istime: true,
        choose: function(datas){
          $scope.$apply(function() {
            if(datas!=undefined){
              $scope.formData.sendTime = datas;
            }            
          });
        }
      });
    }; 

    /*删除任务*/
    $scope.delTask = function(item){
        Modal.confirm({
            msg: "确认删除该短信发送任务？"
        })
        .on( function (e) {
            if(e){
                httpServices.Post('sms:delTask', {"contentUuid": item.contentUuid}).success(function(data){
                    if(data["code"] == "S_OK"){
                        getListData($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
                    }else{
                        Modal.alert({msg: data["msg"], title: '错误提示'});
                    }
                });
            } 
        });
    };
}]);
