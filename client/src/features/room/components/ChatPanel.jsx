import React from 'react'
import http from '../../../services/http'
import { useSocket } from '../../../contexts/SocketContext.jsx'

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
    function onMessage(msg){
      setItems(list => [...list, msg])
      scrollToBottom()
    }
    function onTyping({ userId }){
      setTyping(userId)
      setTimeout(()=>setTyping(null), 1500)
    }
    socket.on('chat:message', onMessage)
    socket.on('chat:typing', onTyping)
    return () => { socket.off('chat:message', onMessage); socket.off('chat:typing', onTyping) }
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
    socket.emit('chat:send', { roomId: Number(roomId), message: text })
    setContent('')
  }

  function isAICommand(text) {
    return text.startsWith('/ai ') || text.includes('@bot')
  }

  return (
    <div className="bg-white rounded-2xl shadow flex flex-col h-[420px]">
      <div className="p-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
        <h3 className="font-semibold text-gray-800">Chat Room</h3>
        <div className="text-xs text-gray-600 mt-1">
          💡 Ketik <span className="font-mono bg-gray-200 px-1 rounded">/ai [pertanyaan]</span> atau <span className="font-mono bg-gray-200 px-1 rounded">@bot</span> untuk bertanya ke AI
        </div>
      </div>
      
      <div id="chat-scroll" className="flex-1 overflow-y-auto p-3 space-y-3">
        {items.map(m => (
          <div key={m.id} className={`flex ${m.isSystemMessage ? 'justify-center' : m.userId === 'system' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] ${
              m.isSystemMessage 
                ? 'bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200' 
                : m.userId === 'system' 
                  ? 'bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200' 
                  : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white'
            } px-4 py-2 rounded-xl`}>
              <div className={`text-xs opacity-70 mb-1 font-medium ${
                m.isSystemMessage || m.userId === 'system' ? 'text-gray-700' : 'text-gray-200'
              }`}>
                {m.userName || 'System'}
              </div>
              <div className={`text-sm whitespace-pre-wrap ${
                m.isSystemMessage || m.userId === 'system' ? 'text-gray-800' : 'text-white'
              }`}>
                {m.message}
              </div>
            </div>
          </div>
        ))}
        {typing && <div className="text-xs text-slate-500 text-center">Seseorang sedang mengetik…</div>}
      </div>
      
      <div className="p-3 border-t bg-gray-50 rounded-b-2xl">
        <div className="flex items-center gap-2">
          <input 
            value={content} 
            onChange={e=>setContent(e.target.value)} 
            onKeyDown={e=>{ 
              if(e.key==='Enter') send(); 
              else socket.emit('chat:typing', { roomId: Number(roomId) }) 
            }} 
            placeholder={canSend ? 'Tulis pesan atau /ai [pertanyaan]…' : 'Penonton read-only'} 
            disabled={!canSend} 
            className={`flex-1 px-3 py-2 rounded-lg border transition-all duration-200 ${
              isAICommand(content) 
                ? 'border-blue-300 bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
            } focus:outline-none`}
          />
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isAICommand(content)
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={send} 
            disabled={!canSend}
          >
            {isAICommand(content) ? '🤖 AI' : 'Kirim'}
          </button>
        </div>
      </div>
    </div>
  )
}
