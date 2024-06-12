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
                'kelas' => Kelas::with('guru')
                    ->orderBy('tahun_ajaran', 'desc')
                    ->orderBy('nama_kelas')
                    ->get(),
                'mapel' => Mapel::orderBy('nama_mata_pelajaran')->get(),
                'guru'  => Guru::with('Mapel')->orderBy('nama_guru')->get(),
            ]);
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return Inertia::render('Dashboard/KelasMapel/KelasMapel', [
                'error' => $th->getMessage(),
            ]);
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
            ], [
                'nama.unique' => 'Mata pelajaran sudah ada',
            ]);
        } catch (ValidationException $e) {
            return back()->withErrors($e->validator->errors())->withInput();
        }

        Mapel::create([
            'nama_mata_pelajaran' => $request['nama'],
        ]);

        return redirect()->route('Kelas&Mapel.index')
            ->with('success', 'Mata Pelajaran Berhasil ditambahkan.');
    }

    function insertKelas($request)
    {
        try {
            $request->validate([
                'nama' => 'required|unique:kelas,nama_kelas,NULL,id,tahun_ajaran,' . $request['tahun_mulai'] . '/' . $request['tahun_selesai'],
            ], [
                'nama.unique' => 'Kelas sudah ada',
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
            ->with('success', 'Kelas Berhasil ditambahkan.');
    }

    function destroyMapel($id): RedirectResponse
    {
        try {
            Mapel::find($id)->delete();
            return redirect()->route('Kelas&Mapel.index')
                ->with('success', 'Mata Pelajaran Berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->route('Kelas&Mapel.index')
                ->with('error', 'Mata Pelajaran Gagal dihapus.');
        }
    }
    function destroyKelas($id): RedirectResponse
    {
        try {
            Kelas::find($id)->delete();
            return redirect()->route('Kelas&Mapel.index')
                ->with('success', 'Kelas Berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->route('Kelas&Mapel.index')
                ->with('error', 'Kelas Gagal dihapus.');
        }
    }
}
