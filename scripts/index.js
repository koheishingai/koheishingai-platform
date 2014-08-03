/*
Author: Kohei Shingai
Requires: jquery
*/
(function() {
    "use strict"
    var init, _width, _height, _device, _browser, $card, $logo, upcard, timer, logoPos;
    var socket = io.connect(":8082");
    _width = window.innerWidth;
    _height = window.innerHeight;
    _device = localStorage.getItem("device");
    _browser = localStorage.getItem("browser");
    $card = $('.card');
    $logo = $('.logo');
    logoPos = function(w, h){
      var h2 = (h - 184)/2;
      if(_device !== "iphone"){
        if (w > 580) {
          $logo.css("margin-top", "20px");
        }else{
          $logo.css("margin-top", h2);
        }
      }else{
        if (w > h) {
          $logo.css("margin-top", h2-132);
        }else{
          $logo.css("margin-top", h2-256);
        }
      }
    }
    upcard = function() {
        setTimeout(function() {
            $card.addClass("up");
        }, 502);
    };
    init = function() {
        upcard();
        logoPos(_width, _height);
    };
    init();
    $card.click(function() {
        setTimeout(function() {
            $card.addClass("cli");
            setTimeout(function() {
                $card.removeClass("cli");
                setTimeout(function() {
                    location.href = "/portfolio/create";
                }, 233);
            }, 260);
        }, 152);
    });
    $(window).resize(function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        if (timer !== false) {
            clearTimeout(timer)
        }
        timer = setTimeout(function() {
            logoPos(width, height);
        }, 100)
    });
})();
