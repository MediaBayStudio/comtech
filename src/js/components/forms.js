;(function() {
  let shqForm = q('.shq-sect__form'),
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
/*
  Функция получения значения полей у текущей формы.
  Ищет только те элементы формы, именя которых указаны в rules.
  Возвращает объект: 
  {название-поля: значение-поля}
  Например:
  {'user-email': 'mail@mail.ru'}
*/
    getFormData = function($form) {
      let formElements = $form.elements,
        values = {};

      for (let rule in rules) {
        let formElement = formElements[rule];

        if (formElement) {
          values[rule] = formElement.value;
        }
      }

      return values;
    },
/*
  Функция проверки правильности заполнения формы.
*/
    validationForm = function() {
      event.preventDefault();

      let errors = {},
        thisForm = this,
        values = getFormData(thisForm);

      for (let elementName in values) {
        let rule = rules[elementName],
          $formElement = thisForm.elements[elementName],
          elementValue = values[elementName];

        if (rule) {
          if ($formElement.hasAttribute('required') || rule.required === true) {
            let elementType = $formElement.type,
              pattern = rule.pattern;

            if ( ((elementType === 'checkbox' || elementType === 'radio') && !$formElement.checked)
              || elementValue === '' ) {
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
    showErrors = function($form, errors) {
      let $formElements = $form.elements;

      for (let elementName in errors) {
        let errorText = errors[elementName],
          $errorElement = `<label class="${errorsClass}">${errorText}</label>`,
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
    hideError = function($formElement) {
      let $nextElement = $formElement.nextElementSibling;
      $formElement.classList.remove(errorsClass);
      if ($nextElement && $nextElement.classList.contains(errorsClass)) {
        $nextElement.parentElement.removeChild($nextElement);
      }
    },
    submitHandler = function($form) {

      let xhr = new XMLHttpRequest(),
        data = new FormData($form);

      xhr.open($form.method, $form.action);
      xhr.send(data);

      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let $formElements = $form.elements,
            response = xhr.response;

          for (let i = 0; i < $formElements.length; i++) {
            hideError($formElements[i]);
            $formElements[i].classList.remove('filled');
          }

          $form.reset();

          if (response == 1) {
            thanksPopup.openPopup();
            thanksPopupTimer = setTimeout(function() {
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

    for (let i = 0; i < textFields.length; i++) {
      textFields[i].addEventListener('input', function() {
        if (textFields[i].value === '')  {
          textFields[i].classList.remove('filled');
        } else {
          textFields[i].classList.add('filled');
        }
      });
    }
    
})();