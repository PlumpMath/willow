
show = (x) -> console.log x
ls = localStorage

$ ->
  old = ls.text or ''
  ls.html = willow old
  $('#text').val old
  $('#play').html ls.html

  $('#text').bind 'input', ->
    ls.text = $('#text').val()
    ls.html = willow ls.text
    $('#play').html ls.html