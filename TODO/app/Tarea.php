<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    protected $fillable = [
        'titulo',
        'descripcion',
        'user_id',
        'estado_id',
    ];

    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
