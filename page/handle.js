var ls, show;

show = function(x) {
  return console.log(x);
};

ls = localStorage;

$(function() {
  var old;
  old = ls.text || '';
  ls.html = willow(old);
  $('#text').val(old);
  $('#play').html(ls.html);
  return $('#text').bind('input', function() {
    ls.text = $('#text').val();
    ls.html = willow(ls.text);
    return $('#play').html(ls.html);
  });
});