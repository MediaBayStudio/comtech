//polyfills
//=include intersectionObserverPolyfill.js
//=include customEventsPolyfill.js
//=include utils.js

document.addEventListener('DOMContentLoaded', function() {

  // делаем глобальный lazy, чтобы потом можно было обновлять его
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  // фикс vh для элементов с 100vh
  window.addEventListener('resize', function() {
    setVh();
    // mobile = mobileRegExp.test(navigator.userAgent);
  });
  setVh();

  svg4everybody();


  hdr = q('.hdr');

  let linksParents = [hdr, q('.ftr'), q('.hero-sect__btn')],
    hashRegExp = /[^#]*(.*)/,
    targetIsLogo = function(target) {
      return target.classList.contains('hdr__logo') || target.classList.contains('menu__logo');
    };

  linksParents.forEach(function(parent) {
    parent.addEventListener('click', function() {
      let target = event.target;

      if (target.classList.contains('hdr__nav-link')
        || target.classList.contains('ftr__nav-link')
        || target.classList.contains('hero-sect__btn')
        || target.classList.contains('menu__nav-link')
        || targetIsLogo(target)) {

        event.preventDefault();
        let scrollTarget = targetIsLogo(target) ? document.body : q(target.href.replace(hashRegExp, '$1'));
        scrollToTarget(scrollTarget);
        menu.closeMenu();
      }
    });

  });

  //includes
  //=include dropdownText.js
  //=include menu.js
  //=include popups.js
  //=include forms.js
  //=include parallax.js


});