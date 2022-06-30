<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

//Route::get('/', function () {
//    return view('welcome');
//});
Route::get('/', function(){
    if(!is_null(Auth::user())){
        return redirect()->route('home');
    }else
     return view('auth.login');
})->name('login');

Auth::routes();

Route::get('/dashboard/{any?}', [
    'as' => 'home',
    function () {
        if(is_null(Auth::user())){
            return redirect()->route('logout');
        }
        return view('main');
    }
])->where('any','.*');

Route::get('/view/{any?}', [
    'as' => 'home',
    function () {
        if(is_null(Auth::user())){
            return redirect()->route('logout');
        }
        return view('main');
    }
])->where('any','.*');


Route::get('logout', [
    'as' => 'logout',
    function () {
        Auth::logout();
        return redirect()->route('login');
    }
]);
