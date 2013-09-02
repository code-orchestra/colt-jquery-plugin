/*
 Предлагается отслеживать изменения ассетов, css, кода через jquery синтаксис

 {code}
 $(window).liveUpdate(function(e){
 // любое событие COLT
 })

 $(window).assetUpdate(function(e){
 // обновление всех ассетов в window
 $(window).assetUpdate(); //обновить все ассеты в window
 })

 $("#my-img").assetUpdate(function(e){
 // обновление конкретного IMG
 $(this).assetUpdate(); // обновить только этот IMG
 })

 $(window).codeUpdate(function(e){
 //обновление функций
 })

 $(fnRef).codeUpdate(function(e){
     //обновление конкретной функции
 })

 $(window).cssUpdate(function(e){
 // обновление css в документе или в файле
 $(window).cssUpdate(); // обновить все стили
 })

 {code}

 */

(function( $ ) {

    if(LiveCodingUtil){
        LiveCodingUtil.addListener("onLiveCodeUpdate", function(e){
            // должен получить ссылку на функцию(и) которые обновились
            // должен найти подписчиков на конкретно эту функцию и разослать событие $(fn).trigger("codeUpdate")

            $(window).trigger("liveUpdate")// if code
            $(window).trigger("assetUpdate")// assets code
            $(window).trigger("cssUpdate")//if css
            $(window).trigger("imgUpdate")//if css
            $(window).trigger("codeUpdate")//if code
        });
    }

    var update = function(domain, options){

    }

    $.fn.liveUpdate = function(fn) {
        if(arguments.length > 0){
            return $(window).bind("liveUpdate", fn);
        }else{
            return update(window, {code: true, css:true, img: true})
        }
    };

    $.fn.codeUpdate = function(fn) {
        if(this != window) return $(window).codeUpdate(fn);
        if(arguments.length > 0){
            return $(window).bind("codeUpdate", fn);
        }else{
            return update(window, {code: true})
        }
    };

    $.fn.assetUpdate = function(fn) {
        if(arguments.length > 0){
            return $(window).bind("assetUpdate", fn);
        }else{
            return update(window, {css: true, img: true})
        }
    };

    $.fn.cssUpdate = function(fn) {
        if(arguments.length > 0){
            return $(window).bind("cssUpdate", fn);
        }else{
            return update(window, {css: true})
        }
    };

})( jQuery );