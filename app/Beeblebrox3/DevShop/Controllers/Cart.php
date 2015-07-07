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
        $login = $this->getHttp()->getInput('login', '');
        $amount = $this->getHttp()->getInput('amount', 0);

        $developer = \Beeblebrox3\DevShop\Repositories\Developer::whereLogin((string) $login)->first();
        if (!$developer) {
            $this->getHttp()->fireError(404);
        }

        $this->Cart->addDev($developer, $amount);
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
