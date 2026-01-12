import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import ConfirmModal from '../confirmModal';

const API_BASE_URL = 'http://localhost:8000/api';

const Participants = ({ participants, openModal, fetchParticipants }) => {
    // Fitur: State untuk kontrol Modal Konfirmasi Hapus
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // Fitur: Handler untuk membuka modal konfirmasi
    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setIsDeleteModalOpen(true);
    };

    // Fitur: Fungsi eksekusi hapus data ke API
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
        <div className="table-container">
            {/* Fitur: Header Tabel & Tombol Tambah */}
            <div className="table-header">
                <h3 className="table-title">Data Peserta</h3>
                <button onClick={() => openModal('peserta')} className="btn-add">
                    <Plus className="w-4 h-4" /> Tambah Peserta
                </button>
            </div>
            
            {/* Fitur: Tabel Data Peserta */}
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
                            <td>{p.kelas?.nama_kelas}</td>
                            <td>
                                <span className={`status-badge ${p.status === 'Aktif' ? 'active' : 'inactive'}`}>
                                    {p.status}
                                </span>
                            </td>
                            <td>
                                {/* Fitur: Tombol Aksi (Edit & Hapus) */}
                                <div className="action-buttons">
                                    <button onClick={() => openModal('peserta', p)} className="btn-icon edit">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDeleteClick(p.id)} className="btn-icon delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    {/* Fitur: Modal Konfirmasi */}
                                    <ConfirmModal 
                                        isOpen={isDeleteModalOpen}
                                        onClose={() => setIsDeleteModalOpen(false)}
                                        onConfirm={handleConfirmDelete}
                                        message="Yakin ingin menghapus peserta ini? Data yang dihapus tidak bisa dikembalikan."
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Participants;