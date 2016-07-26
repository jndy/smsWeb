'use strict';

/*
* JS公共方法类
* author zxh 2016-05-18
*/


/**
 * 类操作通用方法
 * @private
 * @ignore
 */
function Class() {
	/**
	 * 空函数
	 * @private
 	 * @ignore
	 */
	this.emptyFunction = function() {
		return function() {};
	};
	/**
	 * 返回一个类，并执行类的构造方法initialize(如果有)
	 * @private
 	 * @ignore
	 */
	this.createClass = function() {
		return function() {
			if (this.initialize) {
				this.initialize.apply(this, arguments);
			}
		};
	};
	this.event = {
		"var" : {},
		method : [],
		target : []
	};
	/**
	 * @private
	 * @ignore
	 */
	this.initMethod = function(cls, arrMethod) {
		for (var i = 0, l = arrMethod.length; i < l; i++) {
			var m = arrMethod[i];
			if (typeof(cls.prototype[m]) != "undefined") {
				cls.prototype['_' + m] = function(methodName) {
					return function() {
						com.event.target.push(this.name);
						com.event.method.push(methodName);
						var k = this.name + "__" + methodName;
						com.event["var"][k] = {};
						if (this["onbefore" + methodName]) {
							try {
								this["onbefore" + methodName].apply(this, arguments);
							} catch (exp) {
								ch(k + ":onbefore(" + arguments[0] + ")", exp);
							}
						}
						try {
							var r1 = this[methodName].apply(this, arguments);
						} catch (exp) {
							ch(k + "(" + arguments[0] + ")", exp);
						}
						if (this["onafter" + methodName]) {
							try {
								var r2 = this["onafter" + methodName].apply(this,arguments);
							} catch (exp) {
								ch(k + ":onafter(" + arguments[0] + ")", exp);
							}
						}
						com.event["var"][k] = null;
						com.event.target.pop();
						com.event.method.pop();
						return r1 || r2;
					};
				}(m);
			}
		}
	};
	/**
	 * @private
	 * @ignore
	 */
	this.Delegate = function(func) {
		this.hash = new Hashtable([]);
		this.add = function(func) {
			this.hash.add(func);
		};
		this.remove = function(func) {
			this.hash.removeByObj(func);
		};
		this.run = function() {
			var args = arguments;
			this.hash.each(function(i, func) {
				func.apply(this, args);
			});
		};
		if (func) {
			this.add(func);
		}
	};
	/**
	 * @private
	 * @ignore
	 */
	this.getVar = function(Agv) {
		try {
			var target = this.event.target[this.event.target.length - 1];
			var method = this.event.method[this.event.method.length - 1];
			return this.event["var"][target + "__" + method][Agv];
		} catch (exp) {
			ch("fGetVar", exp);
			return undefined;
		}
	};
	this.setVar = function(Agv, bb) {
		var target = this.event.target[this.event.target.length - 1];
		var method = this.event.method[this.event.method.length - 1];
		var k = target + "__" + method;
		if (!this.event["var"][k]) {
			this.event["var"][k] = {};
		}
		this.event["var"][k][Agv] = bb;
	};
	this.setReturn = function(retValue) {
		var target = this.event.target[this.event.target.length - 1];
		var method = this.event.method[this.event.method.length - 1];
		var k = target + "__" + method;
		if (!this.event["var"][k]) {
			this.event["var"][k] = {};
		}
		this.event["var"][k]["return"] = retValue;
	};
	this.getReturn = function(k) {
		if (com.event["var"][k]) {
			var an = com.event["var"][k]["return"];
			if (typeof(an) != "undefined") {
				com.event["var"][k] = null;
				return an;
			}
		}
	};
}

/**
 * 命名空间 com
 * @namespace window.com
 */
var com = new Class();

/**
 * Hashtable类
 * @class Hashtable类
 */
var Hashtable = com.createClass();
var $continue = {};
var $break = {};


