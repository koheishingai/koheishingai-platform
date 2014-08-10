/*
Author: Kohei Shingai
Requires: jquery
*/
(function() {
    "use strict"
    var init, _width, _height, upAd, _device, _browser, _url, $logo, $card, $loading, $title_l, timer, logoPos;
    var socket_r = io.connect(":8080");
    var socket_w = io.connect(":8081");
    var socket_b = io.connect(":8082");
    _width = window.innerWidth;
    _height = window.innerHeight;
    _device = localStorage.getItem("device");
    _browser = localStorage.getItem("browser");
    _url = window.location.pathname;
    $logo = $('.logo');
    $card = $('.card');
    $loading = $('.loading');
    $title_l = $('.title_l');
    upAd = function(){
      setTimeout(function(){
        $card.addClass("up");
      }, 420);
    };
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
    init = function(){
      var cnt = 0;
      var timer_l = setInterval(function(){
        if(cnt === 0){
          $title_l.removeClass("step4").addClass("step1");
        }else if(cnt === 1){
          $title_l.removeClass("step1").addClass("step2");        
        }else if(cnt === 2){
          $title_l.removeClass("step2").addClass("step3");
        }else if(cnt === 3){
          $title_l.removeClass("step3").addClass("step4");
          if(_url !== "/"){
            cnt = -1;
          }else{
            $loading.fadeOut(function(){
              clearInterval(timer_l);
              logoPos(_width, _height);
              upAd();
            });
          }
        }
        cnt++;
      }, 730);
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
