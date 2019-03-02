clearInterval(timer1);

function G(a){

	return document.getElementById(a)

}

function C(a){

	return document.createElement(a)

}

function B(){

	clearInterval(timer1);

	//inputAuto()

}

var sugSwitch=1;
var S=G("sug"),I=G("inbox_search"),sugDataUrl="http://suggestion.baidu.com",SD,CS=null,c=-1,K=false,mouseOnSug=false,E=false,isEable=true;

var SF=null,T=null;

var LF=G("bdfm");

var BDATA = G("BDDATA"); 

var TN=G('tn');

var PT=G('pt');

var CT=G('ct');

var LM=G('lm');

var KW=G('kw');



try{

	var isMaxthon=!!external.max_version

}

catch(e){

}

var isIE=navigator.userAgent.indexOf("MSIE")!=-1&&!window.opera;

var isWebKit=(navigator.userAgent.indexOf("AppleWebKit/")>-1);

var isGecko=(navigator.userAgent.indexOf("Gecko")>-1)&&(navigator.userAgent.indexOf("KHTML")==-1);

var isOpera=navigator.userAgent.indexOf("Opera")!=-1;

var timer3=0;

function inputAuto(){

	//I.setAttribute("autocomplete","on");

	//s_cookie({store:"cookie"},"auto1","0",0)

}

function CHI(d,a){

	var b=C("INPUT");

	b.type="hidden";

	b.name=d;

	b.value=a;

	return b

}

function cs(){

	if(isIE){

	}

	S.style.display="none";

	timer3=0;

	isEable=true

}

function ct(){

	var a=T.rows;

	for(var b=0;b<a.length;b++){

		a[b].className="ml"

	}

}

var Timing={

}

,isClkSug=true;

function mousedownPro(a){

return function(){

	if(isGecko){

		I.blur()

	}

	clearTimeout(timer3);

	Timing.startTime=new Date();

	I.value=this.cells[0].innerHTML;

	s3=I.value;

	//I.focus();

	E=true;	



	//LF.submit();

	

	//var bdwin = window.open("http://www.baidu.com/s?tn=site888_pg&pt=&ct=&lm=-1&kw=&word=" + I.value, "n", 

	//						'z-look=yes, alwaysRaised=yes');

	//setTimeout(function(){bdwin.focus();}, 3000);

	

	//bdwin.focus();

	//window.location.href

	

	//I.blur();

}

}

function mouseupSubmit(b){


	var b=window.event||b,a=b.target||b.srcElement;

	if((new Date()-Timing.startTime)/1000>0.&&s3!=a.innerHTML){

		return

	}else{



		I.select();

		LF.action = "http://www.baidu.com/s";

		TN.value = "baidulaonian";

		PT.value = "";

		CT.value = "";

		LM.value = "-1";

		KW.value = "";

		/*

		document.getElementById('tn').value = 'baidulaonian';

		document.getElementById('pt').value = '';

		document.getElementById('ct').value = '';

		document.getElementById('lm').value = '-1';

		document.getElementById('kw').value = '';	

		*/


		LF.submit();
		

		//var str = "";

		//for(var p in S['style']) {

		//	str = str + p + " == " + S[p] + "<br> /r/n";

		//}	

		//alert(S['style'].background);

		//document.bdfm.submit();

		//I.value=s3;



	}

}

function setSug(){	

	if(typeof(SD)!="object"||typeof(SD.s)=="undefined"){

		return

	}

	isEable=false;

	var tab=C("table");

	with(tab){

		id="sug_t";

		style.width="100%";

		style.backgroundColor="#f9fdff";

		cellSpacing=0;

		cellPadding=2;

		style.cursor="default"

	}

	var tb=C("tbody");

	tab.appendChild(tb);

	for(var i=0;i<SD.s.length;i++){

		var tr=tb.insertRow(-1);

		tr.onmouseover=function(){

			ct();

			this.className="mo";

			mouseOnSug=true

		};

		tr.onmouseout=ct;

		

		//tr.onmousedown = new Function("direct_baidu(\'1\')");	

		tr.onmousedown=mousedownPro(i);

		tr.onmouseup=mouseupSubmit;

		var td=tr.insertCell(-1);

		var baiduSearchUrl="";

		td.innerHTML=SD.s[i];

		if(isOpera){

			td.style.lineHeight="10px";

			td.style.width=I.clientWidth+"px"

		}

	}

	var tr=tb.insertRow(-1);

	var td=tr.insertCell(-1);

	td.style.textAlign="right";

	var AA=C("A");

	//AA.href="javascript:void(0)";

	//AA.setAttribute("target","_self");

	AA.style.cursor="pointer";

	AA.onmouseover=function(){this.style.color="red";this.style.textDecoration="underline"};

	AA.onmouseout=function(){this.style.color="";this.style.textDecoration="none"};

	AA.innerHTML="\u6253\u5F00\u5386\u53F2\u8BB0\u5F55";

	AA.style.fontSize="14px";



	if(isIE){

		AA.attachEvent("onclick",B)

	}

	else{

		AA.addEventListener("click",B,false)

	}

	

	td.appendChild(AA);

	S.innerHTML="";

	S.appendChild(tab);

	S.style.width=(((document.compatMode=="BackCompat")&&isIE)?I.offsetWidth:I.offsetWidth-0)+"px";

	if(isOpera){

		S.style.width=I.clientWidth

	}

	if(isOpera){

	}

	S.style.display="block";

	if(isIE){

	}

	if(G("sug_t")){

		T=G("sug_t")

	}

	c=-1;

	s3=""



}

