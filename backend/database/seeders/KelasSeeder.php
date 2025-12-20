<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kelas;

class KelasSeeder extends Seeder
{
    public function run(): void
    {
        Kelas::insert([
            [
                'nama_kelas' => 'Beginner A',
                'nama_pengajar' => 'Budi Santoso',
                'level' => 'Beginner',
                'status' => 'Aktif'
            ],
            [
                'nama_kelas' => 'Beginner B',
                'nama_pengajar' => 'Siti Aminah',
                'level' => 'Beginner',
                'status' => 'Aktif'
            ],
            [
                'nama_kelas' => 'Intermediate A',
                'nama_pengajar' => 'Andi Wijaya',
                'level' => 'Intermediate',
                'status' => 'Aktif'
            ],
            [
                'nama_kelas' => 'Advanced A',
                'nama_pengajar' => 'Rina Kusuma',
                'level' => 'Advanced',
                'status' => 'Aktif'
            ],
        ]);
    }
}
