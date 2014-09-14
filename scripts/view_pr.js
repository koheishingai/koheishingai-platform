/*
Author: Kohei Shingai
Requires: jquery
*/
(function(){
  "use strict"
  var init, setCheck, $on, $off, $html, $head, $notify;
  var socket=io.connect(":8082");
  $on = $("#switch-on");
  $off = $("#switch-off");
  $html = $("html");
  $head = $('head');
  $notify = $('.notify');
  setCheck = function(){
    $on.removeAttr("checked");
    $off.attr("checked", "");
    //$on.attr("checked", "");
    //$off.removeAttr("checked");
  };
  init = function(){
    setCheck();
  };
  init();
})();
