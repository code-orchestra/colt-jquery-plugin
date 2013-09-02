(function ($) {

    var assetsUpdated = [];
    var cssUpdated = [];
    var functionsUpdated = [];

    if (LiveCodingUtil) {
        LiveCodingUtil.addListener("onLiveCodeUpdate", function (e) {
            var isCode;
            var isImg;
            var isCss;
            var fnUpdated;

            assetsUpdated = [];// todo: наполнить
            cssUpdated = [];// todo: наполнить
            functionsUpdated = [];// todo: наполнить

            $(window).trigger("liveUpdate")// any update

            if (isCode) {
                $(window).trigger("codeUpdate")//if code]
                //разослать событие для отдельных функций
                for (var i = 0; i < fnListeners.length; i++) {
                    if (fnListeners[i][0] == fnUpdated) {
                        fnListeners[i][1].call(fnUpdated);
                    }
                }
            } else {
                $(window).trigger("assetsUpdate")// assets code
                if (img) {
                    $(window).trigger("imageUpdate")//if image
                } else {
                    $(window).trigger("cssUpdate")//if css
                }
            }
        });
    }

    var update = function (domain) {
        if (assetsUpdated.length) {
            $("img").each(function () {
                var src = $(this).attr("src");
                if (assetsUpdated.indexOf(src) != -1) {
                    $(this).assetsUpdate();
                }
            });
        }
        if (cssUpdated.length) {
            for(var i=0; i< cssUpdated.length;i++){
                $("<link/>", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: cssUpdated[i]
                }).appendTo("head");
            }
        }
        return domain;
    }

    var fnListeners = [];

    $.fn.liveUpdate = function (fn) {
        if (arguments.length > 0) {
            return $(window).bind("liveUpdate", fn);
        } else {
            return update(window);
        }
    };

    $.fn.codeUpdate = function (fn) {
        if (arguments.length > 0) {
            if (typeof this == "function") {
                fnListeners.push([this, fn])
            }
            return $(window).bind("codeUpdate", fn);
        } else {
            //exception?
        }
    };

    $.fn.assetsUpdate = function (fn) {
        if (arguments.length > 0) {
            return $(window).bind("assetsUpdate", fn);
        } else {
            return update(window);
        }
    };

    $.fn.cssUpdate = function (fn) {
        if (arguments.length > 0) {
            return $(window).bind("cssUpdate", fn);
        } else {
            return update(window);
        }
    };

    $.fn.imageUpdate = function (fn) {
        if (arguments.length > 0) {
            return $(this).bind("imageUpdate", fn);
        } else {
            $(this).attr("src", $(this).attr("src" + "?" + (new Date().getTime())))
        }
    };

})(jQuery);