(function() {
	/**
	 * 扩展Number类<br>
	 * 框架页面数字直接使用<br>
	 * 子页面使用:只要包含通用common.js文件就可以直接使用。<br>
	 * @class
	 */
	var NUMBER = com.createClass();
	
	/**
	 * 扩展String类<br>
	 * 框架页面数组直接使用<br>
	 * 子页面使用:只要包含通用common.js文件就可以直接使用。<br>
	 * @class
	 */
	var STRING = com.createClass();
	
	
	/**
	 * 扩展Array类<br>
	 * 框架页面数组直接使用<br>
	 * 子页面使用:只要包含通用common.js文件就可以直接使用。<br>
	 * @class
	 */
	var ARRAY = com.createClass();
	
	/**
	 * 扩展Date类<br>
	 * 框架页面日期对象直接使用<br>
	 * 子页面使用:只要包含通用common.js文件就可以直接使用。<br>
	 * @class 
	 */
	var DATE = com.createClass();
	
	
	/**
	 * 函数扩充类
	 * @class 
	 */
	var FUNCTION = com.createClass();

	/**
	 * 对源对象的属性和方法复制到目的对象
	 * @param {Object} destination 目的对象
	 * @param {Object} source 源对象
	 */
	Object.extend = function(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	};

	/***
	 * 对象拷贝
	 * @param {Object} source
	 */
	Object.clone = function(source){
	    var objClone;
	    if (source.constructor == Object) {
            objClone = new source.constructor();
        } else {
            objClone = new source.constructor(source.valueOf());
        }
	    for ( var key in source )
	    {
	        if ( objClone[key] != source[key] )
	        { 
	            if ( typeof(source[key]) == 'object' )
	            { 
	                objClone[key] = Object.clone(source[key]);//source[key].Clone();
	            }
	            else
	            {
	                objClone[key] = source[key];
	            }
	        }
	    }
	    return objClone; 
	};

	/**
	 * NUMBER类
	 */
	NUMBER.prototype = {
		/**
		 * 精确浮点加法<br>
		 * js浮点加法有bug，导致某些计算结果不准确<br>
		 * @param {Object} num 被加数
		 * @return {number} 两数相加以后的和
		 * @example 
		 * <code>
		 * var n = 6.145;
		 * var s = n.add(3.12);
		 * </code>
		 */
		add: function(num){
			var m=0,r1=0,r2=0;
			var num1 = this;
			var s1 = num.toString(),s2 = num1.toString();
			try{
				if (s1.indexOf(".") > -1) {
					r1 = s1.split(".")[1].length;
				}
			}catch(e){r1=0;}
			try{
				if (s2.indexOf(".") > -1) {
					r2 = s2.split(".")[1].length;
				}
			}catch(e){r2=0;}
			m=Math.pow(10,Math.max(r1,r2));
			return (num*m+num1*m)/m;
		},
		/**
		 * 精确浮点乘法<br>
		 * js浮点乘法有bug,导致某些计算结果不准确<br>
		 * @param {Object} num 被数
		 * @return {number} 两数相乘以后积
		 * @example 
		 * <code>
		 * var n = 6.145;
		 * var s = n.mul(3.12);
		 * </code>
		 */
		mul: function(num){
			var m=0,s1=num.toString(),s2=this.toString();
			try{
				if (s1.indexOf(".") > -1) {
					m += s1.split(".")[1].length;
				}
			}catch(e1){}
			try{
				if (s2.indexOf(".") > -1) {
					m += s2.split(".")[1].length;
				}
			}catch(e2){}
			return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
		},
		/**
		 * 精确浮点除法<br>
		 * js浮点除法有bug，导致某些计算结果不准确<br>
		 * @param {Object} num 被数
		 * @return {number} 两数相乘以后积
		 * @example 
		 * <code>
		 * var n = 6.145;
		 * var s = n.div(3.12); // s=n/s
		 * </code>
		 */
		div: function(num){
			var t1 = 0, t2 = 0, r1, r2, s1 = this.toString(), s2 = num.toString();
			try {
				if (s1.indexOf(".") > -1) {
					t1 = s1.split(".")[1].length;
				}
			} 
			catch (e1) {}
			try {
				if (s2.indexOf(".") > -1){
					t2 = s2.split(".")[1].length;
				}
			} 
			catch (e2) {}
			r1 = Number(s1.replace(".", ""));
			r2 = Number(s2.replace(".", ""));
			return (r1 / r2) * Math.pow(10, t2 - t1);
		}
	};
	Object.extend(Number.prototype, new NUMBER());
	
	/**
	 * STRING类
	 */
	STRING.prototype = {
		/**
		 * 去掉字符串中html标签
		 * @return {string} 去掉html标签以后的字符串
		 */
		stripTags: function() {
			return this.replace(/<\/?[^>]+>/gi, '');
		},
		/**
		 * 转成html格式
		 * @return {string} 转成html格式以后的字符串
		 */
		escapeHTML: function() {
			var div = document.createElement('div');
			var text = document.createTextNode(this);
			div.appendChild(text);
			return div.innerHTML;
		},
		/**
		 * 去除html格式
		 * @return {string} 去除html格式以后的字符串
		 */
		unescapeHTML: function() {
			var ag = document.createElement('div');
			var v = this.stripTags();
			if (v) {
				ag.innerHTML = v;
				return ag.childNodes[0].nodeValue;
			}else{
				return v;
			}
		},
		/**
		 * html解码<br>
		 * "&lt;" -> "<" <br>
		 * "&gt;" -> ">" <br>
		 * @return {string} html解码以后的字符串
		 */
		decodeHTML: function() {
			var s = this;
			s = s.replace(/&lt;/gi, "<");
			s = s.replace(/&gt;/gi, ">");
			s = s.replace(/&quot;/gi, "\"");			
			s = s.replace(/&nbsp;/gi, " ");
            s = s.replace(/&apos;/gi,"'");
            s = s.replace(/&#39;/gi,"'");
			s = s.replace(/&amp;/gi, "&");
			return s;
		},
		/**
		 * html编码<br>
		 * "<" -> &lt; <br>
		 * ">" -> &gt; <br>
		 * @return {string} html编码以后的字符串
		 */
		encodeHTML : function() {
			var s = this;
			s = s.replace(/&/g, "&amp;");
			s = s.replace(/</g, "&lt;");
			s = s.replace(/>/g, "&gt;");
			s = s.replace(/\"/g, "&quot;");
			s = s.replace(/ /g, "&nbsp;");
            s = s.replace(/\'/g, "&#39;");
			return s;
		},
		encodeXML : function() {
		    var s = this;
            return s.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
        },
        decodeXML : function(){
            var s = this;
            return s.replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&apos;/g, "'")
            .replace(/&amp;/g, "&");
        },
		toCData : function(){
			var s = this;
			return "<![CDATA[ "+s+" ]]>";
		},
		/**
		 * 将字符串转成整型数字
		 * @return {number} 转换以后的数字，整型
		 */
		toInt : function() {
			var n = parseInt(this, 10);
			return (isNaN(n))?0:n;
		},
		/**
		 * 去掉字符串前后的空格
		 * @return {string} 去掉空格以后的字符串
		 */
		trim : function() {
			return this.replace(/(^\s*)|(\s*$)/g, "");
		},
		/**
		 * 去掉字符串所有与换行的空格
		 * @return {string} 去掉空格以后的字符串
		 */
		trimAll : function() {
			return this.replace(/[\s\t]*/g, "");
		},
		/**
		 * 检查字符串中是否含有特殊字符<br>
		 * 特殊字符包括：[,%'"/\;|<>^]<br>
		 * @return {boolean} 不含有特殊字符返回true,否则返回false
		 */
		checkSpecialChar : function() {
			var reg = /[,%\'\"\/\\;|\<\>\^]/;
			if (this.search(reg) != -1) {
				/*
				 * if (flag) { CC.alert("请不要输入 ＂, % \' \" \\ \/ ；|<>^＂等特殊字符。",
				 * function(){ try { func() } catch (exp) { } }); }
				 */
				return false;
			}
			return true;
		},
		/**
		 * 返回字符串的字节数，中文2个字节，其它1个字节
		 * @return {number} 字符串的字节数
		 */
		len : function() {
			var len = 0;
			for (var i = 0, l = this.length; i < l; i++) {
				if (this.charCodeAt(i) > 255) {
					len += 2;
				} else {
					len++;
				}
			}
			return len;
		},
		/**
		 * 从字符串左边开始截取指定的字符数
		 * @param {number} len 要截取的字符数
		 * @return {string} 截取以后的字符串
		 */
		lefts : function(len,isAddDot){
			var str = this;
			if(this.length>len){
				str = this.substring(0, len);
				if(isAddDot){
					str += "...";
				}
			}
			return str;	
		},
		/**
		 * 从字符串右边开始截取指定的字符数
		 * @param {number} len 要截取的字符数
		 * @return {string} 截取以后的字符串
		 */
		rights : function(len){
			return this.substring(this.length-len,this.length);	
		},
		/**
		 * 从字符串左边开始截取指定的字节数<br>
		 * 一个中文字符算两个字节，英文字符算一个字节<br>
		 * 如果截取的字节数不足最后一个中文字符，最后一个字符被截断。
		 * @param {number} len 要截取的字节数
		 * @return {string} 截取以后的字节串
		 * @example
		 * <code>
		 * var str = "ab中c国";
		 * var s1 = str.left(2); //return ab
		 * var s2 = str.left(6); //return ab中c
		 * var s3 = str.left(4); //return ab中
		 * var s4 = str.left(3); //return ab
		 * </code>
		 */
		left : function(len,isAddDot) {
			var i = 0;
			var j = 0;
			var ret = this;
			if (this.len() <= len) {
				return ret;
			}
			while (j < len) {
				if (this.charCodeAt(i) > 255) {
					j += 2;
				} else {
					j++;
				}
				i++;
			}
			ret = this.substring(0, i);
			if(ret.len()>len){
				ret = ret.substring(0,ret.length-1);
			}
			if(isAddDot){
				ret += "...";
			}
			return ret;
		},
		/**
		 * 从字符串右边开始截取指定的字节数<br>
		 * 一个中文字符算两个字节，英文字符算一个字节<br>
		 * 如果截取的字节数不足最后一个中文字符，最后一个字符被截断。
		 * @param {number} len 要截取的字节数
		 * @return {string} 截取以后的字节串
		 * @example
		 * <code>
		 * var str = "ab中c国";
		 * var s = str.right(2); //return 国
		 * var s = str.right(6); //return b中c国
		 * var s = str.right(4); //return c国
		 * </code>
		 */
		right : function(len) {
			var l = this.len();
			var i = 0;
			var j = 0;
			if (l <= len) {
				return this;
			}
			while (j < len) {
				if (this.charCodeAt(l-1-i) > 255) {
					j += 2;
				} else {
					j++;
				}
				i++;
			}
			var lg = this.length;
			var ret = this.substring(lg-i,lg);
			if(ret.len()>len){
				ret = ret.substring(1,ret.length);
			}
			return ret;
		},
		/**
		 * 判断字符串是否为数字
		 * @return {boolean} 是数字返回true,否则返回false
		 */
		isNumber : function() {
			return (this.search(/^\d+$/g) == 0);
		},
		/**
		 * 返回一个以bi为分隔符的字符串指定num个分隔符的位置
		 * @param {string} bi 分隔符
		 * @param {number} num 指定第几个分隔符
		 * @return {number} 
		 * @example
		 * <code>
		 * var posstr = "abc,def,ghi,ijklm";
		 * var n1 = posstr.posIndexOf(",",3); //n=11;
		 * var n2 = posstr.posIndexOf(",",2); //n=7;
		 * </code>
		 */
		posIndexOf : function(bi, num) {
			var ab = this.split(bi);
			if (ab.length - 1 < num) {
				return -1;
			} else {
				var len = 0;
				for (var i = 0, l = bi.length; i < num; i++) {
					len += ab[i].length;
					len += l;
				}
				return len - bi.length;
			}
		},
		/**
		 * 字符串转换成Json对象<br>
		 */
		parseJson : function() {
			/* from json1.js
			 try {
				return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(this.replace(/'(\\.|[^"\\])*'/g, '')))&&eval('(' + this + ')');
			} catch (e) {
				ch("fStringParseJson", e);
				return false;
			}*/
			//from json2.js
			try {
				var text = this;
				var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
				cx.lastIndex = 0;
	            if (cx.test(text)) {
	                text = text.replace(cx, function (a) {
	                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	                });
	            }
				if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))){
					return eval('(' + text + ')');
				}
			}catch (e) {
				ch("fStringParseJson", e);
				return false;
			}
		},
		stripScripts: function() {
			return this.replace(new RegExp( '<script[^>]*>([\u0001-\uFFFF]*?)</script>', 'img'), '');
		},
		/**
		 * 字符串是否存在于另外一个字符串中
		 * @param {Object} str 另一个字符串
		 * @param {Object} isCase 是否区分大小写,默认为false
		 */
		inStr:function(str,isCase){
			var v = this;
			var m = (isCase)?"":"i";
			var reg = new RegExp("\\b"+v+"\\b",m);
			return reg.test(str);
		},
		format:function(){
			var args = arguments;
			var str = this;
			var pattern = new RegExp('{([0-' + args.length + '])}', 'g');
			return String(str).replace(pattern, function(match, index) {
				return args[index];
			});
		}
	};
	Object.extend(String.prototype, new STRING());
	
	/**
	 * ARRAY类
	 */
	ARRAY.prototype = {
		/**
		 * 交换级数中n1和n2两个元素的位置
		 * @param {number} n1 要交换的第一元素
		 * @param {number} n2 要交换的第二个元素
		 */
		exchange : function(n1, n2) {
			if (Math.max(0, n1, n2) < 0|| Math.min(this.length - 1, n1, n2) > this.length- 1) {
				return;
			}
			var am = this[n1];
			this[n1] = this[n2];
			this[n2] = am;
		},
        /**
         * 删除数据组中指定索引的值
         * @param {Array} arr 要删除的索引数组，需要按照索引顺序排列
         * @param {Number} pos 相对偏移量，默认为0，传入大于0的数字将删除偏移量加索引
         */
        remove:function(arr,pos){
            pos = pos || 0;
            pos = Math.max(pos,0);
            for(var i=arr.length-1;i>=0;i--){
                this.splice(arr[i]+pos,1);
            }
        },
		/**
		 * 去掉数组中的空元素
		 */
		escapeNull : function() {
			var ge = [];
			for (var i = 0, len = this.length; i < len; i++) {
				if (this[i]) {
					ge[ge.length] = this[i];
				}
			}
			return ge;
		},
		/**
		 * 克隆数组
		 * @return {Array} 返回克隆的数组
		 */
		clone : function(isDeep){
			var temp = [];
			if(!isDeep){
				var ge = this.slice(0); 
				return ge;
			}else{
				for(var i=0;i<this.length;i++){
					temp.push(Object.clone(this[i]));
				}
				return temp;
			}
			
		},
		/**
		 * 删除数组中指定的元素
		 * @param {String} 要删除数组元素的值
		 * @return {Array} 删除指定元素以后的数组
		 */
		subtract: function(Alq){
			var ge = [];
			for(var i=0;i<this.length;i++) {
				var  s=this[i];
				if (s != Alq) {
					ge[ge.length] = s;
				}
			}
			return ge;
		},
		/**
		 * 用正则替换数组元素中的值
		 * @param {string} 正则表达式常量或字符串
		 * @return {Array} 替换以后的数组
		 */
		filter : function(reg) {
			for (var i = 0,s = this[i];i<this.length;i++){
				this[i] = s.replace(reg, "");
			}
		},
		/**
		 * 遍历数组
		 * @param {function} 遍历数组处理的函数
		 * @example
		 * <code>
		 * var a = ['a','b','c','d'];
		 * a.each(function(i,v){
		 * 	var index = i; //索引
		 *  var val = v;   //值
		 * });
		 * </code>
		 */
		each : function(func) {
			for (var i = 0, m = this.length; i < m; i++) {
				try {
					func(i, this[i]);
				} catch (exp) {
					if (exp == $break) {
						break;
					} else if (exp == $continue) {
						continue;
					} else {
						throw exp;
					}
				}
			}
		},
		/**
		 * 判断一个值是否存在于数组中
		 * @param {Object} value
		 * @return {boolean} 存在返回true,否则返回false
		 */
		has : function(value) {
			var r = false;
			this.each(function(i, ao) {
				if (ao == value) {
					r = true;
					//throw $break;
				}
			});
			return r;
		},
		/**
		 * 将数组转换成字符串,此方法重写在ie无效，原因暂且不明<br>
		 * 将数组转化成字符串请使用Array.join()
		 * @param {string} 连接符，默认为 ""
		 */
		toString : function(sep) {
			sep = sep || "";
			return this.join(sep);
		},
		/**
		 * 去除数组中重复项，返回值唯一的数组(去掉空值)
		 * @param {function} 取值函数
		 * <code>
		 *  var arr = [9,1,3,8,7,7,6,6,5,7,8,8,7,4,3,1];
		 *	var newarr = arr.unique();
		 *	//也可以对过滤对象数组
		 *  var arr = [
		 *  	{ name : "test1", value : "value1" },<br>
		 *      { name : "test1", value : "value1" },<br>
		 *      { name : "test2", value : "value2" } <br>
		 *  ];
		 *  //过滤value相同的元素
		 *  var newarr = arr.unique(funmction(v){
		 *  	return v.value;
		 *  });
		 * </code>
		 */
		unique : function(func){
            //高效算法
            var a = {};
            if(typeof(func)=="function"){
                this.each(function(i,v){
                    var t = func(v);
                    if (typeof(a[t])=='undefined'&&t!=""){
                        a[t] = v;
                    }
                });
                this.length=0; 
                for(var i in a){
                    this[this.length] = a[i];
                }
            }else{
                this.each(function(i,v){
                    if (typeof(a[v])=='undefined'&&(typeof(v)=="number" || v!="")){
                        a[v] = typeof(v)=="number"?1:2;
                    }
                }); 
                this.length=0; 
                for(var j in a){
                    this[this.length] = a[j]==1?parseInt(j,10):j;
                }
            }
            return this;
        },
		/**
		 * 去除数组中重复项，返回被去除值组成的数组
		 */
	    strip : function(){
	        if (this.length < 2){
				return [];
			}  
	        var arr = [];
	        var del = [];
	        for (var i = 0; i < this.length; i++) {
	            arr.push(this.splice(i--, 1).toString());
	            for (var j = 0; j < this.length; j++) {
	                if (this[j] == arr[arr.length - 1]) {
	                    del.push(this.splice(j--, 1).toString());
	                }
	            }
	        }
	        return del;
	    }		
	};
	Object.extend(Array.prototype, new ARRAY());
	
	/**
	 * DATE类
	 */
	DATE.prototype = {
		/**
		 * 将日期加上指定的天数
		 * @param {numer} n
		 * @return {Date} 加上n天以后的日期对象
		 */
		dateAdd : function(n) {
			return new Date(this.valueOf() + n * 3600 * 24 * 1000);
		},
		/**
		 * 为日期增加指定的毫秒
		 */
		addMilliseconds : function(n){
			return new Date(this.valueOf() + n);
		},
		/**
		 * 日期格式化输出
		 * var date = new Date();
		 * date.format("yyyy-MM-dd")
		 */
		format : function(format){
			var o = {
				"M+" : this.getMonth()+1, //month
				"d+" : this.getDate(),    //day
				"h+" : this.getHours(),   //hour
				"m+" : this.getMinutes(), //minute
				"s+" : this.getSeconds(), //second
				"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
				"S" : this.getMilliseconds() //millisecond
			}
			if(/(y+)/.test(format)){
				format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
			}
			for(var k in o){
				if(new RegExp("("+ k +")").test(format)){
					format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] :	("00"+ o[k]).substr((""+ o[k]).length));
				}			
			}
			return format;
	    },		
		/*
		 * 计算两日期的差值
		 * @param {string} | {date} d
		 * @return {int} 两日期的毫秒差
		 */
		dateDiff : function(d){
			try{
				var d = d instanceof Date ? d : new Date(d);				
				return this.getTime() - d.getTime();
			}
			catch(e){
				return 0;
			}
		}
	};
	Object.extend(Date.prototype, new DATE());

	/**
	 * FUNCTION类
	 */
	FUNCTION.prototype = {
		apply: function(v, argu){
			var s;
			if (v) {
				v._caller = this;
				s = " obj._caller ";
			} else {
				s = " this ";
			}
			var a = [];
			for (var i = 0, l = argu.length; i < l; i++) {
				a[i] = " argu[ " + i + " ] ";
			}
			return eval(s + " ( " + a.join(" , ") + " ); ");
		},
		call: function(v){
			var a = [];
			for (var i = 1, l = arguments.length; i < l; i++) {
				a[i - 1] = arguments[i];
			}
			return this.apply(v, a);
		},
		bind: function(){
			var p1 = this, args = new Hashtable(arguments).toArray(), object = args.shift();
			return function(){
				return p1.apply(object, args.concat(new Hashtable(arguments).toArray()));
			};
		}
	};
	if (typeof Function.prototype.apply != "function") {
		Object.extend(Function.prototype, new FUNCTION());
	}

	/**
	 * Hashtable类
	 */
	Hashtable.prototype = {
		/**
		 * HashTable类的构造方法
		 */
		initialize : function() {
			this.ks = {};
			this.type = "object";
			this.isHash = true;
			if (arguments.length > 0) {
				var arg = arguments[0];
				if (typeof arg == "object") {
					if (this.isArray(arg)) {
						this.type = "array";
						this.ks = [];
						for (var i = 0, l = arg.length; i < l; i++) {
							this.add(i, arg[i]);
						}
					} else {
						for (var ao in arg) {
							this.add(ao, arg[ao]);
						}
					}
				}
			}
		},
		/**
		 * 添加一个键值
		 * @param {Object} key key值
		 * @param {Object} value value值
		 */
		add : function(key, value) {
			if (value && value.nodeType && value.nodeType == 1) {
				value = $(value);
			}
			if (key && key.nodeType && key.nodeType == 1) {
				key = $(key);
			}
			if (this.type == "object") {
				if (typeof(key) != "undefined") {
					if (this.contains(key) == false) {
						this.ks[key] = typeof(value) == "undefined"?null:value;
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				if (typeof(value) != "undefined" && typeof(key) != "undefined") {
					this.ks[key] = value;
					return true;
				} else if (typeof(key) != "undefined") {
					this.ks[this.ks.length] = key;
					return true;
				} else {
					return false;
				}
			}
		},
		/**
		 * 删除一个键值　
		 * @param {Object} key key值
		 */
		remove : function(key) {
			delete this.ks[key];
		},
		/**
		 * 以值删除一个键值
		 * @param {Object} v 要删除的value
		 */
		removeByObj : function(v) {
			for (var k in this.ks) {
				if (this.ks[k] == v) {
					if (this.Asf == "array") {
						this.ks = this.ks.splice(k);
					} else {
						delete this.ks[k];
					}
				}
			}
		},
		/**
		 * 返回总数
		 */
		count : function() {
			if (this.type == "array") {
				return this.ks.length;
			}
			var i = 0;
			for (var k in this.ks) {
				i++;
			}
			return i;
		},
		/**
		 * 元素集合
		 * @param {Object} key key值
		 */
		items : function(key){
			return this.ks[key];
		},
		/**
		 * 是否包含指定的key值
		 * @param {Object} key
		 */
		contains : function(key) {
			return typeof(this.ks[key]) != "undefined";
		},
		/**
		 * 是否包含指定的value值
		 * @param {Object} s
		 */
		has : function(s) {
			for (var k in this.ks) {
				if (this.ks[k] == s) {
					return true;
				}
			}
			return false;
		},
		/**
		 * 清空对象
		 */
		clear : function() {
			for (var k in this.ks) {
				delete this.ks[k];
			}
		},
		/**
		 * 连成一个字符串
		 * @param {Object} Ajg 连接符
		 */
		join : function(Ajg) {
			var ab = [];
			for (var k in this.ks) {
				ab[ab.length] = (this.ks[k] + "");
			}
			return ab.join(Ajg);
		},
		/**
		 * 遍历对象
		 * @param {Object} func 遍历执行的函数　
		 */
		each : function(func) {
			try {
				if (this.type == "object") {
					for (var k in this.ks) {
						try {
							func(k, this.ks[k]);
						} catch (e) {
							if (e != $continue){
								throw e;
							}	
						}
					}
				} else {
					for (var l = 0; l < this.ks.length; l++) {
						try {
							func(l, this.ks[l]);
						} catch (e) {
							if (e != $continue){throw e;}	
						}
					}
				}
			} catch (e) {
				if (e != $break){throw e;}		
			}
		},
		/**
		 * 转换成数组
		 */
		toArray : function() {
			var ab = [];
			this.each(function(ao, value) {
				ab[ab.length] = value;
			});
			return ab;
		},
		/**
		 * @private
		 * @ignore
		 */
		isArray : function(ao) {
			return (ao && ao instanceof Array);
		}
	};
})();

