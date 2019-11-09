<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('estados')->insert([
            'estado' => "por hacer"
        ]);
        DB::table('estados')->insert([
            'estado' => "en proceso"
        ]);
        DB::table('estados')->insert([
            'estado' => "realizado"
        ]);
        DB::table('estados')->insert([
            'estado' => "archivado"
        ]);
        DB::table('users')->insert([
            'name' => "Pedro Franco",
            'email' => 'pedro@gmail.com',
            'password' => bcrypt('123456')
        ]);
        DB::table('users')->insert([
            'name' => "Marta Mora",
            'email' => 'mmora@gmail.com',
            'password' => bcrypt('123456')
        ]);
        DB::table('users')->insert([
            'name' => "Zoé",
            'email' => 'zzz@hotmail.com',
            'password' => bcrypt('123456')
        ]);
        DB::table('tareas')->insert([
            'titulo' => "My first task",
            'descripcion' => 'i have to do this before the time go out',
            'estado_id' => 1,
            'user_id' => 3
        ]);
    }
}
