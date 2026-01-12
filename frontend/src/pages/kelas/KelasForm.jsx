import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:8000/api';

const KelasForm = ({ item, onClose, onSuccess }) => {
    //Inisialisasi State Form
    const [formData, setFormData] = useState(
        item || {
            nama_kelas: '',
            nama_pengajar: '',
            level: 'Beginner',
            status: 'Aktif'
        }
    );

    //Handler Simpan Data (Create/Update)
    const handleSubmit = async () => {
        if (!formData.nama_kelas || !formData.nama_pengajar) {
            alert("Peringatan: Nama Kelas dan Nama Pengajar wajib diisi!");
            return;
        }

        const url = `${API_BASE_URL}/kelas${item ? `/${item.id}` : ''}`;
        const method = item ? 'PUT' : 'POST';
        
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                onSuccess();
            } else {
                alert('Gagal menyimpan data kelas.');
            }
        } catch (error) {
            console.error('Error saving kelas:', error);
            alert('Terjadi kesalahan sistem.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/*Judul Modal Dinamis */}
                <h3 className="modal-title">
                    {item ? 'Edit' : 'Tambah'} Kelas
                </h3>
                
                {/*Input Field Nama & Pengajar */}
                <div className="form-group">
                    <label className="form-label">Nama Kelas <span style={{color: 'red'}}>*</span></label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.nama_kelas}
                        onChange={(e) => setFormData({...formData, nama_kelas: e.target.value})}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Nama Pengajar <span style={{color: 'red'}}>*</span></label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.nama_pengajar}
                        onChange={(e) => setFormData({...formData, nama_pengajar: e.target.value})}
                        required
                    />
                </div>

                {/*Seleksi Level & Status */}
                <div className="form-group">
                    <label className="form-label">Level</label>
                    <select
                        className="form-select"
                        value={formData.level}
                        onChange={(e) => setFormData({...formData, level: e.target.value})}
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                        <option>Aktif</option>
                        <option>Nonaktif</option>
                    </select>
                </div>
                
                {/* Fitur: Tombol Aksi */}
                <div className="modal-actions">
                    <button type="button" onClick={onClose} className="btn-cancel">Batal</button>
                    <button type="button" onClick={handleSubmit} className="btn-submit">Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default KelasForm;