document.writeln("<div class=\"header mt10 clearfix\">");
document.writeln("        <a class=\"logo\" href=\"/\">");
document.writeln("          <img alt=\"2345实用查询\" height=\"48\" src=\"/img/logo.png\" title=\"2345实用查询\" width=\"204\" />");
document.writeln("        </a>");
document.writeln("        <div class=\"header_center\">");
document.writeln("          <div class=\"search mt10\">");
document.writeln("            <div class=\"search_box clearfix\">");
//document.writeln("              <form action=\"/search.php\" id=\"searchForm\" method=\"get\" target=\"_blank\">");
document.writeln("              <form action=\"http://zhannei.baidu.com/cse/search\" id=\"searchForm\" method=\"get\" target=\"_blank\">");
document.writeln("                <input autocomplete=\"off\" class=\"search_txt\" id=\"search_txt\" name=\"q\" onblur=\"if(this.value == \'\'){this.value=\'周公解梦\';this.className=\'search_txt\'}\" onclick=\"if(this.value == \'周公解梦\'){this.value=\'\';this.className=\'search_txt focus\'};\" onmouseover=\"if(this.className != \'search_txt focus\')this.value=\'\';this.className=\'search_txt focus\';this.focus();\" type=\"text\" value=\"周公解梦\" />");
document.write('<input type="hidden" name="s" value="5823820519378234798">');
document.write('<input type="hidden" name="ie" value="gbk">');
document.writeln("                <input onclick=\"submitBaidu();return false;\" class=\"search_btn\" onmouseout=\"this.className=\'search_btn\'\" onmouseover=\"this.className=\'search_btn search_btn_hover\'\" type=\"submit\" value=\"搜工具\" />");
document.writeln("              </form>");
document.writeln("            </div>");
document.writeln("            <div class=\"search_think\" id=\"search_think\" style=\"display:none;\"></div>");
document.writeln("          </div>");
document.writeln("        </div>");
document.writeln("        <div class=\"header_right\">");
document.writeln("          <div class=\"header_recom_tool\">");
document.writeln("            <a target=\"_blank\" href=\"/naonao/2019allyear.htm?naonao\" style=\"color:red\">2019年星座运势</a>");
document.writeln("            <em class=\"cut\">|</em>");
document.writeln("            <a target=\"_blank\" href=\"/shengxiao/\">2019年生肖运程</a>");
document.writeln("          </div>");
document.writeln("        </div>");
document.writeln("      </div>");
function submitBaidu()
{
	var value =  document.getElementById('search_txt').value;
//	document.getElementById('search_txt').value = value + " inurl:tools.2345.com";
	document.getElementById('searchForm').submit();
	setTimeout(function(){document.getElementById('search_txt').value = value},1000);
}