import React from 'react'
import { createSocket } from '../services/socket'
import { useAuth } from './AuthContext.jsx'

const SocketCtx = React.createContext(null)

export function SocketProvider({ children }){
  const { token } = useAuth()
  const [socket, setSocket] = React.useState(null)

  React.useEffect(() => {
    if(!token) { 
      if(socket) {
        console.log('Disconnecting socket - no token')
        socket.disconnect()
      }
      setSocket(null)
      return 
    }
    
    console.log('Creating socket with token:', token ? 'present' : 'missing')
    const s = createSocket(token)
    
    s.on('connect', () => {
      console.log('Socket connected successfully')
    })
    
    s.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
    })
    
    s.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
    })
    
    s.connect()
    setSocket(s)
    
    return () => {
      console.log('Cleaning up socket connection')
      s.disconnect()
    }
  }, [token])

  return <SocketCtx.Provider value={{ socket }}>{children}</SocketCtx.Provider>
}
export function useSocket(){ return React.useContext(SocketCtx) }
