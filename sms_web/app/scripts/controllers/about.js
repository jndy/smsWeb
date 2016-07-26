'use strict';

/**
 * @ngdoc function
 * @name smsWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the smsWebApp
 */
 
smsWebApp.controller('AboutCtrl',['$scope', '$rootScope', 'httpServices', function ($scope, $rootScope, httpServices) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*$scope.showModal = function () {
        $('#testModal').modal('show');        
    };

    $scope.hideModal = function () {
        $('#testModal2').modal('show');        
    };

    $scope.RequestData = function(){
        var fName = $scope.funcName;
        var pData = $scope.postData;
        httpServices.Post(fName, pData).success(function(data){
            console.log(data);
        });
    }

    $('#toolTip').tooltip('show');

    $scope.paginationConf = {
        floatAround: 'left',//浮动方向
        currentPage: 1,//当前页面
        totalItems: 400,//总条目数
        showTotal: true,//是否显示条数
        itemsPerPage: 15,//每页显示条数
        pagesLength: 15,//最大显示页数
        perPageOptions: [10, 20, 30, 40, 50, 100],//下拉选择每页条数
        rememberPerPage: 'perPageItems',//记忆每页条数
        onChange: function(){//更改分页事件
            console.log('ChangePage:'+this.currentPage);
        }
    };

    $scope.paginationConf2 = {
        floatAround: 'right',//浮动方向
        currentPage: 1,//当前页面
        totalItems: 400,//总条目数
        showTotal: true,//是否显示条数
        itemsPerPage: 15,//每页显示条数
        pagesLength: 15,//最大显示页数
        perPageOptions: [10, 20, 30, 40, 50, 100],//下拉选择每页条数
        rememberPerPage: 'perPageItems2',//记忆每页条数
        onChange: function(){//更改分页事件
            console.log('ChangePage2:'+this.currentPage);
        }
    };

    $scope.showAlert = function(){
        // 四个选项都是可选参数
        Modal.alert({
            msg: '提示内容',
            title: '提示'
        });
    };

    $scope.showConfirm = function(){
        // 如需增加回调函数，后面直接加 .on( function(e){} );
        // 点击“确定” e: true
        // 点击“取消” e: false
        Modal.confirm({
            msg: "是否删除角色？"
        })
        .on( function (e) {
            console.log("返回结果：" + e);
        });
    };


    $('#uploadFile').ajaxfileupload({
      'action': '/smsApi/uploadSmsAddr.do?sid=' + $rootScope.sid,
      'params': {},
      'valid_extensions': ['xls','xlsx'],
      'onComplete': function(response) {
        $("#btnUpFile").html('选择文件');
        if(response["code"] == "S_OK"){       
          console.log(response);
        }else{
          Modal.alert({msg: response["msg"], title: '错误提示'});
        } 
      },
      'onStart': function() {
        $("#btnUpFile").html('文件导入中...');
      },
      'onCancel': function() {
        $("#btnUpFile").html('选择文件');
      }
    });*/
}]);
