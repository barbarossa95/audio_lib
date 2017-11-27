<?php

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\Models\User::create([
            'name' => env('ADMIN_NAME', 'admin'),
            'email' => env('ADMIN_EMAIL','admin@audio.dev'),
            'password' => bcrypt(env('ADMIN_PASSWORD', '321321')),
        ]);
    }
}
