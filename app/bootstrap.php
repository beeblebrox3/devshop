<?php

require "database.php";

error_reporting(E_ALL);
ini_set('display_errors', 'on');
set_time_limit(0);


use Respect\Rest\Router;

$router = new Router();

$router->get('/', function () {
    require "views/default.php";
});

$router->any('/devs/*', '\Beeblebrox3\DevShop\Controllers\Devs');

$router->any('/cart', '\Beeblebrox3\DevShop\Controllers\Cart');

$router->post('/config', function () {
    $controller = new Beeblebrox3\DevShop\Controllers\Config;
    $controller->import();
});

$router->exceptionRoute('InvalidArgumentException', function (InvalidArgumentException $e) {
    return 'Sorry, this error happened: '.$e->getMessage();
});

$router->errorRoute(function ($a = null) {
    print_r($a);
});