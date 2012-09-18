var basename, code, dest, dest_path, dirname, err, extname, file, filepath, fs, here, nc2md, para, path, show, stat, target, that, willow, wl2html, wl2md;

show = console.log;

err = function(info) {
  throw new Error(info);
};

path = require('path');

fs = require('fs');

para = process.argv.slice(2);

willow = require('../lib/willow').willow;

nc2md = require('../lib/narkcown').nc2md;

if (para.length === 0) err('need to specify a file');

filepath = para[0], target = para[1];

here = process.env.PWD;

file = filepath[0] === '/' ? filepath : path.join(here, filepath);

if (!fs.existsSync(file)) err("file '" + file + "' not exists");

extname = path.extname(filepath);

if (extname !== '.wl' && extname !== '.willow') {
  err("bad extname '" + extname + "'");
}

code = fs.readFileSync(file, 'utf8');

dirname = path.dirname(file);

basename = path.basename(file).split('.')[0];

that = path.join(dirname, basename);

dest = target != null ? (dest_path = target[0] === '/' ? target : path.join(here, target), stat = fs.statSync(dest_path), stat.isDirectory() ? dest_path = path.join(dest_path, basename) : void 0) : that;

wl2md = function() {
  dest += '.md';
  return fs.writeFileSync(dest, nc2md(code));
};

wl2html = function() {
  var tmpl, tmpl_path;
  dest += '.html';
  tmpl_path = path.join(__dirname, '../page/tmpl.html');
  tmpl = fs.readFileSync(tmpl_path, 'utf8');
  return fs.writeFileSync(dest, tmpl.replace('@@@', willow(code)));
};

exports.run = function(mark) {
  if (mark === 'md') {
    return wl2md();
  } else if (mark === 'html') {
    return wl2html();
  }
};
