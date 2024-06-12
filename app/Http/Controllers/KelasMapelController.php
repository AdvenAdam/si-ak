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
                'kelas' => Kelas::with('guru')->orderBy('tahun_ajaran')->get(),
                'mapel' => Mapel::orderBy('nama_mata_pelajaran')->get(),
                'guru'  => Guru::orderBy('nama_guru')->get(),
            ]);
        } catch (\Throwable $th) {
            return back()->withErrors([$th->getMessage()]);
        }
    }
    function store(Request $request)
    {
        if ($request['insertFor'] == 'mapel') {
            $this->insertMapel($request);
        } else if ($request['insertFor'] == 'kelas') {
            $this->insertKelas($request);
        }
    }
    function insertMapel($request)
    {
        try {
            $request->validate([
                'nama' => 'required|unique:mapels,nama_mata_pelajaran',
            ]);
        } catch (ValidationException $e) {
            return back()->withErrors($e->validator->errors())->withInput();
        }
        Mapel::create([
            'nama_mata_pelajaran' => $request['nama'],
        ]);

        return redirect()->route('Kelas&Mapel.index')
            ->with('success', 'Mata Pelajaran Savesu successfully');
    }

    function insertKelas($request)
    {
        try {
            $request->validate([
                'nama' => 'required|unique:kelas,nama_kelas',
            ]);
        } catch (ValidationException $e) {
            return back()->withErrors($e->validator->errors())->withInput();
        }
        Kelas::create([
            'nama_kelas' => $request['nama'],
            'guru_id' => $request['guru_id'],
            'tahun_ajaran' => $request['tahun_mulai'] . '/' . $request['tahun_selesai'],
        ]);
        return redirect()->route('Kelas&Mapel.index')
            ->with('success', 'Kelas Save successfully');
    }

    function destroyMapel($id): RedirectResponse
    {
        try {
            Mapel::find($id)->delete();
            return redirect()->route('Kelas&Mapel.index')
                ->with('success', 'Mata Pelajaran Delete successfully');
        } catch (\Exception $e) {
            return redirect()->route('Kelas&Mapel.index')
                ->with('error', 'Mata Pelajaran Delete failed');
        }
    }
    function destroyKelas($id): RedirectResponse
    {
        try {
            Kelas::find($id)->delete();
            return redirect()->route('Kelas&Mapel.index')
                ->with('success', 'Kelas Delete successfully');
        } catch (\Exception $e) {
            return redirect()->route('Kelas&Mapel.index')
                ->with('error', 'Kelas Delete failed');
        }
    }
}
