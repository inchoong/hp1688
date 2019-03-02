//vellen 2011-12-08 version : 1.01 全局头部加载
//update 2012-05-03 version : 1.20
function stop()
{
	if((+new Date()) < Date.UTC(2015,11,12, 16, 0, 0)) {
		document.getElementById('hide').style.display = 'block';		
	} 
	else{
		document.getElementById('hide').style.display = 'none';
	} 
}
var pageName='';

var xTop = {
	link : {}, menu : {}, css : '', pageType : '', param : {}, timer : {}, cate : {}, html: '',
	init : function(){
		
		var re = '',css = '',menu = [],cate = [];

		if (this.param['fk']){
			if (this.param['fk']=='self'){
				//this.pageName = ;
			}else{
				this.pageName = this.param['fk'];
			}
		}
		
		var sn = 0;
		for(var i in this.link) {
			sn += 1;
			if(i == '返回首页')
			{
				// add nofollow by zhangyaoyao 2016.08.11
				re += '<a rel="nofollow" href="'+this.link[i]+'" title="'+i+'" onclick="cc(\'t_dh1\')">'+i+'</a>';
			}
			else if(i == '天气预报')
			{
				re += '<a href="'+this.link[i]+'" title="'+i+'" onclick="cc(\'t_dh1_tq\')">'+i+'</a>';
			}
			else if(i == '企业信息查询')
			{
				re += '<a href="'+this.link[i]+'" title="'+i+'" onclick="cc(\'t_dh1_qycx\')">'+i+'</a>';
			}
            else if(i == '违章查询')
            {
                re += '<a href="'+this.link[i]+'" title="'+i+'" onclick="cc(\'t_dh1_wzcx\')">'+i+'</a>';
            }
			else
			{
				re += '<a href="'+this.link[i]+'" title="'+i+'" onclick="cc(\'t_dh1\')">'+i+'</a>';
			}
			if (sn <= 4) re += '<span class="line">|</span>';
		}
		
		for(var i in this.menu) {
			css = '';
			if (i == '留言板'){
				var pgname = escape('查询');
				pageName = pgname;
				if (this.menu[i].indexOf('{$fkname}')>0){
					this.menu[i] = this.menu[i].replace('{$fkname}',pgname);
				}else{
					this.menu[i] += pgname;
				}
			}
			if (i.indexOf('主页')>=0){
				css = 't_home'
			}
			// add nofollow by zhangyaoyao 2016.08.11
			menu[menu.length] = '<i class="'+css+'"><a rel="nofollow" href="'+this.menu[i]+'" title="'+i+'">'+i+'</a></i>';
		}

		menu = menu.join('<i>|</i>');
		//added by panzp 2013/2/4 更多分类
		for (var i in this.cate) {
			cate.push('<h3><a href="' + this.cate[i].url + '">' + this.cate[i].title + '</a></h3>');
			if(typeof this.cate[parseInt(i)+1] == "undefined"){
				cate.push('<p class="last">');
			}else{
				cate.push('<p>');
			}
			var cate_s = [];
			for (var ii in this.cate[i].cate_s) {
				if(cate_s.length % 10 == 9){
					cate_s.push('<a onclick="cc(\'t_dh2\')" target="_blank" href="' + this.cate[i].cate_s[ii][0] + '"' + (this.cate[i].cate_s[ii][1]?' class="' + this.cate[i].cate_s[ii][1] + '"':'') + '>' + ii + '</a><br />');
					cate.push(cate_s.join(""));
					cate_s = [];
				}
				else if(ii == '每日运势')
				{
					cate_s.push('<a onclick="cc(\'t_dh2_mrys\')" target="_blank" href="' + this.cate[i].cate_s[ii][0] + '"' + (this.cate[i].cate_s[ii][1]?' class="' + this.cate[i].cate_s[ii][1] + '"':'') + '>' + ii + '</a><br />');
				}
				else{
					cate_s.push('<a onclick="cc(\'t_dh2\')" target="_blank" href="' + this.cate[i].cate_s[ii][0] + '"' + (this.cate[i].cate_s[ii][1]?' class="' + this.cate[i].cate_s[ii][1] + '"':'') + '>' + ii + '</a>');
				}
			};
			if(cate_s.length > 0){
				cate.push(cate_s.join(""));
				cate_s = [];
			}
			cate.push('</p>');
		};
		if(typeof cate[0] != "undefined"){
			cate = cate.join("");
			cate = '<div class="cate_more" id="xxcate" style="z-index:999;"><span><a href="javascript:void(0);" id="daohang">导航</a></span><div class="cate_detail" id="xtop_more"  style="display:none;"><div class="cate_detail_inner">'+cate+'</div><iframe></iframe></div></div>';
		}
		
		var head = [], bannercss = 'banner_s';
		
		var top = ['<div class="'+this.pageType+'"><div class="top_in clearfix"><span class="top_keyw">', re,'</span>'+cate+menu, '</div></div>'].join('');


		
		document.getElementById('xtopjsinfo').innerHTML = top;
		if( (+new Date()) > (+new Date( Date.UTC(2015,5,19, 9, 0, 0) )) && (+new Date()) < (+new Date( Date.UTC(2015,5,22, 16, 0, 0) )) ) {
			sijiaoguanggao();
		}
	},
	
	
	id : function(str){ return document.getElementById(str)},
	req : function(url){
		this.loadScript('/js/xtop.config.js',function(){
			xTop.init();
		});
	},
	
	loadScript : function(src, callback){
		var sc = document.createElement('script');
		sc.type = 'text/javascript'
		sc.src = src; 
		document.getElementsByTagName('head')[0].appendChild(sc);
		if (sc.attachEvent){
				sc.attachEvent("onreadystatechange",
				function() {
					if (sc.readyState == 'complete' || sc.readyState == 'loaded'){
						sc.detachEvent("onreadystatechange", arguments.callee);
						if (callback) callback(); //
					}
				});
		}else{
			sc.onload = function(){ if (callback) callback(); }
		}
	},
	
	
	showCate : function(obj){
		var div = document.getElementById("xtop_more");
		if(div.style.display != "block"){
			div.style.display = "block";
			obj.className = "cate_more cate_show";
		}else{
			div.style.display = "none";
			obj.className = "cate_more";
		}
	},
	
  	
  	startmarquee : function(lh, speed, delay, box) {
		var t;
		var p = false;
		var o = document.getElementById(box);
		o.innerHTML += o.innerHTML;
		o.onmouseover = function() {
			p = true;
		}
		o.onmouseout = function() {
			p = false;
		}
		o.scrollTop = 0;
		function start() {
			t = setInterval(scrolling, speed);
			if (!p) {
				o.scrollTop += 1;
			}
		}
		function scrolling() {
			if (o.scrollTop % lh != 0) {
				o.scrollTop += 1;
				if (o.scrollTop >= o.scrollHeight / 2) {
					o.scrollTop = 0
				};
			} else {
				clearInterval(t);
				setTimeout(start, delay);
			}
		}
		setTimeout(start, delay);
	}
}


