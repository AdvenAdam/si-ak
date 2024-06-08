<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Guru extends Model
{
    use HasFactory;

    protected $fillable = [
        'nip',
        'nama_guru',
        'mata_pelajaran',
        'mapel_id',
        'user_id'
    ];
    public function Account(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function Kelas(): HasMany
    {
        return $this->HasMany(Kelas::class);
    }
}
