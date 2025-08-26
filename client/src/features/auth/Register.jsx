import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function Register() {
  const [form, setForm] = React.useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const { register, user } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/rooms')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      setError('Semua field harus diisi')
      return
    }
    if (form.password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }

    setLoading(true)
    setError('')
    try {
      await register(form.name, form.email, form.password)
      navigate('/rooms')
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center px-4 font-['Poppins']">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Daftar ArisanKu</h1>
          <p className="text-purple-200 font-['Roboto']">Bergabung dengan komunitas arisan digital</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="contoh@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Minimal 6 karakter"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 font-['Roboto']">
              Sudah punya akun?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-purple-700 font-semibold hover:text-purple-800 transition-colors duration-200"
              >
                Login di sini
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 text-sm hover:text-gray-700 transition-colors duration-200"
            >
              ← Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
