//设备跳转列表
(function go_mobile(){
	
	var ua_list = ['UCWEB','iPh',"iPhone","iPod","Android","dream","CUPCAKE","blackberry9500","blackberry9530","blackberry9520","blackberry9550","blackberry9800","webOS","incognito","webmate","s8000","bada","Meizu M8",'LG-TU915 Obigo','LGE VX','webOS','Nokia5800','IEMobile'];
	var ua_list_length = ua_list.length,
	ua = window.navigator.userAgent,
	i=0;
	var href = location.href;
	for(i=0; i<ua_list_length; i++){	
		if(ua.indexOf(ua_list[i]) !== -1
			&& ua.indexOf('IEMobile') === -1
			&& ua.indexOf('MSIE') === -1){
			if(typeof mobileUrl == "undefined"){
				var href_arr = href.split('/');
				var href_arr_length = href_arr.length;
				var script_name_real = href_arr[href_arr_length-1];
				if (href.indexOf('http://tools.2345.com/astro/susan.htm') !== -1) {
					location.href = '/m/susan/';
					break
				}		
				if(script_name_real.indexOf('_') && script_name_real.indexOf('suanming_zw')==-1 && script_name_real.indexOf('study_tizhong') == -1 && href.indexOf('miyu') == -1){
				    var script_name = script_name_real.split('_');
					href = href.replace(script_name_real, script_name[0]);
				}
				href = href.replace('http://tools.2345.com', '');
				// https也转换
				href = href.replace('https://tools.2345.com', '');
				location.href='/m'+href;
				break;
			}
			else
			{
				location.href=mobileUrl;
				break;				
			}
		}
	}
})();
