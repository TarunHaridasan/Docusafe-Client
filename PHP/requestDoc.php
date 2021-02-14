<?php
    //Get variables
    $docName = $_POST["docName"];
    $fingerprint = $_POST["fingerprint"];
    $server = "https://www.codetrinkets.ca:1222";

    //Make request
    echo "./viewer/web/viewer.html?file=$server/retrieveDocument/$fingerprint/$docName";
?>