<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function index()
    {
        return response()->json(
            Participant::with('kelas')->get()
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
            Participant::create($data),
            201
        );
    }

    public function show($id)
    {
        return response()->json(
            Participant::with('kelas')->findOrFail($id)
        );
    }

    public function update(Request $request, $id)
    {
        $participant = Participant::findOrFail($id);

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

    public function destroy($id)
    {
        Participant::destroy($id);
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
