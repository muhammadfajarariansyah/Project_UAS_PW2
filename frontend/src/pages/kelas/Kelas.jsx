import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Users, GraduationCap, BookOpen, Target, Layers, Award } from 'lucide-react';
import ConfirmModal from '../confirmModal'; 

const API_BASE_URL = 'http://localhost:8000/api';

const Kelas = ({ kelas, openModal, fetchKelas, onSelectKelas }) => {
  //State for Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedKelasId, setSelectedKelasId] = useState(null);

  const stats = {
    total: kelas.length,
    beginner: kelas.filter(k => k.level === 'Beginner').length,
    intermediate: kelas.filter(k => k.level === 'Intermediate').length,
    advanced: kelas.filter(k => k.level === 'Advanced').length
  };

  //Handler Functions
  const handleDeleteClick = (e, id) => {
    e.stopPropagation(); 
    setSelectedKelasId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/kelas/${selectedKelasId}`, { 
        method: 'DELETE' 
      });
      
      if (response.ok) {
        fetchKelas();
        setIsDeleteModalOpen(false);
      } else {
        alert("Gagal menghapus kelas. Pastikan tidak ada peserta di dalam kelas ini.");
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Terjadi kesalahan koneksi ke server.");
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="container">
      {/* Fitur: Stat Cards (Ringkasan Data) */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-card-content">
            <div>
              <p className="stat-card-title">Total Kelas</p>
              <p className="stat-card-value">{stats.total}</p>
            </div>
            <BookOpen className="w-8 h-8" style={{color: '#3b82f6'}} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-content">
            <div>
              <p className="stat-card-title">Beginner</p>
              <p className="stat-card-value">{stats.beginner}</p>
            </div>
            <Target className="w-8 h-8" style={{color: '#10b981'}} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-content">
            <div>
              <p className="stat-card-title">Intermediate</p>
              <p className="stat-card-value">{stats.intermediate}</p>
            </div>
            <Layers className="w-8 h-8" style={{color: '#8b5cf6'}} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-content">
            <div>
              <p className="stat-card-title">Advanced</p>
              <p className="stat-card-value">{stats.advanced}</p>
            </div>
            <Award className="w-8 h-8" style={{color: '#ef4444'}} />
          </div>
        </div>
      </div>

      {/* Fitur: Header & Tambah Data */}
      <div className="table-header">
        <h3 className="table-title">Daftar Kelas</h3>
        <button onClick={() => openModal('kelas')} className="btn-add">
          <Plus className="w-4 h-4" /> Tambah Kelas
        </button>
      </div>

      {/* Fitur: Grid Kartu Kelas */}
      <div className="kelas-grid">
        {kelas.map((k) => (
          <div key={k.id} className="kelas-card" onClick={() => onSelectKelas(k)}>
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                <span className={`status-badge ${k.status === 'Aktif' ? 'active' : 'inactive'}`}>
                  {k.status}
                </span>
                <span style={{fontWeight: 'bold', fontSize: '0.75rem', color: '#64748b'}}>{k.level}</span>
              </div>
              <h2 style={{fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem'}}>{k.nama_kelas}</h2>
              <p style={{color: '#64748b', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '5px'}}>
                <GraduationCap size={16}/> {k.nama_pengajar}
              </p>
            </div>

            <div style={{marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px', color: '#2563eb', fontWeight: '600'}}>
                <Users size={18}/> {k.participants_count || 0} Peserta
              </div>
              
              {/* Fitur: Aksi Edit & Hapus */}
              <div className="action-buttons">
                <button onClick={(e) => { e.stopPropagation(); openModal('kelas', k); }} className="btn-icon edit">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={(e) => handleDeleteClick(e, k.id)} className="btn-icon delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fitur: Modal Konfirmasi Hapus */}
      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Yakin ingin menghapus kelas ini? Data yang terhapus tidak dapat dikembalikan."
      />
    </div>
  );
};

export default Kelas;