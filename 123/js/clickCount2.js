document.onclick = function(e)//兼容IE,FF,OPERA
{

	e = window.event || e;
	sE = e.srcElement || e.target;
	if( sE.tagName == "A" && sE.href != "" )
	{
		allCount(sE.href);//alert(sE.href);
	}
	
	if (sE.tagName == 'P')
	{
		sE = sE.parentNode;
	}
	
	var id = sE.id;
	if(typeof id != 'undefined'){	
		if(id.substr(0,6) == 'tools_'){			
			id = id.substr(6,(id.length - 6));
			if(id > 0){
				setHistory(id, 'tools');
			}
		}
		
		if(id.substr(0,8) == 'mytools_'){
			
			id = id.substr(8,(id.length - 8));
			
			if(id > 0){
				
				setHistory(id, 'mytools');
			}
		}
	}
	//e.stopPropagation ?  e.stopPropagation() : (e.cancelBubble = true);


}
//统计
function allCount( vUrl )
{
	//url组合
	var url = '//union2.50bang.org/web/ajax29?uId2=SPTNPQRLSX&r='+encodeURIComponent(document.location.href)+'&fBL='+screen.width+'*'+screen.height+'&lO='+encodeURIComponent(vUrl) + "?nytjsplit="+encodeURIComponent(location.href);
	var _dh = document.createElement("script");
	_dh.setAttribute("type","text/javascript");
	_dh.setAttribute("src",url);
	document.getElementsByTagName("head")[0].appendChild(_dh);
	return true;
}

//ga统计
document.write("<script>");
document.write('var _hmt = _hmt || [];(function() { var hm = document.createElement("script"); hm.src = "//hm.baidu.com/hm.js?dd00c5af4656bf4adb4e825a2459556c";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();');
document.write("</script>");