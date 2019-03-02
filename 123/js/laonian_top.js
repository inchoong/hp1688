function set_display_block(id){
	document.getElementById(id).style.display = 'block';
	//document.getElementById('qhbanben').className = '';
}

function set_display_none(id){
	document.getElementById(id).style.display = 'none';
	//document.getElementById('qhbanben').className = 'ahov';
}
//修改页面背景
function change_css(filename){
	document.getElementById('css').href = filename;
	addCookie('laonian_CSS',filename);
}

//设置页面背景
function setCss(){
	var cookieValue = getCookie('laonian_CSS');
	if(cookieValue != ''){
		if(cookieValue == 'css/wea_laonian.css'){
			return;
		}else{
			return;
			change_css(cookieValue);
		}
	}
}
//设置登录邮箱是否显示。
function set_display(id){
	var o_id = document.getElementById(id);
	if(o_id.style.display == 'none'){
		o_id.style.display = 'block';
		return;
	}else if(o_id.style.display == 'block'){
		o_id.style.display = 'none';
	}
}
//登录邮箱是否显示，特殊情况显示。
//document.onclick = function(event){
//	var	o_id = document.getElementById('login_email');
//		event = window.event||event;
//		if(navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
//			if(event.target.id !='login_email' && event.target.id != 'login_a' && event.target.id != 'email' && event.target.id != 'login_em' && event.target.id != 'passport' && event.target.id != 'option' && event.target.id != 'form_pw' && event.target.id != 'subm'){
//				o_id.style.display = 'none';
//				return;
//			}
//
//		}else{
//			if(event.srcElement.id !='login_email' && event.srcElement.id != 'login_a' && event.srcElement.id != 'email' && event.srcElement.id != 'login_em' && event.srcElement.id != 'uName2' && event.srcElement.id != 'option' && event.srcElement.id != 'uPw2' && event.srcElement.id != 'subm'){
//				o_id.style.display = 'none';
//				return;
//			}
//		}
//
//	}

//读取cookie
function getCookie(cookie_name)
{
	var allcookies = document.cookie;
	var cookie_pos = allcookies.indexOf(cookie_name);
	// 如果找到了索引，就代表cookie存在，
	// 反之，就说明不存在。
	if (cookie_pos != -1){
		// 把cookie_pos放在值的开始，只要给值加1即可。
		cookie_pos += cookie_name.length + 1;
		var cookie_end = allcookies.indexOf(";", cookie_pos);
		if (cookie_end == -1){
			cookie_end = allcookies.length;
		}
		var value = unescape(allcookies.substring(cookie_pos, cookie_end));
	}
	return value;
}

//添加cookie
function addCookie(name,value){
	var expires = 365;
	var path = '/';
	var domain = '2345.com';
 	var str=name+"="+escape(value);
	if(expires!=""){
		var date=new Date();
		date.setTime(date.getTime()+expires*24*3600*1000);//expires单位为天
		str+=";expires="+date.toGMTString();
	}
	if(path!=""){
		str+=";path="+path;//指定可访问cookie的目录
	}
	if(domain!=""){
		str+=";domain="+domain;//指定可访问cookie的域
	}
	document.cookie=str;
}

//删除cookie
function delCookie(cookieName){
	var date=new Date();
	date.setTime(date.getTime-1000*3600*24*365);
	document.cookie = cookieName+'='+escape(cookieValue)+';expire='+date.toGMTString()+'domain=www.2345.com;path=/;'; 
}

function SetHome(a, b) {
    var d = new RegExp("TheWorld");
    var f = new RegExp("TencentTraveler");
    var g = new RegExp("MetaSr");
    var h = false;
    try {
        if (window.external && window.external.twGetRunPath) {
            var r = external.twGetRunPath();
            if (r && r.toLowerCase().indexOf("360") > -1) {
                h = true
            }
        }
    } catch(e) {
        h = false
    }
    var i = navigator.appVersion;
    if (navigator.userAgent.indexOf('Firefox') >= 0){
    	var isIE = false;
    }else{
    	var isIE = document.execCommand("BackgroundImageCache", false, true);
    }
    if (navigator.userAgent.indexOf('MSIE') >= 0 && !d.test(i) && !f.test(i) && !g.test(i)) {
        a.style.behavior = 'url(#default#homepage)';
        a.setHomePage(b)
    }else if(isIE){//ie内核
            c = b;
            if (!b) c = window.location.href;
            a.style.behavior = "url(#default#homepage)";
            a.setHomePage(c)
    }else if (window.sidebar){//火狐
    	window.open('http://www.2345.com/help/repair.htm');
    	return;
        /*****************************************************
    	if (window.netscape){  
           
        	 try {  
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
            }catch (e) {
            	alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将 signed.applets.codebase_principal_support 的值设为true，找到该项后，双击即可。");
            	RC.showdivbox("HomePage");
            	return '';
            	
            }  
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);  
        prefs.setCharPref('browser.startup.homepage', b); 
        return '';
        */
    }else{
    	window.open('http://www.2345.com/help/repair.htm');
    	return;
    }
}

