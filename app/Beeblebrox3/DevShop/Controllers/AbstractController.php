<?php

namespace Beeblebrox3\DevShop\Controllers;

use Beeblebrox3\DevShop\Foundation\Http;

abstract class AbstractController
{
    /**
     * @var Http
     */
    protected $Http = null;

    protected function getHttp()
    {
        if (is_null($this->Http)) {
            $this->Http = new Http();
        }

        return $this->Http;
    }
    
    /**
     * @param array $data
     */
    protected function renderJSON(array $data)
    {
        header("content-type: application/json");
        echo json_encode($data);
        return;
    }
}