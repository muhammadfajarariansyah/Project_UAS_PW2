import React from 'react';
import { ArrowLeft, User } from 'lucide-react';

const KelasDetail = ({ selectedKelas, participants, onBack }) => {
  // Fitur: Filter peserta berdasarkan level kelas
  const filteredParticipants = participants.filter(
    (p) => p.kelas?.level === selectedKelas.level || p.level === selectedKelas.level
  );

  return (
    <div>
      {/* Fitur: Navigasi Kembali */}
      <button 
        onClick={onBack} 
        style={{display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', marginBottom: '1rem', color: '#64748b'}}
      >
        <ArrowLeft size={20}/> Kembali ke Daftar Kelas
      </button>

      <div className="table-container" style={{boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}>
        {/* Fitur: Header Detail Kelas */}
        <div className="table-header">
          <div>
            <h2 className="table-title">{selectedKelas.nama_kelas}</h2>
            <p style={{color: '#64748b'}}>Level: {selectedKelas.level} | Peserta dengan level yang sama</p>
          </div>
        </div>

        {/* Fitur: Tabel Daftar Peserta Terfilter */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama Peserta</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredParticipants.length > 0 ? (
              filteredParticipants.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <div className="sidebar-user-avatar" style={{width: '30px', height: '30px'}}>
                        <User size={14}/>
                      </div>
                      {p.nama}
                    </div>
                  </td>
                  <td>{p.email}</td>
                  <td>
                    <span className={`status-badge ${p.status === 'Aktif' ? 'active' : 'inactive'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              /* Fitur: Empty State */
              <tr>
                <td colSpan="3" style={{textAlign: 'center', padding: '2rem'}}>
                  Tidak ada peserta di level ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelasDetail;