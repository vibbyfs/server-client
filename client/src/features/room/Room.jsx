import React from 'react';
import { useParams, Link } from 'react-router';
import useRoom from './useRoom.js';
import BottleDraw from './components/BottleDraw.jsx';
import ReactionLayer, { QuickReactions } from './components/ReactionLayer.jsx';
import ShareCard from './components/ShareCard.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import FinancialInsights from '../../components/FinancialInsights.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';

export default function Room() {
  const { id } = useParams();
  const { state, funfacts, joinedMode, isDrawing, latestWinner, viewAsSpectator, startDraw, resetRoom, sendReaction } = useRoom(id);
  const [lastWinner, setLastWinner] = React.useState(null);
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [showFinancialInsights, setShowFinancialInsights] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    let off;
    // subscribe draw events via window since sockets handled in hook - minimal UI toggles
    return () => { if(off) off(); };
  }, []);

  React.useEffect(() => {
    // Use latestWinner from useRoom hook if available, otherwise use last from winners list
    console.log('Room: Latest winner updated:', latestWinner); // Debug log
    console.log('Room: Winners list:', state.winners); // Debug log
    if (latestWinner) {
      console.log('Room: Setting lastWinner from latestWinner:', latestWinner); // Debug log
      setLastWinner(latestWinner);
    } else if (state.winners && state.winners.length) {
      console.log('Room: Setting lastWinner from winners list:', state.winners[state.winners.length-1]); // Debug log
      setLastWinner(state.winners[state.winners.length-1]);
    }
  }, [latestWinner, state.winners]);

  if(!state.room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <Navbar />
        <div className="relative z-10 pt-20 flex items-center justify-center min-h-screen px-4 lg:px-8">
          <div className="text-center animate-fadeInUp p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mx-auto mb-6 flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Memuat Room 🎯</h3>
            <p className="text-blue-100">Sedang mengambil data arisan...</p>
          </div>
        </div>
      </div>
    );
  }

  const isHost = state.room.adminId === user?.id;
  const totalFund = state.room.dues * state.room.capacity;
  const progressPercentage = state.winners ? (state.winners.length / state.room.capacity) * 100 : 0;

  const getRoleInfo = () => {
    if (isHost) return { text: 'Admin', color: 'text-yellow-400', bgColor: 'bg-yellow-400/20 border border-yellow-400/30', icon: '👑' };
    if (joinedMode === 'participant') return { text: 'Peserta', color: 'text-white', bgColor: 'bg-white/20 border border-white/20', icon: '👤' };
    if (joinedMode === 'spectator') return { text: 'Penonton', color: 'text-blue-200', bgColor: 'bg-blue-200/20 border border-blue-200/30', icon: '👁️' };
    return { text: 'Visitor', color: 'text-blue-200', bgColor: 'bg-blue-200/10 border border-blue-200/20', icon: '🔍' };
  };

  const roleInfo = getRoleInfo();

  const handleDrawStart = () => {
    startDraw();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <Navbar />
      <ReactionLayer roomId={id} />
      
      <div className="relative z-10 pt-20 pb-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 p-4 animate-fadeInUp">
            <Link 
              to="/rooms" 
              className="inline-flex items-center text-blue-100 hover:text-yellow-400 transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Dashboard
            </Link>
          </div>

          {/* Room Header */}
          <div className="glass-card p-6 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-6">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white truncate">{state.room.name}</h1>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${roleInfo.bgColor} ${roleInfo.color}`}>
                    {roleInfo.icon} {roleInfo.text}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className="text-blue-200 text-sm block mb-1">Peserta Status</span>
                    <div className="font-bold text-white text-lg">
                      {state.participants.length}/{state.room.capacity}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className="text-blue-200 text-sm block mb-1">Iuran</span>
                    <div className="font-bold text-white text-lg">
                      💰 Rp {state.room.dues?.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className="text-blue-200 text-sm block mb-1">Total</span>
                    <div className="font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-lg">
                      Dana
                    </div>
                    <div className="font-bold text-white text-lg">
                      Rp {totalFund?.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className={`font-bold text-lg ${
                      state.room.status === 'waiting' ? 'text-yellow-400' :
                      state.room.status === 'ongoing' ? 'text-green-400' :
                      'text-blue-400'
                    }`}>
                      {state.room.status === 'waiting' && '⏳ Menunggu'}
                      {state.room.status === 'ongoing' && '🚀 Berjalan'}
                      {state.room.status === 'completed' && '✅ Selesai'}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between text-sm text-blue-200 mb-3">
                    <span className="font-medium">Progress Arisan</span>
                    <span className="font-bold">{state.winners?.length || 0}/{state.room.capacity} selesai</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-700"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex items-center justify-center">
                  <QuickReactions onSend={sendReaction} />
                </div>
                
                {/* AI Financial Insights Button */}
                <button 
                  onClick={() => setShowFinancialInsights(true)}
                  className="btn-ghost flex items-center justify-center space-x-2 py-3 px-4"
                  title="AI Financial Insights"
                >
                  <span className="text-lg">🤖</span>
                  <span className="font-medium">AI Insights</span>
                </button>
                
                {isHost && state.room.status !== 'completed' && (
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleDrawStart}
                      className="btn-secondary font-bold py-3 px-6 flex items-center justify-center"
                      disabled={isDrawing || (state.participants && state.participants.length < 2)}
                      title={state.participants && state.participants.length < 2 ? 'Room must have at least 2 participants to start drawing' : 'Start the draw'}
                    >
                      {isDrawing ? (
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
                          🎲 Kocok Undian
                        </>
                      )}
                    </button>
                    {state.participants && state.participants.length < 2 && (
                      <p className="text-xs text-yellow-400 font-medium text-center">
                        Minimal 2 peserta untuk memulai pengocokan
                      </p>
                    )}
                    
                    {/* Reset Room Button (for testing) */}
                    {isHost && (
                      <button 
                        onClick={resetRoom}
                        className="btn-ghost text-xs opacity-50 hover:opacity-100 py-2 px-3 flex items-center justify-center"
                        title="Reset room for testing"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        🔄 Reset Room
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Draw Animation */}
              <div className="glass-card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">🎲 Animasi Undian</h3>
                </div>
                <div className="bg-gradient-to-br from-blue-800/30 to-purple-800/30 rounded-xl p-8 border border-white/10">
                  <BottleDraw startSignal={isDrawing} winnerName={lastWinner?.name} />
                </div>
              </div>

              {/* Fun Facts */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">💡 Fun Facts</h3>
                </div>
                <div className="prose prose-sm max-w-none">
                  <div className="text-blue-100 leading-relaxed whitespace-pre-wrap">
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
            <div className="space-y-8 p-4">
              {/* Participants */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">👥 Peserta</h3>
                  <span className="text-sm text-blue-200">({state.participants.length})</span>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {state.participants.map((participant, index) => (
                    <div 
                      key={participant.id} 
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        participant.hasWon 
                          ? 'bg-green-500/20 border border-green-400/30' 
                          : 'bg-white/10 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        participant.hasWon 
                          ? 'bg-green-500' 
                          : participant.id === user?.id 
                            ? 'bg-yellow-500' 
                            : 'bg-blue-500'
                      }`}>
                        {participant.hasWon ? '🏆' : (participant.name?.charAt(0).toUpperCase() || '?')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${
                          participant.hasWon ? 'text-green-300 line-through' : 'text-white'
                        }`}>
                          {participant.name}
                          {participant.id === user?.id && ' (Anda)'}
                          {participant.id === state.room.adminId && ' 👑'}
                        </p>
                        <p className="text-xs text-blue-200">
                          {participant.hasWon ? '✅ Sudah menang' : '⏳ Belum menang'}
                        </p>
                      </div>
                      {participant.hasWon && (
                        <div className="text-green-400">
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
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">🏆 Riwayat Pemenang</h3>
                  <span className="text-sm text-blue-200">({state.winners?.length || 0})</span>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {state.winners && state.winners.length > 0 ? (
                    state.winners.map((winner, index) => (
                      <div 
                        key={winner.id} 
                        className="flex items-center space-x-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{winner.name}</p>
                          <p className="text-xs text-blue-200">
                            {new Date(winner.at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="text-yellow-400">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-blue-200">
                      <svg className="w-12 h-12 mx-auto mb-3 text-blue-200/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5-1.709M15 3H6a2 2 0 00-2 2v14a2 2 0 002 2h8M15 3l4 4v8a2 2 0 01-2 2h-1M15 3v4a1 1 0 001 1h3" />
                      </svg>
                      <p>Belum ada pemenang</p>
                      <p className="text-xs mt-1">Undian pertama akan segera dimulai</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Panel */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                <ChatPanel 
                  roomId={id} 
                  canSend={joinedMode === 'participant' || (joinedMode === 'spectator' && state.room.allowSpectator)} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Financial Insights Modal */}
      <FinancialInsights 
        isOpen={showFinancialInsights} 
        onClose={() => setShowFinancialInsights(false)} 
      />
      
      {/* Share Modal */}
      {showShareModal && (
        <ShareCard room={state.room} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}
