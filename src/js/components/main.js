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

  let linksParents = [q('.hdr'), q('.ftr'), q('.hero-sect__btn')],
    hashRegExp = /[^#]*(.*)/;

  linksParents.forEach(function(parent) {
    parent.addEventListener('click', function() {
      let target = event.target;
      if (target.classList.contains('hdr__nav-link') || target.classList.contains('ftr__nav-link') || target.classList.contains('hero-sect__btn')) {
        event.preventDefault();
        let scrollTarget = q(target.href.replace(hashRegExp, '$1'));
        scrollToTarget(scrollTarget);
      }
    });
  });


  //includes
  //=include dropdownText.js
  //=include menu.js
  //=include popups.js
  //=include forms.js

});