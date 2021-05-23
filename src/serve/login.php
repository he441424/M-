<?php
header("Access-Control-Allow-Origin:*");
header("Content-type:text/json;charset=utf-8");

// echo "nh";
$name = $_POST["pass"];
echo json_encode($name);
