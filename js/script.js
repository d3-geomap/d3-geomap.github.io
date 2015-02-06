$(function(){
  $('.nav a[href="'+document.location.pathname+'"]').parent('li').attr('class', 'active');
  $('a[href*="http"]').attr('target', '_blank');
});