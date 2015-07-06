<?php

require "paths.php";
require "vendor/autoload.php";
require "app/database.php";

error_reporting(E_ALL);
ini_set('display_errors', 'on');
set_time_limit(0);

require "install/migrations/0-organizations.php";
require "install/migrations/1-developers.php";

$OrganizationsMigration = new Organizations();
$OrganizationsMigration->up();

echo "migrated organizations\n";

$DevelopersMigration = new Developers();
$DevelopersMigration->up();
echo "migrated developers\n";