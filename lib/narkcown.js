var chars, ss,
  __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

chars = ['>', '-', '*', ' ', '+'];

ss = '  ';

exports.nc2md = function(file) {
  var copy, line, list, normal, plain, _i, _len, _ref;
  list = file.split('\n');
  list = list.map(function(line) {
    line = line.trimRight();
    if (line === '\\') {
      return '<br>';
    } else if (line.length <= 2) {
      return line;
    } else if (line.slice(0, 2) === ss) {
      return ss + line;
    } else {
      return line + ss;
    }
  });
  copy = [];
  normal = true;
  for (_i = 0, _len = list.length; _i < _len; _i++) {
    line = list[_i];
    plain = !(line[0] != null) ? 2 : (_ref = line[0], __indexOf.call(chars, _ref) >= 0) ? -1 : 1;
    if ((plain + normal) === 0) copy.push('');
    copy.push(line);
    normal = plain;
  }
  return copy.join('\n');
};