function kd(h){

	h=h||window.event;

	K=false;

	var g;

	if(h.keyCode==9){

		cs();

		return

	}

	if(h.keyCode==13){

		cs();

		return

	}

	if(h.keyCode==38||h.keyCode==40){

		mouseOnSug=false;

		if(S.style.display!="none"){

			var a=T.rows;

			var b=a.length-1;

			for(var d=0;d<b;d++){

				if(a[d].className=="mo"){

					c=d;

					break

				}

			}

			ct();

			var g;

			if(h.keyCode==38){

				if(c==0){

					I.value=SD.q;

					c=-1;

					K=true

				}

				else{

					if(c==-1){

						c=b

					}

					g=a[--c];

					g.className="mo";

					I.value=g.cells[0].innerHTML;

					s3=I.value

				}

			}

			if(h.keyCode==40){

				if(c==b-1){

					I.value=SD.q;

					c=-1;

					K=true

				}

				else{

					g=a[++c];

					g.className="mo";

					I.value=g.cells[0].innerHTML;

					s3=I.value

				}

			}

			if(!isIE){

				h.preventDefault()

			}

		}

	}

}

window.baidu={

	sug:function(a){		

		if(typeof(a)=="object"&&typeof(a.s)!="undefined"&&typeof(a.s[0])!="undefined"){

			SD=a;

			setSug()

		}

		else{			

			cs();

			SD={

			}

		}

	}

};

var s1="";

var s3=I.value;

var timer2=0;

function cb(){

	if(sugSwitch==0){

		return

	}



	I.onbeforedeactivate=function(){

		if(isEable){

			return

		}

		window.event.cancelBubble=true;

		window.event.returnValue=false;

		E=false;

		return false

	};

	var d=true;

	var g=I.value;

	if(typeof(T)!="undefined"&&T!=null){

		var a=T.rows;

		for(var h=0;h<a.length;h++){

			if(a[h].className=="mo"){

				if(g==a[h].cells[0].innerHTML&&!mouseOnSug){

					d=false

				}

			}

		}

	}

	if(d&&!K){

		if(isMaxthon){

		}

		if(LF.action!="http://www.baidu.com/s"){

			//return false

		}

		if(CS){

			document.body.removeChild(CS)

		}

		CS=C("script");

		CS.setAttribute("defer","true");

		CS.id = "BDDATA";

		CS.src=sugDataUrl+"/su?wd="+encodeURIComponent(I.value)+"&t="+(new Date()).getTime();

		document.body.appendChild(CS)

	}

}

function f(){

	var a=I.value;

	if(a==s1&&a!=""&&a!=s3){

		if(timer2==0){

			timer2=setTimeout(cb,100)

		}

	}

	else{

		clearTimeout(timer2);

		timer2=0;

		s1=a;

		if(a==""){

			cs()

		}

		if(s3!=I.value){

			s3=""

		}

	}

}

var timer1=setInterval(f,10);

var timer4=0;

I.oncontextmenu=function(){

	K=false

};

if(sugSwitch==1){

	I.onkeydown=kd

}

var isClkSug=false;

window.onblur=function(){

	cs()

};

I.onblur=function(){

//	bdc(1);

	if(isClkSug){

		if(timer3==0){

			timer3=setTimeout(cs,200);

			cs()

		}

	}

	isClkSug=false

};

S.onmousedown=function(a){

};

document.onmousedown=function(a){

	if(E){

		E=false;

		return false

	}

	I.onbeforedeactivate=function(){

	};

	a=a||window.event;

	var b=a.target||a.srcElement;

	if(b==I){

		return

	}

	while(b==b.parentNode){

		if(b==S||b==I){

			isClkSug=true;

			return

		}

	}

	if(timer3==0){

		timer3=setTimeout(cs,200)

	}

};

function resizeHandler(){

	if(typeof(timer3)!="undefined"&&timer3!=0){

		clearTimeout(timer3)

	}	

	resetSuggestion()

}

if(isIE){

	window.attachEvent("onresize",resizeHandler)

}

else{

	window.addEventListener("resize",resizeHandler,false)

}

S.style.zIndex=200;

if(isIE){

}

function resetSuggestion(){

	if(S.style.display!="none"){

		setTimeout(function(){

			cs();		

			if(SD!=null){

				setSug(SD);

				I.focus()

			}

		},100)

	}

}

function onkeydownHandl(a){

	if(isGecko){

		a=a||window.event;

		if(a.ctrlKey){

			if(a.keyCode==61||a.keyCode==107||a.keyCode==109||a.keyCode==96||a.keyCode==48){

				resetSuggestion()

			}

		}

	}

}

if(isIE){

	//window.attachEvent("onkeydown",onkeydownHandl)

}

else{

	//document.addEventListener("keydown",onkeydownHandl,false)

}

window.onunload=function(){

	

};

