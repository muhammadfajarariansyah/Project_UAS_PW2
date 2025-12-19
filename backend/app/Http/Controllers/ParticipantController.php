<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function index()
    {
        return response()->json(Participant::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required',
            'email' => 'required|email|unique:pesertas',
            'no_hp' => 'required',
            'level' => 'required',
            'jadwal' => 'required'
        ]);

        return response()->json(Participant::create($data), 201);
    }

    public function show($id)
    {
        return response()->json(Participant::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $participant = Participant::findOrFail($id);
        $participant->update($participant->all());

        return response()->json($participant);
    }

    public function destroy($id)
    {
        Participant::destroy($id);
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
