<?php

namespace Beeblebrox3\DevShop\Foundation;

class Http
{
    private $postData = array();
    private $getData = array();

    /**
     * get data from request and sanitize it
     */
    public function __construct()
    {
        $this->setup();
        $this->sanitize();
    }

    /**
     * getdata from request
     */
    public function refresh()
    {
        $this->setup();
    }

    /**
     * get data from $_GET and $_POST
     */
    private function setup()
    {
        $this->postData = $_POST;
        $this->getData = $_GET;
    }

    /**
     *
     * @return array
     */
    public function getGetData()
    {
        return $this->getData;
    }

    /**
     *
     * @return array
     */
    public function getPostData()
    {
        return $this->postData;
    }

    /**
     * sanitize data from request
     */
    public function sanitize()
    {
        $this->postData = filter_var_array($this->postData, FILTER_SANITIZE_STRING);
        $this->getData = filter_var_array($this->getData, FILTER_SANITIZE_STRING);
    }

    /**
     *
     * @param string $field
     * @param mixed $defaultValue
     * @param boolean $mustExists
     * @param string $where (get|GET|post|POST|any|ANY)
     * @return mixed
     */
    public function getInput($field, $defaultValue = null, $mustExists = false, $where = 'any')
    {
        $where = strtolower($where);

        $response = $defaultValue;
        if (isset($this->postData[$field]) && $where !== 'get') {
            $response = $this->postData[$field];
        } elseif (isset ($this->getData[$field]) && $where !== 'post') {
            $response = $this->getData[$field];
        } elseif ($mustExists) {
            $response = false;
        }

        return $response;
    }

    /**
     *
     * @param array $fields
     * @param mixed $defaultValue
     * @param boolean $mustExists
     * @param string $where (get|GET|post|POST|any|ANY)
     * @return mixed
     */
    public function getInputArray(array $fields, $defaultValue = null, $mustExists = false, $where = 'any')
    {
        $response = array();

        if (!is_array($defaultValue)) {
            $defaultValue = array_fill_keys($fields, $defaultValue);
        } else {
            $defaultValueMap = array_fill_keys($fields, null);
            $defaultValue = array_merge($defaultValueMap, $defaultValue);
        }

        foreach ($fields as $field) {
            $value = $this->getInput($field, $defaultValue[$field], $mustExists);
            if ($value !== false) {
                $response[$field] = $value;
            }
        }

        return $response;
    }

    public function getMethod()
    {
        return strtolower($_SERVER['REQUEST_METHOD']);
    }

    public function isPost()
    {
        return $this->getMethod() === 'post';
    }

    public function isGet()
    {
        return $this->getMethod() === 'get';
    }

    public function setStatusCode($code)
    {
        http_response_code((int) $code);
    }

    public function fireError($code, array $messages = array())
    {
        $this->setStatusCode($code);
        if ($messages) {
            echo json_encode($messages);
        }
        die();
    }

    public function setHeader($content)
    {
        header($content);
    }
}