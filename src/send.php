<?php

if ( $_POST ) {

  $message = '';
  $user_service = $_POST['user-service'];
  $user_email = $_POST['user-email'];
  $user_msg = $_POST['user-msg'];

  if ( $user_service ) {
    $message .= 'Пользователь заполнил форму "Заказать услугу". <br> <b>Услуга: </b>' . $user_service . '<br>';
  } else {
    $message .= 'Пользователь оставил на сайте свои данные: <br>';
  }

  $to  = '<89224714290a@gmail.com>' ;

  $subject = 'Письмо с сайта КомТех';

  $message .= '<b>E-mail: </b>' . $user_email . '<br> <b>Сообщение: </b>' . $user_msg;
  $headers  = 'Content-type: text/html; charset=utf8';

  if ( mail( $to, $subject, $message, $headers ) ) {
    echo 1;
  } else {
    echo 0;
  }

}