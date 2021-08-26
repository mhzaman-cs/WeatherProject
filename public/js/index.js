window.onscroll = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    $(".navbar").css('padding-top', '0.5rem');
    $(".navbar").css('padding-bottom', '0.5rem');
  } else {
    $(".navbar").css('padding-top', '1rem');
    $(".navbar").css('padding-bottom', '1rem');
  }
}

$(document).ready(function() {
  $(this).scrollTop(0);
});


var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, '300');
});



$(document).ready(function() {

  $('.owl-carousel').owlCarousel({
    mouseDrag: false,
    loop: true,
    margin: 2,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 3
      }
    }
  });

  $('.owl-prev').click(function() {
    $active = $('.owl-item .item.show');
    $('.owl-item .item.show').removeClass('show');
    $('.owl-item .item').removeClass('next');
    $('.owl-item .item').removeClass('prev');
    $active.addClass('next');
    if ($active.is('.first')) {
      $('.owl-item .last').addClass('show');
      $('.first').addClass('next');
      $('.owl-item .last').parent().prev().children('.item').addClass('prev');
    } else {
      $active.parent().prev().children('.item').addClass('show');
      if ($active.parent().prev().children('.item').is('.first')) {
        $('.owl-item .last').addClass('prev');
      } else {
        $('.owl-item .show').parent().prev().children('.item').addClass('prev');
      }
    }
  });

  $('.owl-next').click(function() {
    $active = $('.owl-item .item.show');
    $('.owl-item .item.show').removeClass('show');
    $('.owl-item .item').removeClass('next');
    $('.owl-item .item').removeClass('prev');
    $active.addClass('prev');
    if ($active.is('.last')) {
      $('.owl-item .first').addClass('show');
      $('.owl-item .first').parent().next().children('.item').addClass('prev');
    } else {
      $active.parent().next().children('.item').addClass('show');
      if ($active.parent().next().children('.item').is('.last')) {
        $('.owl-item .first').addClass('next');
      } else {
        $('.owl-item .show').parent().next().children('.item').addClass('next');
      }
    }
  });

});
