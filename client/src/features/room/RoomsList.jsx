import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router'
import { CreateRoomModal } from './components/CreateRoomModal.jsx'
import { JoinRoomModal } from './components/JoinRoomModal.jsx'

export function RoomsList() {
  const { token, user } = useAuth()
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)

  const loadRooms = async () => {
    try {
      const response = await fetch('/api/rooms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setRooms(data)
      } else {
        setError('Failed to load rooms')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRooms()
  }, [token])

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
        })
        
        if (response.ok) {
          // Navigate directly to room on success
          navigate(`/rooms/${room.id}`)
          return
        }
      } catch (error) {
        console.error('Direct join failed:', error)
      }
    }
    
    // Show modal for PIN input or if direct join failed
    setSelectedRoom(room)
    setShowJoinModal(true)
  }

  const handleViewRoom = (roomId) => {
    navigate(`/rooms/${roomId}`)
  }

  const onJoinSuccess = () => {
    loadRooms() // Refresh rooms list
  }

  const onCreateSuccess = () => {
    loadRooms() // Refresh rooms list
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading rooms...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Arisan Rooms</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
            >
              + Create Room
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms available</h3>
            <p className="text-gray-600 mb-6">Create your first arisan room to get started!</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
            >
              Create Your First Room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{room.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      room.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                      room.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {room.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Capacity:</span>
                      <span>{room.participantCount || 0}/{room.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dues:</span>
                      <span>Rp {room.dues?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frequency:</span>
                      <span>{room.drawFrequencyValue} {room.drawFrequencyUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tenor:</span>
                      <span>{room.tenorRounds} rounds</span>
                    </div>
                    {room.adminId === user?.id && (
                      <div className="flex justify-between">
                        <span>Role:</span>
                        <span className="text-purple-600 font-medium">Admin</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {room.isParticipant ? (
                      <button
                        onClick={() => handleViewRoom(room.id)}
                        className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-sm font-medium"
                      >
                        Enter Room
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleJoinRoom(room)}
                          className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-sm font-medium"
                          disabled={room.participantCount >= room.capacity}
                        >
                          {room.participantCount >= room.capacity ? 'Full' : 'Join'}
                        </button>
                        {room.allowSpectator && (
                          <button
                            onClick={() => handleViewRoom(room.id)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                          >
                            View
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
  )
}
