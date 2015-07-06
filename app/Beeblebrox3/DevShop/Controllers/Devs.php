<?php

namespace Beeblebrox3\DevShop\Controllers;

use Respect\Rest\Routable;

class Devs extends AbstractController implements Routable
{
    public function get($login = '')
    {
        if (empty($login)) {
            $this->search();
        } else {
            $this->renderJSON(\Beeblebrox3\DevShop\Repositories\Developer::whereLogin($login)->first()->toArray());
        }
    }
    
    private function search()
    {
        $Repository = new \Beeblebrox3\DevShop\Repositories\Developer;
        $query = $Repository->newQuery();
        
        $query = $this->parseRequestSort($query);
        $query = $this->parseRequestSearch($query);
        $query = $this->parseRequestPagination($query);
        
        $this->renderJSON(array (
            'total' => $query->total(),
            'offset' => $query->perPage(),
            'pages' => $query->lastPage(),
            'page' => $query->currentPage(),
            'data' => $query->toArray()['data'],
        ));
    }
    
    private function parseRequestSort($query)
    {
        $sort = $this->getHttp()->getInput('sort');
        $direction = $this->getHttp()->getInput('direction', 'ASC');
        
        if ($sort) {
            $query = $query->orderBy($sort, $direction);
        }
        
        return $query;
    }
    
    private function parseRequestSearch($query)
    {
        $q = $this->getHttp()->getInput('q');
        
        if ($q) {
            $query = $query->where(function ($query) use ($q) {
                $query->orWhere('login', 'LIKE', "%{$q}%")->orWhere('name', 'LIKE', "%{$q}%");
            });
        }
        
        return $query;
    }
    
    private function parseRequestPagination($query)
    {
        $page = (int) $this->getHttp()->getInput('page', 1);
        $offset = (int) $this->getHttp()->getInput('offset', 2);
        
        \Illuminate\Pagination\Paginator::currentPageResolver(function() use ($page) {
            return $page;
        });
        
        return $query->paginate($offset);
    }
}