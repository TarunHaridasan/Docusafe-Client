<?php
    //Get variables
    $server = "https://www.codetrinkets.ca:1222";
    $fingerprint = $_POST["fingerprint"];

    //Make request and send it back
    $request = file_get_contents("$server/retrieveData/$fingerprint");
    echo $request;
?>