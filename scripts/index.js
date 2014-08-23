/*
Author: Kohei Shingai
Requires: jquery
*/
(function() {
    "use strict"
    var _width, _height, _device, _browser, _url, _timer, _timer_l, _cnt_l, $body, $logo, $card, $loading, $title_l, $search_w, $side_nav, init, logoPos, upAd, nLoad, iLoad, alertS;
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
    $search_w = $('.search_w');
    $side_nav = $('.side-nav');
    $body = $('body');
    alertS = function(){
      if(_device === "iphone" && _browser === "safari"){
        var height = (0 - _height) + 80;
        setTimeout(function(){
          $body.css("background", "#eee");
          $side_nav.css("margin-top", height);
        }, 90);
      }
    };
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
          $logo.css("margin-top", h2-154);
          $search_w.hide();
        }else{
          $logo.css("margin-top", h2-256);
          $search_w.show();
        }
      }
    };
    nLoad = function(title_l){
      if(_cnt_l === 0){
        $title_l.text(title_l).removeClass("step4").addClass("step1");
      }else if(_cnt_l === 1){
        $title_l.removeClass("step1").addClass("step2");        
      }else if(_cnt_l === 2){
        $title_l.removeClass("step2").addClass("step3");
      }else if(_cnt_l === 3){
        $title_l.removeClass("step3").addClass("step4");
        if(_url !== "/"){
          _cnt_l = -1;
        }else{
          $loading.fadeOut(function(){
            clearInterval(_timer_l);
            logoPos(_width, _height);
            upAd();
          });
        }
      }
    };
    iLoad = function(title_l){
      if(_cnt_l === 0){
        $title_l.html(title_l);
      }else if(_cnt_l === 1){
               
      }else if(_cnt_l === 2){
        
      }else if(_cnt_l === 3){
        
        if(_url !== "/"){
          _cnt_l = -1;
        }else{
          logoPos(_width, _height);
          $loading.fadeOut(function(){
            clearInterval(_timer_l);
            upAd();
            alertS();
          });
        }
      }
    };
    init = function(){
      _cnt_l = 0;
      _timer_l = setInterval(function(){
        if(_url === "/"){
          var title_l = "Kohei Shingai";
        }else{
          var title_l = _url.split("/").join("");
              title_l = title_l.split("_").join(" ");
        }
        if(_device !== "iphone"){
          nLoad(title_l);
        }else{
          iLoad(title_l+"<div>Now Loading</div>");
        }
        _cnt_l++;
      }, 730);
    };
    init();
    $(window).resize(function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        if (_timer !== false) {
            clearTimeout(_timer)
        }
        _timer = setTimeout(function() {
            logoPos(width, height);
        }, 100)
    });
})();
