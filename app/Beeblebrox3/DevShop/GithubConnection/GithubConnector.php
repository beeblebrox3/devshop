<?php

namespace Beeblebrox3\DevShop\GithubConnection;

use Beeblebrox3\DevShop\Foundation\Config;
use Github\Client;

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
        $this->org = 'vtex';
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
        return $this->client->api('organizations')->members()->all($orgName);
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