/*HTML转义方法*/
function html_encode(str) {   
  var s = "";   
  if (str.length == 0) return "";   
  s = str.replace(/&/g, "&amp;");   
  s = s.replace(/</g, "&lt;");   
  s = s.replace(/>/g, "&gt;");   
  s = s.replace(/ /g, "&nbsp;");   
  s = s.replace(/\'/g, "&#39;");   
  s = s.replace(/\"/g, "&quot;");   
  s = s.replace(/\n/g, "<br>");   
  return s;   
}

/*HTML转义方法*/
function html_decode(str){   
  var s = "";   
  if (str.length == 0) return "";   
  s = str.replace(/&amp;/g, "&");   
  s = s.replace(/&lt;/g, "<");   
  s = s.replace(/&gt;/g, ">");   
  s = s.replace(/&nbsp;/g, " ");   
  s = s.replace(/&#39;/g, "\'");   
  s = s.replace(/&quot;/g, "\"");   
  s = s.replace(/<br>/g, "\n");   
  return s;   
}

/*修复IE6~IE8 不支持trim*/
// Function.prototype.method = function(name, func) {
// 	this.prototype[name] = func;
// 	return this;
// };

// //判断下浏览器是否自带有trim()方法
// if(!String.prototype.trim){
// 	/*
// 	 * 去掉字符串前后的空格
// 	 */
// 	String.method('trim', function() {
// 		return this.replace(/^\s+|\s+$/g, '');
// 	});
// 	/*
// 	 * 去掉字符串左边的空格
// 	 */
// 	String.method('ltrim', function() {
// 		return this.replace(/^\s+/g, '');
// 	});
// 	/*
// 	 * 去掉字符串右边的空格
// 	 */
// 	String.method('rtrim', function() {
// 		return this.replace(/\s+$/g, '');
// 	});
// }

/*
* 修复IE8下BUG
* Array 对象不支持“indexOf”属性或方法
*/
if(!Array.prototype.indexOf){
  Array.prototype.indexOf = function(elt /*, from*/){
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;
    for (; from < len; from++){
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

/*字符串格式化 String.prototype.format
* 两种调用方式
* var template1="我是{0}，今年{1}了";
* var template2="我是{name}，今年{age}了";
* var result1=template1.format("loogn",22);
* var result2=template2.format({name:"loogn",age:22});
*/
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                	var reg= new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

/*过滤获取下拉表单的值*/
var getValue = function(obj){
	if(obj != undefined && obj != ""){
		return obj.value;
	}else{
		return "";
	}
};

/*设置下拉框初始值*/
var setInitObj = function(arr, key){
	var obj = {};
	angular.forEach(arr, function(item){
    	if(item["value"] == key){
    		obj = item;
    		return;
    	}
    });
    return obj;
};

/*过滤获取下拉框选中项*/
var getTitle = function(obj){
	if(obj != undefined && obj != ""){
		return obj.title;
	}else{
		return "";
	}
};

/*获取角色类型*/
var getRoleType = function(obj){
	if(obj != undefined && obj != ""){
		return obj.roleType;
	}else{
		return "";
	}
};

/*获取配置项的值*/
var getConfigValue = function(arr, key){
	var rtValue;
	angular.forEach(arr, function(item){
    	if(item["configName"] == key){
    		rtValue = item["configValue"];
    		return;
    	}
    });
    return rtValue;
};

/*
* string类型日期转换指定格式
* str: "2016-01-01"
* fmt: "yyyy-MM-dd"
*/
var changeStr2Date = function(str, fmt){
	return (new Date(str.replace("-", "/").replace("-", "/"))).format(fmt);
};

/*页面切换Loading效果*/
var loadingDiv = {
	show: function(){
		var loadingObj = document.getElementById('loadingDiv');
		if (loadingObj != null) {   
		    loadingObj.style.display = "block";
		}
	},
	hide: function(){
		var loadingObj = document.getElementById('loadingDiv');
		if (loadingObj != null) {   
		    loadingObj.style.display = "none";
		}
	}
};

/*年份列表,下拉选择框使用*/
var yearsList = [
        {'title': '2014年', 'value': '2014'},
        {'title': '2015年', 'value': '2015'}, 
        {'title': '2016年', 'value': '2016'},
        {'title': '2017年', 'value': '2017'}, 
        {'title': '2018年', 'value': '2018'},
        {'title': '2019年', 'value': '2019'}, 
        {'title': '2020年', 'value': '2020'}
    ];

/*月份列表,下拉选择框使用*/
var monthList = [
        {'title': '一月', 'value': '1'},
        {'title': '二月', 'value': '2'}, 
        {'title': '三月', 'value': '3'},
        {'title': '四月', 'value': '4'}, 
        {'title': '五月', 'value': '5'},
        {'title': '六月', 'value': '6'}, 
        {'title': '七月', 'value': '7'}, 
        {'title': '八月', 'value': '8'}, 
        {'title': '九月', 'value': '9'}, 
        {'title': '十月', 'value': '10'}, 
        {'title': '十一月', 'value': '11'},
        {'title': '十二月', 'value': '12'}
    ]; 

/*日志类型,下拉选择框使用*/
var logTypes = [
	{'title': '全部日志', 'value': ''},
	{'title': '登录操作', 'value': '1'},
	{'title': '登出操作', 'value': '2'},
	{'title': '其他操作', 'value': '3'}
];