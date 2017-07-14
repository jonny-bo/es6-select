(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Api = function Api() {};

Api.prototype.ajax = function (method, url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = function (event) {
    callback(JSON.parse(xhr.responseText));
  };
  xhr.send();
};

var $ = new Api();
exports.default = $;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CLASS_NAME = 'L_btn';

var Button = function Button(options) {
  var _this = this;

  this.options = options;
  this.el = this.createEl();
  this.el.addEventListener('click', function () {
    _this.options.onclick();
  });
};

Button.prototype.createEl = function () {
  var el = document.createElement('button');
  el.textContent = this.options.text || 'x';
  el.className = CLASS_NAME;
  return el;
};

exports.default = Button;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = 'L_lable';

var Lable = function Lable(options) {
  var _this = this;

  this.options = options;
  this.container = document.getElementById(options.id);
  this.el = this.createEl();
  this.container.appendChild(this.el);
  var closeBtn = new _button2.default({
    text: 'x',
    onclick: function onclick() {
      _this.dispose();
    }
  });
  this.el.appendChild(closeBtn.el);
};

Lable.prototype.createEl = function () {
  var el = document.createElement('span');
  el.textContent = this.options.text || 'span';
  el.className = CLASS_NAME;
  return el;
};

Lable.prototype.dispose = function () {
  this.container.removeChild(this.el);
};

exports.default = Lable;

},{"./button":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lable = require('./lable');

var _lable2 = _interopRequireDefault(_lable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_UL_NAME = 'L_list';
var CLASS_LI_NAME = 'L_item';

var List = function List(options) {
  this.options = options;
  this.data = options.data || [];
  this.el = this.init();
  this.container = document.getElementById('container');
  this.lables = [];
};

List.prototype.init = function () {
  var _this = this;

  var ul = document.createElement('ul');
  ul.className = CLASS_UL_NAME;
  this.data.map(function (item) {
    var li = document.createElement('li');
    li.textContent = item.item_name || 'x';
    li.className = CLASS_LI_NAME;
    li.onclick = function () {
      if (!li.style.backgroundColor) {
        li.style.backgroundColor = '#DDD';
        var lable = new _lable2.default({
          id: _this.options.id,
          text: li.textContent
        });
        _this.lables.push(lable);
      }
      _this.close();
    };

    ul.appendChild(li);
  });
  return ul;
};

List.prototype.open = function () {
  this.container.style.display = 'block';
};

List.prototype.close = function () {
  this.container.style.display = 'none';
};

List.prototype.reload = function ($data) {
  this.data = $data;
  var ul = this.init();

  return ul;
};

exports.default = List;

},{"./lable":3}],5:[function(require,module,exports){
'use strict';

var _select = require('./select');

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var input = new _select2.default({
  id: 'input',
  url: './asset/province.json'
});

console.log(input);
// console.log(lable);

// [
//   'shanghai',
//   'beijing',
//   'hangzou',
//   'shangxi',
//   'anhui'
// ].map(function(index, elem) {
//   new Lable({
//     text: elem,
//     id: 'container'
//   });
// });

// let xhr = new XMLHttpRequest();
// xhr.open('GET', './asset/province.json');
// xhr.onload = function(event) {
//   console.log("onload()");
//   console.log(JSON.parse(xhr.responseText));

// }
// xhr.send();

},{"./select":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _lable = require('./lable');

var _lable2 = _interopRequireDefault(_lable);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function Select(options) {
  var _this = this;

  this.options = options;
  this.el = document.getElementById(options.id);
  this.getData();

  var cache = [];
  this.el.addEventListener('input', function () {
    if (cache[_this.el.value]) {
      _this.result = cache[_this.el.value];
      return;
    }
    if (_this.el.value) {
      _this.result = _this.filterResult(_this.el.value);
      cache[_this.el.value] = _this.result;
    } else {
      _this.result = _this.data;
    }
    console.log(_this.result);
    var ul = _this.list.reload(_this.result);
    _this.container.removeChild(_this.list.el);
    _this.container.appendChild(ul);
    _this.list.el = ul;
  });

  this.el.addEventListener('focus', function () {
    if (!_this.list) {
      _this.list = new _list2.default({
        id: 'select-labs',
        data: _this.data
      });
      _this.container = document.getElementById('container');
      _this.container.appendChild(_this.list.el);
    }
    _this.list.open();
  });
};

Select.prototype.getData = function () {
  var _this2 = this;

  _api2.default.ajax('GET', this.options.url, function (responce) {
    _this2.data = _this2.result = responce;
  });
};

Select.prototype.filterResult = function (value) {
  return this.data.filter(function (item) {
    return item.item_name.indexOf(value) > -1;
  });
};

exports.default = Select;

},{"./api":1,"./lable":3,"./list":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBpLmpzIiwic3JjL2pzL2J1dHRvbi5qcyIsInNyYy9qcy9sYWJsZS5qcyIsInNyYy9qcy9saXN0LmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvc2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQ0EsSUFBTSxNQUFNLFNBQU4sR0FBTSxHQUFXLENBQ3RCLENBREQ7O0FBR0EsSUFBSSxTQUFKLENBQWMsSUFBZCxHQUFxQixVQUFTLE1BQVQsRUFBaUIsR0FBakIsRUFBc0IsUUFBdEIsRUFBZ0M7QUFDbkQsTUFBTSxNQUFNLElBQUksY0FBSixFQUFaO0FBQ0EsTUFBSSxJQUFKLENBQVMsTUFBVCxFQUFpQixHQUFqQjtBQUNBLE1BQUksTUFBSixHQUFhLFVBQVMsS0FBVCxFQUFnQjtBQUMzQixhQUFTLEtBQUssS0FBTCxDQUFXLElBQUksWUFBZixDQUFUO0FBQ0QsR0FGRDtBQUdBLE1BQUksSUFBSjtBQUNELENBUEQ7O0FBU0EsSUFBTSxJQUFJLElBQUksR0FBSixFQUFWO2tCQUNlLEM7Ozs7Ozs7O0FDZGYsSUFBTSxhQUFhLE9BQW5COztBQUVBLElBQU0sU0FBUyxTQUFULE1BQVMsQ0FBUyxPQUFULEVBQWtCO0FBQUE7O0FBQy9CLE9BQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxPQUFLLEVBQUwsR0FBVSxLQUFLLFFBQUwsRUFBVjtBQUNBLE9BQUssRUFBTCxDQUFRLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFlBQU07QUFDdEMsVUFBSyxPQUFMLENBQWEsT0FBYjtBQUNELEdBRkQ7QUFHRCxDQU5EOztBQVFBLE9BQU8sU0FBUCxDQUFpQixRQUFqQixHQUE0QixZQUFXO0FBQ3JDLE1BQUksS0FBTSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBVjtBQUNBLEtBQUcsV0FBSCxHQUFpQixLQUFLLE9BQUwsQ0FBYSxJQUFiLElBQXFCLEdB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LE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5jb25zdCBBcGkgPSBmdW5jdGlvbigpIHtcbn1cblxuQXBpLnByb3RvdHlwZS5hamF4ID0gZnVuY3Rpb24obWV0aG9kLCB1cmwsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHIub3BlbihtZXRob2QsIHVybCk7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGNhbGxiYWNrKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkpOyAgICBcbiAgfVxuICB4aHIuc2VuZCgpO1xufTtcblxuY29uc3QgJCA9IG5ldyBBcGkoKTtcbmV4cG9ydCBkZWZhdWx0ICQ7IiwiY29uc3QgQ0xBU1NfTkFNRSA9ICdMX2J0bic7XG5cbmNvbnN0IEJ1dHRvbiA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5lbCA9IHRoaXMuY3JlYXRlRWwoKTtcbiAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB0aGlzLm9wdGlvbnMub25jbGljaygpO1xuICB9KTtcbn1cblxuQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgZWwgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGVsLnRleHRDb250ZW50ID0gdGhpcy5vcHRpb25zLnRleHQgfHwgJ3gnO1xuICBlbC5jbGFzc05hbWUgPSBDTEFTU19OQU1FO1xuICByZXR1cm4gZWw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjsiLCJpbXBvcnQgQnV0dG9uIGZyb20gJy4vYnV0dG9uJztcblxuY29uc3QgQ0xBU1NfTkFNRSA9ICdMX2xhYmxlJztcblxuY29uc3QgTGFibGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3B0aW9ucy5pZCk7XG4gIHRoaXMuZWwgPSB0aGlzLmNyZWF0ZUVsKCk7XG4gIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICBjb25zdCBjbG9zZUJ0biA9IG5ldyBCdXR0b24oe1xuICAgIHRleHQ6ICd4JyxcbiAgICBvbmNsaWNrOiAoKSA9PiB7XG4gICAgICB0aGlzLmRpc3Bvc2UoKVxuICAgIH1cbiAgfSk7XG4gIHRoaXMuZWwuYXBwZW5kQ2hpbGQoY2xvc2VCdG4uZWwpO1xufVxuXG5MYWJsZS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZWwgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBlbC50ZXh0Q29udGVudCA9IHRoaXMub3B0aW9ucy50ZXh0IHx8ICdzcGFuJztcbiAgZWwuY2xhc3NOYW1lID0gQ0xBU1NfTkFNRTtcbiAgcmV0dXJuIGVsO1xufVxuXG5MYWJsZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGFibGU7IiwiaW1wb3J0IExhYmxlIGZyb20gJy4vbGFibGUnO1xuXG5jb25zdCBDTEFTU19VTF9OQU1FID0gJ0xfbGlzdCc7XG5jb25zdCBDTEFTU19MSV9OQU1FID0gJ0xfaXRlbSc7XG5cbmNvbnN0IExpc3QgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIHRoaXMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCBbXTtcbiAgdGhpcy5lbCA9IHRoaXMuaW5pdCgpO1xuICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcbiAgdGhpcy5sYWJsZXMgPSBbXTtcbn1cblxuTGlzdC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgdWwgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgdWwuY2xhc3NOYW1lID0gQ0xBU1NfVUxfTkFNRTtcbiAgdGhpcy5kYXRhLm1hcChpdGVtID0+IHtcbiAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGxpLnRleHRDb250ZW50ID0gaXRlbS5pdGVtX25hbWUgfHwgJ3gnO1xuICAgIGxpLmNsYXNzTmFtZSA9IENMQVNTX0xJX05BTUU7XG4gICAgbGkub25jbGljayA9ICgpID0+IHtcbiAgICAgIGlmICghbGkuc3R5bGUuYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICAgIGxpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjREREJztcbiAgICAgICAgY29uc3QgbGFibGUgPSBuZXcgTGFibGUoe1xuICAgICAgICAgIGlkOiB0aGlzLm9wdGlvbnMuaWQsXG4gICAgICAgICAgdGV4dDogbGkudGV4dENvbnRlbnRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubGFibGVzLnB1c2gobGFibGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgfSk7XG4gIHJldHVybiB1bDtcbn07XG5cbkxpc3QucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59XG5cbkxpc3QucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbkxpc3QucHJvdG90eXBlLnJlbG9hZCA9IGZ1bmN0aW9uKCRkYXRhKSB7XG4gIHRoaXMuZGF0YSA9ICRkYXRhO1xuICBjb25zdCB1bCA9IHRoaXMuaW5pdCgpO1xuXG4gIHJldHVybiB1bDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdDsiLCJpbXBvcnQgU2VsZWN0IGZyb20gJy4vc2VsZWN0JztcblxubGV0IGlucHV0ID0gbmV3IFNlbGVjdCh7XG4gIGlkOiAnaW5wdXQnLFxuICB1cmw6ICcuL2Fzc2V0L3Byb3ZpbmNlLmpzb24nXG59KTtcblxuY29uc29sZS5sb2coaW5wdXQpO1xuLy8gY29uc29sZS5sb2cobGFibGUpO1xuXG4vLyBbXG4vLyAgICdzaGFuZ2hhaScsXG4vLyAgICdiZWlqaW5nJyxcbi8vICAgJ2hhbmd6b3UnLFxuLy8gICAnc2hhbmd4aScsXG4vLyAgICdhbmh1aSdcbi8vIF0ubWFwKGZ1bmN0aW9uKGluZGV4LCBlbGVtKSB7XG4vLyAgIG5ldyBMYWJsZSh7XG4vLyAgICAgdGV4dDogZWxlbSxcbi8vICAgICBpZDogJ2NvbnRhaW5lcidcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuLy8geGhyLm9wZW4oJ0dFVCcsICcuL2Fzc2V0L3Byb3ZpbmNlLmpzb24nKTtcbi8vIHhoci5vbmxvYWQgPSBmdW5jdGlvbihldmVudCkge1xuLy8gICBjb25zb2xlLmxvZyhcIm9ubG9hZCgpXCIpO1xuLy8gICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpKTtcblxuLy8gfVxuLy8geGhyLnNlbmQoKTtcblxuIiwiaW1wb3J0ICQgZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQgTGFibGUgZnJvbSAnLi9sYWJsZSc7XG5pbXBvcnQgTGlzdCBmcm9tICcuL2xpc3QnO1xuXG5jb25zdCBTZWxlY3QgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIHRoaXMuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcHRpb25zLmlkKTtcbiAgdGhpcy5nZXREYXRhKCk7XG5cbiAgbGV0IGNhY2hlID0gW107XG4gIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgaWYgKGNhY2hlW3RoaXMuZWwudmFsdWVdKSB7XG4gICAgICB0aGlzLnJlc3VsdCA9IGNhY2hlW3RoaXMuZWwudmFsdWVdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbC52YWx1ZSkge1xuICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLmZpbHRlclJlc3VsdCh0aGlzLmVsLnZhbHVlKTtcbiAgICAgIGNhY2hlW3RoaXMuZWwudmFsdWVdID0gdGhpcy5yZXN1bHQ7IFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlc3VsdCA9IHRoaXMuZGF0YTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codGhpcy5yZXN1bHQpO1xuICAgIGNvbnN0IHVsID0gdGhpcy5saXN0LnJlbG9hZCh0aGlzLnJlc3VsdCk7XG4gICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5saXN0LmVsKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh1bCk7XG4gICAgdGhpcy5saXN0LmVsID0gdWw7XG4gIH0pO1xuXG4gIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmxpc3QpIHtcbiAgICAgIHRoaXMubGlzdCA9IG5ldyBMaXN0KHtcbiAgICAgICAgaWQ6ICdzZWxlY3QtbGFicycsXG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YVxuICAgICAgfSk7XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubGlzdC5lbCk7XG4gICAgfVxuICAgIHRoaXMubGlzdC5vcGVuKCk7XG4gIH0pO1xufVxuXG5TZWxlY3QucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbigpIHtcbiAgJC5hamF4KCdHRVQnLCB0aGlzLm9wdGlvbnMudXJsLCAocmVzcG9uY2UpID0+IHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLnJlc3VsdCA9IHJlc3BvbmNlO1xuICB9KTtcbn07XG5cblNlbGVjdC5wcm90b3R5cGUuZmlsdGVyUmVzdWx0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuZGF0YS5maWx0ZXIoaXRlbSA9PiB7XG4gICAgcmV0dXJuIGl0ZW0uaXRlbV9uYW1lLmluZGV4T2YodmFsdWUpID4gLTE7XG4gIH0pO1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Q7Il19
