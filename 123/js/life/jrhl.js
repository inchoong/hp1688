var __handle = 0;
var _perPage = 8;
var get,
    _god = {};
var now = new Date();
var lmanac = new Array();
var lang_default = ["��ǰѡ��", "���ջ�����", "��", "��", "��", "����", "�� �� �ǣ�", "���ջ�����", "��ʼ����ӦС�ڵ��ڽ�������!", "��ѯ����Ӧ��һ������!", "��ѯ��", "��  ѯ", "ȫ��", "ũ��", "�ˣ�", "�ɣ�", "�壺", "ɷ��", "���壺", "̥��", "ֵ�ǣ�", "��", "��", "�ۺ����ƣ�", "�������ƣ�", "�޶�Ӧ��ݻ�������!", "������һ����", "��", "����������", "�����˼ɣ�"];
var dir = ["/his_short/", "/api/app/yjcs/", "http://tianqi.2345.com/astro/"];
var cache = {
    "syear": 0,
    "smonth": 0,
    "sday": 0,
    "eyear": 0,
    "emonth": 0,
    "eday": 0,
    "type": "",
    "cond": ""
};
var _width = ["12%", "7%", "12%"];
window.gods = {};
var table_id = '';
var xingzuoLink = {
    ������: '/xingzuo/baiyang.htm',
    ��ţ��: '/xingzuo/jinniu.htm',
    ˫����: '/xingzuo/shuangzi.htm',
    ��з��: '/xingzuo/juxie.htm',
    ʨ����: '/xingzuo/shizi.htm',
    ��Ů��: '/xingzuo/chunv.htm',
    ������: '/xingzuo/tianping.htm',
    ��Ы��: '/xingzuo/tianxie.htm',
    ������: '/xingzuo/sheshou.htm',
    Ħ����: '/xingzuo/mojie.htm',
    ˮƿ��: '/xingzuo/shuiping.htm',
    ˫����: '/xingzuo/shuangyu.htm'
};
var shengxiaoLink = {
    ��Ф����: '/shengxiao/mouse.htm',
    ��Ф��ţ: '/shengxiao/ox.htm',
    ��Ф����: '/shengxiao/tiger.htm',
    ��Ф����: '/shengxiao/rabbit.htm',
    ��Ф����: '/shengxiao/dragon.htm',
    ��Ф����: '/shengxiao/snake.htm',
    ��Ф����: '/shengxiao/horse.htm',
    ��Ф����: '/shengxiao/sheep.htm',
    ��Ф����: '/shengxiao/monkey.htm',
    ��Ф����: '/shengxiao/chook.htm',
    ��Ф����: '/shengxiao/dog.htm',
    ��Ф����: '/shengxiao/pig.htm'
};

function _g(_id) {
    return document.getElementById(_id);
}

function $c(_tag) {
    return document.createElement(_tag);
}

