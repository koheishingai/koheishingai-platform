/*
Author: Kohei Shingai
Requires: jquery
*/
(function() {
    "use strict"
    var init, _width, _height, _device, _browser, $logo, timer, logoPos;
    var socket = io.connect(":8082");
    _width = window.innerWidth;
    _height = window.innerHeight;
    _device = localStorage.getItem("device");
    _browser = localStorage.getItem("browser");
    $logo = $('.logo');
    logoPos = function(w, h){
      var h2 = (h - 184)/2;
      if(_device !== "iphone"){
        if (w > 580) {
          $logo.css("margin-top", "20px");
        }else{
          $logo.css("margin-top", h2-376);
        }
      }else{
        if (w > h) {
          $logo.css("margin-top", h2-132);
        }else{
          $logo.css("margin-top", h2-256);
        }
      }
    }
    init = function() {
      logoPos(_width, _height);
    };
    init();
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
