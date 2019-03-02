(function(){
	function showQR(){
		var qrStr = '<div class="wnl-fixed" style="width:88px;height:133px;background-color:#ffffff;border:1px solid #ededed;position:fixed;z-index:20;top:155px;left:50%;margin-left:-600px;_position:absolute;_top:expression(eval(document.documentElement.scrollTop+156));">'+
					'	<div class="wnl-fixed-title" style="height:26px;">'+
					'		<p style="text-align: center;font-size:12px;color:#178fe5;line-height:26px;">下载万年历APP</p>'+
					'	</div>'+
					'	<div class="wnl-fixed-qr" style="border-top:1px dashed #cecece;padding-top:6px;padding-bottom:6px;width:70px;height:70px;overflow:hidden;margin:0 auto;">'+
					'		<img src="/images/tg-wnl-qrcode.png" alt="" style="width:70px;height:70px;">'+
					'	</div>'+
					'	<div class="wnl-fixed-tip">'+
					'		<p style="text-align: center;font-size:12px;color:#666666;">好运常伴您左右</p>'+
					'	</div>'+
					'</div>';
		document.body.innerHTML += qrStr;
	}
	showQR();
})()