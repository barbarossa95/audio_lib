<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * Length of invite code for users
     * @var integer
     */
    public static $inviteLength = 6;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Generate new invite code for user
     * @return string invite code
     */
    public function newInvite()
    {
        $length = 10;
        $inviteCode = "";
        $characters = "0123456789abcdefghijklmnopqrstuvwxyz";
        for ($p = 0; $p < self::$inviteLength; $p++) {
            $inviteCode .= $characters[mt_rand(10, strlen($characters))];
        }

        $this->invite = $inviteCode;
        $this->save();

        return $inviteCode;
    }
}
