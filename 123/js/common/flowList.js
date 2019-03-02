/**
 * Created by zhoucy on 2017/5/24.
 */
var upParam = {
    pgnum : -1,
    idx : 0
};

var downParam = {
    pgnum : 1,
    idx : 0
};

var flowList = {
    page: 0,
    //接入广告，默认取新闻的shouye模块
    domain: 'shouye',
    getUrl: function() {
        var dataUrl = '';
        dataUrl = 'http://newsapicom.dftoutiao.com/newsapi_pc/newsjp02';
        dataUrl += '?type=' + flowList.param.type;
        dataUrl += '&qid=' + flowList.param.qid;
        dataUrl += '&startkey=' + flowList.param.startkey;
        dataUrl += '&newkey=' + flowList.param.newkey;
        dataUrl += '&newsnum=' + flowList.param.newsnum;
        dataUrl += '&pgnum=' + flowList.param.pgnum;
        dataUrl += '&uid=' + flowList.param.uid;
        dataUrl += '&idx=' + flowList.param.idx;
        dataUrl += '&position=' + flowList.param.position;
        return dataUrl;
    },
    channelMap: {
        'shouye': 'toutiao',
        'china': 'guonei',
        'world': 'guoji',
        'society': 'shehui',
        'junshi': 'junshi',
        'yule': 'yule',
        'sport': 'tiyu',
        'nba': 'nba',
        'fashion': 'shishang',
        'health': 'jiankang',
        'shuma': 'shuma',
        'life': '',
        'youxi': 'youxi',
        'car': 'qiche',
        'finance': 'caijing',
        'keji': 'keji',
        'video':''
    },
    setParam: function(param){
        flowList.param.type = flowList.channelMap[flowList.domain];
        if(param && param.startkey) {
            flowList.param.startkey = param.startkey;
        }
        if(param && param.newkey !== undefined) {
            flowList.param.newkey = param.newkey;
        }
        if(param && param.pgnum) {
            flowList.param.pgnum = param.pgnum;
        }
        if(param && param.idx !== undefined ) {
            flowList.param.idx = param.idx;
        }
        var uid = cookieGet('newsFakeUid');
        if(!uid) {
            uid = randomString(32);
            cookieSet('newsFakeUid', uid, 86400*5000, '/', 'tools.2345.com');
        }
        flowList.param.uid = uid;

        flowList.param.position = encodeURI(unescape(cookieGet('wc_n'))) || '上海';
    },
    param: {
        type: 'toutiao',
        startkey : '',
        qid : '01530',
        newkey : '',
        pgnum : 1,
        idx : 0,
        newsnum: 10,
        position : ''
    },
    // 当前页面所展示了那些页数的内容
    showQueue: [],
    bdAdFrames: {
        'shouye': 'http://www.2345.com/ad/news_620_121_3093676.html',
        'china': 'http://www.2345.com/ad/news_620_121_3093803.html',
        'world': 'http://www.2345.com/ad/news_620_121_3093809.html',
        'society': 'http://www.2345.com/ad/news_620_121_3094951.html',
        'junshi': 'http://www.2345.com/ad/news_620_121_3095451.html',
        'yule': 'http://www.2345.com/ad/news_620_121_3095459.html',
        'sport': 'http://www.2345.com/ad/news_620_121_3095486.html',
        'nba': 'http://www.2345.com/ad/news_620_121_3095493.html',
        'fashion': 'http://www.2345.com/ad/news_620_121_3095499.html',
        'health': 'http://www.2345.com/ad/news_620_121_3095506.html',
        'shuma': 'http://www.2345.com/ad/news_620_121_3095510.html',
        'life': 'http://www.2345.com/ad/news_620_121_3095512.html',
        'youxi': 'http://www.2345.com/ad/news_620_121_3095516.html',
        'car': 'http://www.2345.com/ad/news_620_121_3095518.html',
        'finance': 'http://www.2345.com/ad/news_620_121_3095524.html',
        'keji': 'http://www.2345.com/ad/news_620_121_3095527.html'
    },
    bdAdIds: {
        'shouye': 'u3093676',
        'china': 'u3093803',
        'world': 'u3093809',
        'society': 'u3094951',
        'junshi': 'u3095451',
        'yule': 'u3095459',
        'sport': 'u3095486',
        'nba': 'u3095493',
        'fashion': 'u3095499',
        'health': 'u3095506',
        'shuma': 'u3095510',
        'life': 'u3095512',
        'youxi': 'u3095516',
        'car': 'u3095518',
        'finance': 'u3095524',
        'keji': 'u3095527',
        'video':'u3127065'
    },
    bdAdBlock: 'bd_block_',    // 追加 page_index

    //“为您推荐xx条新闻”显示和隐藏（3秒后）
    recommend: $('#J_showtime'),
    recommendShowAndHide: function () {
        if (window.XMLHttpRequest) {
            $(this.recommend).slideDown(500);
            var _this = this;
            setTimeout(function () {
                $(_this.recommend).slideUp(500);
            }, 3000);
        }
    },

    //5分钟后没有其他刷新操作则显示“您有未读新闻&nbsp;&nbsp;点击查看”,5*60*1000=300000
    topTips: $('.v-tips-box'),
    topTipsTimeoutId: '',
    topTipsShow: function () {
        if (window.XMLHttpRequest) {
            this.topTipsTimeoutId = setTimeout(function () {
                $(flowList.topTips).show();
                $(window).scroll(function(){
                    if ($(window).scrollTop()>=$('.mod-flow').offset().top){
                        $('.v-fixed-tips').addClass('v-fixed-tips-active');
                    }
                    else{
                        $('.v-fixed-tips').removeClass('v-fixed-tips-active');
                    }
                });
            }, 300000);
        }
    },
    //点击横条刷新
    topTipsRefresh: function () {
        var _this = this;
        $(flowList.topTips).find('a').bind('click', function () {
            _this.refresh();

            //顶部横条点击事件清除定时id，同时隐藏横条，并重置定时id
            clearTimeout(_this.topTipsTimeoutId);
            $(flowList.topTips).hide();
            _this.topTipsShow();
        });
    },

    //中间“您之前看到这里&nbsp;&nbsp;点击刷新”点击刷新页面
    midTips: $('.item-tips-con'),
    midTipsShow: function () {
        var _this = this;
        $(flowList.midTips).bind('click', function () {
            flowList.refresh();

            //中间横条点击事件清除定时id，同时隐藏顶部横条，并且重置定时id
            clearTimeout(_this.topTipsTimeoutId);
            $(flowList.topTips).hide();
            _this.topTipsShow();
        });
    },

    //下拉显示一组数据(每次下拉显示一组数据），同时发送曝光统计
    isOnly: false,
    scrollShow: function () {
        $(window).bind('scroll', function () {
            //滚动事件首先清除定时id，同时滚动之后重置定时id
            clearTimeout(flowList.topTipsTimeoutId);
            flowList.topTipsShow();

            var scroll = $(window).scrollTop();
            var documentHeight = $(document).height();
            var windowHeight = $(window).height();
            var footerHeight = $('.footer').height();

            if ((scroll + windowHeight) >= (documentHeight - footerHeight - 60)) {
                if (!flowList.isOnly) {
                    flowList.isOnly = true;
                    flowList.getAndShowScrollScreen(flowList.page++);
                }
            }
        });
    },
    getAndShowScrollScreen: function (page) {
        flowList.setParam(downParam);
        $.ajax({
            type: 'get',
            url: flowList.getUrl(),
            dataType: 'jsonp',
            scriptCharset: 'utf-8',
            timeout: 6000,
            success: function (data) {
                flowList.setParam({
                    startkey: data.endkey,
                    newkey: data.newkey,
                    pgnum: (downParam.pgnum += 1),
                    idx: (downParam.idx += flowList.param.newsnum)
                });
                if (data.data == '') {
                    //flowList.getOldinterface('emptyData', page, 2);
                    flowList.getAndShowFirstScreen(page);
                } else {
                    var html = '';
                    var $ul = $('ul.flow-list');
                    var newUl = '<ul class="flow-list" id="admin-page-' + page + '"></ul>';
                    $($ul).last().after(newUl);
                    var bdAdBlocks = new Array;
                    $(data.data).each(function (index, data) {
                        var clkStr = '';
                        // 4, 3, 1图片展示
                        if(data.miniimg02_size == 0 && data.miniimg_size > 0) {
                            data.miniimg02_size = data.miniimg_size;
                            data.miniimg02 = data.miniimg;
                        }

                        if (data.miniimg02_size >= 1 && data.miniimg02_size < 3) {
                            clkStr = 'cc(\'xxl_index_rili\');';
                            html += flowList.addSigleItem(data, clkStr);
                        } else if(data.miniimg02_size >= 3 && data.miniimg02_size <= 4) {
                            clkStr = 'cc(\'xxl_index_rili\');';
                            html += flowList.addMultiItem(data, clkStr);
                        }

                        //广告
                        if((index + 1) == 2 || (index + 1) == 4 || (index + 1) == 7 || (index + 1) == 9  || (index + 1) == 5  || (index + 1) == 10 ) {
                            html += flowList.addAdBlock(flowList.domain, page + "_" + index);
                            bdAdBlocks.push(flowList.bdAdBlock + page + "_" + index);
                        }
                    });

                    $('ul.flow-list:last').append(html);
                    if ((bdAdBlocks.length > 0) && (typeof(BAIDU_CLB_fillSlotAsync) === 'function')) {
                        $.each(bdAdBlocks, function (index, elem) {
                            if(index == 0 || index == 2 || index == 3 || index == 5) {
                                BAIDU_CLB_fillSlotAsync('u3188155', elem);
                            } else {
                                BAIDU_CLB_fillSlotAsync('u3188153', elem); //flowList.bdAdIds[flowList.domain]
                            }
                        })
                    }

                    flowList.isOnly = false;
                }
            },
            complete: function(XMLHttpRequest, status) {
                if ('timeout' === status || 'error' === status) {
                    //请求超时
                    flowList.setParam({
                        pgnum: (downParam.pgnum += 1),
                        idx: (downParam.idx += flowList.param.newsnum)
                    });
                    //flowList.getOldinterface('errorData', page, 2);
                    // flowList.getAndShowScrollScreen(page);
                }
            }
        });
    },
    addSigleItem: function (data, clkStr) {
        var html = '';
        html += '<li class="item">';
        html += '<a target="_blank" href="' + data.url + '" onclick="' + clkStr + '">';
        html += '<div class="flow-list-img">';
        html += '<img src="' + data.miniimg02[0].src + '" >';
        if (data.duration)
        {
            html += '<span class="v-time"><em class="time-icon"></em>' + data.duration + '</span>';
        }
        html += '</div>';
        html += '<div class="flow-list-con">';
        html += '<div class="title">' + data.topic + '</div>';
        html += '<div class="extra">';
        if(flowList.domain == 'shouye') {
            html += '<span class="tag">' + data.tpch + '</span>';
        }
        html += '<span class="from">来源：' + data.source + '</span>';
        html += '<span class="time">' + flowList.timeFormate(data.date) + '</span>';
        html += '</div>';
        html += '</div>';
        html += '</a>';
        html += '<div class="close-interest"><i></i>不感兴趣</div>';
        html += '</li>';
        return html;
    },
    addMultiItem: function (data, clkStr) {
        var html = '';
        html += '<li class="item-wi">';
        html += '<a target="_blank" href="' + data.url + '" onclick="' + clkStr + '">';
        html += '<div class="title">' + data.topic + '';
        html += '</div>';
        html += '<dl class="pic-group">';
        html += '<dd class="pic">';
        html += '<img style="width:100%" src="' + data.miniimg02[0].src + '">';
        html += '</dd>';
        html += '<dd class="pic">';
        html += '<img style="width:100%" src="' + data.miniimg02[1].src + '">';
        html += '</dd>';
        html += '<dd class="pic">';
        html += '<img style="width:100%" src="' + data.miniimg02[2].src + '">';
        html += '</dd>';
        if(data.miniimg02[3]) {
            html += '<dd class="pic">';
            html += '<img style="width:100%" src="' + data.miniimg02[3].src + '">';
            html += '</dd>';
        } else {
            html += '<dd class="pic"><span class="morelink">查看详情&gt;&gt;</span></dd>';
        }
        html += '</dl>';
        html += '<div class="extra">';
        if(flowList.domain == 'shouye') {
            html += '<span class="tag">' + data.tpch + '</span>';
        }
        html += '<span class="from">来源：' + data.source + '</span>';
        html += '<span class="time">' + flowList.timeFormate(data.date) + '</span>';
        html += '</div>';
        html += '</a>';
        html += '<div class="close-interest"><i></i>不感兴趣</div>';
        html += '</li>';
        return html;
    },
    addAdBlock: function (domain, pos) {
        var html = '';
        if (domain && pos) {
            html += '<li class="itemgg"><div id="bd_block_' + pos + '"></div></li>';
        }
        else {
            html += '<li class="itemgg"><div><iframe width="620" height="121" scrolling="no" frameborder="0" src="' + flowList.bdAdFrames[domain] + '" ></iframe></div></li>';
        }

        return html;
    },
    firstScreen: function() {
        var page = flowList.page++;
        flowList.setParam(downParam);
        $.ajax({
            type: 'get',
            url: flowList.getUrl(),
            dataType: 'jsonp',
            scriptCharset: 'utf-8',
            timeout: 6000,
            success: function (data) {
                if (!(data.data == '')) {
                    flowList.setParam({
                        startkey: data.endkey,
                        newkey: data.newkey,
                        pgnum: (downParam.pgnum += 1),
                        idx: (downParam.idx += flowList.param.newsnum)
                    });
                    var newUl = '<ul style="display:none;" class="flow-list" id="admin-page-' + page + '"></ul>';
                    flowList.topTips.after(newUl);
                    var html = '';
                    var bdAdBlocks = new Array();
                    $(data.data).each(function (index, data) {
                        var clkStr = '';
                        // 4, 3, 1图片展示
                        if(data.miniimg02_size == 0 && data.miniimg_size > 0) {
                            data.miniimg02_size = data.miniimg_size;
                            data.miniimg02 = data.miniimg;
                        }

                        if (data.miniimg02_size >= 1 && data.miniimg02_size < 3) {
                            clkStr = 'cc(\'xxl_index_rili\');';
                            html += flowList.addSigleItem(data, clkStr);
                        } else if(data.miniimg02_size >= 3 && data.miniimg02_size <= 4) {
                            clkStr = 'cc(\'xxl_index_rili\');';
                            html += flowList.addMultiItem(data, clkStr);
                        } else {
                            return ;
                        }

                        //广告
                        if((index + 1) == 2 || (index + 1) == 4 || (index + 1) == 7 || (index + 1) == 9  || (index + 1) == 5  || (index + 1) == 10 ) {
                            html += flowList.addAdBlock(flowList.domain, page + "_" + index);
                            bdAdBlocks.push(flowList.bdAdBlock + page + "_" + index);
                        }
                    });

                    $('ul.flow-list:first').append(html);
                    if ((bdAdBlocks.length > 0) && (typeof(BAIDU_CLB_fillSlotAsync) === 'function')) {
                        $.each(bdAdBlocks, function (index, elem) {
                            if(index == 0 || index == 2 || index == 3 || index == 5) {
                                BAIDU_CLB_fillSlotAsync('u3188155', elem);
                            } else {
                                BAIDU_CLB_fillSlotAsync('u3188153', elem); //flowList.bdAdIds[flowList.domain]
                            }
                        })
                    }
                    // 不是ie6显示横条
                    if (window.XMLHttpRequest) {
                        // 显示横条
                        flowList.showMiddleBar();
                    }
                    flowList.recommendShowAndHide();
                    flowList.showAndPosition(0);
                }
            },
            complete: function(XMLHttpRequest, status) {
                if ('timeout' === status || 'error' === status) {
                    //请求超时
                    flowList.setParam({
                        pgnum: (downParam.pgnum += 1),
                        idx: (downParam.idx += flowList.param.newsnum)
                    });
                }
            }
        });
    },

    refresh: function () {
        // 显示第一屏
        flowList.getAndShowFirstScreen(flowList.page++)
            .then(function () {
                //回到顶部首页banner下方或其他也页tab下方，同时显示“为您xxx”
                flowList.recommendShowAndHide();
                flowList.showAndPosition();
            });

    },
    firstRefresh: function () {
        // 显示第一屏
        flowList.getAndShowFirstScreen(flowList.page++)
            .then(function () {
                //回到顶部首页banner下方或其他也页tab下方，同时显示“为您xxx”
                flowList.recommendShowAndHide();
                $('ul.flow-list').show();
                $(window).scrollTop(0);
            });

    },
    showAndPosition: function () {
        $('ul.flow-list').show();
        //回到顶部首页banner下方或其他也页tab下方，同时显示“为您xxx”
       var headerHeight = $('#touTiaoTitle').offset().top;

        if (!isLoad) {
            $(window).scrollTop(headerHeight);
        }
        isLoad = false;
    },
    showMiddleBar: function () {
        var midTips = $('#item-tips-admin');
        var midTipsClone = midTips.clone(true);
        midTips.remove();
        //中间提示横条
        $('ul.flow-list:first').append(midTipsClone);
        $('#item-tips-admin').show();
    },
    getAndShowFirstScreen: function (page, ad) {
        flowList.setParam(upParam);
        return $.ajax({
            type: 'get',
            url: flowList.getUrl(),
            dataType: 'jsonp',
            scriptCharset: 'utf-8',
            timeout: 6000,
            success: function (data) {
                flowList.setParam({
                    startkey: data.endkey,
                    newkey: data.newkey,
                    pgnum: (upParam.pgnum -= 1),
                    idx: (upParam.idx -= flowList.param.newsnum)
                });

                if (data.data == '') {
                    //flowList.getOldinterface('emptyData', page);
                    flowList.getAndShowFirstScreen(page, ad);
                }
                else {
                    var newUl = '<ul style="display:none;" class="flow-list" id="admin-page-' + page + '"></ul>';
                    flowList.topTips.after(newUl);
                    var html = '';
                    var bdAdBlocks = new Array();
                    $(data.data).each(function (index, data) {
                        var clkStr = '';
                        // 4, 3, 1图片展示
                        if(data.miniimg02_size == 0 && data.miniimg_size > 0) {
                            data.miniimg02_size = data.miniimg_size;
                            data.miniimg02 = data.miniimg;
                        }

                        if (data.miniimg02_size >= 1 && data.miniimg02_size < 3) {
                            clkStr = 'cc(\'xxl_index_rili\');';
                            html += flowList.addSigleItem(data, clkStr);
                        } else if(data.miniimg02_size >= 3 && data.miniimg02_size <= 4) {
                            clkStr = 'cc(\'xxl_index_rili\');';
                            html += flowList.addMultiItem(data, clkStr);
                        }

                        //广告
                        if((index + 1) == 2 || (index + 1) == 4 || (index + 1) == 7 || (index + 1) == 9  || (index + 1) == 5  || (index + 1) == 10 ) {
                            html += flowList.addAdBlock(flowList.domain, page + "_" + index);
                            bdAdBlocks.push(flowList.bdAdBlock + page + "_" + index);
                        }
                    });

                    $('ul.flow-list:first').append(html);
                    if ((bdAdBlocks.length > 0) && (typeof(BAIDU_CLB_fillSlotAsync) === 'function')) {
                        $.each(bdAdBlocks, function (index, elem) {
                            if(index == 0 || index == 2 || index == 3 || index == 5) {
                                BAIDU_CLB_fillSlotAsync('u3188155', elem);
                            } else {
                                BAIDU_CLB_fillSlotAsync('u3188153', elem); //flowList.bdAdIds[flowList.domain]
                            }
                        })
                    }

                    // 不是ie6显示横条
                    if (window.XMLHttpRequest) {
                        // 显示横条
                        flowList.showMiddleBar();
                    }
                }
            },
            complete: function(XMLHttpRequest, status) {
                if ('timeout' === status || 'error' === status) {
                    //请求超时
                    flowList.setParam({
                        pgnum: (downParam.pgnum += 1),
                        idx: (downParam.idx += flowList.param.newsnum)
                    });
                }
            }
        });
    },
    timeFormate: function(time) {
        var n = (new Date).getTime()
            , e = new Date(1e3 * time)
            , a = (n - e.getTime()) / 1e3
            , r = parseInt(a / 60 / 60)
            , i = parseInt(a / 60) - 60 * r
            , o = "";
        return r >= 24 ? parseInt(r / 24) + "天前" : r > 0 ? o += r + "小时前" : i > 0 ? o += i + "分钟前" : 0 == r && 0 == i ? o += "刚刚" : void 0;
    },
    closeSelf: function (obj){
        $(obj).parent().parent().css('display','none');
    }
};

var isLoad = true;
var refreshIng = false;
var reqtimes = 1;
$(function () {
    // 初始化参数
    flowList.setParam(upParam);

    //没有操作时定时显示顶部横条“您有xxx”
    flowList.topTipsShow();

    //为顶部横条绑定事件
    flowList.topTipsRefresh();
    //中间横条绑定事件
    flowList.midTipsShow();

    flowList.firstScreen();
    flowList.firstRefresh();

    //下拉事件
    flowList.scrollShow();

    $('.mod-flow').on('click', '.close-interest', function(){
        $(this).closest('li').remove();
    });

});

function randomString(len) {
    len = len || 32;
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
