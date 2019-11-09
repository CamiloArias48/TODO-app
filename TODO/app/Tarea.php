<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    protected $fillable = [
        'titulo',
        'descripcion',
        'estado_id',
    ];

    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }
}
