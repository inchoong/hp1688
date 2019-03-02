/**
 * @author James
 * @date 2012-05-04
 * @update 2012-05-10
 * @email phperweb@gmail.com
 * @version 1.1 beta
 */
(function(window) {
	var jExt = $ = window.jExt = window.$ = window.Fn = function(selector, context) {
		return new jExt.fn.init(selector, context);
	};

	var regHTML = /<[^>]+>/g;
	var quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
	var doc = window.document;
	var loc = window.location;
	var nav = window.navigator;

	jExt.fn = jExt.prototype = {
		_version : "1.1",
		init : function(selector, context) {

			if (!selector) {
				return this;
			}

			selector = selector || doc;
			if (selector.nodeType) {
				this[0] = this.elem = selector;
				this.length = 1;
				this.context = selector;
				return this;
			}

			if (selector == "body" && !context && document.body) {
				this.context = document;
				this[0] = document.body;
				this.selector = selector;
				this.length = 1;
				return this;
			}

			if ( typeof selector == "string") {
				var match = quickExpr.exec(selector);
				selector = match[2];
				var _re = jExt(this._obj(selector) || []);
				_re.context = document;
				_re.selector = selector;
				return _re;
			}
		},
		//��ȡ����
		_obj : function(_id) {
			var _obj = document.getElementById(_id);
			if (_obj) {
				if (_id != _obj.id) {
					//�����������ID�����ڻ�ȡ֮���ID ��������document
					if (document.all) {
						for (var i = 0; i < document.all.length; i++) {
							if (document.all[i].id == _id) {
								_obj = document.all[i];
								break;
							}
						}
						return _obj;
					}
				}
			}
			return _obj;
		},
		size : function() {
			return this.elem.length;
		},
		toArray : function() {
			return slice.call(this.elem, 0);
		},
		val : function(_val) {
			if (jExt.type(_val) == "undefined") {
				return this.elem.value;
			} else {
				this.elem.value = _val;
			}
		},
		html : function(_val) {
			if (jExt.type(_val) == "undefined") {
				return this.elem.innerHTML;
			} else {
				this.elem.innerHTML = _val;
			}
		},
		insertHtml : function(_htm) {
			var type = arguments[1] || 'beforeEnd';
			this.elem.insertAdjacentHTML(type, _htm);
		},
		removeChild : function(_e) {
			this.elem.removeChild(eval(_e));
		},
		text : function(_val) {
			if (jExt.type(_val) == "undefined") {
				return this.elem.innerText;
			} else {
				this.elem.innerText = _value;
			}
		},
		txt : function(_val) {
			this.text(_val);
		},
		empty : function() {
			return this.elem.innerHTML ? this.elem.innerHTML = "" : this.elem.value = "";
		},
		leftpad : function(len, str) {
			if (!str) {
				str = '0';
			}

			var s = '';
			for (var i = 0; i < len - this.elem.length; i++) {
				s += str;
			}
			return s + this;

		},
		show : function(_val) {
			/**
			 * fade ���뵭��Ч��
			 */
			var _display = this.elem.style.display;
			if (_display != "none") {
				return;
			}
			if (jExt.type(_val) == "undefined") {
				this.elem.style.display = "";
			} else {
				switch(_val) {
					case "fade":
						jExt.effect.fadeIn(this.elem);
						break;
				}
			}
		},
		hide : function(_val) {
			/**
			 * fade ���뵭��Ч��
			 */
			var _display = this.elem.style.display;
			if (_display == "none") {
				return;
			}
			if (jExt.type(_val) == "undefined") {
				this.elem.style.display = "none";
			} else {
				switch(_val) {
					case "fade":
						jExt.effect.fadeOut(this.elem, 40);
						break;
				}
			}
		},
		css : function(_style, _value) {
			if (!jExt.isObject(_style)) {
				if (jExt.type(_value) == "undefined") {
					return this.elem.style[_style];
				} else {
					this.elem.style[_style] = _value;
				}
			} else {
				var _s;
				for (_s in _style) {
					this.elem.style[_s] = _style[_s];
				}
			}
		},
		attr : function(_key, _val) {
			if (jExt.type(_val) == "undefined") {
				return this.elem[_key];
			} else {
				this.elem[_key] = _val;
			}
		},
		bind : function(_method, _fun) {
			//�Լ��󶨿ؼ����¼�
			if (jExt.type(this.elem) == "undefined")
				return false;
			if (!jExt.isFunction(_fun))
				_fun = function() {
				};
			try {
				//�쳣����
				addEvent(this.elem, _method, _fun);
			} catch(err) {
			}
		},
		unbind : function(_method, _fun) {
			if (jExt.type(this.elem) == "undefined")
				return false;
			if (!_fun)
				_fun = function() {
				};
			removeEvent(this.elem, _method, _fun);
		},
		click : function(_fun) {
			//����¼�
			if (jExt.type(this.elem) == "undefined")
				return false;
			if (!jExt.isFunction(_fun))
				_fun = function() {
				};
			addEvent(this.elem, "click", _fun);
		},
		blur : function(_fun) {
			//ʧȥ�����¼�
			if (jExt.type(this.elem) == "undefined")
				return false;
			if (!jExt.isFunction(_fun))
				_fun = function() {
				};
			addEvent(this.elem, "blur", _fun);
		},
		focus : function(_fun) {
			//��ȡ�����¼�
			if (jExt.type(this.elem) == "undefined")
				return false;
			if (!jExt.isFunction(_fun))
				_fun = function() {
				};
			addEvent(this.elem, "focus", _fun);
		},
		keyup : function(_fun) {
			if (jExt.type(this.elem) == "undefined")
				return false;
			if (!jExt.isFunction(_fun))
				_fun = function() {
				};
			addEvent(this.elem, "keyup", _fun);
		},
		addClass : function(_class) {
			jExt.style.addClass(this.elem, _class);
		},
		removeClass : function(_class) {
			jExt.style.removeClass(this.elem, _class);
		},
		hasClass : function(_class) {
			return jExt.style.hasClass(this.elem, _class);
		},
		addOption : function(_text, _val) {
			return jExt.select.AddItemToSelect(this.elem, _text, _val);
		},
		updateOption : function(_text, _val) {
			return jExt.select.UpdateItemToSelect(this.elem, _text, _val);
		},
		removeOption : function(_val) {
			return jExt.select.RemoveItemFromSelect(this.elem, _val);
		},
		selectOption : function(_text) {
			return jExt.select.SelectItemByValue(this.elem, _text);
		},
		emptyOption : function() {
			return jExt.select.EmptyItemByValue(this.elem);
		},
		optionText : function() {
			return jExt.select.GetSelectText(this.elem);
		},
		optionIndex : function() {
			return jExt.select.GetSelectIndex(this.elem);
		},
		append : function(_content) {
			this.elem.innerHTML += _content;
		}
	};
	//��չ����
	jExt.extend = jExt.fn.extend = function(destination, source) {
		if (!source) {
			source = destination;
			destination = this;
		};

		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	};

	//String�ַ�������
	jExt.extend({
		strpos : function(_string, _find) {
			if (_string.indexOf(_find) > -1) {
				return true;
			}
			return false;
		},
		strcn : function(_string) {
			if (/.*[\u4e00-\u9fa5]+.*$/.test(_string)) {
				return false;
			}
			return true;
		}
	});

	//Array�������
	jExt.extend({
		in_array : function(_val, _arr) {
			var key = '', strict = !!argStrict;

			if (strict) {
				for (key in haystack) {
					if (haystack[key] === needle) {
						return true;
					}
				}
			} else {
				for (key in haystack) {
					if (haystack[key] == needle) {
						return true;
					}
				}
			}
			return false;
		},
		empty : function(_arr) {
			if (_arr == null || _arr == '' || _arr.length == 0) {
				return true;
			}
			return false;
		}
	});

	//SELECT����Ĳ���
	jExt.select = {
		//�ж�Item�Ƿ����
		SelectIsExitItem : function(_obj, _val) {
			var isExit = false;
			for (var i = 0; i < _obj.options.length; i++) {
				if (_obj.options[i].value == _val) {
					isExit = true;
					break;
				}
			}
			return isExit;
		},
		//���Option�е�Item
		AddItemToSelect : function(_obj, _text, _val) {
			//�ж��Ƿ����
			if (jExt.select.SelectIsExitItem(_obj, _val)) {
				return false;
			} else {
				var varItem = new Option(_text, _val);
				_obj.options.add(varItem);
				return true;
			}
		},
		//ɾ��Option�е�Item
		RemoveItemFromSelect : function(_obj, _val) {
			//�ж��Ƿ����
			if (jExt.select.SelectIsExitItem(_obj, _val)) {
				for (var i = 0; i < _obj.options.length; i++) {
					if (_obj.options[i].value == _val) {
						_obj.options.remove(i);
						return true;
						break;
					}
				}
			} else {
				return false;
			}
		},
		//����Option�е�Item
		UpdateItemToSelect : function(_obj, _text, _val) {
			//�ж��Ƿ����
			if (jExt.select.SelectIsExitItem(_obj, _val)) {
				for (var i = 0; i < _obj.options.length; i++) {
					if (_obj.options[i].value == _val) {
						_obj.options[i].text = _text;
						return true;
						break;
					}
				}
			} else {
				return false;
			}
		},
		//ѡ��Option�е�Item �����ı�
		SelectItemByValue : function(_obj, _text) {
			//�ж��Ƿ����
			var isExit = false;
			for (var i = 0; i < _obj.options.length; i++) {
				if (_obj.options[i].text == _text) {
					_obj.options[i].selected = true;
					isExit = true;
					break;
				}
			}
			//Show�����
			if (isExit) {
				return true;
			} else {
				return false;
			}
		},
		GetSelectText : function(_obj) {
			var _text = _obj.options[_obj.selectedIndex].text;
			return _text;
		},
		GetSelectIndex : function(_obj) {
			var _index = _obj.selectedIndex;
			return _index;
		},
		SelectVal : function(_obj, _val) {
			if (jExt.type(_val) != "undefied") {
				_obj.value = _val;
			} else {
				var _value = _obj.value;
				return _value;
			}
		},
		EmptyItemByValue : function(_obj) {
			_obj.options.length = 0;
			return true;
		}
	};

	//������ʾ��Ч
	jExt.effect = {
		SetOpacity : function(ev, v) {
			ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
		},
		fadeIn : function(elem, speed, opacity) {
			/*
			 * ����˵��
			 * elem==>��Ҫ�����Ԫ��
			 * speed==>�����ٶ�,������(��ѡ)
			 * opacity==>���뵽ָ����͸����,0~100(��ѡ)
			 */
			speed = speed || 20;
			opacity = opacity || 100;
			//��ʾԪ��,����Ԫ��ֵΪ0͸����(���ɼ�)
			elem.style.display = 'block';
			jExt.effect.SetOpacity(elem, 0);
			//��ʼ��͸���ȱ仯ֵΪ0
			var val = 0;
			//ѭ����͸��ֵ��5����,������Ч��
			(function() {
				jExt.effect.SetOpacity(elem, val);
				val += 5;
				if (val <= opacity) {
					setTimeout(arguments.callee, speed)
				}
			})();
		},
		fadeOut : function(elem, speed, opacity) {
			/*
			 * ����˵��
			 * elem==>��Ҫ�����Ԫ��
			 * speed==>�����ٶ�,������(��ѡ)
			 * opacity==>���뵽ָ����͸����,0~100(��ѡ)
			 */
			speed = speed || 20;
			opacity = opacity || 0;
			//��ʼ��͸���ȱ仯ֵΪ0
			var val = 100;
			//ѭ����͸��ֵ��5�ݼ�,������Ч��
			(function() {
				jExt.effect.SetOpacity(elem, val);
				val -= 5;
				if (val >= opacity) {
					setTimeout(arguments.callee, speed);
				} else if (val < 0) {
					//Ԫ��͸����Ϊ0������Ԫ��
					elem.style.display = 'none';
				}
			})();
		}
	};
	//��ʽ����
	jExt.style = {
		_className : null,
		_elem : null,
		init : function() {
			//��ȡ�����className
			if (this._elem == null)
				return false;
			this._className = this._elem.className;
		},
		addClass : function(_elems, _class) {
			this._elem = _elems;
			this.init();
			//��ʼ��û����ʽ
			if (this._className == "") {
				this._elem["className"] = _class;
			} else {
				var classNames = _class.split( new RegExp(/\s+/) ),
					setClass = " " + this._className + " ";
				for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
					if ( setClass.indexOf( " " + classNames[ c ] + " " ) == -1) {
						setClass += classNames[ c ] + " ";
					}
				}
				this._elem["className"] = jExt.trim(setClass);
			}
		},
		removeClass : function(_elems, _class) {
			this._elem = _elems;
			this.init();
			if (jExt.type(_class) == "undefined")
				this._elem["className"] = "";
			if (this._className == "" || this._className.length == 0)
				return;
			if (this._className == _class) {
				this._elem['className'] = "";
				return
			};
			if (this._className.match(new RegExp("(^|\\s)" + _class + "(\\s|$)"))){
				this._elem["className"] = this._className.replace((new RegExp("(^|\\s)" + _class + "(\\s|$)")), " ");
				this._elem["className"] = jExt.trim(this._elem["className"]);
			}
			return;
		},
		hasClass : function(_elems, _class) {
			this._elem = _elems;
			this.init();
			if (jExt.type(_class) == "undefined")
				return false;
			//�ж��Ƿ�ؼ�����ʽ
			if (this._elem['className'].length == 0 || this._className == "")
				return false;
			//�ж���ʽ
			if (this._className == _class || this._className.match(new RegExp("(^|\\s)" + _class + "(\\s|$)")))
				return true;
			return false;
		}
	};

	//�򵥻�ajax
	jExt.extend({
		post : function(_url, _data, _callback) {
			this.xmlhttprequest.post(_url, _data, _callback);
		},
		get : function(_url, _data, _callback) {
			this.xmlhttprequest.get(_url, _data, _callback);
		},
		ajax : function(_obj) {
			this.xmlhttprequest.ajax(_obj);
		}
	});
	//��ȡ���������������ж���չ
	jExt.extend({
		type : function(_elem) {
			return typeof _elem;
		},
		isFunction : function(_elem) {
			var _type = this.type(_elem);
			return _type == "function" ? 1 : 0;
		},
		isObject : function(_elem) {
			var _type = this.type(_elem);
			return _type == "object" ? 1 : 0;
		},
		isString : function(_elem) {
			var _type = this.type(_elem);
			return _type == "string" ? 1 : 0;
		},
		isNumber : function(_elem) {
			var _type = this.type(_elem);
			return _type == "number" ? 1 : 0;
		},
		isArray : function(_elem) {
			var _type = this.type(_elem);
			return _type == "array" ? 1 : 0;
		},
		isJson : function(_elem) {
			try {
				var temp = eval('(' + _elem + ')');
				var _type = this.type(temp);
				return _type == "object" ? 1 : 0;
			} catch(e) {
				return 0;
			}
		},
		isUndefined : function(_elem) {
			var _type = this.type(_elem);
			return _type == "undefined" ? 1 : 0;
		}
	});

	//�ַ����������
	jExt.extend({
		trim : function(_str) {
			return _str.replace(/(^\s*)|(\s*$)/g, "");
		},
		replaceAll : function(str, sptr, sptr1) {
			while (str.indexOf(sptr) >= 0) {
				str = str.replace(sptr, sptr1);
			}
			return str;
		}
	});

	ua = nav.userAgent.toLowerCase();

	browserRegExp = {
		ie : /msie[ ]([\w.]+)/,
		firefox : /firefox[ |\/]([\w.]+)/,
		chrome : /chrome[ |\/]([\w.]+)/,
		safari : /version[ |\/]([\w.]+)[\s](.*)safari/,
		opera : /opera[ |\/]([\w.]+)/
	};
	jExt.browser = {
		msie : null,
		firefox : null,
		chrome : null,
		safari : null,
		opera : null,
		version : 0
	}
	for (var i in browserRegExp) {
		var match = browserRegExp[i].exec(ua);
		if (match) {
			jExt.browser.msie = (i == "ie" ? 1 : -1);
			jExt.browser.firefox = (i == "firefox" ? 1 : -1);
			jExt.browser.chrome = (i == "chrome" ? 1 : -1);
			jExt.browser.safari = (i == "safari" ? 1 : -1);
			jExt.browser.opera = (i == "opera" ? 1 : -1);
			jExt.browser.version = match[1];
			break;
		}
	}

	//array������
	jExt.extend({
		in_array : function(_arr, _val) {
			for ( i = 0; i < _arr.length; i++) {
				if (_arr[i] == _val)
					return true;
			}
			return false;
		}
	});

	jExt.extend({
		loadJs : function(_url, _callback) {
			var callback = arguments[1] ||
			function() {
			};
			var _script = jExt.loadElem("SCRIPT");
			_script.setAttribute("type", "text/javascript");
			_script.setAttribute("src", _url);
			document.getElementsByTagName("head")[0].appendChild(_script);
			if (document.all) {
				_script.onreadystatechange = function() {
					if (/onload|loaded|complete/.test(_script.readyState)) {
						callback && callback();
					}
				};
			} else {
				_script.onload = function() {
					callback();
				};
			}
		},
		loadElem : function(_tag) {
			return document.createElement(_tag);
		},
		loadHref : function(_url, _open) {
			if (jExt.type(_open) == "undefined")
				window.location.href = _url;
			else
				window.open(_url);
		},
		_get : function(key) {
			var query = location.search;
			var reg = new RegExp(key + "=(.*?)(#|&|$)");
			var arr = query.match(reg);
			return (arr != null) ? arr[1] : ""
		}
	});

	//ajax
	jExt.xmlhttprequest = {
		xmlhttp : new Array(),
		init : function() {
			if ( typeof (XMLHttpRequest ) != "undefined") {
				this.xmlhttp.push(new XMLHttpRequest());
			} else {
				try {
					this.xmlhttp.push(new ActiveXObject("Msxml2.XMLHTTP"));
				} catch(e) {
					try {
						this.xmlhttp.push(new ActiveXObject("Microsoft.XMLHTTP"));
					} catch(e) {
					}
				}
			}
		},
		post : function(_url, _data, _callback) {
			this.init();
			var method = "POST";
			var async = arguments[3] || true;
			this.startrequest(_url, _callback, method, _data, async);
		},
		get : function(_url, _data, _callback) {
			this.init();
			var method = "GET";
			var async = arguments[3] || true;
			this.startrequest(_url, _callback, method, _data, async);
		},
		ajax : function(_obj) {
			this.init();
			var method = jExt.isUndefined(_obj.type) ? "GET" : _obj.type;
			var _url = _obj.url;
			var _callback = jExt.isFunction(_obj.success) ? _obj.success : function() {
			};
			var _data = jExt.isFunction(_obj.data) ? null : _obj.data;
			var async = jExt.isUndefined(_obj.async) ? "true" : _obj.async;
			this.startrequest(_url, _callback, method, _data, async);

		},
		startrequest : function(url, callback, method, arg) {
			if (method == null) {
				method = 'GET';
			}
			//ͬ��ģʽ
			var async = arguments[4] || true;
			var xmlnum = this.xmlhttp.length - 1;
			method = method.toLowerCase();
			if (method == "get" && (arg != "" && typeof arg != "undefined") && arg != null) {
				url += "?" + arg;
				arg = "";
			}
			url = encodeURI(encodeURI(url));
			this.xmlhttp[xmlnum].open(method, url, async);
			this.xmlhttp[xmlnum].setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
			this.xmlhttp[xmlnum].setRequestHeader("X-Requested-With", "XMLHttpRequest");
			this.xmlhttp[xmlnum].send(arg);
			this.xmlhttp[xmlnum].onreadystatechange = function() {
				if (jExt.xmlhttprequest.xmlhttp[xmlnum].readyState == 4 && jExt.xmlhttprequest.xmlhttp[xmlnum].status == 200) {
					callback(jExt.xmlhttprequest.xmlhttp[xmlnum].responseText);
				}
			};
		}
	};

	//cookie����
	jExt.cookie = {
		set : function(_name, _val, _exp) {
			var Days = _exp || 30;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = _name + "=" + escape(_val) + ";expires=" + exp.toGMTString();
		},
		get : function(_name) {
			if (!_name)
				return;
			var arr = document.cookie.match(new RegExp("(^| )" + _name + "=([^;]*)(;|$)"));
			if (arr != null)
				return unescape(arr[2]);
			return null;
		},
		del : function(_name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = jExt.cookie.getcookie(_name);
			if (cval != null)
				document.cookie = _name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	};

	jExt.fn.init.prototype = jExt.fn;

	function addEvent(a, b, c) {

		if (!a)
			return false;

		if (!c.$$guid)
			c.$$guid = addEvent.guid++;

		if (!a || !a.events)
			a.events = {};

		var d = a.events[b];

		if (!d) {

			d = a.events[b] = {};

			if (a["on" + b]) {

				d[0] = a["on" + b];

			}

		}

		d[c.$$guid] = c;

		a["on" + b] = handleEvent;

	};

	addEvent.guid = 1;

	function removeEvent(a, b, c) {

		if (a.events && a.events[b]) {
			delete a.events[b][c.$$guid];

		}

	};

	function handleEvent(a) {

		a = a || window.event;

		var b = this.events[a.type];

		for (var i in b) {

			this.$$handleEvent = b[i];

			this.$$handleEvent(a);

		}

	};

	//ʱ���ʽ��
	Date.prototype.format = function(format) {
		var o = {
			"M+" : this.getMonth() + 1, //month
			"d+" : this.getDate(), //day
			"h+" : this.getHours(), //hour
			"m+" : this.getMinutes(), //minute
			"s+" : this.getSeconds(), //second
			"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
			"S" : this.getMilliseconds() //millisecond
		};
		if (/(y+)/.test(format))
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};

})(window);
