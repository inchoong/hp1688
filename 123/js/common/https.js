/**
 * https处理公共文件
 */
(function(){ var start = (new Date()).setFullYear(2016, 4, 26), end = (new Date()).setFullYear(2017, 2, 8), now = new Date(), nowTime = now.getTime(); if (nowTime < start || nowTime > end){ cookieSet('timeerror', 1); } else { cookieDel('timeerror'); } })();