var ls, show;

show = function(x) {
  return console.log(x);
};

ls = localStorage;

$(function() {
  var old, render;
  if ((ls.text != null) && ls.text.trim().length > 0) {
    old = ls.text;
    ls.html = willow(old);
    $('#text').val(old);
  }
  (render = function() {
    ls.text = $('#text').val();
    ls.html = willow(ls.text);
    return $('#play').html(ls.html);
  })();
  return $('#text').bind('input', render);
});
