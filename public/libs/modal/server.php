<?php

sleep(2);

// echo '<img src="http://lorempixel.com/people/720/360/" width="720" height="360" />';
// echo '<div style="width: 100px; height: 200px; background: red;">ddd</div>';

?>

<style>
    .form-x {
        width: 300px;
    }
    .form-x fieldset {
        border: 1px solid #ddd;
        padding: 20px;
        width: 260px;
    }
    .form-x label {
        width: 70px;
        display: inline-block;
    }
    .form-x input {
        width: 175px;
        display: inline-block;
        border: 1px solid #CCC;
        background: white;
        padding: 3px;
        outline: none;
    }
</style>
<form action="" class="form-x">
    <fieldset>
        <legend>Login</legend>

        <label for="email">E-mail</label>
        <input type="email" id="email" placeholder="email" />

        <label for="password">Password</label>
        <input type="password" placeholder="password" id="password" />

        <button type="submit">Login</button>
    </fieldset>
</form>