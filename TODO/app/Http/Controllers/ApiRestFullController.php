<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tarea;

class ApiRestFullController extends Controller
{

    public function get(Request $request){
        $tasks = Tarea::where('user_id', $request->user()->id )
                     ->where('estado_id', "!=", 4)
                     ->get();

        foreach ($tasks as $task) {
            $task->routeEdit = route('api.put',$task->id);
            $task->routeDelete = route('api.delete',$task->id);
        }
        

        return response()->json(["data" => $tasks], 200);
    }



    public function post(Request $request){
        $request->validate([
            'titulo'     => 'required|string',
            'descripcion' => 'required|string',
            'estado_id' => 'required|string'
        ]);

        $task = new Tarea([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'estado_id' => $request->estado_id,
            'user_id' => $request->user()->id
        ]);

        $task->save();

        $task->routeEdit = route('api.put',$task->id);
        $task->routeDelete = route('api.delete',$task->id);

        return response()->json(["newTask" => $task], 200);
    }



    public function put(Request $request){
        
        if( $this->taskOwnToUser($request->user()->id, $request->id) ){ //verificar que el usuario es dueño de la tarea
            $task = Tarea::find($request->id);

            $task->titulo = $request->titulo;
            $task->descripcion = $request->descripcion;
            $task->estado_id = $request->estado_id;

            $task->save();
            $task->routeEdit = route('api.put',$task->id);
        $task->routeDelete = route('api.delete',$task->id);
            return response()->json(["msg" => "updated", "data" => $task],200);
        }

        return response()->json(["msg" => "Can´t update", "data" => [] ],200);
    }



    public function delete(Request $request){

        if( $this->taskOwnToUser($request->user()->id, $request->id) ){
            $task = Tarea::find($request->id);
            $task->estado_id = 4;
            $task->save();
            return response()->json(["msg" => "deleted"],200);
        }

        return response()->json(["msg" => "Can´t delete"],200);
    }




    public function taskOwnToUser(int $user_id, int $task_id){
        $userOwn = Tarea::where('user_id', $user_id)
                         ->where('id', $task_id)
                         ->get();

        return (count($userOwn) > 0) ? true: false;
    }
}