function add_fav(){
  var title = '2345老年导航';
  var url = 'http://www.2345.com/laonian.htm';
	try{
		window.external.addFavorite(url, title);
	}catch (e){
	  try{
			window.sidebar.addPanel(title, url, "");
	  }catch (e){
			alert("\u60a8\u53ef\u4ee5\u5c1d\u8bd5\u901a\u8fc7\u5feb\u6377\u952e Ctrl+D \u52a0\u5165\u5230\u6536\u85cf\u5939~");
	  }
	}
}

//检查登录邮箱
function chkMail(a){
	var b={qq:"http://mail.qq.com/",hotmail:"http://www.hotmail.com/",Gmail:"http://gmail.google.com/",qqkj:"http://qzone.qq.com/",kaixin001:"http://www.kaixin001.com/",webqq:"http://web.qq.com",alipay:"http://www.alipay.com/",moreEmail:"/mail.htm"},_id="__outMail__";
	if(!b[a]){return false}
	var c;
	if(!$(_id)){
		var d=$c("FORM");
		d.id=_id;
		d.method="GET";
		d.target="_blank";
		document.getElementById('login_email').style.display='none';
		document.body.appendChild(d);
	}
	c=$(_id);
	c.action=b[a];
	c.submit();
	clickCount("mail"+a);
	arguments[1].value="";
	var obj = $("red_"+a);
	obj.style.color = "red";
    var emailOptionColor = g_cookie("emailOptionColor",cookieStore);
    if(emailOptionColor==null){emailOptionColor='';}
    var emailOptionColorVal = emailOptionColor+obj.value+"|";
    s_cookie({store:"cookie"},"emailOptionColor",emailOptionColorVal);
}

