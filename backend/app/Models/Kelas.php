<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    protected $table = 'kelas';

    protected $fillable = [
        'nama_kelas',
        'nama_pengajar',
        'level',
        'status'
    ];

    public function participants()
    {
        return $this->hasMany(Participants::class);
    }
}
