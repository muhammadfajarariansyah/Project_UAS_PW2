import React from 'react';
import { Activity, Users, BookOpen } from 'lucide-react';

const Dashboard = ({ stats, recentParticipants }) => (
    <div>
        {/*Kartu Statistik Ringkasan */}
        <div className="stats-grid">
            <div className="stat-card green">
                <div className="stat-card-content">
                    <div>
                        <p className="stat-card-title">Peserta Aktif</p>
                        <p className="stat-card-value">{stats.activeParticipants}</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-500" />
                </div>
            </div>

            <div className="stat-card purple">
                <div className="stat-card-content">
                    <div>
                        <p className="stat-card-title">Total Peserta</p>
                        <p className="stat-card-value">{stats.totalParticipants}</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-500" />
                </div>
            </div>

            <div className="stat-card red">
                <div className="stat-card-content">
                    <div>
                        <p className="stat-card-title">Total Kelas</p>
                        <p className="stat-card-value">{stats.totalKelas}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-red-500" />
                </div>
            </div>
        </div>

        {/* Fitur: Tabel List Peserta Terbaru */}
        <div className="table-container">
            <h3 className="table-title">Peserta Terbaru</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Kelas</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recentParticipants.map((participant, index) => (
                        <tr key={participant.id}>
                            <td>{index + 1}</td>
                            <td>{participant.nama}</td>
                            <td>{participant.email}</td>
                            <td>{participant.kelas?.nama_kelas}</td>
                            <td>
                                <span className={`status-badge ${participant.status === 'Aktif' ? 'active' : 'inactive'}`}>
                                    {participant.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default Dashboard;