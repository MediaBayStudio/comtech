;(function() {
  $('form').each(function() {
    $(this).validate({
      rules: {
        'user-name': {
          required: true,
          userName: true,
          minlength: 2
        },
        'user-tel': {
          required: true,
          userPhone: true
        },
        'user-email': {
          email: true
        },
        'policy': {
          required: true,
          minlength: 1
        }
      },
      messages: {
        'user-name': {
          required: 'Укажите имя',
          minlength: jQuery.validator.format('Имя не может быть таким коротким'),
          userName: 'Допустимы только буквы'
        },
        'user-tel': {
          required: 'Укажите телефон',
          userPhone: 'Укажите верный номер телефона'
        },
        'user-email': {
          email: 'Укажите верный E-mail'
        },
        'privacy-policy': {
          required: 'Согласитель с политикой обработки персональных данных'
        }
      },
      onfocusout: false,
      errorClass: 'invalid',
      submitHandler: function(form, event) {
        event.preventDefault();

        $(form).find('input, textarea').removeClass('filled');
        
        $(this)[0].resetForm();
      
      }
      });
    });

    // form beforesubmit validate
    $('form .btn').on('click', function() {
      if (!$(event.target).parents('form').valid()) {
        event.preventDefault();
      }
    });

  })();


  $('.field__inp').on('input', function() {
    if ($(this).val() !== '') {
      $(this).addClass('filled');
    } else {
      $(this).removeClass('filled');
    }
  });

  $.validator.methods.userName = function(value, element) {
    return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(value);
  };

  $.validator.methods.userPhone = function(value, element) {
    return /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/.test(value);
  };
