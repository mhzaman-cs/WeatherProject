
window.onscroll = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
  $(".navbar").css('padding-top','0.5rem');
  $(".navbar").css('padding-bottom','0.5rem');
} else {
  $(".navbar").css('padding-top','1rem');
  $(".navbar").css('padding-bottom','1rem');
}
}
