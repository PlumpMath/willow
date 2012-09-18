
show = (x) -> console.log x
ls = localStorage

$ ->
  if ls.text? and ls.text.trim().length > 0
    old = ls.text
    ls.html = willow old
    $('#text').val old
    $('#play').html ls.html

  $('#text').bind 'input', ->
    ls.text = $('#text').val()
    ls.html = willow ls.text
    $('#play').html ls.html