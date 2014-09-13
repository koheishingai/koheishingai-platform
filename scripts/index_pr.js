/*
Author: Kohei Shingai
Requires: jquery
*/
(function() {
    "use strict"
    var DOWNC, _data, _text, _width_c, _width, _height, _device, _browser, _url, _timer, _timer_l, _cnt_l, $close, $notify, $body, $logo, $card, $loading, $title, $title_l, $title_a, $search_w, $search_b, $side_nav, $main_c, $menu_c, $content, $sidemenu, $rightmenu, $frame, $_c, init, logoPos, upAd, nLoad, iLoad, alertS, closeMenu, openMenu, notify, upCard, setCard, addHash, changeC;
    var socket_r = io.connect(":8080");
    var socket_w = io.connect(":8081");
    var socket_b = io.connect(":8082");
    DOWNC = "down_c";
    _width = window.innerWidth;
    _width_c = 0;
    _height = window.innerHeight;
    _device = localStorage.getItem("device");
    _browser = localStorage.getItem("browser");
    _url = window.location.pathname;
    _text = "";
    _data = "";
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
    $close = $('.close');
    $main_c = $('.main_c');
    changeC = function(){
      if(_data !== ""){
        var $elm = $("."+_data + "_c");
        $elm.removeClass(DOWNC);
      }
    };
    addHash = function(){
      window.location.hash = "/"+_data;
      changeC();
    };
    setCard = function(){
      var width = $content.innerWidth() - 40;
      var height = $content.innerHeight() - 110;
      $_c.css({"height":height,"width":width,"top":10,"left":20});
    };
    upCard = function(){
      setCard();
    };
    notify = function(){
      $notify.text(_text).addClass("on");
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
        $_c.addClass(DOWNC);
        $main_c.removeClass(DOWNC);
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
            setCard();
        }, 100)
    });
    // Notify
    closeMenu = function(){
      $card.removeClass("up");
      $menu_c.addClass("left_m_c");    
    };
    openMenu = function(){
      _text = "";
      _data = "";
      window.location.hash = "";
      $card.addClass("up");
      $menu_c.removeClass("left_m_c");    
    };
    $menu_c.click(function(){
      _text = $(this).text();
      _data = $(this).attr("data");
      closeMenu();
      notify();
      upCard();
      addHash();
    });
    $sidemenu.click(function(){
      _text = $(this).text().split(" ").join("");
      _data = $(this).attr("datas");
      closeMenu();
      notify();
      upCard();
      addHash();
    });
    $rightmenu.click(function(){
      _text = $(this).text();
      closeMenu();
      notify();
      $frame.fadeOut(function(){
        $notify.fadeOut(function(){
           
        });
      });   
    });
    $close.click(function(){
      $_c.addClass(DOWNC);
      $main_c.removeClass(DOWNC);
      openMenu();
      addHash();
    });
    $search_b.keyup(function(){
      var len = $search_b.val().length;
      if(len > 0){
        _data = "search";
        closeMenu();
        addHash();
      }else{
        openMenu();
        addHash();
      }
    });
})();
