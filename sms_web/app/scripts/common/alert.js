'use strict';

/**
 * @name smsWebApp
 * @description
 * # author zxh 2016-05-20
 *
 * Model alert and confirm.
 */

(function($) {
	window.Modal = function () {
		var template = '<div id="bootstrap-alert" class="modal modal-sm hide">'+
		        '<div class="modal-content">'+
		            '<div class="modal-header">'+
		                '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>'+
		                '<h5 class="modal-title"><i class="fa fa-exclamation-circle"></i> [Title]</h5>'+
		            '</div>'+
		            '<div class="modal-body small">'+
		                '<p>[Message]</p>'+
		            '</div>'+
		            '<div class="modal-footer" >'+
		                '<a href="javascript:;" class="btn-lblue cancel" data-dismiss="modal" aria-hidden="true">[BtnCancel]</a>&nbsp;'+
		                '<a href="javascript:;" class="btn-dblue ok" data-dismiss="modal">[BtnOk]</a>'+
		            '</div>'+
		        '</div>'+
		    '</div>';
		$(document.body).append(template);

		var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
		var alr = $("#bootstrap-alert");
		var ahtml = alr.html();

		var _alert = function (options) {
			alr.html(ahtml);	// 复原
			//alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
			alr.find('.cancel').hide();
			_dialog(options);

			return {
				on: function (callback) {
					if (callback && callback instanceof Function) {
						alr.find('.ok').click(function () { callback(true); });
					}
				}
			};
		};

		var _confirm = function (options) {
			alr.html(ahtml); // 复原
			//alr.find('.ok').removeClass('btn-primary').addClass('btn-success');
			alr.find('.cancel').show();
			_dialog(options);

			return {
				on: function (callback) {
					if (callback && callback instanceof Function) {
						alr.find('.ok').click(function () { callback(true) });
						alr.find('.cancel').click(function () { callback(false) });
					}
				}
			};
		};

		var _dialog = function (options) {
			var ops = {
				msg: "提示内容",
				title: "操作提示",
				btnok: "确定",
				btncl: "取消"
			};

			$.extend(ops, options);

			var html = alr.html().replace(reg, function (node, key) {
				return {
					Title: ops.title,
					Message: ops.msg,
					BtnOk: ops.btnok,
					BtnCancel: ops.btncl
				}[key];
			});
			
			alr.html(html);
			alr.modal({
				width: 500,
				backdrop: 'static'
			});
		}

		return {
			alert: _alert,
			confirm: _confirm
		}
	}();
})(jQuery); 