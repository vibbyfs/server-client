import React from 'react'
import http from '../services/http'

const AuthCtx = React.createContext(null)
export function AuthProvider({ children }){
  const [token, setToken] = React.useState(localStorage.getItem('arisan.token'))
  const [user, setUser] = React.useState(() => {
    const raw = localStorage.getItem('arisan.user')
    return raw ? JSON.parse(raw) : null
  })

  async function login(email, password){
    const { data } = await http.post('/login', { email, password })
    localStorage.setItem('arisan.token', data.access_token)
    localStorage.setItem('arisan.user', JSON.stringify(data.user))
    setToken(data.access_token); setUser(data.user)
    return true
  }
  async function register(name, email, password){
    await http.post('/register', { name, email, password })
    return login(email, password)
  }
  function logout(){
    localStorage.removeItem('arisan.token')
    localStorage.removeItem('arisan.user')
    setToken(null); setUser(null)
  }

  return <AuthCtx.Provider value={{ token, user, login, register, logout }}>{children}</AuthCtx.Provider>
}
export function useAuth(){ return React.useContext(AuthCtx) }
