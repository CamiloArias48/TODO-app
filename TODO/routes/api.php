<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('register', 'ApiAuthController@register');
Route::post('login', 'ApiAuthController@login');


Route::middleware('auth:api')->group( function () {
    Route::get('user', 'ApiAuthController@user');
    Route::get('logout', 'ApiAuthController@logout');
    Route::get('get', 'ApiRestFullController@get');
    Route::post('post', 'ApiRestFullController@post');
    Route::put('put/{id}', 'ApiRestFullController@put');
    Route::delete('delete/{id}', 'ApiRestFullController@delete');
}); 
