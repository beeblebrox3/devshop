<?php

namespace Beeblebrox3\DevShop\Repositories;

class Organization extends AbstractRepository
{
    protected $table = 'organizations';

    protected $fillable = array (
        'id',
        'login',
        'url',
        'avatar_url',
        'description',
        'name',
        'company',
        'blog',
        'location',
        'email',
        'public_repos',
        'public_gists',
        'followers',
        'following',
        'html_url',
        'created_at',
    );
    
    protected $dates = ['created_at'];
    
    public $timestamps = false;
}