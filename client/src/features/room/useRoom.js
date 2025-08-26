import React from 'react'
import { useSocket } from '../../contexts/SocketContext.jsx'
import http from '../../services/http'

export default function useRoom(roomId){
  const { socket } = useSocket()
  const [state, setState] = React.useState({ room: null, participants: [], winners: [], reactionStats: [] })
  const [funfacts, setFunfacts] = React.useState({ narrative: '', lines: [] })
  const [joinedMode, setJoinedMode] = React.useState(null) // 'participant' | 'spectator'

  React.useEffect(() => {
    if(!socket || !roomId) return
    
    // Auto-join as spectator initially to get room data
    socket.emit('room:view', { roomId: Number(roomId) })
    
    function onState(payload){ 
      setState(payload)
      // Auto-detect if user is already a participant
      const userStr = localStorage.getItem('arisan.user')
      if (userStr && payload.participants) {
        const user = JSON.parse(userStr)
        const isParticipant = payload.participants.some(p => p.userId === user.id)
        if (isParticipant && !joinedMode) {
          setJoinedMode('participant')
          socket.emit('room:join', { roomId: Number(roomId) })
        } else if (!joinedMode) {
          setJoinedMode('spectator')
        }
      }
    }
    function onDrawBegin(){ /* handled in UI via props/state if needed */ }
    socket.on('room:state', onState)
    socket.on('draw:begin', onDrawBegin)
    socket.on('draw:result', () => { fetchFunfacts() }) // refresh facts after draw

    return () => {
      socket.off('room:state', onState)
      socket.off('draw:begin', onDrawBegin)
      socket.off('draw:result', fetchFunfacts)
    }
  }, [socket, roomId, joinedMode])

  async function fetchFunfacts(){
    const { data } = await http.get(`/rooms/${roomId}/funfacts`)
    setFunfacts(data)
  }

  async function joinAsParticipant(pin = ''){
    await http.post(`/rooms/${roomId}/join`, { pin })
    // Emit room:join to get participant privileges
    socket.emit('room:join', { roomId: Number(roomId) })
    setJoinedMode('participant')
    fetchFunfacts()
  }
  async function viewAsSpectator(){
    socket.emit('room:view', { roomId: Number(roomId) })
    setJoinedMode('spectator')
    fetchFunfacts()
  }
  function startDraw(){ socket.emit('draw:start', { roomId: Number(roomId) }) }
  function sendReaction(emoji){ socket.emit('reaction:send', { roomId: Number(roomId), emoji }) }

  return { state, funfacts, joinedMode, joinAsParticipant, viewAsSpectator, startDraw, sendReaction }
}
