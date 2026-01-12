import React from 'react';
import { Search, Users, LogOut, Menu, X } from 'lucide-react';
import LogoApp from '../assets/logo-academy.png';


const Layout = ({ children, sidebarOpen, setSidebarOpen, activePage, setActivePage, searchQuery, setSearchQuery, onLogout }) => {
    
    //Header & Search Dinamis
    const getHeaderTitle = () => {
        switch (activePage) {
            case 'dashboard': return 'Beranda';
            case 'kelas':     return 'Data Kelas';
            case 'peserta':   return 'Data Peserta';
            default:          return 'English Academy';
        }
    };

    const getSearchPlaceholder = () => {
        switch (activePage) {
            case 'dashboard': return 'Cari Kelas atau Peserta...';
            case 'kelas':     return 'Cari Nama Kelas atau Pengajar...';
            case 'peserta':   return 'Cari Nama Peserta atau Email...';
            default:          return 'Cari...';
        }
    };

    return (
        <div className="app-container">
            
            {/* Fitur: Sidebar & Navigasi */}
            <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <img src={LogoApp} alt="Logo" className="logo-img" />
                    </div>
                    <div className="sidebar-brand">
                        <h1>English</h1>
                        <p>Academy</p>
                    </div>
                </div>

                <div className="sidebar-content">
                    {/* Info Profil */}
                    <div className="sidebar-user">
                        <div className="sidebar-user-avatar">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="sidebar-user-info">
                            <p>Admin</p>
                            <p>adm1107@gmail.com</p>
                        </div>
                    </div>

                    {/* Menu Utama */}
                    <nav className="sidebar-nav">
                        <button
                            onClick={() => { setActivePage('dashboard'); setSearchQuery(''); }}
                            className={`sidebar-nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
                        >
                            Beranda
                        </button>
                        <button
                            onClick={() => { setActivePage('kelas'); setSearchQuery(''); }}
                            className={`sidebar-nav-item ${activePage === 'kelas' ? 'active' : ''}`}
                        >
                            Data Kelas
                        </button>
                        <button
                            onClick={() => { setActivePage('peserta'); setSearchQuery(''); }}
                            className={`sidebar-nav-item ${activePage === 'peserta' ? 'active' : ''}`}
                        >
                            Data Peserta
                        </button>
                    </nav>

                    <button 
                        className="sidebar-logout" 
                        onClick={onLogout}
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Fitur: Konten Utama */}
            <div className="main-content">
                
                {/* Fitur: Header & Pencarian */}
                <header className="header">
                    <div className="header-left">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="header-toggle">
                            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <h2 className="header-title">{getHeaderTitle()}</h2>
                    </div>

                    <div className="header-search">
                        <div className="search-wrapper">
                            <Search className="search-icon w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder={getSearchPlaceholder()}
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {/* Tombol Hapus Pencarian */}
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="search-clear-btn"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <main className="content-area">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;