<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class ApiAuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
        ]);

        $user = new User([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->save();

        $data['token'] =  $user->createToken('MyApp')->accessToken;
        $data['name'] =  $user->name;

        return response()->json(['data' => $data, 'message' => 'Successfully created user!'], 200);
    }
   
  

    public function login(Request $request)
    {
        $request->validate([
            'email'       => 'required|string|email',
            'password'    => 'required|string',
            'remember_me' => 'boolean',
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 200);
        }
        
        $user = Auth::user(); 
        $data['token'] =  $user->createToken('MyApp')->accessToken; 
        $data['name'] =  $user->name;

        return response()->json(['data' => $data, 'message' => 'Loged in!'], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(['message' =>  'logged out']);
    }

    /*
    * retorna el Usuario del que reciba el token
    */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
