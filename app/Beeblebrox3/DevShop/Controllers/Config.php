<?php

namespace Beeblebrox3\DevShop\Controllers;

use Beeblebrox3\DevShop\GithubConnection\GithubConnector;
use Beeblebrox3\DevShop\GithubConnection\Importer;
use Respect\Rest\Routable;

class Config extends AbstractController implements Routable
{
    public function import()
    {
        $orgName = $this->getHttp()->getInput('orgName');
        $override = (bool) $this->getHttp()->getInput('override', 0);
        if (!$orgName) {
            $this->getHttp()->fireError(400);
        }
        
        $importer = new Importer(
            new GithubConnector()
        );

        if ($override) {
            $importer->clean();
        }
        
        try {
            $importer->import($orgName);
            $summary = $importer->getSummary();
            $this->renderJSON(array(
                'organization' => $summary->getOrg()->toArray(),
                'devs' => $summary->getDevs(),
                'seconds' => $summary->getSeconds(),
            ));
        } catch (Exception $ex) {
            $this->getHttp()->fireError(400, $ex->getMessage());
        }
    }
}
