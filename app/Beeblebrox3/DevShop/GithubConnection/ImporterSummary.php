<?php

namespace Beeblebrox3\DevShop\GithubConnection;

class ImporterSummary
{
    private $org = null;
    private $orgSkipped = false;
    private $devs = array();
    private $devsSkipped = array();
    private $seconds = 0;
    
    public function setOrg(\Beeblebrox3\DevShop\Repositories\Organization $organization, $skipped = false)
    {
        $this->org = $organization;
        $this->orgSkipped = $skipped;
    }
    
    public function getOrg()
    {
        return $this->org;
    }
    
    public function orgSkipped()
    {
        return $this->orgSkipped;
    }
    
    public function setDev(\Beeblebrox3\DevShop\Repositories\Developer $dev, $skipped = false)
    {
        $this->devs[] = $dev;
        $this->devsSkipped[] = $skipped;
    }
    
    public function getDevs()
    {
        return $this->devs;
    }
    
    public function setSeconds($seconds)
    {
        $this->seconds = $seconds;
    }
    
    public function getSeconds()
    {
        return $this->seconds;
    }
}