function loadJs2(_url) {
    _timeout = arguments[1] || 0;
    _id = _url.replace(/\//gi, "_");
    if (typeof(_g) != "undefined" && !_g(_id)) {
        var _js = document.createElement("script");
        _js.setAttribute("type", "text/javascript");
        _js.setAttribute("id", _id);
        _js.setAttribute("src", _url + ".js" + (_timeout ? "?" + _timeout : ""));
        document.body.insertBefore(_js, null);
        return true;
    }
    return false;
}

function init_get() {
    var _get = new Array();
    var _req = location.search.substr(1);
    if (!_req) {
        return _get;
    }
    _req = _req.split("&");
    for (_i = 0; _i < _req.length; _i++) {
        _r = _req[_i].split("=");
        _get[_r[0]] = unescape(_r[1]);

    }
    return _get;
}

function init() {
    var year, month, day;
    var d = new Date();
    year = d.getFullYear();
    month = d.getMonth() + 1;
    day = d.getDate();

    get = init_get();
    var _sPre = "s_";
    _g(_sPre + "year").value = year;
    _g(_sPre + "month").value = month;
    changeMonthDay(0);
    _g(_sPre + "day").value = day;

    //Ĭ�ϼ��ص������Ϣ
    if (get['date']) {
        var currentDate = get['date'].split('-');
        _g(_sPre + "year").value = currentDate[0];
        _g(_sPre + "month").value = parseInt(currentDate[1]);
        changeMonthDay(0);
        _g(_sPre + "day").value = parseInt(currentDate[2]);
        var _m = String(currentDate[1]).length == 1 ? '0' + currentDate[1] : currentDate[1];
        var _d = String(currentDate[2]).length == 1 ? '0' + currentDate[2] : currentDate[2];
        setData(currentDate[0], _m, _d);
        year = currentDate[0];
    } else {
        setData(year, month, day);
        get['date'] = year + "-" + (String(month).length == 1 ? '0' + month : month) + "-" + (String(day).length == 1 ? '0' + day : day);
    }
    var jsFile = "/api/app/yjcs/" + year + ".js";
    jExt.loadJs(jsFile);
}

function lmanac_2345() {
    if (get['date']) {
        var tmp = get['date'].split("-");
        var dd = lmanac[tmp[0]]['d' + tmp[1] + tmp[2]];
    } else {
        var dd = lmanac[new Date().getFullYear()]['d' + (parseInt(new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + (parseInt(new Date().getDate()) < 10 ? '0' + new Date().getDate() : new Date().getDate())];
    }
    var _yi = '';
    for (_i = 0; _i <= dd.y.length - 1; _i++) {
        _yi += '<em style="cursor: pointer;" onmouseout="unhuangliinfo()" onmouseover="huangliinfo(\'' + dd.y[_i] + '\',this)">' + dd.y[_i] + '</em>\n';
    }
    var _ji = '';
    for (_i = 0; _i <= dd.j.length - 1; _i++) {
        _ji += '<em style="cursor: pointer;" onmouseout="unhuangliinfo()" onmouseover="huangliinfo(\'' + dd.j[_i] + '\',this)">' + dd.j[_i] + '</em>\n';
    }
}

function setData(year, month, day) {
    $('#tday_luck_time').attr('href', '/huangli.htm?date=' + year + '-' + month + '-' + day);
    var _m = String(month).length == 1 ? '0' + month : month;
    var _d = String(day).length == 1 ? '0' + day : day;
    god(year + '-' + _m + '-' + _d);
}

function getLmanac() {
    var _sPre = "s_",
        _y = _g(_sPre + "year").value;
    _m = _g(_sPre + "month").value;
    _d = _g(_sPre + "day").value;
    _m = String(_m).length == 1 ? '0' + _m : _m;
    _d = String(_d).length == 1 ? '0' + _d : _d;
    setData(_y, _m, _d);
}

var nongli = '',
    nongliFull = '',
    gongli = '',
    chong = '',
    yi = '',
    ji = '',
    suici = '',
    wuxing = '',
    cai = '',
    xi = '',
    fu = '',
    dao = '',
    zhi = '',
    dClass = '',
    cClass = '',
    taiShen = '',
    pengZu = '';

function god(_date) {
    var riqi = _date.split('-');
    var years = riqi[0];
    var months = riqi[1];
    var days = riqi[2];
    var file = years + months + days;
    var godFile = "//tools.2345.com/frame/api/GetLunarInfo?date=" + file;
    $.ajax({
        type: 'GET',
        url: godFile,
        dataType: 'text',
        success: function (msg) {
            var json = eval('(' + msg + ')');
            nongliFull = json.html.nongli;
            gongli = json.html.gongli;
            nongli = json.html.nongli.substring(0, json.html.nongli.length - 5);
            chong = json.html.chong;
            yi = json.html.yi;
            ji = json.html.ji;
            suici = json.html.suici;
            wuxing = json.html.wuxing;
            cai = json.html.cai;
            xi = json.html.xi;
            fu = json.html.fu;
            dao = json.html.dao;
            zhi = json.html.xingxiu;
            taiShen = json.html.tai;
            pengZu = json.html.pengzu;
            if (json.html.dao.indexOf('�Ƶ�') > 0) {
                dClass = 'bg_light';
                cClass = 'c_light';
            } else {
                dClass = 'bg_deep';
                cClass = 'c_deep';
            }
            var nowDay = new Date(_date).getDay()
                , days = [" <span style=\"color:red\">������</span>", " ����һ", " ���ڶ�", " ������", " ������", " ������", " <span style=\"color:red\">������</span>"]
                , week = days[nowDay];
            gonglis = gongli.split(' ');
            gongli1 = gonglis[0] + week + '<a href="' + xingzuoLink[gonglis[1]] + '" class="astro" target="_blank">' + gonglis[1] + '</a>';
            $('#gongli').html(gongli1);
            nonglis = nongliFull.split(' ');
            nongli1 = nonglis[0] + '<a href="' + shengxiaoLink[nonglis[1]] + '" class="astro" target="_blank">' + nonglis[1] + '</a>';
            $('#nongli').html(nongli1);
            $('#chong').html("<em>" + chong + "</em>");
            $('#yishi').html("<em>" + yi + "</em>");
            $('#jishi').html("<em>" + ji + "</em>");
            $('#xi').html(xi);
            $('#cai').html(cai);
            $('#fu').html(fu);
            $('#taishen').html(taiShen);
            $('#xs').html(pengZu);
            $('#suici').html(suici);
            $('#wuxing').html(wuxing);
            $('#start').html(zhi);
            $('#c_Class').removeClass().addClass(cClass);
            $('#dao_title').removeClass().addClass(dClass);
            $('#dao_content').html(dao);
            $('#dao_content').removeClass().addClass(dClass);
            $('#dateInfo').html(gonglis[0].substring(2) + week.replace(/<[^>]+>/g, "") + " ������Ϣ");
        },
        complete: function (XHR, TS) {
            XHR = null
        }
    });
}

function isLeapYear(_oYear) {
    return (((_oYear % 4 === 0) && (_oYear % 100 !== 0)) || (_oYear % 400 === 0));
}

function monthDay(_oYear, _oMonth) {
    return [31, (isLeapYear(_oYear) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][_oMonth];
}

function changeMonthDay(_index) {
    var _pre = _index == 0 ? "s_" : "e_";
    var _daySel = _g(_pre + "day");
    _daySel.innerHTML = "";
    var _oYear = _g(_pre + "year").value;
    var _oMonth = _g(_pre + "month").value;
    var _monthDay = monthDay(_oYear, _oMonth - 1);
    for (_i = 0; _i < _monthDay; _i++) {
        var _o = new Option(_i + 1, _i + 1);
        _daySel.options.add(_o);
    }

    return true;
}

function clearTable(_o) {
    _o.innerHTML = "";
    return true;
}

function huangliinfo(name, evt) {
    //��ȡ���λ�� ����ʾͼ��
    var top = Math.ceil($(evt).offset().top);
    var left = Math.ceil($(evt).offset().left);
    $("#tip").css("left", (left + 2) + "px");
    $("#tip").css("top", (top + 20) + "px");
    $("#tip").show();
    $("#huangli_content").html(huangli[name]);
}

function unhuangliinfo() {
    $("#tip").hide();
    $("#huangli_content").html('');
}

$(document).ready(function () {
    init();
});

window.onerror = function () {
    return true;
};