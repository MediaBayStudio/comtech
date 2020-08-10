//polyfills
(function () {
  'use strict';

  function a(a) {
    this.time = a.time, this.target = a.target, this.rootBounds = a.rootBounds, this.boundingClientRect = a.boundingClientRect, this.intersectionRect = a.intersectionRect || i(), this.isIntersecting = !!a.intersectionRect;
    var b = this.boundingClientRect,
        c = b.width * b.height,
        d = this.intersectionRect,
        e = d.width * d.height;
    this.intersectionRatio = c ? +(e / c).toFixed(4) : this.isIntersecting ? 1 : 0;
  }

  function b(a, b) {
    var c = b || {};
    if ("function" != typeof a) throw new Error("callback must be a function");
    if (c.root && 1 != c.root.nodeType) throw new Error("root must be an Element");
    this._checkForIntersections = d(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT), this._callback = a, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(c.rootMargin), this.thresholds = this._initThresholds(c.threshold), this.root = c.root || null, this.rootMargin = this._rootMarginValues.map(function (a) {
      return a.value + a.unit;
    }).join(" ");
  }

  function c() {
    return window.performance && performance.now && performance.now();
  }

  function d(a, b) {
    var c = null;
    return function () {
      c || (c = setTimeout(function () {
        a(), c = null;
      }, b));
    };
  }

  function e(a, b, c, d) {
    "function" == typeof a.addEventListener ? a.addEventListener(b, c, d || !1) : "function" == typeof a.attachEvent && a.attachEvent("on" + b, c);
  }

  function f(a, b, c, d) {
    "function" == typeof a.removeEventListener ? a.removeEventListener(b, c, d || !1) : "function" == typeof a.detatchEvent && a.detatchEvent("on" + b, c);
  }

  function g(a, b) {
    var c = Math.max(a.top, b.top),
        d = Math.min(a.bottom, b.bottom),
        e = Math.max(a.left, b.left),
        f = Math.min(a.right, b.right),
        g = f - e,
        h = d - c;
    return 0 <= g && 0 <= h && {
      top: c,
      bottom: d,
      left: e,
      right: f,
      width: g,
      height: h
    };
  }

  function h(a) {
    var b;

    try {
      b = a.getBoundingClientRect();
    } catch (a) {}

    return b ? (b.width && b.height || (b = {
      top: b.top,
      right: b.right,
      bottom: b.bottom,
      left: b.left,
      width: b.right - b.left,
      height: b.bottom - b.top
    }), b) : i();
  }

  function i() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }

  function j(a, b) {
    for (var c = b; c;) {
      if (c == a) return !0;
      c = k(c);
    }

    return !1;
  }

  function k(a) {
    var b = a.parentNode;
    return b && 11 == b.nodeType && b.host ? b.host : b && b.assignedSlot ? b.assignedSlot.parentNode : b;
  }

  if ("object" == typeof window) {
    if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) return void ("isIntersecting" in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
      get: function () {
        return 0 < this.intersectionRatio;
      }
    }));
    var l = window.document,
        m = [];
    b.prototype.THROTTLE_TIMEOUT = 100, b.prototype.POLL_INTERVAL = null, b.prototype.USE_MUTATION_OBSERVER = !0, b.prototype.observe = function (a) {
      var b = this._observationTargets.some(function (b) {
        return b.element == a;
      });

      if (!b) {
        if (!(a && 1 == a.nodeType)) throw new Error("target must be an Element");
        this._registerInstance(), this._observationTargets.push({
          element: a,
          entry: null
        }), this._monitorIntersections(), this._checkForIntersections();
      }
    }, b.prototype.unobserve = function (a) {
      this._observationTargets = this._observationTargets.filter(function (b) {
        return b.element != a;
      }), this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance());
    }, b.prototype.disconnect = function () {
      this._observationTargets = [], this._unmonitorIntersections(), this._unregisterInstance();
    }, b.prototype.takeRecords = function () {
      var a = this._queuedEntries.slice();

      return this._queuedEntries = [], a;
    }, b.prototype._initThresholds = function (a) {
      var b = a || [0];
      return Array.isArray(b) || (b = [b]), b.sort().filter(function (b, c, d) {
        if ("number" != typeof b || isNaN(b) || 0 > b || 1 < b) throw new Error("threshold must be a number between 0 and 1 inclusively");
        return b !== d[c - 1];
      });
    }, b.prototype._parseRootMargin = function (a) {
      var b = (a || "0px").split(/\s+/).map(function (a) {
        var b = /^(-?\d*\.?\d+)(px|%)$/.exec(a);
        if (!b) throw new Error("rootMargin must be specified in pixels or percent");
        return {
          value: parseFloat(b[1]),
          unit: b[2]
        };
      });
      return b[1] = b[1] || b[0], b[2] = b[2] || b[0], b[3] = b[3] || b[1], b;
    }, b.prototype._monitorIntersections = function () {
      this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (e(window, "resize", this._checkForIntersections, !0), e(l, "scroll", this._checkForIntersections, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in window && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(l, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }))));
    }, b.prototype._unmonitorIntersections = function () {
      this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, f(window, "resize", this._checkForIntersections, !0), f(l, "scroll", this._checkForIntersections, !0), this._domObserver && (this._domObserver.disconnect(), this._domObserver = null));
    }, b.prototype._checkForIntersections = function () {
      var b = this._rootIsInDom(),
          d = b ? this._getRootRect() : i();

      this._observationTargets.forEach(function (e) {
        var f = e.element,
            g = h(f),
            i = this._rootContainsTarget(f),
            j = e.entry,
            k = b && i && this._computeTargetAndRootIntersection(f, d),
            l = e.entry = new a({
          time: c(),
          target: f,
          boundingClientRect: g,
          rootBounds: d,
          intersectionRect: k
        });

        j ? b && i ? this._hasCrossedThreshold(j, l) && this._queuedEntries.push(l) : j && j.isIntersecting && this._queuedEntries.push(l) : this._queuedEntries.push(l);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }, b.prototype._computeTargetAndRootIntersection = function (a, b) {
      if ("none" != window.getComputedStyle(a).display) {
        for (var c = h(a), d = c, e = k(a), f = !1; !f;) {
          var i = null,
              j = 1 == e.nodeType ? window.getComputedStyle(e) : {};
          if ("none" == j.display) return;
          if (e == this.root || e == l ? (f = !0, i = b) : e != l.body && e != l.documentElement && "visible" != j.overflow && (i = h(e)), i && (d = g(i, d), !d)) break;
          e = k(e);
        }

        return d;
      }
    }, b.prototype._getRootRect = function () {
      var a;
      if (this.root) a = h(this.root);else {
        var b = l.documentElement,
            c = l.body;
        a = {
          top: 0,
          left: 0,
          right: b.clientWidth || c.clientWidth,
          width: b.clientWidth || c.clientWidth,
          bottom: b.clientHeight || c.clientHeight,
          height: b.clientHeight || c.clientHeight
        };
      }
      return this._expandRectByRootMargin(a);
    }, b.prototype._expandRectByRootMargin = function (a) {
      var b = this._rootMarginValues.map(function (b, c) {
        return "px" == b.unit ? b.value : b.value * (c % 2 ? a.width : a.height) / 100;
      }),
          c = {
        top: a.top - b[0],
        right: a.right + b[1],
        bottom: a.bottom + b[2],
        left: a.left - b[3]
      };

      return c.width = c.right - c.left, c.height = c.bottom - c.top, c;
    }, b.prototype._hasCrossedThreshold = function (a, b) {
      var c = a && a.isIntersecting ? a.intersectionRatio || 0 : -1,
          d = b.isIntersecting ? b.intersectionRatio || 0 : -1;
      if (c !== d) for (var e, f = 0; f < this.thresholds.length; f++) {
        if (e = this.thresholds[f], e == c || e == d || e < c != e < d) return !0;
      }
    }, b.prototype._rootIsInDom = function () {
      return !this.root || j(l, this.root);
    }, b.prototype._rootContainsTarget = function (a) {
      return j(this.root || l, a);
    }, b.prototype._registerInstance = function () {
      0 > m.indexOf(this) && m.push(this);
    }, b.prototype._unregisterInstance = function () {
      var a = m.indexOf(this);
      -1 != a && m.splice(a, 1);
    }, window.IntersectionObserver = b, window.IntersectionObserverEntry = a;
  }
})();

