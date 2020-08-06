;(function() {
  let nextArrow = '<button type="button" class="arrow"></button>',
    prevArrow = '<button type="button" class="arrow"></button>',
    dot = '<button type="button" class="dot"></button>',
    slidesSect = document.querySelector('.slidesSect'),
    slides = slidesSect.querySelectorAll('.slide'),

    buildSlider = function() {
      // если ширина экрана больше 578px и слайдов меньше 4, то слайдера не будет
      if (matchMedia('(min-width: 575.98px)').matches && slides.length < 4) {
        if (slidesSect.hasClass('slick-slider')) {
          slidesSect.slick('unslick');
        }
      // если ширина экрана больше 1440px и слайдов меньше 7, то слайдера не будет
      } else if (matchMedia('(min-width: 1439.98px)').matches && slides.length < 7) {
        if (slidesSect.hasClass('slick-slider')) {
          slidesSect.slick('unslick');
        }
      // в других случаях делаем слайдер
      } else {
        if (slidesSect.hasClass('slick-slider')) {
          // слайдер уже создан
          return;
        }
        if (slides.length && slides.length > 2) {
          slidesSect.slick({
          // appendDots: $('element'),
          // appendArrows: $('element'),
          // autoplay: true,
          // autoplaySpeed: 3000,
          // adaptiveHeight: false,
          // asNavFor: $('element'),
          // centerMode: false,
          // centerPadding: '50px',
          // cssEase: 'ease',
          // draggable: true,
          // slide: 'selector',
          accessibility: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false, // true by default
          dots: true,
          dotsClass: 'partners__dots dots',
          customPaging: function() {
            return dot;
          },
            mobileFirst: true,
            responsive: [{
              breakpoint: 575.98,
              settings: {
                slidesToScroll: 1,
                slidesToShow: 3
              }
            }, {
              breakpoint: 1439.98,
              settings: {
                slidesToScroll: 1,
                slidesToShow: 5
              }
            }]
          });
        }
      }
    };

  if (slides.length && slides.length > 0) {
    window.addEventListener('resize', buildSlider);
    buildSlider();
  }

  // настройки grab курсора на всех слайдерах
  $('.slick-list.draggable').on('mousedown', function() {
    $(this).addClass('grabbing');
  });

  $('.slick-list.draggable').on('beforeChange', function() {
    $(this).removeClass('grabbing');
  });

  $(document).on('mouseup', function() {
    $('.slick-list.draggable').removeClass('grabbing');
  });


})();