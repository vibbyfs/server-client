import React from 'react'
import http from '../../../services/http'
import { useSocket } from '../../../contexts/SocketContext.jsx'
import { hintAITrigger } from '../../../services/ai.js'

export default function ChatPanel({ roomId, canSend }){
  const { socket } = useSocket()
  const [items, setItems] = React.useState([])
  const [cursor, setCursor] = React.useState(null)
  const [content, setContent] = React.useState('')
  const [typing, setTyping] = React.useState(null)

  React.useEffect(() => {
    load()
  }, [roomId])

  React.useEffect(() => {
    if(!socket) return
    function onNew(msg){
      setItems(list => [...list, msg])
      scrollToBottom()
    }
    function onTyping({ userId }){
      setTyping(userId)
      setTimeout(()=>setTyping(null), 1500)
    }
    socket.on('chat:new', onNew)
    socket.on('chat:typing', onTyping)
    return () => { socket.off('chat:new', onNew); socket.off('chat:typing', onTyping) }
  }, [socket])

  async function load(){
    const { data } = await http.get(`/rooms/${roomId}/messages`, { params: { cursor, limit: 30 } })
    setItems(data.messages); setCursor(data.nextCursor)
    setTimeout(scrollToBottom, 0)
  }
  function scrollToBottom(){
    const el = document.getElementById('chat-scroll')
    if(el) el.scrollTop = el.scrollHeight
  }

  function send(){
    const text = content.trim()
    if(!text) return
    socket.emit('chat:send', { roomId: Number(roomId), content: text })
    setContent('')
  }

  return (
    <div className="bg-white rounded-2xl shadow flex flex-col h-[420px]">
      <div id="chat-scroll" className="flex-1 overflow-y-auto p-3 space-y-2">
        {items.map(m => (
          <div key={m.id} className={`max-w-[80%] ${m.role==='assistant'?'ml-0':'ml-auto'}`}>
            <div className={`px-3 py-2 rounded-xl ${m.role==='assistant'?'bg-slate-100 text-slate-800':'bg-slate-900 text-white'}`}>
              <div className="text-xs opacity-70 mb-1">{m.user?.name || 'Arisan Bot'}</div>
              <div className="text-sm whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}
        {typing && <div className="text-xs text-slate-500">Seseorang sedang mengetik…</div>}
      </div>
      <div className="p-3 border-t flex items-center gap-2">
        <input value={content} onChange={e=>setContent(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); else socket.emit('chat:typing', { roomId: Number(roomId) }) }} placeholder={canSend?'Tulis pesan…':'Penonton read-only'} disabled={!canSend} className="flex-1 px-3 py-2 rounded-lg border" />
        <button className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm" onClick={()=>setContent('/ai ')} disabled={!canSend}>Tanya Bot</button>
        <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm" onClick={send} disabled={!canSend}>Kirim</button>
      </div>
    </div>
  )
}
