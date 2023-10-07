<?php
    $to = 'pg15182100@gmail.com';
    $subject = 'Electronics';
    
    $name = trim($_POST['name']);
    $tel = trim($_POST['tel']);
    $email = trim($_POST['email']);

    $jsonText = $_POST['Товары'];
    $orderData = json_decode($jsonText, true);

    $message = "<p>Имя клиента: $name</p>";
    $message .= "<p>Телефон клиента: $tel</p>";
    $message .= "<p>Email клиента: $email</p>";

    $message .= '<div width="100%" height="10%"></div>';

    $message .= '
        <html>
        <body>
        <center>
        <table border="1" cellpadding="6" cellspacing="0" width="90%" bordercolor="#DBDBDB">
            <tr>
                <td colspan="3" align="center" bgcolor="#40B659">
                    <b>Заказ клиента</b>
                </td>
            </tr>
            <tr>
            <td align="center">
                <em>Название товара</em>
            </td>
            <td align="center">
                <em>Количество</em>
            </td>
            <td align="center">
                <em>Цена</em>
            </td>
        </tr>
    ';

    foreach($orderData as $key => $value) {
        $title = $value['title'];
        $quantity = $value['quantity'];
        $price = $value['price'];

        $message .= '
                <tr>
                    <td align="center">'. $title .'</td>
                    <td align="center">'. $quantity .'</td>
                    <td align="center">'. $price .'</td>
                </tr>
        ';
    }

    $message .= '
        </table>
        </body>
        </html>
    ';


    $headers = [
        "From" => "electronics@gmail.az",
        "Reply-To" => "electronics@gmail.az",
        "X-Mailer" => "PHP/". phpversion(),
        "Content-type" => "text/html; charset=utf-8" 
    ];

    mail($to, $subject, $message, $headers);
?>