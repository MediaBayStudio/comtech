(function() {
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
  });

  // thanksPopup.addEventListener('popupbeforeopen', function() {
  //   clearTimeout(thanksPopupTimer);
  // });

// Закрытие всех попапов вместе с закрытием окна спасибо
  thanksPopup.addEventListener('popupbeforeclose', function() {
    let otherPopups = [servicePopup, orderPopup];
    clearTimeout(thanksPopupTimer);

    for (let i = 0; i < otherPopups.length; i++) {
      if (otherPopups[i].classList.contains('active')) {
        otherPopups[i].closePopup();
      }
    }
  });


  orderPopup.addEventListener('popupbeforeopen', function() {
    let serviceTitle = q('.service-popup__title', servicePopup);
    orderPopupInput.value = serviceTitle.textContent;
    // console.log(orderPopupInput.value);
  });

  let checkPopupCaller = function(elem) {
    if (elem.dataset.descr) {
      return elem;
    } else {
      return checkPopupCaller(elem.parentElement);
    }
  },
  orderPopupInput = q('#order-popup__input'),
  servicePopupCnt = q('.service-popup__cnt', servicePopup),
  printServiceText = function(event, serviceCaller) {
    serviceCaller = serviceCaller || this.caller;

    let caller = checkPopupCaller(serviceCaller),
      popupImage = q('.service-popup__img', servicePopupCnt),
      popupTitle = popupImage.nextElementSibling,
      popupDescr = popupTitle.nextElementSibling,
      popupList = q('.service-popup__list', servicePopupCnt),
      prev = q('.prev', servicePopupCnt),
      next = q('.next', servicePopupCnt),
      callerImage = q('.service__img', caller),
      callerTitle = q('.service__title', caller),
      callerDescr = caller.dataset.descr,
      callerList = caller.dataset.list.split(';')
                    .reduce((prev, next) => prev + '<li class="service-popup__list-item">– ' + next + '</li>', '');

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
  servicePopup.addEventListener('click', function() {
    let target = event.target,
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
  })
})()