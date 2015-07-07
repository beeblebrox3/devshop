<?php

namespace Beeblebrox3\DevShop\GithubConnection;

use Beeblebrox3\DevShop\Foundation\Config;
use Github\Client;
use Github\ResultPager;

class GithubConnector
{
    /**
     * @var Client
     */
    private $client = null;

    public function __construct()
    {
        $this->client = new Client();
        $this->client->authenticate(Config::getInstance()->get('github.token'), Client::AUTH_URL_TOKEN);
    }
    
    public function getClient()
    {
        return $this->client;
    }

    public function getOrg($orgName)
    {
        return $this->client->api('organizations')->show($orgName);
    }

    public function getOrgMembers($orgName)
    {
        $API = $this->client->api('organizations')->members();
        $paginator = new ResultPager($this->client);
        return $paginator->fetchAll($API, 'all', [$orgName]);
    }

    public function getUser($user)
    {
        return $this->client->api('users')->show($user);
    }

    public static function make()
    {
        return new self;
    }
}