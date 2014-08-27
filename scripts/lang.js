/*
Author: Kohei Shingai
Requires: jquery
*/
(function(){
  "use strict"
  var init, getLang, setLang, getTime, getJson, setContent, viewNotify, _lang, _json, $on, $off, $html, $head, $notify, $search_b;
  $on = $("#switch-on");
  $off = $("#switch-off");
  $html = $("html");
  $head = $('head');
  $notify = $('.notify');
  $search_b = $('.search_b');
  viewNotify = function(lang){
    if(lang === "ja"){
      var alert   = "日本語に設定しました"
      var alert_s = "Lang-Switchを検索"
    }else{
      var alert = "Set to English"
      var alert_s = "Search in Lang-Switch"
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
    _json = {"about_en":"About","about_ja":"自己紹介","product_en":"Product","product_ja":"プロダクト","article_en":"Article","article_ja":"記事","ad1_en":"Create your Lang-Switch.","ad1_ja":"Lang-Switch<br>をつくる","logsig_en":"Login / Sign Up","logsig_ja":"ログイン / 登録","rel_en":"Related Pages","rel_ja":"関連ページ","menu_en":"Menu","menu_ja":"メニュー"};
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
    $head.append('<link class="langstyle" rel="stylesheet" href="https://rawgithub.com/koheishingai/koheishingai-platform/lang/styles/main_'+_lang+'.css?'+getTime()+'" type="text/css">');
    if(_lang === 'ja'){
      $html.attr("lang", "ja");
      $on.removeAttr("checked");
      $off.attr("checked", "");
      setContent();
      $search_b.attr("placeholder", "Lang-Switchを検索");
    }else{
      $html.attr("lang", "en");
      $on.attr("checked", "");
      $off.removeAttr("checked");
      setContent();
      $search_b.attr("placeholder", "Search in Lang-Switch");
    }
  };
  init = function(){
    getJson();
    setLang();
  };
  init();
  $on.change(function(){// To English
    _lang = "en";
    $('.langstyle').remove();
    $head.append('<link class="langstyle" rel="stylesheet" href="https://rawgithub.com/koheishingai/koheishingai-platform/lang/styles/main_en.css?'+getTime()+'" type="text/css">');
    $html.attr("lang", "en");
    setContent();
    viewNotify(_lang);
  });
  $off.change(function(){// To Japanese
    _lang = "ja";
    $('.langstyle').remove();
    $head.append('<link class="langstyle" rel="stylesheet" href="https://rawgithub.com/koheishingai/koheishingai-platform/lang/styles/main_ja.css'+getTime()+'" type="text/css">');
    $html.attr("lang", "en");
    setContent();
    viewNotify(_lang);
  });
})();
