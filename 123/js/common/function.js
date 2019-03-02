/**
* �����������ļ�
*/

/**
 * ����cookie
 * @param name
 * @param value
 * @param expires   ʱ���
 */
function cookieSet(name, value, expires, custData)
{
    custData = custData == null ? '' : custData;
    var exdate = new Date(custData)
    exdate.setTime(exdate.getTime() + expires)
    cookieVal = name+ "=" +encodeURI(value) + ((expires == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=tools.2345.com";
    document.cookie = cookieVal;
}

/**
 * ɾ��cookie
 * @param name
 */
function cookieDel(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = cookieGet(name);
    if (cval != null)
    {
        document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
    }
}

/**
 * ��ȡ
 * @param name
 * @returns {*}
 */
function cookieGet(name)
{
    var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if(arr = document.cookie.match(reg))
    {
        return arr[2];
    }
    else
    {
        return null;
    }
}