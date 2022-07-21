<?php
//stop error
//error_reporting(0);

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once 'vendor/autoload.php';


use Twilio\Rest\Client;

$sid    = " twilio sid" ; //enter twilio sid
$token  = " twilio token "; //enter twilio token
$twilio = new Client($sid, $token);

if(isset($_GET['value']) && isset($_GET['value'])) {
    //gather data
    $param = $_GET['param'];
    $value = $_GET['value'];
    $msg = $param . " crossed the threshold value. Please check the the system. " . $param . " = " . $value;

    //send sms
    $message = $twilio->messages
        ->create("to mobile number", // eneter the mobile with country code to which sms will send. Ex. "+910123456789"
            array(
                "from" => "twilio phone number", //enter twilio phone number
                "body" => $msg
            )
        );
    //print($message->sid);

    //send email
    $to = 'to email'; //enter to which email will send
    $subject = 'Alert';
    $message = $msg;
    $headers = 'From: smartagriculture@shanuiot.tk' . "\r\n" .
        'Reply-To: no-reply@shanuiot.tk' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);

   //sleep
    sleep(180); //seconds
}
?>
<script type="text/javascript">
	window.location.href = "dashboard.php";
</script>