//登录邮箱
function clickMail(){
	function clearVal(){var _hs = $("form_email").getElementsByTagName("INPUT");for(var _i = 0;_i<_hs.length;_i++){_hs[_i].type=="hidden"&&(_hs[_i].value="");}}
	function setVal(_name,_val){var _o = $("__" + _name);if(!_o){_o = $c("INPUT");_o.type = "hidden";_o.id = "__" + _name;$("form_email").appendChild(_o);}_o.name = _name;_o.value = _val;}
	function cMail(){$("uPw2").value="";document.getElementById('login_email').style.display = 'none';return true;}
	clearVal();
	var gm=$("form_email");
	var vDomain=gm.domainss;
	var vName=gm.uName;
	var vPw=gm.uPw;
	if(vDomain.value==""){alert("请选择您的邮箱...");vDomain.focus();return false}
	if(vName.value==""){alert("请填写您的用户名...");vName.focus();return false}
	if(vPw.value==""){alert("请填写您的密码...");vPw.focus();return false}
	clickCount("mail"+vDomain.value);
	switch(vDomain.value){
		case "163":
			gm.action="http://reg.163.com/CheckUser.jsp";
			setVal("url","http://entry.mail.163.com/coremail/fcg/ntesdoor2?lightweight=1&verifycookie=1&language=-1&style=15");
			setVal("username",vName.value+"@163.com");
			setVal("password",vPw.value);
			return cMail();
		case "126":
			gm.action="https://reg.163.com/logins.jsp?type=1&product=mail126&url=http://entry.mail.126.com/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26language%3D0%26style%3D-1";
			setVal("domain","126.com");
			setVal("username",vName.value+"@126.com");
			setVal("password",vPw.value);
			return cMail();
		case "sina":
			gm.action="http://mail.sina.com.cn/cgi-bin/login.cgi";
			setVal("u",vName.value);
			setVal("psw",vPw.value);
			return cMail();
		case "sinacn":
			gm.action="http://mail.sina.com.cn/cgi-bin/cnlogin.php";
			setVal("u",vName.value);
			setVal("psw",vPw.value);
			return cMail();
		case "sohu":
			gm.action="http://passport.sohu.com/login.jsp";
			setVal("url","");
			setVal("UserName",vName.value);
			setVal("Password",vPw.value);
			setVal("id",vName.value);
			setVal("username",vName.value);
			setVal("password",vPw.value);
			setVal("m",vName.value);
			setVal("passwd",vPw.value);
			setVal("mpass",vPw.value);
			setVal("loginid",vName.value+"@sohu.com");
			setVal("fl","1");
			setVal("vr","1|1");
			setVal("appid","1000");
			setVal("ru","http://login.mail.sohu.com/servlet/LoginServlet");
			setVal("eru","http://login.mail.sohu.com/login.jsp");
			setVal("ct","1173080990");
			setVal("sg","5082635c77272088ae7241ccdf7cf062");
			return cMail();
		case "yahoo":
			gm.action="https://edit.bjs.yahoo.com/config/login";
			setVal(".done","http://mail.cn.yahoo.com/inset.html?rr=529401327");
			setVal("login",vName.value);
			setVal("passwd",vPw.value);
			return cMail();
		case "yahoocn":
			gm.action="https://edit.bjs.yahoo.com/config/login";
			setVal(".done","http://mail.cn.yahoo.com/inset.html?rr=529401327");
			setVal("login",vName.value+"@yahoo.cn");
			setVal("passwd",vPw.value);
			return cMail();
		case "tom":
			gm.action="http://login.mail.tom.com/cgi/login";
			setVal("user",vName.value);
			setVal("pass",vPw.value);
			return cMail();
		case "21cn":
			gm.action="http://passport.21cn.com/maillogin.jsp";
			setVal("LoginName",vName.value);
			setVal("passwd",vPw.value);
			setVal("domainname","21cn.com");
			setVal("UserName",vName.value+"@21cn.com");
			return cMail();
		case "yeah":
			gm.action="https://reg.163.com/logins.jsp?type=1&product=mailyeah&url=http://entry.mail.yeah.net/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26style%3D-1";
			setVal("domain","yeah.net");
			setVal("username",vName.value+"@yeah.net");
			setVal("password",vPw.value);
			return cMail();
		case "baidu":
			gm.action="https://passport.baidu.com/?login";
			setVal("username",vName.value);
			setVal("password",vPw.value);
			return cMail();
		case "51":
			gm.action="http://passport.51.com/login.5p";
			setVal("passport_51_user",vName.value);
			setVal("passport_51_password",vPw.value);
			setVal("gourl","http://my.51.com");
			setVal("from_exit",1);
			setVal("passport_auto_login",0);
			setVal("passport_cookie_login",0);
			return cMail();
		case "xn":
			gm.action="http://www.renren.com/PLogin.do";
			setVal("email",vName.value);
			setVal("password",vPw.value);
			setVal("domain","renren.com");
			setVal("origURL","http://www.renren.com/SysHome.do");
			return cMail();
		case "2345":
            gm.action="http://login.2345.com/login.php";
			setVal("username",vName.value);
			setVal("password",vPw.value);
			setVal("vTime",7776000);
			setVal("cmd","login");
			setVal("forward","http://bbs.2345.com/forumdisplay.php?fid=26");
			setVal("loc","homePage");
			return cMail();
       case "sinaminiblog":
            gm.action="http://login.sina.com.cn/sso/login.php?client=ssologin.js";
	        setVal("service","miniblog");
			setVal("client","ssologin.js");
			setVal("entry","miniblog");
			setVal("encoding","utf-8");
			setVal("gateway","1");
			setVal("savestate","7");
            setVal("from","");
			setVal("useticket","1");
			setVal("username",vName.value);
			setVal("password",vPw.value);
			setVal("url","http://weibo.com");
			setVal("returntype","META");
			setVal("ssosimplelogin",1);
			return cMail();
		case "139":
            gm.action="https://mail.10086.cn/Login/Login.ashx";
			setVal("username",vName.value);
			setVal("password",vPw.value);
			setVal("clientid",'2345');
			return cMail();
	}
	document.getElementById('login_email').style.display = 'none';
}