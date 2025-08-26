import React, { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router'

export function JoinRoomModal({ isOpen, onClose, room, onSuccess }) {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleJoin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/rooms/${room.id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ pin })
      })

      const result = await response.json()

      if (response.ok) {
        onSuccess?.(result)
        onClose()
        // Navigate directly to the room after successful join
        navigate(`/rooms/${room.id}`)
      } else {
        setError(result.message || 'Failed to join room')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !room) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Join Room</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900">{room.name}</h3>
            <div className="text-sm text-gray-600 mt-1">
              <p>Capacity: {room.capacity} participants</p>
              <p>Dues: Rp {room.dues?.toLocaleString()}</p>
              <p>Frequency: {room.drawFrequencyValue} {room.drawFrequencyUnit}</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room PIN {room.hasPin ? '*' : '(if required)'}
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter room PIN"
                required={room.hasPin}
              />
              {room.hasPin && (
                <p className="text-xs text-red-600 mt-1">
                  This room requires a PIN to join.
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? 'Joining...' : 'Join Room'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
