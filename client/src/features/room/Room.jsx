import React from 'react'
import { useParams } from 'react-router'
import useRoom from './useRoom.js'
import BottleDraw from './components/BottleDraw.jsx'
import ReactionLayer, { QuickReactions } from './components/ReactionLayer.jsx'
import ShareCard from './components/ShareCard.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function Room(){
  const { id } = useParams()
  const { state, funfacts, joinedMode, joinAsParticipant, viewAsSpectator, startDraw, sendReaction } = useRoom(id)
  const [shake, setShake] = React.useState(false)
  const [lastWinner, setLastWinner] = React.useState(null)
  const { user } = useAuth()

  React.useEffect(() => {
    let off
    // subscribe draw events via window since sockets handled in hook - minimal UI toggles
    return () => { if(off) off() }
  }, [])

  React.useEffect(() => {
    // naive: winner is last item in winners list
    if(state.winners && state.winners.length){
      setLastWinner(state.winners[state.winners.length-1])
    }
  }, [state.winners])

  if(!state.room){
    return (
      <div className="text-center text-slate-600">Memuat room…
        <div className="mt-4 flex gap-2 justify-center">
          <button onClick={joinAsParticipant} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Gabung sebagai Peserta</button>
          <button onClick={viewAsSpectator} className="px-3 py-2 rounded-lg bg-slate-700 text-white text-sm">Masuk sebagai Penonton</button>
        </div>
      </div>
    )
  }

  const isHost = state.room.adminId === user?.id
  const canSendChat = joinedMode === 'participant'

  return (
    <div className="relative space-y-4">
      <ReactionLayer roomId={id} />

      <div className="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
        <div>
          <div className="font-semibold text-slate-800">{state.room.name}</div>
          <div className="text-sm text-slate-600">Peserta {state.participants.length}/{state.room.capacity} • Status {state.room.status}</div>
        </div>
        <div className="flex items-center gap-2">
          {joinedMode !== 'participant' && <button onClick={joinAsParticipant} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Gabung Peserta</button>}
          {joinedMode !== 'spectator' && <button onClick={viewAsSpectator} className="px-3 py-2 rounded-lg bg-slate-700 text-white text-sm">Masuk Penonton</button>}
          {isHost && <button onClick={()=>{ setShake(true); setTimeout(()=>setShake(false), 3000); startDraw(); }} className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm">Kocok</button>}
          <QuickReactions onSend={sendReaction} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="font-semibold text-slate-800 mb-3">Animasi</div>
          <BottleDraw startSignal={shake} winnerName={lastWinner?.name} />
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="font-semibold text-slate-800 mb-2">Fun Facts</div>
          <div className="text-sm text-slate-700 whitespace-pre-wrap">{funfacts.narrative || funfacts.lines?.join('\n')}</div>
        </div>
      </div>

      {lastWinner && (
        <ShareCard room={state.room} winner={lastWinner} onShared={()=>{}} />
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="font-semibold text-slate-800 mb-2">Peserta</div>
          <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
            {state.participants.map(p => (
              <li key={p.id} className={p.hasWon?'line-through':''}>{p.name}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <div className="font-semibold text-slate-800 mb-2">Riwayat Pemenang</div>
          <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
            {state.winners.map(w => (
              <li key={w.id}>{w.name} <span className="text-xs text-slate-500">({new Date(w.at).toLocaleString('id-ID')})</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <React.Suspense fallback={<div>Loading chat...</div>}>
          <ChatPanel roomId={id} canSend={canSendChat} />
        </React.Suspense>
      </div>
    </div>
  )
}

// Lazy load ChatPanel component
const ChatPanel = React.lazy(() => import('./components/ChatPanel.jsx'))
