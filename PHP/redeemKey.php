<?php
    //Get variables
    $key = $_POST["key"];
    $fingerprint = $_POST["fingerprint"];
    $server = "https://www.codetrinkets.ca:1222";

    //Make request
    $request = file_get_contents("$server/redeemKey/$fingerprint/$key");
    echo $request;
?>