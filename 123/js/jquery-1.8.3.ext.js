$.extend({
    loadJs : function(_url, _callback) {
        var callback = arguments[1] ||
        function() {
        };
        var _script = jQuery.loadElem("SCRIPT");
        _script.setAttribute("type", "text/javascript");
        _script.setAttribute("src", _url);
        document.getElementsByTagName("head")[0].appendChild(_script);
        if (document.all) {
            _script.onreadystatechange = function() {
                if (/onload|loaded|complete/.test(_script.readyState)) {
                    callback && callback();
                }
            };
        } else {
            _script.onload = function() {
                callback();
            };
        }
    },
    loadElem : function(_tag) {
        return document.createElement(_tag);
    },
    loadHref : function(_url, _open) {
        if (jQuery.type(_open) == "undefined")
            window.location.href = _url;
        else
            window.open(_url);
    },
    _get : function(key) {
        var query = location.search;
        var reg = new RegExp(key + "=(.*?)(#|&|$)");
        var arr = query.match(reg);
        return (arr != null) ? arr[1] : ""
    }
});
