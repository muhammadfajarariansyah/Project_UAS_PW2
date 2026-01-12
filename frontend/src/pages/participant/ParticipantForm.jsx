import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:8000/api';

const ParticipantForm = ({ item, onClose, onSuccess, kelas }) => {
    //Inisialisasi State Form Peserta
    const [formData, setFormData] = useState(
        item || {
            nama: '',
            email: '',
            jenis_kelamin: 'Laki-laki',
            umur: '',
            kelas_id: '',
            status: 'Aktif'
        }
    );

    //Handler Simpan & Validasi Data
    const handleSubmit = async () => {
        if (!formData.nama || !formData.email || !formData.umur || !formData.kelas_id) {
            alert("Peringatan: Mohon isi Nama, Email, Umur, dan Pilih Kelas!");
            return;
        }

        const url = `${API_BASE_URL}/participants${item ? `/${item.id}` : ''}`;
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
                alert('Gagal menyimpan data peserta. Periksa koneksi database.');
            }
        } catch (error) {
            console.error('Error saving participant:', error);
            alert('Terjadi kesalahan sistem.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/*Judul Modal Dinamis */}
                <h3 className="modal-title">
                    {item ? 'Edit' : 'Tambah'} Peserta
                </h3>
                
                {/*Form Input Identitas */}
                <div className="form-group">
                    <label className="form-label">Nama <span style={{color: 'red'}}>*</span></label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.nama}
                        onChange={(e) => setFormData({...formData, nama: e.target.value})}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Email <span style={{color: 'red'}}>*</span></label>
                    <input
                        type="email"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Jenis Kelamin</label>
                    <select
                        className="form-select"
                        value={formData.jenis_kelamin}
                        onChange={(e) => setFormData({...formData, jenis_kelamin: e.target.value})}
                    >
                        <option>Laki-laki</option>
                        <option>Perempuan</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Umur <span style={{color: 'red'}}>*</span></label>
                    <input
                        type="number"
                        className="form-input"
                        value={formData.umur}
                        onChange={(e) => setFormData({...formData, umur: e.target.value})}
                        required
                    />
                </div>

                {/*Dropdown Relasi Kelas */}
                <div className="form-group">
                    <label className="form-label">Kelas <span style={{color: 'red'}}>*</span></label>
                    <select
                        className="form-select"
                        value={formData.kelas_id}
                        onChange={(e) => setFormData({...formData, kelas_id: e.target.value})}
                        required
                    >
                        <option value="">Pilih Kelas</option>
                        {kelas.map(k => (
                            <option key={k.id} value={k.id}>{k.nama_kelas}</option>
                        ))}
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
                
                {/*Tombol Kontrol Modal */}
                <div className="modal-actions">
                    <button onClick={onClose} className="btn-cancel">Batal</button>
                    <button onClick={handleSubmit} className="btn-submit">Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default ParticipantForm;