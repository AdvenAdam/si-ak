<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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
            for ($i = 0; $i < 10; $i++) {
                # code...
                foreach ($users as $item) {
                    $data[] = [
                        'id' => $item->id,
                        'name' => $item->name,
                        'email' => $item->email,
                        'role' => $item->role->jenis_role,
                        'join_date' => $item->created_at->format('j F, Y')
                    ];
                }
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
}
