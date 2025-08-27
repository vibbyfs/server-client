import React from 'react';
import { useParams, Link } from 'react-router';
import useRoom from './useRoom.js';
import BottleDraw from './components/BottleDraw.jsx';
import ReactionLayer, { QuickReactions } from './components/ReactionLayer.jsx';
import ShareCard from './components/ShareCard.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';

export default function Room() {
  const { id } = useParams();
  const { state, funfacts, joinedMode, viewAsSpectator, startDraw, sendReaction } = useRoom(id);
  const [shake, setShake] = React.useState(false);
  const [lastWinner, setLastWinner] = React.useState(null);
  const [showShareModal, setShowShareModal] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    let off;
    // subscribe draw events via window since sockets handled in hook - minimal UI toggles
    return () => { if(off) off(); };
  }, []);

  React.useEffect(() => {
    // naive: winner is last item in winners list
    if(state.winners && state.winners.length) {
      setLastWinner(state.winners[state.winners.length-1]);
    }
  }, [state.winners]);

  if(!state.room) {
    return (
      <div className="min-h-screen bg-gradient-luxury">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center animate-fadeInUp">
            <div className="w-16 h-16 bg-gradient-luxury rounded-2xl mx-auto mb-6 flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-luxury-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold text-luxury-black mb-2">Memuat Room</h3>
            <p className="text-luxury-gray font-inter">Sedang mengambil data arisan...</p>
          </div>
        </div>
      </div>
    );
  }

  const isHost = state.room.adminId === user?.id;
  const totalFund = state.room.dues * state.room.capacity;
  const progressPercentage = state.winners ? (state.winners.length / state.room.capacity) * 100 : 0;

  const getRoleInfo = () => {
    if (isHost) return { text: 'Admin', color: 'text-luxury-gold', bgColor: 'bg-luxury-gold/20 border border-luxury-gold/30', icon: '👑' };
    if (joinedMode === 'participant') return { text: 'Peserta', color: 'text-luxury-black', bgColor: 'bg-luxury-white/50 border border-luxury-white/20', icon: '👤' };
    if (joinedMode === 'spectator') return { text: 'Penonton', color: 'text-luxury-gray', bgColor: 'bg-luxury-gray/20 border border-luxury-gray/30', icon: '👁️' };
    return { text: 'Visitor', color: 'text-luxury-gray', bgColor: 'bg-luxury-gray/10 border border-luxury-gray/20', icon: '🔍' };
  };

  const roleInfo = getRoleInfo();

  const handleDrawStart = () => {
    setShake(true);
    setTimeout(() => setShake(false), 3000);
    startDraw();
  };

  return (
    <div className="min-h-screen bg-gradient-luxury">
      <Navbar />
      <ReactionLayer roomId={id} />
      
      <div className="pt-20 pb-8">
        <div className="container-modern">
          {/* Breadcrumb */}
          <div className="mb-6 animate-fadeInUp">
            <Link 
              to="/rooms" 
              className="inline-flex items-center text-luxury-gray hover:text-luxury-gold transition-colors group font-inter"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Dashboard
            </Link>
          </div>

          {/* Room Header */}
          <div className="card-luxury mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-3">
                  <h1 className="text-3xl font-playfair font-bold text-luxury-black truncate">{state.room.name}</h1>
                  <span className={`px-3 py-1 text-sm font-inter font-medium rounded-full ${roleInfo.bgColor} ${roleInfo.color}`}>
                    {roleInfo.icon} {roleInfo.text}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-luxury-gray font-inter">Peserta</span>
                    <div className="font-semibold text-luxury-black font-inter">
                      {state.participants.length}/{state.room.capacity}
                    </div>
                  </div>
                  <div>
                    <span className="text-luxury-gray font-inter">Status</span>
                    <div className={`font-semibold font-inter ${
                      state.room.status === 'waiting' ? 'text-amber-600' :
                      state.room.status === 'ongoing' ? 'text-emerald-600' :
                      'text-blue-600'
                    }`}>
                      {state.room.status === 'waiting' && 'Menunggu'}
                      {state.room.status === 'ongoing' && 'Berjalan'}
                      {state.room.status === 'completed' && 'Selesai'}
                    </div>
                  </div>
                  <div>
                    <span className="text-luxury-gray font-inter">Iuran</span>
                    <div className="font-semibold text-luxury-black font-inter">
                      Rp {state.room.dues?.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-luxury-gray font-inter">Total Dana</span>
                    <div className="font-semibold gradient-luxury font-inter">
                      Rp {totalFund?.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-luxury-gray font-inter mb-2">
                    <span>Progress Arisan</span>
                    <span>{state.winners?.length || 0}/{state.room.capacity} selesai</span>
                  </div>
                  <div className="w-full bg-luxury-gray/20 rounded-full h-3">
                    <div 
                      className="bg-gradient-luxury h-3 rounded-full transition-all duration-700"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <QuickReactions onSend={sendReaction} />
                
                {isHost && state.room.status !== 'completed' && (
                  <button 
                    onClick={handleDrawStart}
                    className="btn-luxury-secondary group"
                    disabled={shake}
                  >
                    {shake ? (
                      <>
                        <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Mengkocok...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Kocok Undian
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Draw Animation */}
              <div className="card-luxury animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-luxury-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-luxury-black">Animasi Undian</h3>
                </div>
                <div className="bg-gradient-luxury/10 rounded-xl p-8">
                  <BottleDraw startSignal={shake} winnerName={lastWinner?.name} />
                </div>
              </div>

              {/* Fun Facts */}
              <div className="card-luxury animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-luxury-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-luxury-black">Fun Facts</h3>
                </div>
                <div className="prose prose-sm max-w-none">
                  <div className="text-luxury-black font-inter leading-relaxed whitespace-pre-wrap">
                    {funfacts.narrative || funfacts.lines?.join('\n') || 'Belum ada fun facts tersedia untuk room ini.'}
                  </div>
                </div>
              </div>

              {/* Share Winner */}
              {lastWinner && (
                <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                  <ShareCard 
                    room={state.room} 
                    winner={lastWinner} 
                    onShared={() => setShowShareModal(false)} 
                  />
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Participants */}
              <div className="card-luxury animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-luxury-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-luxury-black">Peserta</h3>
                  <span className="text-sm text-luxury-gray font-inter">({state.participants.length})</span>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {state.participants.map((participant, index) => (
                    <div 
                      key={participant.id} 
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        participant.hasWon 
                          ? 'bg-emerald-50 border border-emerald-200' 
                          : 'bg-luxury-white/50 hover:bg-luxury-white/70 border border-luxury-white/20'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        participant.hasWon 
                          ? 'bg-emerald-500' 
                          : participant.id === user?.id 
                            ? 'bg-luxury-gold' 
                            : 'bg-luxury-gray'
                      }`}>
                        {participant.hasWon ? '🏆' : (participant.name?.charAt(0).toUpperCase() || '?')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium font-inter truncate ${
                          participant.hasWon ? 'text-emerald-700 line-through' : 'text-luxury-black'
                        }`}>
                          {participant.name}
                          {participant.id === user?.id && ' (Anda)'}
                          {participant.id === state.room.adminId && ' 👑'}
                        </p>
                        <p className="text-xs text-luxury-gray font-inter">
                          {participant.hasWon ? 'Sudah menang' : 'Belum menang'}
                        </p>
                      </div>
                      {participant.hasWon && (
                        <div className="text-emerald-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Winners History */}
              <div className="card-luxury animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-luxury-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-luxury-black">Riwayat Pemenang</h3>
                  <span className="text-sm text-luxury-gray font-inter">({state.winners?.length || 0})</span>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {state.winners && state.winners.length > 0 ? (
                    state.winners.map((winner, index) => (
                      <div 
                        key={winner.id} 
                        className="flex items-center space-x-3 p-3 bg-luxury-white/50 hover:bg-luxury-white/70 rounded-lg transition-all duration-200 border border-luxury-white/20"
                      >
                        <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center text-luxury-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium font-inter text-luxury-black truncate">{winner.name}</p>
                          <p className="text-xs text-luxury-gray font-inter">
                            {new Date(winner.at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="text-luxury-gold">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-luxury-gray">
                      <svg className="w-12 h-12 mx-auto mb-3 text-luxury-gray/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5-1.709M15 3H6a2 2 0 00-2 2v14a2 2 0 002 2h8M15 3l4 4v8a2 2 0 01-2 2h-1M15 3v4a1 1 0 001 1h3" />
                      </svg>
                      <p className="font-inter">Belum ada pemenang</p>
                      <p className="text-xs font-inter mt-1">Undian pertama akan segera dimulai</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
