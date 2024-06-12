<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PenilaianController extends Controller
{
    function index(): Response
    {
        try {
            $user = auth()->user();
            dd($user);
            return Inertia::render('Dashboard/KelasMapel/KelasMapel', [
                'kelas' => Kelas::with('guru')
                    ->orderBy('tahun_ajaran', 'desc')
                    ->orderBy('nama_kelas')
                    ->get(),
                'mapel' => Mapel::orderBy('nama_mata_pelajaran')->get(),
                'guru'  => Guru::orderBy('nama_guru')->get(),
            ]);
        } catch (\Throwable $th) {
            return back()->withErrors([$th->getMessage()]);
        }
    }
}
