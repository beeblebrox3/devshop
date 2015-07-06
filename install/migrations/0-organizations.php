<?php

use Illuminate\Database\Capsule\Manager as Capsule;

class Organizations extends \Illuminate\Database\Migrations\Migration
{
    /**
     * @var string
     */
    protected $table = 'organizations';

    public function up()
    {
        Capsule::schema()->dropIfExists($this->table);

        Capsule::schema()->create($this->table, function (\Illuminate\Database\Schema\Blueprint $table) {
            $table->integer('id')->unsigned();
            $table->primary('id');

            $table->string('login', 60);
            $table->string('url', 160);
            $table->string('avatar_url', 160)->nullable();
            $table->string('description', 512)->nullable();
            $table->string('name', 160)->nullable();
            $table->string('company', 60)->nullable();
            $table->string('blog', 160)->nullable();
            $table->string('location', 160)->nullable();
            $table->string('email', 160)->unique();
            $table->integer('public_repos')->unsigned();
            $table->integer('public_gists')->unsigned();
            $table->integer('followers')->unsigned();
            $table->integer('following')->unsigned();
            $table->string('html_url', 160);
            $table->datetime('created_at');
        });
    }

    public function down()
    {
        Capsule::schema()->drop($this->table);
    }
}