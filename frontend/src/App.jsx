import React, { useState, useEffect, useCallback } from 'react';
import './style.css';

// Import Layout
import Layout from './components/Layout';

// Import Pages
import Dashboard from './pages/Dashboard';
import Kelas from './pages/kelas/Kelas';
import KelasForm from './pages/kelas/KelasForm';
import Participants from './pages/participant/Participants';
import ParticipantForm from './pages/participant/ParticipantForm';
import KelasDetail from './pages/kelas/KelasDetail';

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [participants, setParticipants] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedKelas, setSelectedKelas] = useState(null);

  const fetchParticipants = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/participants`);
      const data = await response.json();
      setParticipants(data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  }, []);

  const fetchKelas = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/kelas`);
      const data = await response.json();
      setKelas(data);
    } catch (error) {
      console.error('Error fetching kelas:', error);
    }
  }, []);

  useEffect(() => {
    fetchParticipants();
    fetchKelas();
  }, [fetchParticipants, fetchKelas]);

  // Statistik tetap dihitung dari data asli (bukan filter) agar angka total akurat
  const stats = {
    activeParticipants: participants.filter(p => p.status === 'Aktif').length,
    totalParticipants: participants.length,
    totalKelas: kelas.length
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleModalSuccess = () => {
    closeModal();
    fetchParticipants();
    fetchKelas();
  };

  // Logika Filter
  const filteredParticipants = participants.filter(p => 
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredKelas = kelas.filter(k => 
      k.nama_kelas.toLowerCase().includes(searchQuery.toLowerCase()) || 
      k.nama_pengajar.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecentParticipants = filteredParticipants.slice(0, 3);

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      activePage={activePage}
      setActivePage={setActivePage}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      filteredKelas={filteredKelas}
      filteredParticipants={filteredParticipants}
    >
      {/* Dashboard Page */}
      {activePage === 'dashboard' && (
        <Dashboard 
            stats={stats} 
            recentParticipants={filteredRecentParticipants} 
        />
      )}

      {/* Kelas Page */}
      {activePage === 'kelas' && (
        !selectedKelas ? (
            <Kelas 
                kelas={filteredKelas} 
                openModal={openModal}
                fetchKelas={fetchKelas}
                onSelectKelas={(item) => setSelectedKelas(item)}
            />
        ) : (
            <KelasDetail 
                selectedKelas={selectedKelas}
                participants={participants}
                onBack={() => setSelectedKelas(null)}
            />
        )
      )}

      {/* Participants Page */}
      {activePage === 'peserta' && (
          <Participants 
              participants={filteredParticipants} 
              kelas={kelas}
              openModal={openModal}
              fetchParticipants={fetchParticipants}
          />
      )}

      {/* Modals */}
      {showModal && modalType === 'kelas' && (
        <KelasForm
          item={selectedItem}
          onClose={closeModal}
          onSuccess={handleModalSuccess}
        />
      )}

      {showModal && modalType === 'peserta' && (
        <ParticipantForm
          item={selectedItem}
          onClose={closeModal}
          onSuccess={handleModalSuccess}
          kelas={kelas}
        />
      )}
    </Layout>
  );
};

export default App;