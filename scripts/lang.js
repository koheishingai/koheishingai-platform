/*
Author: Kohei Shingai
Requires: jquery
*/
(function(){
  "use strict"
  var init, getLang, setLang, getTime, getJson, setContent, viewNotify, _lang, _json, $on, $off, $html, $head, $notify, $search_b;
  var socket=io.connect(":8082");
  $on = $("#switch-on");
  $off = $("#switch-off");
  $html = $("html");
  $head = $('head');
  $notify = $('.notify');
  $search_b = $('.search_b');
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
    _json = {"about_en":"Profile","about_ja":"プロフィール","product_en":"Product","product_ja":"プロダクト","article_en":"Article","article_ja":"記事","ad1_en":"Create your portfolio.","ad1_ja":"ポートフォリオ<br>をつくる","logsig_en":"Login","logsig_ja":"ログイン","rel_en":"Related Pages","rel_ja":"関連ページ","menu_en":"Menu","menu_ja":"メニュー","design_en":"<p class='text'>Design</p>","design_ja":"<p class='text'>デザイン</p>","language_en":"<p class='text'>Language</p>","language_ja":"<p class='text'>言語</p>","help_en":"<p class='text'>How to Use</p>","help_ja":"<p class='text'>使い方</p>"};
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
    $head.append('<link class="langstyle" rel="stylesheet" href="styles/main_'+_lang+'.css?'+getTime()+'" type="text/css">');
    if(_lang === 'ja'){
      $html.attr("lang", "ja");
      setContent();
      $search_b.attr("placeholder", "Kohei Shingaiを検索");
    }else{
      $html.attr("lang", "en");
      setContent();
      $search_b.attr("placeholder", "Search in Kohei Shingai");
    }
  };
  init = function(){
    getJson();
    setLang();
  };
  init();
})();
