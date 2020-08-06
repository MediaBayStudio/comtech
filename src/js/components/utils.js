let lazy,
  menu,
  hdr,
  overlay,
  thanksPopup,
  thanksPopupTimer,
  // callbackPopup,
  // orderPopup,
  fakeScrollbar,
  // siteurl = document.body.dataset.siteurl,
  // page = document.body.dataset.page,
  // mobileRegExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
  // mobile = mobileRegExp.test(navigator.userAgent),
  // IE = navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1,
  q = function(selector, element) {
    element = element || document.body;
    return element.querySelector(selector);
  },
  qa = function(selectors, element, toArray) {
    element = element || document.body;
    return toArray ? Array.prototype.slice.call(element.querySelectorAll(selectors)) : element.querySelectorAll(selectors);
  },
  // showLoader = function() {
  //   loader.classList.add('active');
  // },
  // hideLoader = function() {
  //   loader.style.opacity = 0;
  // },
  setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  matchesMedia = function(media) {
    return window.matchMedia(media).matches;
  },
  scrollToTarget  = function(target) {
    event.preventDefault();

    let wndwY = window.pageYOffset,
      targetStyles = getComputedStyle(target),
      targetTop = target.getBoundingClientRect().top - +(targetStyles.paddingTop).slice(0, -2) - +(targetStyles.marginTop).slice(0, -2),
      start = null,
      V = .35,
      step = function(time) {
        if (start === null) {
          start = time;
        }
        let progress = time - start,
          r = (targetTop < 0 ? Math.max(wndwY - progress/V, wndwY + targetTop) : Math.min(wndwY + progress/V, wndwY + targetTop));

        window.scrollTo(0, r);

        if (r != wndwY + targetTop) {
          requestAnimationFrame(step);
        }
      }

    requestAnimationFrame(step);
  };