<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    function index(): Response
    {
        // NOTE : Reformat Data
        try {
            $data = [];
            $users = User::with('role:id,jenis_role')->get();
            # code...
            foreach ($users as $item) {
                $data[] = [
                    'id' => $item->id,
                    'nama' => $item->nama,
                    'email' => $item->email,
                    'role' => $item->role->jenis_role,
                    'join_date' => $item->created_at->format('j F, Y')
                ];
            }
            return Inertia::render('Dashboard/User/User', [
                'users' => $data,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('Errors/Error', [
                'message' => $th->getMessage(),
            ]);
        }
    }

    function store(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'nama' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'role_id' => 'required|exists:roles,id',
                'password' => 'required|string|min:8|same:confirm',
            ]);
            DB::beginTransaction();
            $user = User::create([
                'username' => $request->nama,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role_id' => $request->role_id,
            ]);

            if ($request->role_id === 1  && !is_null($user)) {
                $siswa = Siswa::create([
                    'user_id' => $user->id,
                    'nama' => $request->nama,
                    'nisn' => $request->nisn,
                    'alamat' => $request->alamat,
                    'tanggal_lahir' => $request->tanggal_lahir,
                    'id_kelas' => $request->id_kelas,
                ]);
                if (is_null($siswa)) {
                    $user->delete();
                    DB::rollBack();
                }
                DB::commit();
            }

            return redirect()->back()->with('success', 'User berhasil ditambahkan');
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return redirect()->back()->withErrors($th->getMessage());
        }
    }
}
