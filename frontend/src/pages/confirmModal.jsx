import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content confirm-modal">
                <h3 className="modal-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    Konfirmasi
                </h3>
                <p style={{ textAlign: 'center', color: '#4b5563', marginBottom: '2rem' }}>
                    {message || 'Apakah Anda yakin ingin menghapus data ini?'}
                </p>
                
                <div className="modal-actions" style={{ justifyContent: 'center', gap: '1rem' }}>
                    <button onClick={onClose} className="btn-cancel" style={{ backgroundColor: '#6495FF' }}>
                        Batal
                    </button>
                    <button onClick={onConfirm} className="btn-submit" style={{ backgroundColor: '#ef4444' }}>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;