document.writeln("<div class=\"header mt10 clearfix\">");
document.writeln("        <a class=\"logo\" href=\"/\">");
document.writeln("          <img alt=\"2345ʵ�ò�ѯ\" height=\"48\" src=\"/img/logo.png\" title=\"2345ʵ�ò�ѯ\" width=\"204\" />");
document.writeln("        </a>");
document.writeln("        <div class=\"header_center\">");
document.writeln("          <div class=\"search mt10\">");
document.writeln("            <div class=\"search_box clearfix\">");
//document.writeln("              <form action=\"/search.php\" id=\"searchForm\" method=\"get\" target=\"_blank\">");
document.writeln("              <form action=\"http://zhannei.baidu.com/cse/search\" id=\"searchForm\" method=\"get\" target=\"_blank\">");
document.writeln("                <input autocomplete=\"off\" class=\"search_txt\" id=\"search_txt\" name=\"q\" onblur=\"if(this.value == \'\'){this.value=\'�ܹ�����\';this.className=\'search_txt\'}\" onclick=\"if(this.value == \'�ܹ�����\'){this.value=\'\';this.className=\'search_txt focus\'};\" onmouseover=\"if(this.className != \'search_txt focus\')this.value=\'\';this.className=\'search_txt focus\';this.focus();\" type=\"text\" value=\"�ܹ�����\" />");
document.write('<input type="hidden" name="s" value="5823820519378234798">');
document.write('<input type="hidden" name="ie" value="gbk">');
document.writeln("                <input onclick=\"submitBaidu();return false;\" class=\"search_btn\" onmouseout=\"this.className=\'search_btn\'\" onmouseover=\"this.className=\'search_btn search_btn_hover\'\" type=\"submit\" value=\"�ѹ���\" />");
document.writeln("              </form>");
document.writeln("            </div>");
document.writeln("            <div class=\"search_think\" id=\"search_think\" style=\"display:none;\"></div>");
document.writeln("          </div>");
document.writeln("        </div>");
document.writeln("        <div class=\"header_right\">");
document.writeln("          <div class=\"header_recom_tool\">");
document.writeln("            <a target=\"_blank\" href=\"/naonao/2019allyear.htm?naonao\" style=\"color:red\">2019����������</a>");
document.writeln("            <em class=\"cut\">|</em>");
document.writeln("            <a target=\"_blank\" href=\"/shengxiao/\">2019����Ф�˳�</a>");
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