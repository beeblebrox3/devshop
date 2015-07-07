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
        $this->renderJSON($this->Cart->asArray());
    }

    public function post()
    {
        $inputItems = $this->getHttp()->getInput('items', array());
        $items = array();
        foreach ($inputItems as $item) {
            if (!empty($item['login'])) {
                $items[(string) $item['login']] = (int) isset($item['amount']) ? $item['amount'] : 0;
            }
        }

        $developers = \Beeblebrox3\DevShop\Repositories\Developer::whereIn('login', array_keys($items))->get();

        foreach ($developers as $developer) {
            $this->Cart->addDev($developer, $items[$developer->login]);
        }
        
        $this->get();
    }

    public function delete($devLogin)
    {
        $devLogin = (string) $devLogin;
        $this->Cart->delDev($devLogin);
        $this->get();
    }

    public function applyCupom()
    {
        $cupom = $this->getHttp()->getInput('cupom', '');
        if (!$this->Cart->setCupom($cupom)) {
            $this->getHttp()->fireError(403, ['error' => 'invalid cupom code']);
        }

        $this->get();
    }
}
