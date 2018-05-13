<?php

Route::get('/', 'HomeController@index')->name('home');

Route::get('/cabinet', 'Cabinet\HomeController@index')->name('cabinet');

Route::get('/verify/{token}', 'Auth\RegisterController@verify')->name('register.verify');

Auth::routes();

