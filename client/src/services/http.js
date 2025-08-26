import axios from 'axios'

const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api'

const http = axios.create({
  baseURL: apiBase,
  withCredentials: false,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('arisan.token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default http
