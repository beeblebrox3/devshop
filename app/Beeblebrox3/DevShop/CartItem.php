<?php

namespace Beeblebrox3\DevShop;

use Beeblebrox3\DevShop\Repositories\Developer;

class CartItem
{
    /**
     *
     * @var Developer
     */
    private $developer = null;

    /**
     *
     * @var float
     */
    private $amount = 0;

    /**
     *
     * @param Developer $developer
     * @param float $amount
     */
    public function __construct(Developer $developer, $amount = 0)
    {
        $this->developer = $developer;
        $this->amount = $amount;
    }

    /**
     * @return Developer
     */
    public function developer()
    {
        return $this->developer;
    }

    /**
     * @return float
     */
    public function amount()
    {
        return $this->amount;
    }

    /**
     * @param float $discount
     * @return float
     */
    public function price($discount = 0)
    {
        return ($this->developer->price * $this->amount) - $discount;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        $response = $this->developer->toArray();
        $response['amount'] = $this->amount();
        $response['price'] = $this->price();

        return $response;
    }
}
