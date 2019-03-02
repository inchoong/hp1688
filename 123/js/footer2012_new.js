document.write('<script type="text/javascript" src="//union2.50bang.org/js/sycxtj"></script>');
document.write('<script type="text/javascript" src="//tools.2345.com/js/clickCount2.js"></script>');

//--菜谱广告--//
if(document.getElementById("search_txt") != undefined)
{
	$("#search_txt").bind('keyup',function(e){
		var keycode = e.keyCode;
		if(keycode != 37 && keycode != 38 && keycode != 39 && keycode != 40 && keycode != 13){
			if($("#search_txt").val() == ""){
				$("#search_think").hide();
				return false;
			}
			$.ajax({
				type:'GET',
				url:'/api/su.php',
				data:'k='+$("#search_txt").val(),
				success:function(msg){
					if(msg != ""){
						$("#search_think").show();
						$("#search_think").html(msg);
					}else{
						$("#search_think").hide();
						$("#search_think").html('');
					}
				}
			});
		}
	});
	document.onmouseup = function(e){
		var event = window.event || e;
		var src = event.srcElement || event.target;
		if (src.id != 'search_txt' || src.parentNode.id != 'search_think') {
			document.getElementById('search_think').style.display = 'none';
		}
	};
}
//公共搜索上下箭头移动焦点
var now_n='';
document.onkeydown = function(event){
event = event ? event : (window.event ? window.event : null);
if($("#search_txt")[0] != undefined) {
var keycode = event.which||event.keyCode;
var link = "";
if($("#search_think").css('display') != "none"){
var url_list = $("#search_think")[0].children;
url_count=url_list.length;
switch(keycode){
case 38://向上
if(now_n === ''){
now_n = (url_count-1);
}else if(now_n>0){
now_n = now_n-1;
}else{
now_n = (url_count-1);
}
for(var i=0;i<url_count;i++){
$(url_list[i]).removeClass('current');
}
$(url_list[now_n]).addClass("current");
$("#search_txt").val($(url_list[now_n]).html().replace(/<span>|<\/span>/ig,""));
link = $(url_list[now_n]).attr("href");
document.getElementById('searchForm').target = '_blank';
document.getElementById('searchForm').action = link;
//document.getElementById('so').name = '';
break;
case 40://向下
if(now_n === ''){
now_n = 0;
}else if(now_n<(url_count-1) ){
now_n ++;
}else{
now_n = 0;
}
for(var i=0;i<url_count;i++){
$(url_list[i]).removeClass('current');
}
$(url_list[now_n]).addClass("current");
$("#search_txt").val($(url_list[now_n]).html().replace(/<span>|<\/span>/ig,""));
link = $(url_list[now_n]).attr("href");
document.getElementById('searchForm').target = '_blank';
document.getElementById('searchForm').action = link;
//document.getElementById('so').name = '';
break;
case 13://回车
$("#search_think").hide();
clickTongji($(url_list[now_n])[0].getAttribute("data-id"));
now_n = '';
document.getElementById('searchForm').submit();
return false;
break;
}
}
}
};
//点击统计
function cc(a) {
	if (a.length > 0) {
		// by zhangyaoyao 2017.04.10 为CC增加nytjsplit后缀 50bang统计时
        // qsid 90175 【实用查询PC&M版】统计代码加页面来源拼接
		var c = 'https://union2.50bang.org/web/ajax29?uId2=SPTNPQRLSX&r='+encodeURIComponent(document.location.href)+'&fBL='+screen.width+'*'+screen.height+'&lO='+encodeURIComponent(a) + '?nytjsplit=' + encodeURIComponent(document.location.href);
		jExt.loadJs(c)
	}
	return true
}
var ele = document.getElementsByTagName('h2');
if (typeof(ele[0]) != 'undefined')
{
	var val = ele[0].innerHTML;
	if (/<img.*>/i.test(val))
	{
		ele[0].innerHTML = val.replace('>','>2345');
	}
}
document.onreadystatechange = function(){ 
	if(document.readyState == "complete"){
		var obj = document.getElementsByTagName('img');
		for(var i = obj.length-1; i > 0; i--){
			if(obj[i].getAttribute('width') == 0 && obj[i].getAttribute('height') == 0){
				obj[i].style.display='none';
				break;
			}
			
		}
		//针对生活百科
		if(location.href.indexOf('zhishi') != -1){
			var obj2 = document.getElementsByTagName('a');
			for(var i = obj2.length-1; i > 0; i--){
				if(obj2[i].getAttribute('title') == '全景统计'){
					obj2[i].style.display='none';
					break;
				}
				
			}
		}
		
	}
} 


