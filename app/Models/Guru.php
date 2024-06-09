<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Guru extends Model
{
    use HasFactory;

    protected $fillable = [
        'nip',
        'nama_guru',
        'alamat',
        'tanggal_lahir',
        'mapel_id',
        'user_id'
    ];
    public function Account(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    public function Kelas(): HasMany
    {
        return $this->HasMany(Kelas::class);
    }
    public function Mapel(): HasOne
    {
        return $this->HasOne(Mapel::class);
    }
}
