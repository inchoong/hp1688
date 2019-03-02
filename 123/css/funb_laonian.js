document.domain='2345.com';
function g_cookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    }
  }
return ""
}
function $c(_tag){return document.createElement(_tag);}
function $(_id){return document.getElementById(_id);}
var ischrome = 0;
if(navigator.userAgent.toLowerCase().indexOf("chrome")>0){
	ischrome=1;
}
var isFF=0;
if(navigator.userAgent.toLowerCase().indexOf("firefox")>0)isFF=1;
function isIE9(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 0;
    var browerVersion = 0;
    if (Sys.ie){
		browerVersion = 'IE' + Sys.ie;
		browerVersion = browerVersion.substr(0,3);
		if(browerVersion == 'IE9'){
			return true;
		}
	}
	return false;
}
//天气预报
function showWeather(){
	var wea=g_cookie("wc");
	var dz_id=g_cookie("dz_id");
	var hf="d/";
	if(+(""+wea)>0){
		var src = " http://tianqi.2345.com/t/top_tq_js/"+wea+".js?"+(new Date).getMonth()+"_"+(new Date).getDate();
        if(ischrome || isIE9()){
			var s = $c("script");
			s.src = src;
			s.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(s);
		}
        else if(isFF){
			//alert("do hack");
			var s = $c("SCRIPT");
			s.src = src;
			s.type = "text/javascript";
			document.body.appendChild(s);
			document.body.removeChild(s);
		}else{
			$("weather").src=src;
		}
	}else{
		$("weather").src="http://tianqi.2345.com/t/detect2009v2.php";
	}
}
//天气预报回调
function weaCallBack(_data){
	var _data = _data,_arg = arguments,_wc = _arg[1],_lc = _arg[2];
    //alert(1);

	if(_arg.length>1){SetCookie("wc",_wc,2592000,"/",".2345.com");SetCookie("lc",_lc,2592000,"/",".2345.com");}

//var template = '<table height="68" width="384" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="60"><table width="100%" cellspacing="0" cellpadding="0" border="0" class="weatherl"><tbody><tr><td height="25" class="city"><a onclick="this.blur()" target="_blank" nowrap="true" href="http://tianqi.2345.com/d/city/#id#.htm" title="查看天气详情">#city#</a></td></tr><tr><td height="20" class="set"><a target="_self" href="javascript:void(0);" style="cursor: pointer;" onclick=dispalyDiv("top_weather","city_wea_set") title="更换城市">设置</a></td></tr></tbody></table></td><td class="wborder"><div class="weatherr"><a onclick="this.blur()" target="_blank" nowrap="true" title="#title#" href="http://tianqi.2345.com/d/city/#id#.htm"><div><span class="w#i1#"></span><h1>今天(周#week1#)</h1><h2 style="height: 23px;">#t1#</h2><h3>#d1#</h3></div><div><span class="w#i2#"></span><h1>明天(周#week2#)</h1><h2 style="height: 23px;">#t2#</h2><h3>#d2#</h3></div></a></div></td></tr></tbody></table>';

	var template = '<table height="68" width="384" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="60"><table width="100%" cellspacing="0" cellpadding="0" border="0" class="weatherl"><tbody><tr><td height="25" class="city"><a onclick="this.blur()" target="_blank" nowrap="true" href="http://tianqi.2345.com/'+_data.pinyin+'/#id#.htm" title="查看天气详情">#city#</a></td></tr><tr><td height="20" class="set"><a target="_self" href="javascript:void(0);" style="cursor: pointer;" onclick=dispalyDiv("top_weather","city_wea_set") title="更换城市">设置</a></td></tr></tbody></table></td><td class="wborder"><div class="weatherr"><a onclick="this.blur()" target="_blank" nowrap="true" title="#title#" href="http://tianqi.2345.com/'+_data.pinyin+'/#id#.htm"><div><h1><img src="http://tianqi.2345.com/weather_img/icon/md2/#i2#.gif" />明天(周#week2#)</h1><h1><img src="http://tianqi.2345.com/weather_img/icon/md2/#i1#.gif" />今天(周#week1#)</h1></div><div><h2 style="height: 23px;">#t2#</h2><h2 style="height: 23px;">#t1#</h2></div><div><h3>#d2#</h3><h3>#d1#</h3></div></a></div></td></tr></tbody></table>';
//var template = '<table height="68" width="384" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="60"><table width="100%" cellspacing="0" cellpadding="0" border="0" class="weatherl"><tbody><tr><td height="25" class="city"><a onclick="this.blur()" target="_blank" nowrap="true" href="http://tianqi.2345.com/'+_data.pinyin+'/#id#.htm" title="查看天气详情">#city#</a></td></tr><tr><td height="20" class="set"><a target="_self" href="javascript:void(0);" style="cursor: pointer;" onclick=dispalyDiv("top_weather","city_wea_set") title="更换城市">设置</a></td></tr></tbody></table></td><td class="wborder"><div class="weatherr"><a onclick="this.blur()" target="_blank" nowrap="true" title="#title#" href="http://tianqi.2345.com/'+_data.pinyin+'/#id#.htm"><div><h1><img src="images/wea/w#i2#.gif" />明天(周#week2#)</h1><h1><img src="images/wea/w#i1#.gif" />今天(周#week1#)</h1></div><div><h2 style="height: 23px;">#t2#</h2><h2 style="height: 23px;">#t1#</h2></div><div><h3>#d2#</h3><h3>#d1#</h3></div></a></div></td></tr></tbody></table>';
//var template = '<table width="420" cellspacing="0" cellpadding="0" border="0" height="68"><tbody><tr><td width="80"><table width="100%" cellspacing="0" cellpadding="0" border="0" class="weatherl"><tbody><tr><td height="25" class="city"><a title="查看天气详情" href="http://tianqi.2345.com/'+_data.pinyin+'/#id#.htm" nowrap="true" target="_blank" onclick="this.blur()">#city#</a></td></tr><tr><td height="20" class="set"><a title="更换城市" onclick="dispalyDiv(&quot;top_weather&quot;,&quot;city_wea_set&quot;)" style="cursor: pointer;" href="javascript:void(0);" target="_self">设置</a></td></tr></tbody></table></td><td class="wborder"><div class="weatherr"><a href="http://tianqi.2345.com/'+_data.pinyin+'/#id#.htm" title="#title#" nowrap="true" target="_blank" onclick="this.blur()"><div><h1><img src="http://tianqi.2345.com/weather_img/icon/md2/#i2#.gif" />明天(周#week2#)</h1><h1><img src="http://tianqi.2345.com/weather_img/icon/md2/#i1#.gif" />今天(周#week1#)</h1></div><div><h2 style="height: 23px;">#t2#</h2><h2 style="height: 23px;">#t1#</h2></div><div><h3>#d2#</h3><h3>#d1#</h3></div></a></div></td></tr></tbody></table>';

	_data.id==0&&(template=template.replace(/href="[^"]+"/gi,function(){return "href=\"\"";}).replace(/target="_blank"/gi,"target=\"self\" onclick=\"return false\"").replace(/<span/gi,"<span style=\"display:none\"").replace("<h3>点击查看七日天气</h3>","天气数据载入失败!"));
	$("top_weather").innerHTML = template.replace(/#([^#]+)#/gi,function(){
												  var arg = arguments;
												  switch(arg[1]){
													  case "id":return _data.id;
													  case "title":return _data.title;
													  case "city":return _data.city;
													  case "t1":return _data.day1[0];
													  case "t2":return _data.day2[0];
													  case "t3":return _data.day3[0];
													  case "d1":return _data.day1[2];
													  case "d2":return _data.day2[2];
													  case "d3":return _data.day3[2];
													  case "week1":return _data.day1[1];
													  case "week2":return _data.day2[1];
													  case "week3":return _data.day3[1];
													  case "i1":return _data.day1[4];
													  case "i2":return _data.day2[4];
													  case "i3":return _data.day3[4];
													  default:
												  }
										 });
	var wea=g_cookie("wc");
	if(!wea){_data.id>0&&s_cookie("wc",_data.id)}
}
function dispalyDiv(hid,sho){
   if($("city_set_ifr").src=="about:blank"){
      $("city_set_ifr").src = "http://tianqi.2345.com/city_wea_set2345_1215.htm";
   }

   $(hid).style.display = "none";

   $(sho).style.display = "block";

}
showWeather();
function SetCookie(name, value)
{
var expdate = new Date();
var argv = SetCookie.arguments;
var argc = SetCookie.arguments.length;
var expires = (argc > 2) ? argv[2] : null;
var path = (argc > 3) ? argv[3] : null;
var domain = (argc > 4) ? argv[4] : null;
var secure = (argc > 5) ? argv[5] : false;
if(expires!=null) expdate.setTime(expdate.getTime() + ( expires * 1000 ))
document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))+((secure == true) ? "; secure" : "");
}