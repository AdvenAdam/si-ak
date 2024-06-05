<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [

        'nama',
        'email',
        'id_user'
    ];

    public function Account(): HasOne
    {
        return $this->hasOne(User::class);
    }
}
