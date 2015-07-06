<?php

namespace Beeblebrox3\DevShop\GithubConnection;

use Beeblebrox3\DevShop\Repositories\Developer;
use Beeblebrox3\DevShop\Repositories\Organization;
use DateTime;
use DateTimeZone;
use InvalidArgumentException;

class Importer
{
    /**
     *
     * @var GithubConnector
     */
    private $connector = null;
    
    /**
     *
     * @var bool
     */
    private $override = false;
    
    /**
     *
     * @var ImporterSummary
     */
    private $summary = null;

    /**
     * @param \Beeblebrox3\DevShop\GithubConnection\GithubConnector $connector
     */
    public function __construct(GithubConnector $connector)
    {
        $this->connector = $connector;
        $this->summary = new ImporterSummary;
    }
    
    /**
     * 
     * @return bool
     */
    public function getOverride()
    {
        return $this->override;
    }
    
    /**
     * 
     * @param bool $override
     */
    public function setOverride($override)
    {
        if (!is_bool($override)) {
            throw new InvalidArgumentException('$override must be boolean');
        }
        
        $this->override = $override;
    }

    /**
     * @param string $orgName
     */
    public function import($orgName)
    {
        if (!is_string($orgName)) {
            throw new InvalidArgumentException('$orgName must be string');
        }

        $timeStart = microtime(true);
        $organization = $this->importOrganization($orgName);
        $this->importOrganizationMembers($organization);
        $this->summary->setSeconds(microtime(true) - $timeStart);
    }

    /**
     * @param string $orgName
     */
    private function importOrganization($orgName)
    {
        $exists = Organization::whereLogin($orgName)->first();
        
        if ($exists && !$this->getOverride()) {
            $this->summary->setOrg($exists, true);
            return $exists;
        }
        
        $orgData = $this->connector->getOrg($orgName);
        $orgData['created_at'] = $this->convertTimezone($orgData['created_at']);
        $organization = new Organization();
        $organization->fill($orgData);
        $didSave = $organization->save();
        if ($didSave) {
            $this->summary->setOrg($organization, false);
            return $organization;
        } else {
            echo "not save :(";
        }
    }
    
    /**
     * @param Organization $organization
     */
    private function importOrganizationMembers(Organization $organization)
    {
        $members = $this->connector->getOrgMembers($organization->login);
        // var_dump($this->connector->getClient()->getHttpClient()->getLastResponse()->getHeaderLines());
        foreach ($members as $member) {
            $this->importOrganizationMember($member);
        }
    }
    
    /**
     * @param array $member
     * @return Developer
     */
    private function importOrganizationMember(array $member)
    {
        $exists = Developer::whereLogin($member['login'])->first();
        
        if ($exists && !$this->getOverride()) {
            $this->summary->setDev($exists, true);
            return $exists;
        }
        
        $memberData = $this->connector->getUser($member['login']);
        $memberData['created_at'] = $this->convertTimezone($memberData['created_at']);
        $member = new Developer();
        $member->fill($memberData);
        $member->price = (($member->public_repos * 8) + ($member->public_gists * 5) + ($member->followers * 10) + ($member->following * 5)) / (8+5+10+5);
        if ($member->price < 15) {
            $member->price = 15;
        }
        $didSave = $member->save();
        if ($didSave) {
            $this->summary->setDev($member, false);
            return $member;
        } else {
            echo "not saved :(";
        }
        
    }
    
    /**
     * 
     * @return ImporterSummary
     */
    public function getSummary()
    {
        return $this->summary;
    }

    /**
     * @param string $ghTime
     * @return string
     */
    private function convertTimezone($ghTime)
    {
        $dt = new DateTime($ghTime);
        $dt->setTimezone(new DateTimeZone('America/Sao_Paulo'));

        return $dt->format('Y-m-d H:i:s');
    }

    public function clean()
    {
        Organization::truncate();
        Developer::truncate();
    }
}