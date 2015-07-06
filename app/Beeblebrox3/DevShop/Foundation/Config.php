<?php

namespace Beeblebrox3\DevShop\Foundation;

use CakePHP\Utility\Hash;

class Config
{
    private $data = array();
    private $dataFlattened = array();

    private static $instance = null;

    private function __construct()
    {
        $this->data = parse_ini_file(ROOT . DS . 'config.ini', true);
        $this->dataFlattened = Hash::flatten($this->data);
    }

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new static;
        }

        return self::$instance;
    }

    public function get($name, $defaultValue = null)
    {
        $response = $defaultValue;
        if (isset($this->dataFlattened[$name])) {
            $response = $this->dataFlattened[$name];
        }

        return $response;
    }
}