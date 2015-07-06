<?php

namespace Beeblebrox3\DevShop;

class Cart
{
    protected $session = null;
    protected $segment = null;
    protected $repository = null;
    
    protected $devs = array();
    
    public function __construct()
    {
        $sessionFactory = new \Aura\Session\SessionFactory;
        $this->session = $sessionFactory->newInstance($_COOKIE);
        $this->segment = $this->session->getSegment('Beeblebrox3\DevShop\Cart');
    }
    
    
    public function getDevs()
    {
        
    }
    
    private function hydrateFromRepository()
    {
        $this->repository = new Repositories\Developer;
    }
    
    public function addDev(Repositories\Developer $dev)
    {
        
    }
    
    public function removeDev(Repositories\Developer $dev)
    {
        
    }
    
    public function applyCupom()
    {
        
    }
    
    public function toJson()
    {
        
    }
}