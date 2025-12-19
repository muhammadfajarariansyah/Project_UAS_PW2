<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $fillable = [
    'nama',
    'email',
    'no_hp',
    'level',
    'jadwal'
];
}
