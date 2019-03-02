var sitevisitlen=0,maxvisit=6;
document.onclick = function(e)//兼容IE,FF,OPERA
{
	e = window.event || e;
	sE = e.srcElement || e.target;
	if(sE.tagName=="IMG"||sE.tagName=="A"||sE.tagName=="AREA")
	{
		if(sE.tagName=="IMG" && sE.src != "")
		{
			sE = sE.parentNode;
		}
		if( (sE.tagName == "A"||sE.tagName == "AREA") && sE.href != "" )
		{
			clickCount(sE.href);//alert(sE.href);
		}
	}
}
//获取通用对象
function getObj(id)
{
	if(document.getElementById)
	{
		return document.getElementById(id);
	}
	else if(document.all)
	{
		return document.all[id];
	}
	else if(document.layers)
	{
		return document.layers[id];
	}
}
//统计
function clickCount( vUrl )
{
	//唯一访客检查
	var a2;
	i1=document.cookie.indexOf('uUiD=');
	if(i1!=-1)
	{
		i2=document.cookie.indexOf(';',i1);
		if(i2!=-1)
		{
			a2=document.cookie.substring(i1+5,i2);
		}
		else
		{
			a2=document.cookie.substr(i1+5);
		}
	}
	if(a2 == undefined)
	{
		a2 = Math.floor(Math.random()*100000)+''+new Date().getTime()+Math.floor(Math.random()*100000);
		document.cookie = 'uUiD='+a2+';expires=Thu, 21 Sep 2096 10:37:29 GMT; path=/';
	}
	//url组合
	var url = 'http://union2.50bang.org/web/ajax4?uId2=SPTNPQRLSX&uId='+a2+'&agt='+navigator.userAgent+'&r='+encodeURIComponent(document.referrer)+'&aN='+navigator.appName+'&lg='+navigator.systemLanguage+'&OS='+navigator.platform+'&aV='+navigator.appVersion+'&fBL='+screen.width+'*'+screen.height+'&lO='+encodeURIComponent(vUrl) + "?nytjsplit="+encodeURIComponent(location.href);
	getObj('clickCount').src = url;
	return true;
}