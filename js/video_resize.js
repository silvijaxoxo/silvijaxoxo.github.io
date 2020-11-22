$(document).ready(resizeVideo());

function resizeVideo(){
  var filmwidth = $('.video').width();
  var filmheight = filmwidth / 16 * 9;
  $('.video').height(filmheight);
}
