<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('riwayat-kelas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswas');
            $table->foreignId('kelas_id')->constrained('kelas');
            $table->date('tanggal_masuk');
            $table->date('tanggal_keluar');
            $table->string('keterangan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat-kelas');
    }
};
