<?php

namespace Beeblebrox3\DevShop;

class Cart
{
    protected $session = null;
    protected $cart = null;
    protected $repository = null;

    protected $devs = array();
    protected $hydrated = false;

    protected $cupoms = array (
        'cupomteste' => array (
            'discount_value' => 0,
            'discount_percentage' => 20,
            'description' => 'Cupom de 20% de desconto',
        ),
    );

    protected $cupom = '';

    public function __construct()
    {
        $sessionFactory = new \Aura\Session\SessionFactory;
        $this->session = $sessionFactory->newInstance($_COOKIE);
        $this->cart = $this->session->getSegment('Beeblebrox3\DevShop\Cart');
    }

    /**
     *
     * @param \Beeblebrox3\DevShop\Repositories\Developer $developer
     * @param float $amount
     */
    public function addDev(Repositories\Developer $developer, $amount = 1)
    {
        $items = $this->getItems();
        $items[$developer->login] = (float) $amount;
        $this->cart->set('items', $items);
    }

    /**
     * @param string $developerLogin
     */
    public function delDev($developerLogin)
    {
        $items = $this->getItems();
        $developerLogin = (string) $developerLogin;
        unset($items[$developerLogin]);
        $this->cart->set('items', $items);
    }

    /**
     * @return array
     */
    private function getItems()
    {
        return $this->cart->get('items', array());
    }

    private function hydrateFromRepository()
    {
        $items = $this->getItems();
        $devs = array();

        $devsFromRepo = Repositories\Developer::whereIn('login', array_keys($items))->get();

        foreach ($devsFromRepo as $dev) {
            $devs[] = new CartItem($dev, $items[$dev->login]);
        }

        $this->devs = $devs;
        $this->hydrated = true;
    }

    public function getCartItems()
    {
        $this->hydrateFromRepository();
        return $this->devs;
    }

    public function asArray()
    {
        $items = $this->getCartItems();
        $response = array(
            'items' => array(),
            'price' => 0,
            'discount' => 0,
            'total_price' => 0,
        );

        foreach ($items as $item) {
            $response['items'][] = $item->toArray();
            $response['price'] += $item->price();
        }
        $response['discount'] = $this->calcCupomDiscount($response['price']);
        $response['total_price'] = round($response['price'] - $response['discount'], 2);

        return $response;
    }

    /**
     *
     * @param int|float $price
     * @return int|float
     */
    private function calcCupomDiscount($price)
    {
        if (!$this->cupom || !isset($this->cupoms[$this->cupom])) {
            return 0;
        }
        
        $cupom = $this->cupoms[$this->cupom];
        if ($cupom['discount_value']) {
            return $cupom['discount_value'];
        } elseif ($cupom['discount_percentage']) {
            return $price * $cupom['discount_percentage']  / 100;
        } else {
            return 0;
        }
    }

    public function setCupom($code)
    {
        $code = (string) $code;
        if (!isset($this->cupoms[$code])) {
            return false;
        }

        $this->cupom = $code;
        return true;
    }

    public function clean()
    {
        $this->cart->clear();
    }
}
