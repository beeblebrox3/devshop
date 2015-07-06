<?php

namespace Beeblebrox3\DevShop\GithubConnection\Exceptions;

class OrganizationNotFoundException extends \Exception
{
    protected $message = 'Organization not found!';

    protected $code = 404;
}