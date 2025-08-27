import React from 'react'
import { useSocket } from '../../contexts/SocketContext.jsx'
import http from '../../services/http'

export default function useRoom(roomId){
  const { socket } = useSocket()
  const [state, setState] = React.useState({ room: null, participants: [], winners: [], reactionStats: [] })
  const [funfacts, setFunfacts] = React.useState({ narrative: '', lines: [] })
  const [joinedMode, setJoinedMode] = React.useState(null) // 'participant' | 'spectator'
  const [isDrawing, setIsDrawing] = React.useState(false) // Add drawing state
  const [latestWinner, setLatestWinner] = React.useState(null) // Track latest winner from draw result

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
    function onDrawBegin(){ 
      setIsDrawing(true)
      setTimeout(() => setIsDrawing(false), 3000) // Auto reset after 3 seconds
    }
    function onDrawResult(data) {
      console.log('useRoom: Draw result received:', data); // Debug log
      setIsDrawing(false) // Ensure drawing state is reset
      if (data.winner) {
        console.log('useRoom: Setting latest winner:', data.winner); // Debug log
        setLatestWinner(data.winner) // Store the latest winner immediately
      }
      fetchFunfacts() // refresh facts after draw
    }
    function onError(error) {
      console.error('Socket error:', error); // Debug log
      console.error('Error details:', {
        message: error?.message || 'Unknown error',
        type: typeof error,
        full: error
      });
      setIsDrawing(false) // Reset drawing state on error
      
      // Show user-friendly error message
      const errorMsg = error?.message || 'Connection error occurred';
      alert(`Error: ${errorMsg}`); // Temporary alert for debugging
    }
    socket.on('room:state', onState)
    socket.on('draw:begin', onDrawBegin)
    socket.on('draw:result', onDrawResult)
    socket.on('error', onError)

    return () => {
      socket.off('room:state', onState)
      socket.off('draw:begin', onDrawBegin)
      socket.off('draw:result', onDrawResult)
      socket.off('error', onError)
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
  function startDraw(){ 
    console.log('useRoom: Starting draw for room:', roomId); // Debug log
    socket.emit('draw:start', { roomId: Number(roomId) }) 
  }
  function resetRoom(){
    console.log('useRoom: Resetting room:', roomId); // Debug log
    socket.emit('room:reset', { roomId: Number(roomId) })
    setLatestWinner(null) // Clear latest winner
  }
  function sendReaction(emoji){ socket.emit('reaction:send', { roomId: Number(roomId), emoji }) }

  return { state, funfacts, joinedMode, isDrawing, latestWinner, joinAsParticipant, viewAsSpectator, startDraw, resetRoom, sendReaction }
}
