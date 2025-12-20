<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->integer('umur');

            $table->foreignId('kelas_id')
                ->constrained('kelas')
                ->onDelete('cascade');

            $table->enum('status', ['Aktif', 'Nonaktif'])->default('Aktif');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
