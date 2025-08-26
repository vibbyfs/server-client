import { io } from 'socket.io-client'

export function createSocket(token){
  const url = (import.meta.env.VITE_SERVER_ORIGIN || 'http://localhost:3000')
  const socket = io(url, {
    transports: ['websocket'],
    autoConnect: false,
    auth: { token }
  })
  return socket
}
