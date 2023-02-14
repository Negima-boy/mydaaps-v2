<?php
    mb_language("Japanese");
    mb_internal_encoding("UTF-8");

    $pass = 'ginga0093';
    $pkcs12File = '証明書.p12';
    $pkcs12 = file_get_contents($pkcs12File);
    $certs = array();
    openssl_pkcs12_read($pkcs12, $certs, $pass);

    //print_r($certs);

    $result = array_slice($certs, 0, 1);

    //print_r($result);

    $pemCert = implode($result);

    $cmd = "yarn node --loader ts-node/esm src/sample.ts $pemCert";

    echo exec($cmd);
?>