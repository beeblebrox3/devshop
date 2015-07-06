<?php

namespace Beeblebrox3\DevShop\Repositories;

class Developer extends AbstractRepository
{
    protected $table = 'developers';
    
    protected $fillable = array (
        'id',
        'login',
        'url',
        'html_url',
        'avatar_url',
        'gravatar_id',
        'followers_url',
        'following_url',
        'starred_url',
        'repos_url',
        'name',
        'company',
        'blog',
        'location',
        'email',
        'public_repos',
        'public_gists',
        'followers',
        'following',
        'bio',
        'price',
        'created_at',
    );
    
    protected $dates = ['created_at'];
    
    public $timestamps = false;
}