document.body.onclick=function(e)
{
	var event = window.event || e;
	
	var src = event.srcElement || event.target; 
	var div = document.getElementById("xtop_more");	
	if (src.id == 'daohang') {
		div.style.display = "block";
		document.getElementById('xxcate').className = 'cate_more cate_show';
	}
	else
	{
		div.style.display = "none";
		document.getElementById('xxcate').className = "cate_more";
	}
}

function addFavorite() {
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }
    else if (ua.indexOf("msie 8") > -1) {
        try
        {
			window.external.AddToFavoritesBar(url, title); //IE8
        }
        catch (e)
        {
			alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    }
    else if (window.external && "addFavorite" in window.external) {
	    try
        {
			window.external.addFavorite(url, title);
		}
        catch (e)
        {
			alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }		
    }
    else if (window.sidebar && "addPanel" in window.sidebar) {
	    try
        {
			window.sidebar.addPanel(title, url, "");
		}
        catch (e)
        {
			alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }		        
    }
    else {
		alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}

function xSetHome(obj, vrl) {
    var notSetHomePage1 = new RegExp("Maxthon");
    var notSetHomePage2 = new RegExp("TheWorld");
    var notSetHomePage3 = new RegExp("TencentTraveler");
    var notSetHomePage4 = new RegExp("MetaSr");
    var is360 = false;
    try {
        if (window.external && window.external.twGetRunPath) {
            var r = external.twGetRunPath();
            if (r && r.toLowerCase().indexOf("360") > -1) {
                is360 = true;
            }
        }
    } catch(e) {
        is360 = false;
    }

    var nVersion = navigator.appVersion;
    if (navigator.userAgent.indexOf('MSIE') >= 0 && !notSetHomePage1.test(nVersion) && !notSetHomePage2.test(nVersion) && !notSetHomePage3.test(nVersion) && !notSetHomePage4.test(nVersion) && !is360) {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(vrl);
    } else {
        window.open("http://www.2345.com/help/szsy.htm");
    }
	return false;
}
document.write('<div id="xtopjsinfo"></div>');
document.write('<script src="/js/jExt.1.0.js"></script>');

xTop.req();


function clickTongji(_id){
	$.loadJs("/api/click.php?id="+_id);
}


function downDS()
{
  var exdate=new Date()
  exdate.setTime(exdate.getTime()+86400*365*1000)
  cookieVal="sti=" +escape('Y')+(";expires="+exdate.toGMTString());
  document.cookie=cookieVal;	
}
/*
function hidedeskem()
{
	if(GetCookie('sti') == '')
	{	
		document.cookie = "sti="+ escape ('Y') + ";expires=";
	}
	$('#sdeskem').hide();
}
setTimeout(hidedeskem,10000);
*/
function GetCookie(name){
  if (document.cookie.length>0)
    {
    c_start=document.cookie.indexOf(name + "=")
    if (c_start!=-1)
      { 
      c_start=c_start + name.length+1 
      c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
      } 
    }
  return null;
}
var T = {};
T.browser = function(win){
  var doc = win.document,
    ua = navigator.userAgent.toLowerCase(),
    getEnv = function(name) {
      return (name = ua.match(RegExp(name + '\\b[ \\/]?([\\w\\.]*)', 'i'))) ? name.slice(1) : ['', ''] //浏览器名称和版本号
    },
    addSearchProviderEnabled = function (){ return !!(window.external && typeof window.external.AddSearchProvider != 'undefined' && typeof window.external.IsSearchProviderInstalled != 'undefined'); }, //判断不一定准确 http://xliar.com/thread-138-1-1.html
    detect360chrome = function (){return 'track' in document.createElement('track')　&& 'scoped' in document.createElement('style');},
    is360se =  false,
    is2345 = function (){
       var ret =  false;
       try{
        if (win.external.RCCoralGetItem() === false) {
           ret =  true;
        }
      }
      catch(e){ ret = false;}
      return ret;
    }(),
    getMaxthonVer;
    try { //maxthon
      if (/(\d+\.\d)/.test(win.external.max_version)) {
          getMaxthonVer = parseFloat(RegExp.$1);
      }
    } catch(e) {}

    if (!is2345 && !addSearchProviderEnabled() ) {
      try{
        if (String(window.external)) { is360se = true;}
      }
      catch(e){}
    }
    var getTypes = getEnv('(msie|safari|firefox|chrome|opera)'),getShell;
    getTypes[0]  === 'msie' ? is2345 ? getShell = ['2345Explorer', ''] : is360se ? getShell = ['360se', ''] : getMaxthonVer ? getShell = ['maxthon', getMaxthonVer] : getShell ==','  && (getShell = getEnv('(tencenttraveler)')) : getTypes[0] === 'safari' && (getTypes[1] = getEnv('version') + '.' + getTypes[1]);
    getShell = getEnv('(maxthon|360se|360chrome|theworld|se|greenbrowser|qqbrowser|lbbrowser|2345Explorer)');

    if (getTypes[0] === 'chrome') { //360chrome
      if (detect360chrome()) {
         getShell =  'v8Locale' in window ? ['360se',''] : ['360chrome',''];
      }
    }
    try{
       if (!getShell[0] && (""+window.external) == "undefined") {
        getShell = ['msie', ''];
      }
    }
    catch(e){ }

    if (is2345) {
         getShell = ['2345Explorer', ''];
    }
    return {
      isShell: !!getShell[0],
      shell: getShell,
      types: getTypes,
      chrome: getTypes[0] === 'chrome' && getTypes[1],
      firefox: getTypes[0] === 'firefox'  && getTypes[1],
      ie: getTypes[0] === 'msie' && getTypes[1],
      opera: getTypes[0] === 'opera' && getTypes[1],
      safari: getTypes[0] === 'safari' && getTypes[1],
      maxthon: getShell[0] === 'maxthon' && getShell[1],
      isTT: getShell[0] === 'tencenttraveler' && getShell[1]
    }
}(window);

T.setHomePage = function(obj,vrl){
 var  browser = T.browser,
   map = {
    '360se':'http://www.2345.com/help/r360.htm',
    'se':'http://www.2345.com/help/rsg.htm',
    'chrome':'http://www.2345.com/help/rgg.htm',
    '2345explorer':'http://www.2345.com/help/r2345.htm',
    'theworld':'http://www.2345.com/help/rsj.htm',
    'firefox':'http://www.2345.com/help/rff.htm',
    'maxthon':'http://www.2345.com/help/ray.htm',
    '360chrome':'http://www.2345.com/help/r360js.htm',
    'lbbrowser':'http://www.2345.com/help/rlb.htm',
    'qqbrowser':'http://www.2345.com/help/rqq.htm',
    'tencenttraveler':'http://www.2345.com/help/rtt.htm',
    'opera':'http://www.2345.com/help/rop.htm',
    'safari':'http://www.2345.com/help/rsa.htm',
    'msie':'http://www.2345.com/help/rie.htm'
  },
  go = function (name){
     name = name || 'msie';
     window.open(map[name]);
  };
  if (!browser.isShell) {
    if (browser.ie) {
         obj.style.behavior = 'url(#default#homepage)';
         obj.setHomePage(vrl);
    }else{
       go(browser.types[0]);
    }
  }else{
     go(browser.shell[0]);
  }
};

function sijiaoguanggao(){
	var css = ".corner_hov{display:inline-block;width:100px;height:100px;position:absolute;top:30px;right:0;z-index:500}.corner_hov .cor_bg{display:inline-block;position:absolute;top:0;right:0;width:100px;height:100px;z-index:500;background:url('/images/corner.png') no-repeat;}.corner a,.corner_hov a{display:block;cursor:pointer;width:100px;height:100px}",
		head = document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		style.type = 'text/css';
		if(style.styleSheet){
			style.styleSheet.cssText = css;
		}else{
			style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	var cornerHtml = document.createElement('div');
	cornerHtml.id = 'corner_div';
    cornerHtml.innerHTML = '<div class="corner_hov" id="corner_a"><a target="_blank" href="http://wan.2345.com/zt/platform/duanwu?frm=ny-sj&referer=ny"><span class="cor_bg" id="J_cor_bg"></span></a></div>';
	document.getElementById("xtopjsinfo").appendChild(cornerHtml);
}

var comDate = new Date();
var comWeek =  ['日','一','二','三','四','五','六'];
