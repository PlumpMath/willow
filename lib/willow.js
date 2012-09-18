var div, draw, fold, g, isArr, last, plain, show, text, trimRight;

g = typeof exports !== "undefined" && exports !== null ? exports : typeof window !== "undefined" && window !== null ? window : void 0;

isArr = function(a) {
  return Array.isArray(a);
};

last = function(list) {
  return list[list.length - 1];
};

trimRight = function(line) {
  return line.trimRight();
};

show = function(x) {
  return console.log(x);
};

draw = function(line) {
  return line.replace(/(https?:(\/\/)?\S+)/g, '<a href="$1">$1</a>').replace(/\s\s/g, '&nbsp;&nbsp;');
};

plain = function(line) {
  return line.replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\t/g, '  ');
};

fold = function(arr) {
  var code, end, mode, ret;
  ret = [];
  code = [];
  mode = 'text';
  arr.forEach(function(line) {
    var end;
    if (line.slice(0, 2) === '  ') {
      code.push(line.slice(2));
      return mode = 'code';
    } else if (line.length === 0) {
      if (mode === 'code') {
        return code.push('');
      } else if (mode === 'text') {
        return ret.push('');
      }
    } else {
      if (mode === 'code') {
        ret.push(code);
        end = ret.length - 1;
        while ((last(ret[end])) === '') {
          ret.push(ret[end].pop());
        }
        if (ret[end].length === 0) {
          ret = ret.slice(0, end).concat(ret.slice(end + 1));
        }
        ret.push(line);
        code = [];
        return mode = 'text';
      } else if (mode === 'text') {
        return ret.push(line);
      }
    }
  });
  if (code.length > 0) ret.push(code);
  if (mode === 'code') {
    end = ret.length - 1;
    while ((last(ret[end])) === '') {
      ret.push(ret[end].pop());
    }
    if (ret[end].length === 0) ret = ret.slice(0, end).concat(ret.slice(end + 1));
  }
  show(ret);
  return ret;
};

text = function(line) {
  var c, isEsc, mode, token, _i, _len;
  mode = 'text';
  isEsc = false;
  token = '';
  for (_i = 0, _len = line.length; _i < _len; _i++) {
    c = line[_i];
    if (isEsc) {
      token += c;
      isEsc = false;
    } else {
      if (mode === 'text') {
        if (c === '#') {
          mode = 'bold';
          token += '<b>';
        } else if (c === '`') {
          mode = 'code';
          token += '<code>';
        } else if (c === '\\') {
          isEsc = true;
        } else {
          token += c;
        }
      } else if (mode === 'bold') {
        if (c === '#') {
          mode = 'text';
          token += '</b>';
        } else if (c === '\\') {
          isEsc = true;
        } else {
          token += c;
        }
      } else if (mode === 'code') {
        if (c === '`') {
          mode = 'text';
          token += '</code>';
        } else if (c === '\\') {
          isEsc = true;
        } else {
          token += c;
        }
      }
    }
  }
  if (mode === 'code') {
    token += '</code>';
  } else if (mode === 'bold') {
    token += '</b>';
  }
  show(token);
  show(token.length);
  return draw(token);
};

div = function(arr) {
  var html, line, _i, _len;
  html = "";
  for (_i = 0, _len = arr.length; _i < _len; _i++) {
    line = arr[_i];
    html += isArr(line) ? "  " + (div(line)) : (line === '' ? line = ' ' : void 0, "" + (draw(line)) + "\n");
  }
  return html;
};

g.willow = function(str) {
  var arr, line, p, _i, _len;
  arr = fold(str.split('\n').map(trimRight).map(plain));
  p = '';
  for (_i = 0, _len = arr.length; _i < _len; _i++) {
    line = arr[_i];
    if (isArr(line)) {
      p += "<pre><code>" + (div(line)) + "</code></pre>";
    } else {
      if (line === '') line = ' ';
      p += "" + (text(line)) + "<br>\n";
    }
  }
  return p;
};
