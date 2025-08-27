import React, { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router'

export function CreateRoomModal({ isOpen, onClose, onSuccess }) {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    capacity: 10,
    dues: 50000,
    drawFrequencyValue: 1,
    drawFrequencyUnit: 'weekly',
    tenorRounds: 10,
    allowSpectator: true,
    pin: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
               type === 'number' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        onSuccess?.(result)
        onClose()
        navigate(`/rooms/${result.id}`)
      } else {
        setError(result.message || 'Failed to create room')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4 backdrop-blur-lg">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold heading-primary text-black">Create New Room</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black text-3xl font-light transition-colors cursor-pointer"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-3">
                Room Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-luxury rounded-lg"
                placeholder="e.g., Family Arisan 2025"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Capacity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="2"
                  max="100"
                  required
                  className="input-luxury rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Dues (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="dues"
                  value={formData.dues}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  required
                  className="input-luxury rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Draw Frequency <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="drawFrequencyValue"
                  value={formData.drawFrequencyValue}
                  onChange={handleChange}
                  min="1"
                  max="365"
                  required
                  className="input-luxury rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Frequency Unit <span className="text-red-500">*</span>
                </label>
                <select
                  name="drawFrequencyUnit"
                  value={formData.drawFrequencyUnit}
                  onChange={handleChange}
                  required
                  className="input-luxury rounded-lg"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-3">
                Tenor Rounds
              </label>
              <input
                type="number"
                name="tenorRounds"
                value={formData.tenorRounds}
                onChange={handleChange}
                min="1"
                max="1000"
                className="input-luxury rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-3">
                Room PIN <span className="text-luxury">(Optional)</span>
              </label>
              <input
                type="text"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                minLength="4"
                maxLength="20"
                className="input-luxury rounded-lg"
                placeholder="Leave empty for public room"
              />
              <p className="text-xs text-luxury mt-2 font-medium">
                Set a PIN to make this room private. Others will need this PIN to join.
              </p>
            </div>

            <div className="flex items-center p-4 bg-gray-50/50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                name="allowSpectator"
                checked={formData.allowSpectator}
                onChange={handleChange}
                className="h-5 w-5 text-black focus:ring-black border-gray-300 rounded cursor-pointer"
              />
              <label className="ml-3 block text-sm font-medium text-black cursor-pointer">
                Allow spectators to view room
              </label>
            </div>

            <div className="flex gap-6 pt-6">
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
                {loading ? 'Creating...' : 'Create Room'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
