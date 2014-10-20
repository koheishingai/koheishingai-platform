/*
Author: Kohei Shingai
Requires: jquery
*/
(function() {
    "use strict";
    var DOWNC, _theme, _title, _hs, _data, _text, _width_c, _width, _height, _device, _browser, _url, _timer, _timer_l, _cnt_l, $close, $notify, $body, $logo, $card, $loading, $title, $title_l, $title_a, $search_w, $search_b, $side_nav, $main_c, $menu_c, $content, $sidemenu, $rightmenu, $frame, $_c, $_cc, $sm, $sma, $in, $ph, $phi, $ops, $phone, $on, $off, $head, $sidemenu_a, init, logoPos, upAd, nLoad, iLoad, alertS, closeMenu, openMenu, notify, upCard, setCard, addHash, changeC, changeL, generateID, hashA, getLang, setTitle, setT, getTime;
    var socket_r = io.connect(":8080");
    var socket_w = io.connect(":8081");
    var socket_b = io.connect(":8082");
    DOWNC = "down_c";
    _width = window.innerWidth;
    _width_c = 0;
    _height = window.innerHeight;
    _device = localStorage.getItem("device");
    _browser = localStorage.getItem("browser");
    _theme = localStorage.getItem("themes");
    _url = window.location.pathname;
    _text = "";
    _data = "";
    _hs = "";
    _title = "";
    $on = $("#switch-on");
    $off = $("#switch-off");
    $logo = $('.logo');
    $card = $('.card');
    $loading = $('.loading');
    $title = $('title');
    $title_l = $('.title_l');
    $title_a = $('.logo a');
    $search_w = $('.search_w');
    $side_nav = $('.side-nav');
    $sidemenu = $('.sidemenu');
    $sidemenu_a = $(".sidemenu[data='about']");
    $body = $('body');
    $menu_c = $('.menu_c');
    $content = $('.content');
    $search_b = $('.search_b');
    $notify = $('.notify');
    $rightmenu = $('.rightmenu');
    $frame = $('.frame');
    $_c = $('._c');
    $_cc = $('._cc');
    $close = $('.close');
    $main_c = $('.main_c');
    $sm = $('.sm');
    $sma = $('.sm li a');
    $in = $('.sm .in');
    $ph = $('.rm .p');
    $phi = $('.rm .i');
    $ops = $('.ops');
    $head = $('head');
    $phone = $(".header[data='phone']");
    getTime = function(){
      var t = new Date();
      var h = t.getHours();
      var m = t.getMinutes();
      var s = t.getSeconds();
      return "" + h + "" + m + "" + s;
    };
    setT = function(){
      if(_theme === null || _theme === "dp"){
        $('.themestyle').remove();
        $head.append('<link class="themestyle" rel="stylesheet" href="../styles/themes/dp.css?'+getTime()+'" type="text/css">');
      }else{
        $('.themestyle').remove();
        $head.append('<link class="themestyle" rel="stylesheet" href="../styles/themes/dp.css?'+getTime()+'" type="text/css">');
      }
    };
    setTitle = function(){
      var t = window.location.host;
      if(t === "www.koheishingai.com"){
        _title = "Kohei Shingai";
        localStorage.setItem("title", _title);
      }else if(t === "www.sum-mary.com"){
        _title = "Summary";
        localStorage.setItem("title", _title);
      }else if(t ===  "www.ka-mi.com"){
        _title = "Kami";
        localStorage.setItem("title", _title);
      }
    };
    getLang = function(){
      try{
        return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
      }catch(e){
        return undefined;
      }
    };
    hashA = function(){
      var hs = window.location.hash.split("/");
      var lang = getLang();
      if(hs[0] !== "#"){
        _hs = hs[0].split("#").join("");
        window.location.hash = "/" + hs;
      }else{
        _hs = hs[1];
      }
      if(hs.length > 0){
        socket_r.emit("cl2", _url, _hs, lang);  
      }
    };
    generateID = function(){
      socket_r.emit("gid");
    };
    changeC = function(){
      if(_data !== ""){
        var $elm = $("."+_data + "_c");
        $_cc.addClass(DOWNC);
        $elm.removeClass(DOWNC);
      }
    };
    addHash = function(){
      var lang = localStorage.getItem("lang");
      var bef = localStorage.getItem("pos");
      localStorage.setItem("pos", _data);
      if(_data.length < 1 || (bef !== _data && bef !== "")){
        var $art = $('.'+bef+'_c .article');
        setTimeout(function(){
          $art.html("");
        }, 280);
      }
      window.location.hash = "/"+_data;
      socket_r.emit("cl", _url, _data, lang);
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
          $logo.css("margin-top", "20px");
          //$logo.css("margin-top", h2-376);
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
        setTitle();
        $title.text(_title);
        $title_a.text(_title);
        $title_l.text(_title).removeClass("step4").addClass("step1");
        $_c.addClass(DOWNC);
        $main_c.removeClass(DOWNC);
        $sm.removeClass("son");
        generateID();
        hashA();
        setT();
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
        //$title.text('Summary');
        $title_a.text('Kami');
        $title_l.html('Kami');
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
      //if(_url !== "/"){
        _text = $(this).text();
        _data = $(this).attr("data");
        var $elm = $("."+_data + "_s");
        closeMenu();
        notify();
        upCard();
        addHash();
        $sm.addClass("son");
        $in.removeClass("sel");
        $elm.addClass("sel");
        $phi.removeClass("ops");
      //}
    });
    $sidemenu.click(function(){
      _text = $(this).text().split(" ").join("");
      _data = $(this).attr("datas");
      var flg = $(this).hasClass("in");
      closeMenu();
      notify();
      upCard();
      addHash();
      $sm.addClass("son");
      $sidemenu.removeClass("fa");
      $in.removeClass("sel");
      $(this).addClass("fa");
      $phi.removeClass("ops");
      if(flg === true){
        $sidemenu.removeClass("fa");
        $(this).addClass("sel");
      }
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
      $title.text(_title);
      $_c.addClass(DOWNC);
      $main_c.removeClass(DOWNC);
      openMenu();
      addHash();
      $sm.removeClass("son");
      $sidemenu.removeClass("fa");
      $phi.removeClass("ops");
      $search_b.val("");
    });
    $search_b.keyup(function(){
      var len = $search_b.val().length;
      if(len > 0){
        _data = "search";
        upCard();
        closeMenu();
        addHash();
        $sm.addClass("son");
        $sidemenu.removeClass("fa");
        $in.removeClass("sel");
      }else{
        $title.text(_title);
        $_c.addClass(DOWNC);
        $main_c.removeClass(DOWNC);
        openMenu();
        addHash();
        $sm.removeClass("son");
        $sidemenu.removeClass("fa");
        $phi.removeClass("ops");
      }
    });
    $ph.click(function(){
      _text = $phone.text();
      _data = "phone";
      var flg = $(this).hasClass("in");
      closeMenu();
      notify();
      upCard();
      addHash();
      $sm.addClass("son");
      $sidemenu.removeClass("fa");
      $in.removeClass("sel");
      $phi.addClass("ops");
    });
    socket_r.on("gid", function(id){
      localStorage.setItem("user", id);
    });
    socket_r.on("cl", function(data, pos){
      var $art = $('.'+pos+'_c .article');
      $art.html(data);
    });
    // Init >>
    socket_r.on("cl2", function(data, pos){
      if(data !== null){
        var $art = $('.'+pos+'_c .article');
        $art.html(data);
        // FixMe >>
        _text = _hs;
        _data = _hs;
        var $hs = $('.'+_hs+'_s');
        closeMenu();
        notify();
        upCard();
        addHash();
        $sm.addClass("son");
        $sidemenu.removeClass("fa");
        $in.removeClass("sel");
        $hs.addClass("fa");
        $phi.removeClass("ops");
        if(_hs !== "about" && _hs !== "design"){
          $sidemenu.removeClass("fa");
          $hs.addClass("sel");        
        }
        // << FixMe
      }else{
        window.location.hash = "/";   
      }
    });
    // << Init
    changeL = function(l, n){
      if(n !== null){
        if(n.length > 0){
          socket_r.emit("cl", _url, n, l);
        }
      }
    };
    $on.change(function(){// To English
      var lang = "en";
      var now = localStorage.getItem("pos");
      changeL(lang, now);
    });
    $off.change(function(){// To Japanese
      var lang = "ja";
      var now = localStorage.getItem("pos");
      changeL(lang, now);
    });
})();
