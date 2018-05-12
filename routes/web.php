<?php

Route::get('/', 'HomeController@index')->name('home');

Route::get('/cabinet', 'Cabinet\HomeController@index')->name('cabinet');

Auth::routes();

