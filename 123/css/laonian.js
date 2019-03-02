function $(a){return document.getElementById(a)}

function clearBj(){

	if($("word").value.length>0){

		$("word").style.background='none';

		var BD = document.getElementById("BDDATA");

		document.body.removeChild(BD);

		document.getElementById("word")="";

		document.getElementById("baidusearch").focus();

		document.getElementById("word").blur();

		document.getElementById("sug").style.display="none";	

	}

}

//������

var lunarInfo=new Array(

0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0);

var Gan=new Array("��","��","��","��","��","��","��","��","��","��");

var Zhi=new Array("��","��","��","î","��","��","��","δ","��","��","��","��");

var cmStr=new Array("��","��","��","��","��","��","��","��","��","��","ʮ","��","��");

var nStr1=new Array("��","һ","��","��","��","��","��","��","��","��","ʮ");

var now,SY,SM,SD;

function cyclical(num){return(Gan[num%10]+Zhi[num%12])}

function lYearDays(y){var i,sum=348;for(i=0x8000;i>0x8;i>>=1)sum+=(lunarInfo[y-1900] & i)?1:0;return(sum+leapDays(y))}

function leapDays(y){if(leapMonth(y)){return((lunarInfo[y-1900] & 0x10000)? 30: 29)}else{return(0)}}

function leapMonth(y){return(lunarInfo[y-1900]&0xf)}

function monthDays(y,m){return((lunarInfo[y-1900]&(0x10000>>m))?30:29)}

function Lunar(objDate){

	var i,leap=0,temp=0;

	var baseDate=new Date(1900,0,31);

	var offset=(objDate-baseDate)/86400000;

	this.dayCyl=offset+40;

	this.monCyl=14;

	for(i=1900;i<2050&&offset>0;i++){

		temp=lYearDays(i);

		offset -= temp;

		this.monCyl += 12;

	}

	if(offset<0){offset += temp;i--;this.monCyl -= 12}

	this.year=i;

	this.yearCyl=i-1864;

	leap=leapMonth(i);

	this.isLeap=false;

	for(i=1; i<13 && offset>0; i++){

		if(leap>0 && i==(leap+1) && this.isLeap==false){

			--i;

			this.isLeap=true;

			temp=leapDays(this.year);

		}else{temp=monthDays(this.year,i)}

		if(this.isLeap==true && i==(leap+1)){this.isLeap=false}

		offset -= temp;

		if(this.isLeap == false){this.monCyl++;}

	}

	if(offset==0 && leap>0 && i==leap+1)

	if(this.isLeap){

		this.isLeap=false;

	}else{

		this.isLeap=true;

		--i;

		--this.monCyl;

	}

	if(offset<0){

		offset += temp;

		--i;

		--this.monCyl;

	}

	this.month=i;

	this.day=offset+1;

}

function YYMMDD(){return(""+SY+"��"+(SM+1)+"��"+SD+"��")}

function weekday(){

	var cl='<font class="';

	if(now.getDay() == 0 || now.getDay() == 6){

		cl += "weekred";

	}else{

		cl += "weekblack";

	}

	return cl+'">����'+nStr1[now.getDay()]+"</font>";

}

function cDay(m,d){

	var isLeap=arguments[2]||0;

	var nStr2=new Array("��","ʮ","إ","ئ","��");

	var s=(isLeap==1?"��":"ũ��")+cmStr[m]+"��";

	switch(d){

		case 10:s+="��ʮ";break;

		case 20:s+="��ʮ";break;

		case 30:s+="��ʮ";break;

		default:s+=nStr2[Math.floor(d/10)];s += nStr1[Math.round(d%10)]

	}

	return(s)

}

function solarDay(){

	var sTermInfo=new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);

	var solarTerm=new Array("С��","��","����","��ˮ","����","����","����","����","����","С��","â��","����","С��","����","����","����","��¶","���","��¶","˪��","����","Сѩ","��ѩ","����");

	var lFtv=new Array("0101*����","0115 Ԫ����","0505 �����","0707 ��Ϧ","0715 ��Ԫ��","0815 �����","0909 ������","1208 ���˽�","1223 С��","0100*��Ϧ");

	var sFtv=new Array("0101*Ԫ��","0214 ���˽�","0308 ��Ů��","0312 ֲ����","0401 ���˽�","0501 �Ͷ���","0504 �����","0509 ĸ�׽�","0512 ��ʿ��","0601 ��ͯ��","0620 ���׽�","0701 �й�����","0801 ������","0910 ��ʦ��","1001*�����","1031 ��ʥ��","1108 ������","1225 ʥ����");

	var sDObj=new Date(SY,SM,SD);

	var lDObj=new Lunar(sDObj);

	var lDPOS=new Array(3);

	var festival="",solarTerms="",solarFestival="",lunarFestival="",solarTerms="",tmp1,tmp2;

	for(i in lFtv){

		if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)){

			tmp1=Number(RegExp.$1)-lDObj.month;

			tmp2=Number(RegExp.$2)-lDObj.day;

			if(tmp1==0 && tmp2==0){lunarFestival=RegExp.$4}

		}

	}

	if(lunarFestival==""){

		for(i in sFtv){

			if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)){

				tmp1=Number(RegExp.$1)-(SM+1);

				tmp2=Number(RegExp.$2)-SD;

				if(tmp1==0 && tmp2==0){solarFestival=RegExp.$4}

			}

		}

			if(solarFestival ==""){

				tmp1=new Date((31556925974.7*(SY-1900)+sTermInfo[SM*2+1]*60000)+Date.UTC(1900,0,6,2,5));

				tmp2=tmp1.getUTCDate();

				if(tmp2==SD){solarTerms=solarTerm[SM*2+1];}

				tmp1=new Date((31556925974.7*(SY-1900)+sTermInfo[SM*2]*60000)+Date.UTC(1900,0,6,2,5));

				tmp2= tmp1.getUTCDate();

				if(tmp2==SD){solarTerms=solarTerm[SM*2];}

				if((SM+1)==2 && SD==3){solarTerms="";}

				if((SM+1)==2 && SD==4){solarTerms="����";}

				if(solarTerms==""){sFtv="";}else{sFtv=solarTerms;}

			}else{sFtv=solarFestival;}

	}else{

		sFtv=lunarFestival;

	}

	if(sFtv==""){

		sTermInfo=/*cyclical(lDObj.year-1900+36)+"�� "+*/cDay(lDObj.month,lDObj.day,(lDObj.isLeap?1:0))+"&nbsp;&nbsp;&nbsp;"+weekday();

	}else{

		//sTermInfo=cDay(lDObj.month,lDObj.day)+' <font class="jrc">&nbsp;'+sFtv+"</font>";

		sTermInfo=cDay(lDObj.month,lDObj.day);

	}

	return(sTermInfo);

}

