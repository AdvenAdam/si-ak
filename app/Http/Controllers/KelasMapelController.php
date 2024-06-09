<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Response;
use Inertia\Inertia;

class KelasMapelController extends Controller
{
    function index(): Response
    {
        // NOTE : Reformat Data
        try {
            return Inertia::render('Dashboard/KelasMapel/KelasMapel', [
                'kelas' => Kelas::with('guru')->get(),
                'mapel' => Mapel::all(),
                'guru'  => Guru::all(),
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('Errors/Error', [
                'message' => $th->getMessage(),
            ]);
        }
    }
    function store(Request $request): RedirectResponse
    {
        if ($request['insertFor'] = 'mapel') {
            $this->insertMapel($request);
            return redirect()->route('Kelas&Mapel.index')
                ->with('success', 'Mata Pelajaran Save successfully');
        } else {
            $this->insertKelas($request);
            return redirect()->route('Kelas&Mapel.index')
                ->with('success', 'Kelas Save successfully');
        }
    }
    function insertMapel($request)
    {
        try {
            $request->validate([
                'nama' => 'required|unique:mapels,nama_mata_pelajaran',

            ]);
        } catch (ValidationException $e) {
            return redirect()->route('Kelas&Mapel.index')
                ->withErrors($e->errors(), 'addMapel');
        }
        Mapel::create([
            'nama_mata_pelajaran' => $request['nama'],
        ]);
        return redirect()->route('Kelas&Mapel.index')
            ->with('success', 'Mata Pelajaran Save successfully');
    }

    function insertKelas($request)
    {
        try {
            $request->validate([
                'nama' => 'required|unique:mapels,nama_mata_pelajaran',

            ]);
        } catch (ValidationException $e) {
            return redirect()->route('Kelas&Mapel.index')
                ->withErrors($e->errors(), 'addMapel');
        }
        Mapel::create([
            'nama_mata_pelajaran' => $request['nama'],
        ]);
        return redirect()->route('Kelas&Mapel.index')
            ->with('success', 'Mata Pelajaran Save successfully');
    }
}
