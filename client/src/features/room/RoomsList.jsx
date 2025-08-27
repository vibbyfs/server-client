import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router';
import { CreateRoomModal } from './components/CreateRoomModal.jsx';
import { JoinRoomModal } from './components/JoinRoomModal.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';

export function RoomsList() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const loadRooms = async () => {
    try {
      const response = await fetch('/api/rooms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        setError('Failed to load rooms');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, [token]);

  const handleJoinRoom = async (room) => {
    // If room doesn't have PIN, try to join directly
    if (!room.hasPin) {
      try {
        const response = await fetch(`/api/rooms/${room.id}/join`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ pin: '' })
        });
        
        if (response.ok) {
          // Navigate directly to room on success
          navigate(`/rooms/${room.id}`);
          return;
        }
      } catch (error) {
        console.error('Direct join failed:', error);
      }
    }
    
    // Show modal for PIN input or if direct join failed
    setSelectedRoom(room);
    setShowJoinModal(true);
  };

  const handleViewRoom = (roomId) => {
    navigate(`/rooms/${roomId}`);
  };

  const onJoinSuccess = () => {
    loadRooms(); // Refresh rooms list
  };

  const onCreateSuccess = () => {
    loadRooms(); // Refresh rooms list
  };

  // Filter and sort rooms
  const filteredRooms = rooms
    .filter(room => {
      if (filter === 'all') return true;
      if (filter === 'my-rooms') return room.isParticipant || room.adminId === user?.id;
      if (filter === 'available') return !room.isParticipant && room.participantCount < room.capacity;
      return room.status === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'capacity') return b.capacity - a.capacity;
      if (sortBy === 'dues') return b.dues - a.dues;
      return a.name.localeCompare(b.name);
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'ongoing': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getRoleDisplay = (room) => {
    if (room.adminId === user?.id) return { text: 'Admin', color: 'text-yellow-400' };
    if (room.isParticipant) return { text: 'Peserta', color: 'text-white' };
    return { text: 'Bukan Peserta', color: 'text-gray-300' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10">
          <Navbar />
          <div className="pt-20 flex items-center justify-center min-h-screen">
            <div className="text-center animate-fadeInUp">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mx-auto mb-6 flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Memuat Rooms</h3>
              <p className="text-blue-100">Sedang mengambil data arisan terbaru...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Header Section */}
        <div className="pt-20 pb-8">
          <div className="container-modern">
            <div className="text-center mb-12 animate-fadeInUp">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Dashboard Arisan
                </span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Selamat datang kembali, <span className="font-semibold text-yellow-400">{user?.name}</span>!
                Kelola semua arisan Anda dalam satu tempat.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="pb-8">
          <div className="w-full max-w-7xl lg:max-w-none mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left Column - Rooms List */}
              <div className="flex-1">
                {/* Action Bar */}
                <div className="glass-card mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                        </svg>
                        <span className="text-sm font-medium text-white">Filter:</span>
                      </div>
                      {[
                        { value: 'all', label: 'Semua' },
                        { value: 'my-rooms', label: 'Room Saya' },
                        { value: 'available', label: 'Tersedia' },
                        { value: 'waiting', label: 'Menunggu' },
                        { value: 'ongoing', label: 'Berjalan' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFilter(option.value)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            filter === option.value
                              ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    {/* Sort & Create Button */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v4m0 0l2-2m-2 2L6 7" />
                        </svg>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="input-modern text-sm py-2"
                        >
                          <option value="recent">Terbaru</option>
                          <option value="name">Nama</option>
                          <option value="capacity">Kapasitas</option>
                          <option value="dues">Iuran</option>
                        </select>
                      </div>

                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="btn-secondary group cursor-pointer"
                      >
                        <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Buat Room
                      </button>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-8 animate-fadeInUp">
                    <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 backdrop-filter backdrop-blur-sm">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-200">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rooms Grid */}
                {filteredRooms.length === 0 ? (
                  <div className="text-center py-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <div className="glass-card max-w-md mx-auto">
                      <div className="text-6xl mb-6">🎯</div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {filter === 'all' ? 'Belum Ada Room' : 'Tidak Ada Room yang Sesuai'}
                      </h3>
                      <p className="text-blue-100 mb-8">
                        {filter === 'all'
                          ? 'Buat room arisan pertama Anda dan mulai perjalanan menabung bersama!'
                          : 'Coba ubah filter atau buat room baru untuk memulai arisan.'
                        }
                      </p>
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="btn-secondary cursor-pointer"
                      >
                        Buat Room Pertama
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRooms.map((room, index) => {
                      const role = getRoleDisplay(room);
                      const progressPercentage = (room.participantCount / room.capacity) * 100;

                      return (
                        <div
                          key={room.id}
                          className="glass-card group animate-fadeInUp p-6"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {/* Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors truncate">
                                {room.name}
                              </h3>
                              <p className={`text-sm font-medium ${role.color} mt-1`}>
                                {role.text}
                              </p>
                            </div>

                            <div className="flex flex-col items-end space-y-2">
                              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(room.status)}`}>
                                {room.status === 'waiting' && 'Menunggu'}
                                {room.status === 'ongoing' && 'Berjalan'}
                                {room.status === 'completed' && 'Selesai'}
                              </span>
                              {room.hasPin && (
                                <div className="flex items-center text-xs text-gray-300">
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                  </svg>
                                  PIN Required
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-300 mb-2">
                              <span>Peserta</span>
                              <span>{room.participantCount || 0}/{room.capacity}</span>
                            </div>
                            <div className="w-full bg-gray-600/30 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Room Details */}
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2 text-gray-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                                <span>Iuran</span>
                              </div>
                              <span className="font-semibold text-white">
                                Rp {room.dues?.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2 text-gray-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Frekuensi</span>
                              </div>
                              <span className="font-medium text-white">
                                {room.drawFrequencyValue} {room.drawFrequencyUnit}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2 text-gray-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span>Tenor</span>
                              </div>
                              <span className="font-medium text-white">
                                {room.tenorRounds} putaran
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            {room.isParticipant || room.adminId === user?.id ? (
                              <button
                                onClick={() => handleViewRoom(room.id)}
                                className="flex-1 btn-secondary group cursor-pointer"
                              >
                                <svg className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Masuk Room
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleJoinRoom(room)}
                                  disabled={room.participantCount >= room.capacity}
                                  className={`flex-1 ${
                                    room.participantCount >= room.capacity
                                      ? 'bg-gray-600/20 text-gray-400 cursor-not-allowed border border-gray-600/30'
                                      : 'btn-ghost cursor-pointer'
                                  } group`}
                                >
                                  {room.participantCount >= room.capacity ? (
                                    <>
                                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                      </svg>
                                      Penuh
                                    </>
                                  ) : (
                                    <>
                                      <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                      </svg>
                                      Gabung
                                    </>
                                  )}
                                </button>

                                {room.allowSpectator && (
                                  <button
                                    onClick={() => handleViewRoom(room.id)}
                                    className="btn-ghost cursor-pointer group"
                                  >
                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="w-full lg:w-80 xl:w-96">
                <div className="sticky top-24 space-y-6">

                  {/* User Info Card */}
                  <div className="glass-card animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {user?.name}
                      </h3>
                      <p className="text-sm text-blue-100">
                        Anggota ArisanKu
                      </p>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="space-y-4">
                    {/* Jumlah Room Saya */}
                    <div className="glass-card animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            {rooms.filter(r => r.isParticipant || r.adminId === user?.id).length}
                          </div>
                          <div className="text-sm text-blue-100">Room Saya</div>
                        </div>
                      </div>
                    </div>

                    {/* Saya Admin */}
                    <div className="glass-card animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            {rooms.filter(r => r.adminId === user?.id).length}
                          </div>
                          <div className="text-sm text-blue-100">Saya Admin</div>
                        </div>
                      </div>
                    </div>

                    {/* Sedang Berjalan */}
                    <div className="glass-card animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            {rooms.filter(r => r.status === 'ongoing').length}
                          </div>
                          <div className="text-sm text-blue-100">Sedang Berjalan</div>
                        </div>
                      </div>
                    </div>

                    {/* Total Peserta */}
                    <div className="glass-card animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a3 3 0 01-3-3V7a3 3 0 116 0v10M7 20a3 3 0 003 3h10a3 3 0 003-3M7 20a3 3 0 01-3-3V7a3 3 0 116 0v10M7 20a3 3 0 003 3h10a3 3 0 003-3" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            {rooms.reduce((total, room) => total + (room.participantCount || 0), 0)}
                          </div>
                          <div className="text-sm text-blue-100">Total Peserta</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateRoomModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={onCreateSuccess}
      />

      <JoinRoomModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        room={selectedRoom}
        onSuccess={onJoinSuccess}
      />
    </div>
  );
}
