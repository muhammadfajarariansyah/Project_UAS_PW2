import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Users, UserCheck, UserX } from 'lucide-react';
import ConfirmModal from '../confirmModal';

const API_BASE_URL = 'http://localhost:8000/api';

const Participants = ({ participants, openModal, fetchParticipants }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    //logika perhitungan statistik peserta
    const stats = {
        total: participants.length,
        aktif: participants.filter(p => p.status === 'Aktif').length,
        tidakAktif: participants.filter(p => p.status !== 'Aktif').length
    };

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/participants/${selectedId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchParticipants();
                setIsDeleteModalOpen(false);
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    return (
        <div className="participants-container">
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '2rem' }}>
                <div className="stat-card">
                    <div className="stat-card-content">
                        <div>
                            <p className="stat-card-title">Total Peserta</p>
                            <p className="stat-card-value">{stats.total}</p>
                        </div>
                        <Users className="w-8 h-8" style={{ color: '#3b82f6' }} />
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-content">
                        <div>
                            <p className="stat-card-title">Peserta Aktif</p>
                            <p className="stat-card-value">{stats.aktif}</p>
                        </div>
                        <UserCheck className="w-8 h-8" style={{ color: '#10b981' }} />
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-content">
                        <div>
                            <p className="stat-card-title">Tidak Aktif</p>
                            <p className="stat-card-value">{stats.tidakAktif}</p>
                        </div>
                        <UserX className="w-8 h-8" style={{ color: '#ef4444' }} />
                    </div>
                </div>
            </div>

            <div className="table-container">
                <div className="table-header">
                    <h3 className="table-title">Data Peserta</h3>
                    <button onClick={() => openModal('peserta')} className="btn-add">
                        <Plus className="w-4 h-4" /> Tambah Peserta
                    </button>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Jenis Kelamin</th>
                            <th>Umur</th>
                            <th>Kelas</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((p, index) => (
                            <tr key={p.id}>
                                <td>{index + 1}</td>
                                <td>{p.nama}</td>
                                <td>{p.email}</td>
                                <td>{p.jenis_kelamin}</td>
                                <td>{p.umur}</td>
                                <td>{p.kelas?.nama_kelas || '-'}</td>
                                <td>
                                    <span className={`status-badge ${p.status === 'Aktif' ? 'active' : 'inactive'}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => openModal('peserta', p)} className="btn-icon edit">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDeleteClick(p.id)} className="btn-icon delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Yakin ingin menghapus peserta ini? Data yang dihapus tidak bisa dikembalikan."
            />
        </div>
    );
};

export default Participants;