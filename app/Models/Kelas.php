<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_kelas',
        'tahun_ajaran',
        'guru_id'
    ];

    public function Guru()
    {
        return $this->belongsTo(Guru::class);
    }
}
