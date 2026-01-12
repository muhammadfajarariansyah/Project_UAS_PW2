<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    public function index()
    {
        return response()->json(
            Kelas::withCount('participants')->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_kelas' => 'required|string',
            'nama_pengajar' => 'required|string',
            'level' => 'required|in:Beginner,Intermediate,Advanced',
            'status' => 'required|in:Aktif,Nonaktif'
        ]);

        return response()->json(
            Kelas::create($data),
            201
        );
    }

    public function show($id)
    {
        return response()->json(
            Kelas::with('participants')->findOrFail($id)
        );
    }

    public function update(Request $request, $id)
    {
        $kelas = Kelas::findOrFail($id);

        $data = $request->validate([
            'nama_kelas' => 'required|string',
            'nama_pengajar' => 'required|string',
            'level' => 'required|in:Beginner,Intermediate,Advanced',
            'status' => 'required|in:Aktif,Nonaktif'
        ]);

        $kelas->update($data);

        return response()->json($kelas);
    }


    public function destroy($id)
    {
        Kelas::destroy($id);
        return response()->json(['message' => 'Kelas berhasil dihapus']);
    }
}
