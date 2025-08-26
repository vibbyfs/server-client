import React from 'react'
import http from '../../services/http'

export default function useRooms(){
  const [rooms, setRooms] = React.useState([])
  const [filters, setFilters] = React.useState({ status: '', freqUnit: '', sort: 'createdAt', order: 'desc' })
  const [loading, setLoading] = React.useState(false)

  async function load(){
    setLoading(true)
    try{
      const params = {}
      if(filters.status) params.status = filters.status
      if(filters.freqUnit) params.freqUnit = filters.freqUnit
      if(filters.sort) params.sort = filters.sort
      if(filters.order) params.order = filters.order
      const { data } = await http.get('/rooms', { params })
      setRooms(data)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => { load() }, [filters.status, filters.freqUnit, filters.sort, filters.order])

  return { rooms, filters, setFilters, reload: load, loading }
}
