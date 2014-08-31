/*
Author: Kohei Shingai
Requires: jquery
*/
(function() {
    "use strict"
    var _width_c, _width, _height, _device, _browser, _url, _timer, _timer_l, _cnt_l, $notify, $body, $logo, $card, $loading, $title, $title_l, $title_a, $search_w, $search_b, $side_nav, $menu_c, $content, $sidemenu, $rightmenu, $frame, $_c, init, logoPos, upAd, nLoad, iLoad, alertS, closeMenu, openMenu, notify, upCard, setCard;
    var socket_r = io.connect(":8080");
    var socket_w = io.connect(":8081");
    var socket_b = io.connect(":8082");
    _width = window.innerWidth;
    _width_c = 0;
    _height = window.innerHeight;
    _device = localStorage.getItem("device");
    _browser = localStorage.getItem("browser");
    _url = window.location.pathname;
    $logo = $('.logo');
    $card = $('.card');
    $loading = $('.loading');
    $title = $('title');
    $title_l = $('.title_l');
    $title_a = $('.logo a');
    $search_w = $('.search_w');
    $side_nav = $('.side-nav');
    $sidemenu = $('.sidemenu');
    $body = $('body');
    $menu_c = $('.menu_c');
    $content = $('.content');
    $search_b = $('.search_b');
    $notify = $('.notify');
    $rightmenu = $('.rightmenu');
    $frame = $('.frame');
    $_c = $('._c');
    setCard = function(){
      var width = $content.innerWidth() - 40;
      var height = $content.innerHeight() - 110;
      $_c.css({"height":height,"width":width,"top":10,"left":20});
    };
    upCard = function(){
      setCard();
    
    };
    notify = function(mes){
      $notify.text(mes).addClass("on");
      setTimeout(function(){
        $notify.removeClass("on");
      }, 1200);
    };
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
        $menu_c.removeClass("left_m_c"); 
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
        $title.text(title_l);
        $title_a.text(title_l);
        $title_l.text(title_l).removeClass("step4").addClass("step1");
      }else if(_cnt_l === 1){
        $title_l.removeClass("step1").addClass("step2");        
      }else if(_cnt_l === 2){
        $title_l.removeClass("step2").addClass("step3");
      }else if(_cnt_l === 3){
        $title_l.removeClass("step3").addClass("step4");
        if(_url !== "/"){
          $loading.fadeOut(function(){
            clearInterval(_timer_l);
            logoPos(_width, _height);
            upAd();
          });
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
        $title.text(title_l);
        $title_a.text(title_l);
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
    // Notify
    closeMenu = function(){
      $card.removeClass("up");
      $menu_c.addClass("left_m_c");    
    };
    openMenu = function(){
    
    };
    $menu_c.click(function(){
      var text = $(this).text();
      closeMenu();
      notify(text);
      upCard();
    });
    $sidemenu.click(function(){
      var text = $(this).text();
      closeMenu();
      notify(text);
      upCard();  
    });
    $rightmenu.click(function(){
      var text = $(this).text();
      closeMenu();
      notify(text);
      $frame.fadeOut(function(){
        $notify.fadeOut(function(){
           
        });
      });    
    });
    $search_b.keydown(function(){
      closeMenu();
    });
})();
