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
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4 backdrop-blur-lg">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-gray-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold heading-primary text-black">Join Room</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black text-3xl font-light transition-colors cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="card-luxury p-6 mb-6 bg-gray-50/50">
            <h3 className="font-semibold heading-secondary text-black text-lg mb-3">{room.name}</h3>
            <div className="space-y-2 text-sm text-luxury">
              <div className="flex justify-between">
                <span className="font-medium">Capacity:</span>
                <span className="text-black">{room.capacity} participants</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Dues:</span>
                <span className="text-black">Rp {room.dues?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Frequency:</span>
                <span className="text-black">{room.drawFrequencyValue} {room.drawFrequencyUnit}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-3">
                Room PIN {room.hasPin ? <span className="text-red-500">*</span> : <span className="text-luxury">(if required)</span>}
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="input-luxury rounded-lg"
                placeholder="Enter room PIN"
                required={room.hasPin}
              />
              {room.hasPin && (
                <p className="text-xs text-red-600 mt-2 font-medium">
                  This room requires a PIN to join.
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-luxury-secondary flex-1 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-luxury-primary flex-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
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
