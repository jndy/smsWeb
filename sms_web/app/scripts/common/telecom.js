'use strict';

/*
* 运营商号码处理类
* author zxh 2016-05-28
*/

/*
* 三大运营商号码段
* 10086 移动
* 10010 联通
* 10000 电信
* 运营商；1-联通，2-移动，3-电信
*/
var telecom = telecom || {};

telecom = {
	reg: /^1[3|4|5|7|8]\d{9}$/,
	ChinaUnicom: '1',//联通
	ChinaMobile: '2',//移动
	ChinaTelecom: '3',//电信
	ChinaMobileList: ['134','135','136','137','138','139','150','151','152','157','158','159','182','183','184','187','188','147','178'],//移动
	ChinaUnicomList: ['130','131','132','155','156','185','186','145','176'],//联通
	ChinaTelecomList: ['133','153','180','181','189','177'],//电信
	getType: function(mobile){
		if(!this.reg.test(mobile)){
			return "";
		}else{
			var firstNum = mobile.substr(0, 3);
			if(this.ChinaMobileList.indexOf(firstNum) >= 0){
				return this.ChinaMobile;
			}else if(this.ChinaUnicomList.indexOf(firstNum) >= 0){
				return this.ChinaUnicom;
			}else if(this.ChinaTelecomList.indexOf(firstNum) >= 0){
				return this.ChinaTelecom;
			}else{
				return "";
			}
		}		
	}
};