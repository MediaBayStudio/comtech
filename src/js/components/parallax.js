;(function() {

  let decorElements = (function() {
    let elementsArray = [],
        $elements = qa('#hero-sect-decor, #services-sect-decor, #faq-sect-decor, #shq-sect-decor');

      for (let i = 0; i < $elements.length; i++) {
        let coords = $elements[i].getBoundingClientRect(),
          element = {
            element: $elements[i],
            top: coords.top + pageYOffset,
            bottom: coords.bottom + pageYOffset,
          };

        $elements[i].style.transform = 'translate3d(0px, 0px, 0px)';

        elementsArray[i] = element;
      }
      return elementsArray;
    })(),
    windowWidth,
    windowHeight,
    lastPageYOffset,
    trfRegExp = /[-0-9.]+(?=px)/g,
    observe = function(event) {
      let windowScroll = {
        top: pageYOffset,                          
        bottom: pageYOffset + windowHeight
      };
      
      for (let i = 0; i < decorElements.length; i++) {
        if (decorElements[i].bottom > windowScroll.top && decorElements[i].top < windowScroll.bottom) {
          parallaxElement(decorElements[i], event);
        }
      }


      lastPageYOffset = pageYOffset;
    },

    initParallaxFunc = function() {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;

      if (matchesMedia('(hover)')) {
        window.addEventListener('mousemove', observe);
        document.removeEventListener('scroll', observe);
      } else {
        document.addEventListener('scroll', observe);
        window.removeEventListener('mousemove', observe);
      }
    },
    parallaxElement = function(element, event) {
      let $element = element.element,
        transform = $element.style.transform.match(trfRegExp),
        eventType = event.type,
        eventClientX = event.clientX,
        eventClientY = event.clientY,
        posX = +transform[0],
        posY = +transform[1];

      if (eventType === 'scroll') {
        if (lastPageYOffset < pageYOffset) {
          ++posY;
          // console.log('двигаемся вниз');
        } else if (lastPageYOffset > pageYOffset) {
          --posY;
          // console.log('двигаемся вверх');
        }
      } else if (eventType === 'mousemove') {
        
        posX = -(event.clientX / windowWidth * 12);
        posY = -(event.clientY / windowHeight * 12);
      }

      $element.style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0px)';
    };

  initParallaxFunc();

  window.addEventListener('resize', initParallaxFunc);


})();