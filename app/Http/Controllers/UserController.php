<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
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
            foreach ($users as $item) {
                $data[] = [
                    'id' => $item->id,
                    'username' => $item->username,
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
    function create(): Response
    {

        try {
            $kelas = Kelas::all();
            return Inertia::render('Dashboard/User/AddUser', [
                'kelas' => $kelas,
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
                'nisn' => 'required|unique:siswas,nisn',
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
            if ($request->role_id == 1  && !is_null($user)) {
                $siswa = Siswa::create([
                    'user_id' => $user->id,
                    'nama' => $request->nama,
                    'nisn' => $request->nisn,
                    'alamat' => $request->alamat,
                    'tanggal_lahir' => $request->tanggal_lahir,
                    'kelas_id' => intval($request->kelas_id),
                ]);
                if (is_null($siswa)) {
                    $user->delete();
                    DB::rollBack();
                }
                DB::commit();
            }

            return back();
        } catch (ValidationException $e) {
            return back()->withErrors($e->validator->errors())->withInput();
        } catch (\Throwable $th) {
            return back()->withErrors([$th->getMessage()])->withInput();
        }
    }

    public function destroy(User $user)
    {
        DB::beginTransaction();
        try {
            if ($user->role->jenis_role == 'siswa') {
                $siswa = Siswa::where('user_id', $user->id)->first();
                $siswa->delete();
            } elseif ($user->role->jenis_role == 'guru') {
                $guru = Guru::where('user_id', $user->id)->first();
                $guru->delete();
            } elseif ($user->role->jenis_role == 'admin') {
                $admin = Admin::where('user_id', $user->id)->first();
                $admin->delete();
            }
            $user->delete();
            DB::commit();
            return redirect('/dashboard/user');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors([$th->getMessage()]);
        }
    }
    public function update(User $user): Response
    {
        // NOTE : Reformat Data
        try {
            $data['user'] = [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role->jenis_role,
                'join_date' => $user->created_at->format('j F, Y')
            ];
            if ($user->role->jenis_role == 'siswa') {
                $data['detailUser'] = Siswa::with('Account')->where('user_id', $user->id)->first();
            } else if ($user->role->jenis_role == 'guru') {
                $data['detailUser'] = Guru::with('Account')->where('user_id', $user->id)->first();
            } else if ($user->role->jenis_role == 'admin') {
                $data['detailUser'] = Admin::with('Account')->where('user_id', $user->id)->first();
            }
            return Inertia::render('Dashboard/User/Update', [
                'user' => $data,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('Dashboard/User/Update', [
                'error' => $th->getMessage(),
            ]);
        }
    }
}
