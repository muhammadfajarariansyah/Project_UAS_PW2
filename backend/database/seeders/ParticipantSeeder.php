<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Participant;
use App\Models\Participants;

class ParticipantSeeder extends Seeder
{
    public function run(): void
    {
        Participants::insert([
            [
                'nama' => 'Andi Pratama',
                'email' => 'andi@gmail.com',
                'jenis_kelamin' => 'Laki-laki',
                'umur' => 21,
                'kelas_id' => 1,
                'status' => 'Aktif'
            ],
            [
                'nama' => 'Siti Aisyah',
                'email' => 'siti@gmail.com',
                'jenis_kelamin' => 'Perempuan',
                'umur' => 20,
                'kelas_id' => 1,
                'status' => 'Aktif'
            ],
            [
                'nama' => 'Rizky Ramadhan',
                'email' => 'rizky@gmail.com',
                'jenis_kelamin' => 'Laki-laki',
                'umur' => 22,
                'kelas_id' => 2,
                'status' => 'Aktif'
            ],
            [
                'nama' => 'Dinda Permata',
                'email' => 'dinda@gmail.com',
                'jenis_kelamin' => 'Perempuan',
                'umur' => 19,
                'kelas_id' => 2,
                'status' => 'Nonaktif'
            ],
            [
                'nama' => 'Fajar Nugroho',
                'email' => 'fajar@gmail.com',
                'jenis_kelamin' => 'Laki-laki',
                'umur' => 23,
                'kelas_id' => 3,
                'status' => 'Aktif'
            ],
        ]);
    }
}
