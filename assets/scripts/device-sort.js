// ugly don't mention it 
var on = addEventListener,
off = removeEventListener,
$ = function(q) {
  return document.querySelector(q)
},
$$ = function(q) {
  return document.querySelectorAll(q)
},
$body = document.body,
$inner = $('.inner'),
client = (function() {
  var o = {
      browser: 'other',
      browserVersion: 0,
      os: 'other',
      osVersion: 0,
      mobile: false,
      canUse: null,
      flags: {
        lsdUnits: false,
      },
    },
    ua = navigator.userAgent,
    a, i;
  a = [
    ['firefox', /Firefox\/([0-9\.]+)/],
    ['edge', /Edge\/([0-9\.]+)/],
    ['safari', /Version\/([0-9\.]+).+Safari/],
    ['chrome', /Chrome\/([0-9\.]+)/],
    ['chrome', /CriOS\/([0-9\.]+)/],
    ['ie', /Trident\/.+rv:([0-9]+)/]
  ];
  for (i = 0; i < a.length; i++) {
    if (ua.match(a[i][1])) {
      o.browser = a[i][0];
      o.browserVersion = parseFloat(RegExp.$1);
      break;
    }
  }
  a = [
    ['ios', /([0-9_]+) like Mac OS X/, function(v) {
      return v.replace('_', '.').replace('_', '');
    }],
    ['ios', /CPU like Mac OS X/, function(v) {
      return 0
    }],
    ['ios', /iPad; CPU/, function(v) {
      return 0
    }],
    ['android', /Android ([0-9\.]+)/, null],
    ['mac', /Macintosh.+Mac OS X ([0-9_]+)/, function(v) {
      return v.replace('_', '.').replace('_', '');
    }],
    ['windows', /Windows NT ([0-9\.]+)/, null],
    ['undefined', /Undefined/, null]
  ];
  for (i = 0; i < a.length; i++) {
    if (ua.match(a[i][1])) {
      o.os = a[i][0];
      o.osVersion = parseFloat(a[i][2] ? (a[i][2])(RegExp.$1) : RegExp.$1);
      break;
    }
  }
  if (o.os == 'mac' && ('ontouchstart' in window) && ((screen.width == 1024 && screen.height == 1366) || (screen.width == 834 && screen.height == 1112) || (screen.width == 810 && screen.height == 1080) || (screen.width == 768 && screen.height == 1024))) o.os = 'ios';
  o.mobile = (o.os == 'android' || o.os == 'ios');
  var _canUse = document.createElement('div');
  o.canUse = function(property, value) {
    var style;
    style = _canUse.style;
    if (!(property in style)) return false;
    if (typeof value !== 'undefined') {
      style[property] = value;
      if (style[property] == '') return false;
    }
    return true;
  };
  o.flags.lsdUnits = o.canUse('width', '100dvw');
  return o;
}()),
trigger = function(t) {
  dispatchEvent(new Event(t));
}