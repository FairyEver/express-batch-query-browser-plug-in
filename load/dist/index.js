// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({15:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],14:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":15}],13:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":14}],17:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":14}],132:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n\n<div class=\"x\">\n    <div class=\"x-header\">\n        \u6279\u91CF\u64CD\u4F5C\n        <span class=\"toggle\" id=\"panelToggleBtn\">\u9690\u85CF</span>\n    </div>\n    <div class=\"x-body\" id=\"panel\">\n        <div class=\"input-group mb-3\">\n            <div class=\"custom-file\">\n                <input type=\"file\" class=\"custom-file-input\" id=\"uploader\">\n                <label class=\"custom-file-label\" for=\"uploader\">\u8F7D\u5165 .xlsx \u6587\u4EF6</label>\n            </div>\n        </div>\n        <div id=\"progress\" style=\"display: none;\">\n            <p id=\"progressTitle\">\u8FDB\u5EA6</p>\n            <div class=\"progress mb-3\">\n                <div\n                    id=\"progressBar\"\n                    class=\"progress-bar progress-bar-striped progress-bar-animated\"\n                    role=\"progressbar\"\n                    style=\"width: 0%\">\n                </div>\n            </div>\n        </div>\n        <div id=\"control\" style=\"display: none;\">\n            <button id=\"startButton\" type=\"button\" class=\"btn btn-light\">\u5F00\u59CB</button>\n        </div>\n    </div>\n</div>\n\n".trim();
},{}],130:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var X = function () {
    function X() {
        _classCallCheck(this, X);

        // 在页面上添加面板
        $('body').append($(_dom2.default));
        // 需要查询的列表
        this.ids = [];
        // 已经完成的
        this.finish = [];
        // 注册
        this.cache();
        this.register();
    }
    // 缓存元素


    _createClass(X, [{
        key: 'cache',
        value: function cache() {
            this.$panel = $('#panel');
            this.$panelToggleBtn = $('#panelToggleBtn');
            this.$uploader = $('#uploader');
            this.$progress = $('#progress');
            this.$progressTitle = $('#progressTitle');
            this.$progressBar = $('#progressBar');
            this.$control = $('#control');
            this.$startButton = $('#startButton');
        }
        // 注册事件

    }, {
        key: 'register',
        value: function register() {
            var _this = this;

            // 切换显示隐藏面板
            this.$panelToggleBtn.on('click', function () {
                if (_this.$panel.is(":hidden")) {
                    _this.panelShow();
                } else {
                    _this.panelHide();
                }
            });
            // Excel载入
            this.$uploader.on('change', function () {
                var file = _this.$uploader.get(0).files[0];
                var reader = new FileReader();
                reader.readAsText(file, 'utf-8');
                reader.onload = function (e) {
                    _this.ids = e.target.result.split("\n");
                    if (_this.ids.length > 0) {
                        _this.$progress.show();
                        _this.$control.show();
                    }
                };
            });
            // 开始按钮
            this.$startButton.on('click', function () {
                // this.finishLength ++
                // this.progressUpdate()
                _this.finish.push({
                    name: 'liyang'
                });
                _this.progressUpdate();
            });
        }
        // 显示面板

    }, {
        key: 'panelShow',
        value: function panelShow() {
            this.$panel.show();
            this.$panelToggleBtn.text('隐藏');
        }
        // 隐藏面板

    }, {
        key: 'panelHide',
        value: function panelHide() {
            this.$panel.hide();
            this.$panelToggleBtn.text('显示');
        }
        // 更新进度条

    }, {
        key: 'progressUpdate',
        value: function progressUpdate() {
            var n = Math.round(this.finish.length / this.ids.length * 100);
            this.$progressBar.css('width', n + '%');
        }
    }]);

    return X;
}();

exports.default = X;
},{"./dom":132}],1:[function(require,module,exports) {
'use strict';

require('./style/bootstrap.min.css');

require('./style/plug-in.scss');

var _X = require('./class/X');

var _X2 = _interopRequireDefault(_X);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// jquery加载后执行
$(function () {
    var x = new _X2.default();
    // 操作页面中的函数 载入数据
    loadData();
});
},{"./style/bootstrap.min.css":13,"./style/plug-in.scss":17,"./class/X":130}],176:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59112' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[176,1])
//# sourceMappingURL=/dist/index.map