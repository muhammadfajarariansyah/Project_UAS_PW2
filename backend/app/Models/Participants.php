<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participants extends Model
{
    protected $fillable = [
        'nama',
        'email',
        'jenis_kelamin',
        'umur',
        'kelas_id',
        'status'
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}
