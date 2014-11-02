this.color = this.color || {};
(function(color) {
  var window = this;
  color.$head = $('head');
 
  color.rgbToHex = function(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  color.hexToRgb = function(code){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(code);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  color.changeColor = function(color, v){
    var cha = {};
    cha.color = color.hexToRgb(color);
    cha.r = cha.color.r + v;
    cha.g = cha.color.g + v;
    cha.b = cha.color.b + v;
    if(cha.r > 255){
      cha.r = 255;
    }
    if(cha.g > 255){
      cha.g = 255;
    }
    if(cha.b > 255){
      cha.b = 255;
    }
    return color.rgbToHex(cha.r, cha.g, cha.b);
  };

  color.checkColor = function(){
    var che = {};
    che.color = localStorage.getItem('color');
    if(che.color === null || che.color === ""){
      return false;
    }else{
      return true;
    }
  };

  color.setColor = function(){
    var set = {};
    set.colors  = JSON.parse(color.color);
    set.bg  = set.colors["bg"]; 
    set.li  = set.colors["li"];
    set.co  = set.colors["co"];
    set.bx  = set.colors["bx"];
    set.ch  = set.colors["ch"];
    set.string = "";

    set.setBackGround = function(color){
      set.string = set.string + 'body{background: '+color+';}';
      set.string = set.string + '.switch .toggle {background: '+color+';}';
    };
    set.setLine = function(color){
      set.string = set.string + '.search_w .underl {border-bottom: 1px solid '+color+';}';
      set.string = set.string + '.menu_c {border: 1px solid '+color+';}';
      set.string = set.string + '.side-nav.white-nav li a {border-color: '+color+';}';
      set.string = set.string + '.menu_c .b {color: '+color.changeColor(color, -33)+';}';
    };
    set.setColor = function(color){
      set.string = set.string + '.side-nav .logo a {color: '+color+';}';
      set.string = set.string + '.switch {background: '+color+';}';
      set.string = set.string + '.side-nav.white-nav li a{color: '+color.changeColor(color, 9)+';}';
    };
    set.setBox = function(color){
      set.string = set.string + '.menu_c .text {color: '+color+';}';
    };
    set.setChild = function(color){
      set.string = set.string + '.article h2 {color: '+color+' !important;}';
    }
    set.appendStyle = function(string){
      set.out = "<style>"+string+"</style>";
      set.$head.append(set.out);
    };

    set.setBackGround(sc.bg);
    set.setLine(sc.li);
    set.setColor(sc.co);
    set.setBox(sc.bx);
    set.setChild(sc.ch);
    set.appendStyle(sc.str);
  };

  color.init = function(){
    var init = {};
    if(color.checkColor() === false){
      init.colors = '{"bg":"#ffffff","li":"#eeeeee","co":"#757575","bx":"#A1A1A1","ch":"#A5A5A5"}';
      localStorage.setItem("color", init.colors);
    }
    color.cl = localStorage.getItem("color");
    color.setColor();
  }

  color.init();
 
})(this.color);
// Kohei Shingai.