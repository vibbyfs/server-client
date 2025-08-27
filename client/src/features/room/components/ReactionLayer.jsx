import React from 'react'
import { useSocket } from '../../../contexts/SocketContext.jsx'

const EMOJIS = ['🔥','🎉','👏']

export default function ReactionLayer({ roomId }){
  const { socket } = useSocket()
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    if(!socket) return
    function onNew({ emoji }){
      const id = Math.random().toString(36).slice(2)
      const left = Math.random()*80 + 10
      const top = Math.random()*60 + 10
      setItems(list => [...list, { id, emoji, left, top }])
      setTimeout(() => setItems(list => list.filter(i => i.id !== id)), 1200)
    }
    socket.on('reaction:new', onNew)
    return () => socket.off('reaction:new', onNew)
  }, [socket])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {items.map(i => (
        <div key={i.id} style={{ left: `${i.left}%`, top: `${i.top}%` }} className="absolute text-4xl animate-bounce z-50">
          {i.emoji}
        </div>
      ))}
    </div>
  )
}

export function QuickReactions({ onSend }){
  return (
    <div className="flex gap-2">
      {EMOJIS.map(e => (
        <button 
          key={e} 
          className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-2xl transition-all duration-200 hover:scale-110 backdrop-blur-sm" 
          onClick={() => onSend(e)}
        >
          {e}
        </button>
      ))}
    </div>
  )
}
