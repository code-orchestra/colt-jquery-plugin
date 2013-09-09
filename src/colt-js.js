(function ($) {

    var assetsUpdated = [];
    var functionsUpdated = [];
	
	var collectUpdatedAssets = function (selector, attrName) {
		var result = [];
        if (assetsUpdated.length > 0) {
            $(selector).each(function () {
                var src = $(this).attr(attrName).split("?")[0];
				var updated = false;
				for (var i = 0; i < assetsUpdated.length; i++) {
					// src is actual content of src attribute
					// assetsUpdated[i] is image path rel. to project root
					// this check will break if there are "../" in the src
					if (assetsUpdated[i].indexOf(src) > -1) {
						updated = true; break;
					}
				}
                if (updated) {
                    result.push ( $(this) );
                }
            });
        }
		return result;
	};
	
	var updateUrlsInSelection = function (jqobj, selector, attrName) {
        jqobj.filter(selector).each(function () {
            $(this).attr(attrName, $(this).attr(attrName).split("?")[0] + "?d=" + (new Date()).valueOf() );
		});
	};

    if (top["LiveCodeRegistry"] != undefined) {
        top.LiveCodeRegistry.getInstance().addEventListener ("codeUpdate", function (e) {
        	// e.methods -> changed methods references
			functionsUpdated = e.methods;

			$(window).trigger("liveUpdate", [[e.source]]);
            $(window).trigger("codeUpdate");
			
            // разослать событие для отдельных функций
			for (var i = 0; i < fnListeners.length; i++) {
				var jqobj = fnListeners[i];
				for (var j = 0; j < functionsUpdated.length; j++) {
					var method = functionsUpdated[j];
					if (method == jqobj.selector) {
						jqobj.trigger("codeUpdate");
					}
				}
			}
        });

        top.LiveCodeRegistry.getInstance().addEventListener ("assetUpdate", function (e) {
        	// e.sources -> relative path to assets
			assetsUpdated = e.sources;

			$(window).trigger("liveUpdate", [e.sources]);
			$(window).trigger("assetUpdate", [e.sources]);

			collectUpdatedAssets("img", "src").forEach (function (image) {
//				image.trigger("liveUpdate");
//				image.trigger("assetUpdate");
				
				image.trigger("imageUpdate");
			});

			collectUpdatedAssets("link", "href").forEach (function (style) {
//				style.trigger("liveUpdate");
//				style.trigger("assetUpdate");
				
				style.trigger("cssUpdate");
			});
        });
    }

    var fnListeners = [];

    $.fn.liveUpdate = function (fn) {
        if (arguments.length > 0) {
            return $(this).bind("liveUpdate", fn);
        } else {
			this.codeUpdate();
            this.assetUpdate();
			return this;
        }
    };

    $.fn.codeUpdate = function (fn) {
        if (arguments.length > 0) {
            if (typeof this.selector == "function") {
                fnListeners.push(this);
				top.LiveCodeRegistry.getInstance().trackMethod(this.selector);
            }
            return $(this).bind("codeUpdate", fn);
        } else {
            // todo: nothing?
			return this;
        }
    };

    $.fn.assetUpdate = function (fn) {
        if (arguments.length > 0) {
            return $(this).bind("assetUpdate", fn);
        } else {
            this.cssUpdate();
			this.imageUpdate();
			return this;
        }
    };

    $.fn.cssUpdate = function (fn) {
        if (arguments.length > 0) {
            return $(this).bind("cssUpdate", fn);
        } else {
/*
                $("<link/>", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: cssUpdated[i]
                }).appendTo("head");
*/
			// find and update all styles in selection
			updateUrlsInSelection(this, "link", "href");
			return this;
        }
    };

    $.fn.imageUpdate = function (fn) {
        if (arguments.length > 0) {
            return $(this).bind("imageUpdate", fn);
        } else {
			// find and update all images in selection
			updateUrlsInSelection(this, "img", "src");
			return this;
        }
    };

})(jQuery);