(function () {
  function a(a, b) {
    b = b || {
      bubbles: !1,
      cancelable: !1,
      detail: null
    };
    var c = document.createEvent("CustomEvent");
    return c.initCustomEvent(a, b.bubbles, b.cancelable, b.detail), c;
  }

  return "function" != typeof window.CustomEvent && void (a.prototype = window.Event.prototype, window.CustomEvent = a);
})();

var lazy,
    menu,
    hdr,
    ftr,
    overlay,
    thanksPopup,
    servicePopup,
    orderPopup,
    thanksPopupTimer,
    // callbackPopup,
// orderPopup,
fakeScrollbar,
    // siteurl = document.body.dataset.siteurl,
// page = document.body.dataset.page,
// mobileRegExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
// mobile = mobileRegExp.test(navigator.userAgent),
// IE = navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1,
q = function (selector, element) {
  element = element || document.body;
  return element.querySelector(selector);
},
    qa = function (selectors, element, toArray) {
  element = element || document.body;
  return toArray ? Array.prototype.slice.call(element.querySelectorAll(selectors)) : element.querySelectorAll(selectors);
},
    // showLoader = function() {
//   loader.classList.add('active');
// },
// hideLoader = function() {
//   loader.style.opacity = 0;
// },
setVh = function () {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
},
    matchesMedia = function (media) {
  return window.matchMedia(media).matches;
},
    scrollToTarget = function (target) {
  event.preventDefault();

  var wndwY = window.pageYOffset,
      targetStyles = getComputedStyle(target),
      targetTop = target.getBoundingClientRect().top - +targetStyles.paddingTop.slice(0, -2) - +targetStyles.marginTop.slice(0, -2),
      start = null,
      V = .35,
      step = function (time) {
    if (start === null) {
      start = time;
    }

    var progress = time - start,
        r = targetTop < 0 ? Math.max(wndwY - progress / V, wndwY + targetTop) : Math.min(wndwY + progress / V, wndwY + targetTop);
    window.scrollTo(0, r);

    if (r != wndwY + targetTop) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

document.addEventListener('DOMContentLoaded', function () {
  // делаем глобальный lazy, чтобы потом можно было обновлять его
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  }); // фикс vh для элементов с 100vh

  window.addEventListener('resize', function () {
    setVh(); // mobile = mobileRegExp.test(navigator.userAgent);
  });
  setVh();
  svg4everybody();
  var linksParents = [q('.hdr'), q('.ftr'), q('.hero-sect__btn')],
      hashRegExp = /[^#]*(.*)/;
  linksParents.forEach(function (parent) {
    parent.addEventListener('click', function () {
      var target = event.target;

      if (target.classList.contains('hdr__nav-link') || target.classList.contains('ftr__nav-link') || target.classList.contains('hero-sect__btn')) {
        event.preventDefault();
        var scrollTarget = q(target.href.replace(hashRegExp, '$1'));
        scrollToTarget(scrollTarget);
      }
    });
  }); //includes

  ;

  (function () {
    var faqBlock = document.querySelector('.faq-sect__text-block');

    if (faqBlock) {
      var faqBlocks = faqBlock.children,
          initDropdown = function () {
        var childs = faqBlocks[0].children;
        hideText(1);
        faqBlocks[0].style.maxHeight = childs[0].scrollHeight + childs[1].scrollHeight + 'px';
        faqBlocks[0].classList.add('active');
        faqBlock.addEventListener('click', function () {
          var target = event.target;

          if (target.tagName === 'BUTTON') {
            dropdownText(target);
          }
        });
      },
          dropdownText = function (element) {
        element = element || faqBlocks[0]; // если элемент не передали, то открываем первый

        var minHeight = element.scrollHeight,
            parent = element.parentElement,
            answer = element.nextElementSibling,
            answerHeight = answer.scrollHeight;

        if (parent.classList.contains('active')) {
          if (faqBlocks.length > 1) {
            parent.style.maxHeight = minHeight + 'px';
            parent.classList.remove('active');
          }
        } else {
          hideText(0);
          parent.classList.add('active');
          parent.style.maxHeight = minHeight + answerHeight + 'px';
        }
      },
          hideText = function (start) {
        for (var i = start; i < faqBlocks.length; i++) {
          faqBlocks[i].classList.remove('active');
          faqBlocks[i].style.maxHeight = faqBlocks[i].children[0].scrollHeight + 'px';
        }
      };

      initDropdown();
    }
  })();

  menu = new MobileMenu('.menu', {
    openButton: '.burger',
    closeButtons: '.burger',
    overlay: '.overlay',
    toRight: true,
    fixHeader: '.hdr'
  });

  (function () {
    thanksPopup = new Popup('.thanks-popup', {
      closeButtons: '.thanks-popup__close'
    });
    servicePopup = new Popup('.service-popup', {
      closeButtons: '.service-popup__close',
      openButtons: '.service'
    });
    orderPopup = new Popup('.order-popup', {
      closeButtons: '.order-popup__close',
      openButtons: '.service-popup__button'
    }); // thanksPopup.addEventListener('popupbeforeopen', function() {
    //   clearTimeout(thanksPopupTimer);
    // });
    // Закрытие всех попапов вместе с закрытием окна спасибо

    thanksPopup.addEventListener('popupbeforeclose', function () {
      var otherPopups = [servicePopup, orderPopup];
      clearTimeout(thanksPopupTimer);

      for (var i = 0; i < otherPopups.length; i++) {
        if (otherPopups[i].classList.contains('active')) {
          otherPopups[i].closePopup();
        }
      }
    });
    orderPopup.addEventListener('popupbeforeopen', function () {
      var serviceTitle = q('.service-popup__title', servicePopup);
      orderPopupInput.value = serviceTitle.textContent; // 
    });

    var checkPopupCaller = function (elem) {
      if (elem.dataset.descr) {
        return elem;
      } else {
        return checkPopupCaller(elem.parentElement);
      }
    },
        orderPopupInput = q('#order-popup__input'),
        servicePopupCnt = q('.service-popup__cnt', servicePopup),
        printServiceText = function (event, serviceCaller) {
      serviceCaller = serviceCaller || this.caller;
      var caller = checkPopupCaller(serviceCaller),
          popupImage = q('.service-popup__img', servicePopupCnt),
          popupTitle = popupImage.nextElementSibling,
          popupDescr = popupTitle.nextElementSibling,
          popupList = q('.service-popup__list', servicePopupCnt),
          prev = q('.prev', servicePopupCnt),
          next = q('.next', servicePopupCnt),
          callerImage = q('.service__img', caller),
          callerTitle = q('.service__title', caller),
          callerDescr = caller.dataset.descr,
          callerList = caller.dataset.list.split(';').reduce(function (prev, next) {
        return prev + '<li class="service-popup__list-item">– ' + next + '</li>';
      }, '');
      currentCaller = caller;
      prev.classList.toggle('disabled', !currentCaller.previousElementSibling);
      next.classList.toggle('disabled', !currentCaller.nextElementSibling);
      popupImage.src = callerImage.src[callerImage.src.length - 1] === '#' ? callerImage.lazyObject.src : callerImage.src;
      popupTitle.textContent = callerTitle.textContent;
      popupDescr.textContent = callerDescr;
      popupList.innerHTML = callerList;
    },
        currentCaller = null;

    servicePopup.addEventListener('popupbeforeopen', printServiceText);
    servicePopup.addEventListener('click', function () {
      var target = event.target,
          caller;

      if (target.classList.contains('prev')) {
        caller = currentCaller.previousElementSibling;
      } else if (target.classList.contains('next')) {
        caller = currentCaller.nextElementSibling;
      } else {
        return;
      }

      servicePopup.scrollTop = 0;
      printServiceText(event, caller);
    });
  })();

  (function () {
    var shqForm = q('.shq-sect__form'),
        orderPopupForm = q('.order-popup__form'),
        textFields = qa('input, textarea'),
        errorsClass = 'invalid',
        rules = {
      'user-email': {
        required: true,
        pattern: /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/
      },
      'user-msg': {
        required: true,
        pattern: /[^\<\>\[\]%\&'`]+$/
      },
      'policy': {
        required: 'Согласитель с политикой обработки персональных данных'
      }
    },
        messages = {
      'user-email': {
        required: 'Введите E-mail',
        pattern: 'Введите верный E-mail'
      },
      'user-msg': {
        required: 'Введите сообщение',
        pattern: 'Введены недопустимые символы'
      },
      'policy': {
        required: 'Согласитель с политикой обработки персональных данных'
      }
    },
        getFormData = function ($form) {
      var formElements = $form.elements,
          values = {};

      for (var rule in rules) {
        var formElement = formElements[rule];

        if (formElement) {
          values[rule] = formElement.value;
        }
      }

      return values;
    },
        validationForm = function () {
      event.preventDefault();
      var errors = {},
          thisForm = this,
          values = getFormData(thisForm);

      for (var elementName in values) {
        var rule = rules[elementName],
            $formElement = thisForm.elements[elementName],
            elementValue = values[elementName];

        if (rule) {
          if ($formElement.hasAttribute('required') || rule.required === true) {
            var elementType = $formElement.type,
                pattern = rule.pattern;

            if ((elementType === 'checkbox' || elementType === 'radio') && !$formElement.checked || elementValue === '') {
              errors[elementName] = messages[elementName].required;
              continue;
            }

            if (elementType !== 'cehckbox' && elementType !== 'radio' && pattern) {
              if (pattern.test(elementValue) === false) {
                errors[elementName] = messages[elementName].pattern;
                continue;
              }
            }

            hideError($formElement);
          }
        }
      }

      if (Object.keys(errors).length == 0) {
        thisForm.removeEventListener('change', validationForm);
        thisForm.removeEventListener('input', validationForm);

        if (event.type === 'submit') {
          submitHandler(thisForm);
        }
      } else {
        thisForm.addEventListener('change', validationForm);
        thisForm.addEventListener('input', validationForm);
        showErrors(thisForm, errors);
      }
    },
        showErrors = function ($form, errors) {
      var $formElements = $form.elements;

      for (var elementName in errors) {
        var errorText = errors[elementName],
            $errorElement = "<label class=\"" + errorsClass + "\">" + errorText + "</label>",
            $formElement = $formElements[elementName],
            $nextElement = $formElement.nextElementSibling;

        if ($nextElement && $nextElement.classList.contains(errorsClass)) {
          if ($nextElement.textContent !== errorText) {
            $nextElement.textContent = errorText;
          }

          continue;
        } else {
          $formElement.insertAdjacentHTML('afterend', $errorElement);
        }

        $formElement.classList.add(errorsClass);
      }
    },
        hideError = function ($formElement) {
      var $nextElement = $formElement.nextElementSibling;
      $formElement.classList.remove(errorsClass);

      if ($nextElement && $nextElement.classList.contains(errorsClass)) {
        $nextElement.parentElement.removeChild($nextElement);
      }
    },
        submitHandler = function ($form) {
      var xhr = new XMLHttpRequest(),
          data = new FormData($form);
      xhr.open($form.method, $form.action);
      xhr.send(data);
      xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var $formElements = $form.elements,
              response = xhr.response;

          for (var i = 0; i < $formElements.length; i++) {
            hideError($formElements[i]);
            $formElements[i].classList.remove('filled');
          }

          $form.reset();

          if (response == 1) {
            thanksPopup.openPopup();
            thanksPopupTimer = setTimeout(function () {
              thanksPopup.closePopup();
            }, 3000);
          }
        }
      });
    };

    shqForm.setAttribute('novalidate', '');
    orderPopupForm.setAttribute('novalidate', '');
    shqForm.addEventListener('submit', validationForm);
    orderPopupForm.addEventListener('submit', validationForm);

    var _loop = function (i) {
      textFields[i].addEventListener('input', function () {
        if (textFields[i].value === '') {
          textFields[i].classList.remove('filled');
        } else {
          textFields[i].classList.add('filled');
        }
      });
    };

    for (var i = 0; i < textFields.length; i++) {
      _loop(i);
    }
  })();
});