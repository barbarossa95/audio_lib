<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(Auth::guest()) {
        return redirect()->route('login');
    }
    return view('welcome');
});

Route::middleware('auth')->group(function () {

    Route::get('/tracks', 'TrackController@getTracksView');

    Route::middleware('ajax')->resource('track', 'TrackController', ['except' => [
        'edit'
    ]]);
});



Auth::routes();