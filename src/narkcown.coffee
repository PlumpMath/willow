
chars = ['>', '-', '*', ' ', '+']
ss = '  '

exports.nc2md = (file) ->
  list = file.split '\n'
  list = list.map (line) ->
    line = line.trimRight()
    if line is '\\' then '<br>'
    # else if line.length <= 2 then line
    else if line[0..1] is ss then ss+line
    else line+ss
  copy = []
  normal = true
  for line in list
    plain =
      if not line[0]? then 2 else
        if line[0] in chars then -1 else 1
    copy.push '' if (plain + normal) is 0
    copy.push line
    normal = plain
  copy.join '\n'