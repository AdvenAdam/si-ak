<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Siswa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nisn',
        'nama',
        'id_kelas',
        'alamat',
        'tanggal_lahir',
        'id_user'
    ];

    public function Account(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function RiwayatKelas(): HasMany
    {
        return $this->HasMany(RiwayatKelas::class);
    }

    public function Nilai(): HasMany
    {
        return $this->HasMany(Nilai::class);
    }

    public function Pembayaran(): HasMany
    {
        return $this->HasMany(Pembayaran::class);
    }
}
