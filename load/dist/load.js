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
},{}],7:[function(require,module,exports) {
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
},{"./bundle-url":15}],4:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n\n<div class=\"x\">\n    <div class=\"x-header\">\n        \u6279\u91CF\u64CD\u4F5C | \u5F53\u524D\u72B6\u6001\uFF1A\n        <span id=\"log\">\u7B49\u5F85\u8F7D\u5165\u5355\u53F7</span>\n        <span class=\"toggle\" id=\"panelToggleBtn\">\u9690\u85CF</span>\n    </div>\n    <div class=\"x-body\" id=\"panel\">\n        <div class=\"uploader-group\">\n            \u9009\u62E9\u5355\u53F7\u6587\u4EF6 <input type=\"file\" id=\"uploader\">\n        </div>\n        <div id=\"control\" style=\"display: block;\">\n            <button id=\"startButton\" type=\"button\" class=\"btn btn-x\">\u5F00\u59CB</button>\n            <button id=\"downloadButton\" type=\"button\" class=\"btn btn-x\">\u4E0B\u8F7D\u7ED3\u679C</button>\n        </div>\n    </div>\n</div>\n\n".trim();
},{}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = csv;
/*
  inspired by https://www.npmjs.com/package/react-csv-downloader
  now removed from Github
  inspired by https://github.com/iview/iview
*/

/* eslint-disable */

var newLine = '\r\n';
var appendLine = function appendLine(content, row, _ref) {
    var separator = _ref.separator,
        quoted = _ref.quoted;

    var line = row.map(function (data) {
        if (!quoted) return data;
        // quote data
        data = typeof data === 'string' ? data.replace(/"/g, '"') : data;
        return '"' + data + '"';
    });
    content.push(line.join(separator));
};

var defaults = {
    separator: ',',
    quoted: false
};

function csv(columns, datas, options) {
    var noHeader = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    options = Object.assign({}, defaults, options);
    var columnOrder = void 0;
    var content = [];
    var column = [];

    if (columns) {
        columnOrder = columns.map(function (v) {
            if (typeof v === 'string') return v;
            if (!noHeader) {
                column.push(typeof v.label !== 'undefined' ? v.label : v.prop);
            }
            return v.prop;
        });
        if (column.length > 0) appendLine(content, column, options);
    } else {
        columnOrder = [];
        datas.forEach(function (v) {
            if (!Array.isArray(v)) {
                columnOrder = columnOrder.concat(Object.keys(v));
            }
        });
        if (columnOrder.length > 0) {
            columnOrder = columnOrder.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });
            if (!noHeader) appendLine(content, columnOrder, options);
        }
    }

    if (Array.isArray(datas)) {
        datas.forEach(function (row) {
            if (!Array.isArray(row)) {
                row = columnOrder.map(function (k) {
                    return typeof row[k] !== 'undefined' ? row[k] : '';
                });
            }
            appendLine(content, row, options);
        });
    }
    return content.join(newLine);
}
},{}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* eslint-disable */

/*
  此代码来源于iview表格组件的CSV导出部分
  https://github.com/iview/iview
*/

function has(browser) {
    var ua = navigator.userAgent;
    if (browser === 'ie') {
        var isIE = ua.indexOf('compatible') > -1 && ua.indexOf('MSIE') > -1;
        if (isIE) {
            var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
            reIE.test(ua);
            return parseFloat(RegExp['$1']);
        } else {
            return false;
        }
    } else {
        return ua.indexOf(browser) > -1;
    }
}

var csv = {
    _isIE11: function _isIE11() {
        var iev = 0;
        var ieold = /MSIE (\d+\.\d+);/.test(navigator.userAgent);
        var trident = !!navigator.userAgent.match(/Trident\/7.0/);
        var rv = navigator.userAgent.indexOf('rv:11.0');

        if (ieold) {
            iev = Number(RegExp.$1);
        }
        if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
            iev = 10;
        }
        if (trident && rv !== -1) {
            iev = 11;
        }

        return iev === 11;
    },
    _isEdge: function _isEdge() {
        return (/Edge/.test(navigator.userAgent)
        );
    },
    _getDownloadUrl: function _getDownloadUrl(text) {
        var BOM = '\uFEFF';
        // Add BOM to text for open in excel correctly
        if (window.Blob && window.URL && window.URL.createObjectURL) {
            var csvData = new Blob([BOM + text], { type: 'text/csv' });
            return URL.createObjectURL(csvData);
        } else {
            return 'data:attachment/csv;charset=utf-8,' + BOM + encodeURIComponent(text);
        }
    },
    download: function download(filename, text) {
        if (has('ie') && has('ie') < 10) {
            // has module unable identify ie11 and Edge
            var oWin = window.top.open('about:blank', '_blank');
            oWin.document.charset = 'utf-8';
            oWin.document.write(text);
            oWin.document.close();
            oWin.document.execCommand('SaveAs', filename + '.csv');
            oWin.close();
        } else if (has('ie') === 10 || this._isIE11() || this._isEdge()) {
            var BOM = '\uFEFF';
            var csvData = new Blob([BOM + text], { type: 'text/csv' });
            navigator.msSaveBlob(csvData, filename + '.csv');
        } else {
            var link = document.createElement('a');
            link.download = filename + '.csv';
            link.href = this._getDownloadUrl(text);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
};

exports.default = csv;
},{}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _csv = require('../lib/csv');

