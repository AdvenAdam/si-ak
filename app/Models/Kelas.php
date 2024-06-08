<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kelas extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_kelas',
        'tahun_ajaran',
        'guru_id'
    ];

    public function Guru(): BelongsTo
    {
        return $this->belongsTo(Guru::class);
    }

    public function Siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class);
    }
}
