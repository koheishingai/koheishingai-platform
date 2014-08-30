/*
Author: Kohei Shingai
Requires: jquery
*/
(function(){
  "use strict"
  var init, getLang, setLang, getTime, getJson, setContent, viewNotify, _lang, _json, _url, _title, $on, $off, $html, $head, $notify, $search_b;
  var socket_r = io.connect(":8080");
  $on = $("#switch-on");
  $off = $("#switch-off");
  $html = $("html");
  $head = $('head');
  $notify = $('.notify');
  $search_b = $('.search_b');
  _url = window.location.pathname;
  _title = _url.split('/').join('');
  _title = _title.split('_').join(' ');
  viewNotify = function(lang){
    if(lang === "ja"){
      var alert   = "日本語に設定しました"
      var alert_s = "Kohei Shingaiを検索"
    }else{
      var alert = "Set to English"
      var alert_s = "Search in Kohei Shingai"
    }
    $notify.text(alert).addClass("on");
    $search_b.attr("placeholder", alert_s);
    setTimeout(function(){
      $notify.removeClass("on");
    }, 1200);
  };
  setContent = function(){
    for(var key in _json){
      if(key.indexOf("_"+_lang) !== -1){
        var w = key.split("_")[0];
        var c = _json[key];
        $("[data='"+w+"']").html(c);
      }
    }
  };
  getJson = function(){
    socket_r.emit('readLang', _url);
  };
  getTime = function(){
    var t = new Date();
    var h = t.getHours();
    var m = t.getMinutes();
    var s = t.getSeconds();
    return "" + h + "" + m + "" + s;
  };
  getLang = function(){
    try{
      return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
    }catch(e){
      return undefined;
    }
  };
  setLang = function(){
    _lang = getLang();
    $head.append('<link class="langstyle" rel="stylesheet" href="../styles/main_'+_lang+'.css?'+getTime()+'" type="text/css">');
    if(_lang === 'ja'){
      $html.attr("lang", "ja");
      setContent();
      $search_b.attr("placeholder", _title+"を検索");
    }else{
      $html.attr("lang", "en");
      setContent();
      $search_b.attr("placeholder", "Search in "+_title);
    }
  };
  init = function(){
    getJson();
  };
  init();
  socket_r.on('readLang', function(val){
    _json = JSON.parse(val);
    setLang();
  });
})();