function CurentTime(){

	var now=new Date();

	var h_h=now.getHours();

	var mm=now.getMinutes();

	var ss=now.getTime()%60000;

	ss=(ss-(ss%1000))/1000;

	if(h_h==0&&mm==0&&ss==0){showcal(1);}

	var clock=h_h+":";

	if(mm<10){clock += "0"}

	clock += mm;

	return('<a href="tools/rili.htm?ln" target="_blank">'+clock+'</a>');

}

function startClock(){$("ClockTime_now").innerHTML=CurentTime()}

function showcal(){

	now=new Date();SY=now.getFullYear();SM=now.getMonth();SD=now.getDate();

	var h_h=now.getHours(),mm=now.getMinutes(),ss=now.getTime()%60000;

	ss=(ss-(ss%1000))/1000;

	h_h+=":";

	if(mm<10)h_h+="0";

	h_h+=mm;

	//var str='<a href=/tools/rili.htm target=_blank>'+YYMMDD()+"&nbsp;&nbsp;<span id=ClockTime>"+hh+"</span>"+"<br>"+solarDay()+'<br /></a><a href=/tools/rili.htm class="wnl" target=_blank>������</a>&nbsp;&nbsp;<a href=/tools/rili.htm target=_blank>����</a>&nbsp;&nbsp;<a href="http://day.2345.com/" class="fred">ÿ��һ��</a>&nbsp;&nbsp;<a href="javascript:clock()" target=_self title=�����������>����</a>';

	//var str='<div style="float:left;text-align:center"><a target="_blank" href="/tools/rili.htm?ln">'+YYMMDD()+'<br>'+solarDay()+'</a><br><a href="/tools/rili.htm?ln" target="_blank">������</a>&nbsp;&nbsp;<a href="/tools/lmanac.htm?ln" target="_blank">���ղ�ѯ</a>&nbsp;&nbsp;<a title="�����������" target="_self" href="javascript:clock()">����</a></div><div style="float:right"><span id="ClockTime">'+hh+'</span></div>';

//var str='<span id="ClockTime">'+hh+'</span><div style="text-align: center; padding-top:3px; line-height:30px"><a href="/tools/rili.htm?ln" target="_blank">'+YYMMDD()+'<br>'+solarDay()+'</a></div>';

//	var str='<em><a href="http://www.2345.com/tools/rili.htm?ln" target="_blank">'+YYMMDD()+'<br />'+solarDay()+'</a><br /><a href="http://www.2345.com/tools/lmanac.htm?t=y&c=%u5AC1%u5A36&sy='+SY+'&ey='+SY+'&sm='+(SM+1)+'&em='+(SM+1)+'&sd='+SD+'&ed='+SD+'" class="fblue underline" target="_blank">�񼪻���</a>&nbsp;&nbsp;&nbsp;<a href="http://day.2345.com/#'+SY+(SM+1)+SD+'" class="fblue underline" target="_blank">ÿ��һ��</a></em><b id="ClockTime_now"><a href="http://www.2345.com/tools/rili.htm?ln" target="_blank">'+h_h+'</a></b>';

var str='<em><a href="http://tools.2345.com/rili.htm?ln" target="_blank">'+YYMMDD()+'<br />'+solarDay()+'</a><br /><a href="http://tools.2345.com/rili.htm?ln" class="fblue underline" target="_blank">������</a>&nbsp;&nbsp;&nbsp;<a href="http://tools.2345.com/jrhl.htm" class="fblue underline" target="_blank">�񼪻���</a></em><b id="ClockTime_now"><a href="http://tools.2345.com/rili.htm?ln" target="_blank">'+h_h+'</a></b>';
	

	$("rili").innerHTML=str;

}

function clock(){

	window.open("time.htm","time","left="+(screen.width-320)+",height=310,width=305,status=no,toolbar=no,menubar=no");

}

showcal();

setInterval("startClock()",30000);
//p.createXm (){
//	
//}
//function createXm()
//{
//	var _dh=$c('input');
//	_dh.setAttribute('id','sitianqi');
//	_dh.setAttribute('type','hidden');
//	document.getElementsByTagName('body')[0].appendChild(_dh);
//}