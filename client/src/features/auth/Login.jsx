import React from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router'

export default function Login(){
  const { login, register } = useAuth()
  const [mode, setMode] = React.useState('login')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const navigate = useNavigate()

  async function onSubmit(e){
    e.preventDefault()
    setError(''); setLoading(true)
    try{
      if(mode === 'login'){
        await login(email, password)
      }else{
        await register(name, email, password)
      }
      navigate('/')
    }catch(err){
      console.error(err)
      setError('Gagal. Periksa data kamu.')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
      <div className="flex gap-2 mb-4">
        <button className={`px-3 py-1 rounded-lg ${mode==='login'?'bg-slate-900 text-white':'bg-slate-100 text-slate-700'}`} onClick={()=>setMode('login')}>Login</button>
        <button className={`px-3 py-1 rounded-lg ${mode==='register'?'bg-slate-900 text-white':'bg-slate-100 text-slate-700'}`} onClick={()=>setMode('register')}>Register</button>
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        {mode==='register' && (
          <div>
            <label className="text-sm text-slate-600">Nama</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border" required />
          </div>
        )}
        <div>
          <label className="text-sm text-slate-600">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full mt-1 px-3 py-2 rounded-lg border" required />
        </div>
        <div>
          <label className="text-sm text-slate-600">Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full mt-1 px-3 py-2 rounded-lg border" required minLength={6} />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button disabled={loading} className="w-full py-2 rounded-lg bg-slate-900 text-white">{loading?'...' : mode==='login'?'Masuk':'Daftar'}</button>
      </form>
    </div>
  )
}
