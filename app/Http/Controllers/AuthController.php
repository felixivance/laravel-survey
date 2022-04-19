<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;


class AuthController extends Controller
{
    public function register(Request $request){
        $data = $request->validate([
            'name'=> 'required|string',
            'email'=> 'required|email|string|unique:users',
            'password'=> ['required','confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);
        $user = User::create([
            'name'=> $data['name'],
            'email'=> $data['email'],
            'password'=> bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user'=>$user,
            'token'=>$token,
            'password'=>$data['password']
        ]);
    }

    public function login(Request $request){
        $data = $request->validate([
            'email'=>'required|string|exists:users,email',
            'password'=>'required',
            'remember_token'=>'boolean'
        ]);
        $remember = $data['remember_token'] ?? false;

        if(!Auth::attempt($data, $remember)){
            return response([
                'error'=>'The provided credentials are not correct'
            ], 200);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }
    public function logout(){
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response([
            'success'=>true
        ]);
    }
}
