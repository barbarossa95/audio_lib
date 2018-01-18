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
        $inviteCode = substr(md5(microtime()), 0, self::$inviteLength);
        $this->invite = $inviteCode;
        $this->save();
        return $inviteCode;
    }

    /**
     * Get User tracks
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tracks()
    {
        return $this->belongsToMany('App\Models\Track')
            ->withPivot('added_at')
            ->orderBy("user_track.added_at", "desc");
    }
}
