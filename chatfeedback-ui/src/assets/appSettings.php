<?php

$appSettings = [];

foreach ($_SERVER as $key => $value) {

    if(preg_match('/^APPSETTING_/', $key)) {
        $appSettings[str_replace('APPSETTING_', '', $key)] = $value;
    }
}

header('Content-Type: application/json');
echo json_encode($appSettings);