
show = console.log
err = (info) -> throw new Error info
path = require 'path'
fs = require 'fs'

para = process.argv[2..]

willow = require('../lib/willow').willow
nc2md = require('../lib/narkcown').nc2md

if para.length is 0 then err 'need to specify a file'
[filepath, target] = para

here = process.env.PWD

file =
  if filepath[0] is '/' then filepath
  else path.join here, filepath

unless fs.existsSync file then err "file '#{file}' not exists"
extname = path.extname filepath
unless extname in ['.wl', '.willow'] then err "bad extname '#{extname}'"

code = fs.readFileSync file, 'utf8'
# show code

dirname = path.dirname file
basename = path.basename(file).split('.')[0]
# show basename

that = path.join dirname, basename

dest =
  if target?
    dest_path =
      if target[0] is '/' then target
      else path.join here, target
    stat = fs.statSync dest_path
    if stat.isDirectory()
      dest_path = path.join dest_path, basename
  else that

# show dest

wl2md = ->
  dest += '.md'
  fs.writeFileSync dest, (nc2md code)

wl2html = ->
  dest += '.html'
  tmpl_path = path.join __dirname, '../page/tmpl.html'
  tmpl = fs.readFileSync tmpl_path, 'utf8'
  fs.writeFileSync dest, tmpl.replace('@@@', (willow code))

exports.run = (mark) ->
  if mark is 'md' then do wl2md
  else if mark is 'html' then do wl2html