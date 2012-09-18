
g =
  if exports? then exports
  else if window? then window

isArr = (a) -> Array.isArray a
last = (list) -> list[list.length - 1]
trimRight = (line) -> line.trimRight()

show = (x) -> console.log x

draw = (line) ->
  line
    .replace(/(https?:(\/\/)?\S+)/g, '<a href="$1">$1</a>')
    .replace(/\s\s/g, '&nbsp;&nbsp;')

plain = (line) ->
  line.replace(/>/g,'&gt;')
    .replace(/</g,'&lt;')
    .replace(/\t/g,'  ')

fold = (arr) ->
  ret = []
  code = []
  mode = 'text'
  arr.forEach (line) ->
    if line[..1] is '  '
      code.push line[2..]
      mode = 'code'
    else if line.length is 0
      if mode is 'code'
        code.push ''
      else if mode is 'text'
        ret.push ''
    else
      if mode is 'code'
        ret.push code
        end = ret.length - 1
        while (last ret[end]) is ''
          ret.push ret[end].pop()
        if ret[end].length is 0
          ret = ret[...end].concat ret[end+1..]
        ret.push line
        code = []
        mode = 'text'
      else if mode is 'text'
        ret.push line
  if code.length > 0 then ret.push code
  if mode is 'code'
    end = ret.length - 1
    while (last ret[end]) is ''
      ret.push ret[end].pop()
    if ret[end].length is 0
      ret = ret[...end].concat ret[end+1..]
  show ret
  ret

text = (line) ->
  # show 'text:: ', line
  mode = 'text'
  isEsc = no
  token = ''
  for c in line
    # show 'c:: ', c
    if isEsc
      token += c
      isEsc = no
    else
      if mode is 'text'
        if c is '#'
          mode = 'bold'
          token += '<b>'
        else if c is '`'
          mode = 'code'
          token += '<code>'
        else if c is '\\'
          isEsc = yes
        else
          token += c
      else if mode is 'bold'
        if c is '#'
          mode = 'text'
          token += '</b>'
        else if c is '\\'
          isEsc = yes
        else
          token += c
      else if mode is 'code'
        if c is '`'
          mode = 'text'
          token += '</code>'
        else if c is '\\'
          isEsc = yes
        else
          token += c
  if mode is 'code'
    token += '</code>'
  else if mode is 'bold'
    token += '</b>'
  show token
  show token.length
  draw token

div = (arr) ->
  # show 'div:: ', arr
  html = ""
  for line in arr
    html +=
      if isArr line
        # "<pre><code>  #{div line}</code></pre>"
        # nested code blocks does not suit github
        "  #{div line}"
      else
        if line is '' then line = ' '
        "#{draw line}\n"
  html

g.willow = (str) ->
  arr = fold str.split('\n').map(trimRight).map(plain)
  p = ''
  for line in arr
    if isArr line
      p += "<pre><code>#{div line}</code></pre>"
    else
      if line is '' then line = ' '
      p += "#{text line}<br>\n"
  p