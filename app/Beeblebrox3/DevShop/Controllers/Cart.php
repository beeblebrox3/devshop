<?php

namespace Beeblebrox3\DevShop\Controllers;

use Respect\Rest\Routable;
use Beeblebrox3\DevShop\Cart as CartManager;

class Cart extends AbstractController implements Routable
{   
    /**
     *
     * @var CartManager
     */
    private $Cart = null;
    
    public function __construct()
    {
        $this->Cart = new CartManager();
    }
    
    public function get()
    {
        $this->getHttp()->setHeader('content-type: application/json');
        echo $this->Cart->toJson();
    }
    
    public function put()
    {
        $login = $this->getHttp()->getInput('login', 'leandrooriente');
        
        $developer = \Beeblebrox3\DevShop\Repositories\Developer::whereLogin($login)->first();
        if (!$developer) {
            $this->getHttp()->fireError(404);
        }
        
        $this->Cart->addDev($developer);
        $this->get();
    }
}