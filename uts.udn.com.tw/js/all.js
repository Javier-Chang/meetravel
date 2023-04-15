$( document ).ready(function() {
  if ( $('.hero').length != 0 ) {
    $('.hero-holder').addClass('active');
    $('.hero-slider').slick({
      fade: true,
      dots: true,
      infinite: true,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 3000
    });
  }

  $('.extra-option-btn').on('click', function(){
    $(this).toggleClass('active');
  });

  $('.badge').on('click', function(){
    $(this).toggleClass('active');
  });

  if ( $('.record-photo-wrap').length != 0 ) {
    $('.record-photo-wrap').magnificPopup({
      type:'image',
      preloader: true,
      removalDelay: 300,
      mainClass: 'mfp-fade',
      gallery: {
        enabled: true,
        callbacks: {
          open: setInterval(function() { $.magnificPopup.instance.next(); }, 5000)
        }
      }
    });
  }


  $('.option').on('click', function(){
    $(this).toggleClass('active');
  });

  $('.othercheckbox').on('click', function(){
    if ($(this).is(":checked")) {
      $(this).parents('.form-content').find('.otherinput').removeAttr('disabled');
    } else {
      $(this).parents('.form-content').find('.otherinput').attr('disabled', true);
    }
  })
});




