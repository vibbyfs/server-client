import React from 'react'
import { createSocket } from '../services/socket'
import { useAuth } from './AuthContext.jsx'

const SocketCtx = React.createContext(null)

export function SocketProvider({ children }){
  const { token } = useAuth()
  const [socket, setSocket] = React.useState(null)

  React.useEffect(() => {
    if(!token) { if(socket) socket.disconnect(); setSocket(null); return }
    const s = createSocket(token)
    s.connect()
    setSocket(s)
    return () => s.disconnect()
  }, [token])

  return <SocketCtx.Provider value={{ socket }}>{children}</SocketCtx.Provider>
}
export function useSocket(){ return React.useContext(SocketCtx) }