var _csv2 = _interopRequireDefault(_csv);

var _csvExport = require('../lib/csvExport');

var _csvExport2 = _interopRequireDefault(_csvExport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var X = function () {
    function X() {
        _classCallCheck(this, X);

        // 重新注册事件
        this.rebind();
        // 在页面上添加面板
        $('#ajaxdata').before($(_dom2.default));
        // 需要查询的列表
        this.ids = ['630644632616', '630644632566', '630644632458', '630644632433', '630644632340', '630644632256', '630644625936', '630644625861', '630644625714', '630644619477', '630644619460', '630644619452'];
        // 当前正在查的ID的index
        this.idIndex = 0;
        // 已经完成的
        this.finish = [];
        // 注册
        this.cache();
        this.register();
        // 开发测试
        // this.startSearch()
    }
    // 重新绑定事件


    _createClass(X, [{
        key: 'rebind',
        value: function rebind() {
            $(document).off("click", ".menu li").on("click", ".menu li", function () {
                // 临时禁用这个按钮
                $(this).find("button").attr("disabled", "disabled").delay(100).animate({ disabled: '' });
                // 在 ztoAjax 中用到
                var index = $(this).index();
                // 单号 类似于 630644632616_0 这个数据是绑定在按钮上的
                var bill = $(this).find("button").attr("data-bill");
                // 忽略这两个按钮
                if ($(this).find("button").html() === "登记所有查询记录" || $(this).find("button").html() === "单号轨迹") {
                    return;
                }
                // 需要处理事件的按钮
                if (!$(this).hasClass("curr")) {
                    // 从这个按钮上获取数据
                    var url = $(this).find("button").attr("data-url");
                    var id = $(this).find("button").attr("data-id");
                    var text = $(this).find("button").text().trim();
                    var queryParms = getUrlParmas(url);
                    var currentButton = this;
                    // 给我刷！
                    var billQueryPreauthFn = function billQueryPreauthFn() {
                        return new Promise(function (resolve, reject) {
                            var ticket = '';
                            var count = 1;
                            var doIt = function doIt() {
                                $('#log').text('\u83B7\u53D6\u51ED\u8BC1 \u5355\u53F7\uFF1A' + queryParms.id + ' \u7B2C' + count + '\u6B21');
                                ztosec.billQueryPreauth({
                                    bill: queryParms.id,
                                    billType: queryParms.type
                                }, function (params) {
                                    ticket = params.ticket;
                                    $('#log').text('\u83B7\u53D6\u51ED\u8BC1 \u5355\u53F7\uFF1A' + queryParms.id + ' \u6210\u529F \u51ED\u8BC1\uFF1A' + ticket + ' \u5171\u67E5\u8BE2' + count + '\u6B21');
                                    resolve(ticket);
                                });
                                setTimeout(function () {
                                    if (ticket === '') {
                                        $('#log').text('\u83B7\u53D6\u51ED\u8BC1 \u5355\u53F7\uFF1A' + queryParms.id + ' \u5931\u8D25');
                                        setTimeout(function () {
                                            count += 1;
                                            doIt();
                                        }, 300);
                                    }
                                }, 1000);
                            };
                            doIt();
                        });
                    };
                    billQueryPreauthFn()
                    // 好 刷到了
                    .then(function (ticket) {
                        ztoAjax({
                            url: url + "&queryTicket=" + ticket,
                            type: "get",
                            data: "",
                            index: index,
                            bill: bill,
                            id: id,
                            text: text
                        });
                        $(currentButton).addClass("curr");
                    });
                } else {
                    $(this).removeClass("curr");
                    var id = $(this).find("button").attr("data-id");
                    if ($(this).find("button").html() != "修改记录") {
                        $("." + id).remove();
                    } else {
                        $("." + id).removeClass("curr");
                    }
                }
            });
        }
    }, {
        key: 'search',
        value: function search() {
            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            return new Promise(function (resolve, reject) {
                $("#txtJobNoList").val(id);
                var txtbill = document.getElementById("txtJobNoList");
                var list = txtbill.value.trim().split("\n");
                ztosec.queryReport({ bill_ids: list }, function () {
                    var billcode = $("#txtJobNoList").val();
                    $("#Panel1,.xubox_layer").hide();
                    var showdiv = $("#showdiv").val();
                    var history = "";
                    if (document.getElementById("chkzidou2").checked) {
                        history = "true";
                    }
                    $(".taskBar li,.xubox_layer").removeClass("curr");
                    $(".docBubble").remove();
                    var date1 = new Date(); //开始时间
                    var loadLayer;
                    if (isSearch) {
                        if (reqScanTips) {
                            reqScanTips.abort();
                            isSearch = true;
                        }
                        reqScanTips = $.ajax({
                            type: "post",
                            cache: false,
                            timeout: 60000,
                            url: "bills2.aspx",
                            data: {
                                Bill: billcode, showdiv: showdiv, history: history
                            },
                            beforeSend: function beforeSend() {
                                isSearch = false;
                                $("#Button1").addClass("gray");
                                $("#sxubox_layer20").show();
                            },
                            // dataType: "html",
                            dataType: "jsonp",
                            jsonp: "callbackfun",
                            error: function error(a, b, c) {
                                isSearch = true;
                                $("#Button1").removeClass("gray");
                                $("#sxubox_layer20").hide();
                                $("#ajaxdata").html("<div style=\"text-align:center; width:100%; line-height:150%;margin-top: 130px;\"><img src=\"/images/error.png\" width=\"150\" /><br/>数据加载出错，刷新页面重新查询一次。联系管理员：林毕成 QQ：1299450042</div>");
                            },
                            success: function success(rs) {
                                isSearch = true;
                                $("#Button1").removeClass("gray");
                                if (rs.n == "" || rs.n == null) {
                                    $("#ajaxdata").html("<div style=\"text-align:center; width:100%; line-height:150%;margin-top: 130px;\"><img src=\"/images/error.png\" width=\"150\" /><br/>返回结果为空,请联系管理员。</div>");
                                } else {
                                    if (rs.n.length < 300) {
                                        $("#ajaxdata").html("<div style=\"text-align:center; width:100%; line-height:150%;margin-top: 130px;\"><img src=\"/images/error.png\" width=\"150\" /><br/>" + rs.n + "</div>");
                                    } else {
                                        $("#ajaxdata").html(rs.n);
                                        resolve();
                                    }
                                    dialogOnresizeparameters();
                                }
                                var date2 = new Date(); //结束时间
                                var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
                                $(".totalTime").html("耗时：" + date3 / 1000 + "秒");
                                $("#sxubox_layer20").hide();
                                setTimeout("getUserState()", 2000); //延时1秒  
                            },
                            complete: function complete() {
                                isSearch = true;
                                $("#sxubox_layer20").hide();
                            }
                        });
                    }
                });
            });
        }
        // 缓存元素

    }, {
        key: 'cache',
        value: function cache() {
            // 原页面带的元素
            this.$ZTO_input = $('#txtJobNoList');
            // 新增的元素
            this.$panel = $('#panel');
            this.$panelToggleBtn = $('#panelToggleBtn');
            this.$uploader = $('#uploader');
            this.$control = $('#control');
            this.$startButton = $('#startButton');
            this.$downloadButton = $('#downloadButton');
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
                        _this.$control.show();
                    }
                    console.log(_this.ids);
                };
            });
            // 开始按钮
            this.$startButton.on('click', function () {
                _this.startSearch();
            });
            // 下载按钮
            this.$downloadButton.on('click', function () {
                _this.exportCSV();
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
        // 开始搜索数据

    }, {
        key: 'startSearch',
        value: function startSearch() {
            var id = this.ids[this.idIndex];
            this.search(id).then(function () {
                $('button[data-id=\'taobaodingdan\'][data-bill=\'' + id + '_0\']')[0].click();
            });
        }
        // 将数据以CSV形式导出

    }, {
        key: 'exportCSV',
        value: function exportCSV() {
            // 合并参数
            var _params = {
                columns: [{ label: '运单编号', prop: 'yundanbianhao' }, { label: '订单编号', prop: 'dingdanbianhao' }, { label: '订单时间', prop: 'dingdanshijian' }, { label: '发件人(电话)', prop: 'fajianrendianhua' }, { label: '发件人地址', prop: 'fajianrendizhi' }, { label: '收件人(电话)', prop: 'shoujianrendianhua' }, { label: '收件人地址', prop: 'shoujianrendizhi' }, { label: '揽件人', prop: 'lanjianren' }, { label: '收件网点', prop: 'shoujianwangdian' }, { label: '订单来源', prop: 'dingdanlaiyuan' }],
                data: [{
                    name: 'lucy',
                    age: 24
                }, {
                    name: 'bob',
                    age: 26
                }],
                title: 'table',
                noHeader: false
                // 生成数据
            };var data = (0, _csv2.default)(_params.columns, _params.data, {}, _params.noHeader);
            // 下载数据
            _csvExport2.default.download(_params.title, data);
        }
    }]);

    return X;
}();

exports.default = X;
},{"./dom":9,"../lib/csv":10,"../lib/csvExport":11}],1:[function(require,module,exports) {
'use strict';

require('./style/plug-in.scss');

var _X = require('./class/X');

var _X2 = _interopRequireDefault(_X);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// jquery加载后执行
// import './style/bootstrap.min.css'
$(function () {
    var x = new _X2.default();
    // 修改页面
    $('.taskBar').hide();
});
},{"./style/plug-in.scss":4,"./class/X":5}],116:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '58539' + '/');
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
},{}]},{},[116,1])
//# sourceMappingURL=/dist/load.map