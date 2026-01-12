<?php

namespace App\Http\Controllers;

use App\Models\Participants;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function index()
    {
        return response()->json(
            Participants::with('kelas')->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required|string',
            'email' => 'required|email|unique:participants',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'umur' => 'required|integer',
            'kelas_id' => 'required|exists:kelas,id',
            'status' => 'required|in:Aktif,Nonaktif'
        ]);

        return response()->json(
            Participants::create($data),
            201
        );
    }

    public function show($id)
    {
        return response()->json(
            Participants::with('kelas')->findOrFail($id)
        );
    }

    public function update(Request $request, $id)
    {
        $participant = Participants::findOrFail($id);

        $data = $request->validate([
            'nama' => 'required|string',
            'email' => 'required|email|unique:participants,email,' . $id,
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'umur' => 'required|integer',
            'kelas_id' => 'required|exists:kelas,id',
            'status' => 'required|in:Aktif,Nonaktif'
        ]);

        $participant->update($data);

        return response()->json($participant);
    }

    // Tambahkan fungsi ini di ParticipantController.php
    public function removeFromClass($id)
    {
        try {
            $participant = Participants::findOrFail($id);
            $participant->kelas_id = null; // Menghapus hubungan kelas tanpa menghapus peserta
            $participant->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Peserta berhasil dikeluarkan dari kelas'
            ]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        Participants::destroy($id);
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
