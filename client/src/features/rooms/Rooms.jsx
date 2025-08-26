import React from 'react'
import useRooms from './useRooms.js'
import { useNavigate } from 'react-router'
import http from '../../services/http'

export default function Rooms(){
  const nav = useNavigate()
  const { rooms, filters, setFilters, reload, loading } = useRooms()

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <select className="border rounded-lg px-3 py-2" value={filters.status} onChange={e=>setFilters(f=>({...f, status: e.target.value}))}>
            <option value="">Semua Status</option>
            <option value="waiting">Waiting</option>
            <option value="ongoing">Ongoing</option>
            <option value="complete">Complete</option>
          </select>
          <select className="border rounded-lg px-3 py-2" value={filters.freqUnit} onChange={e=>setFilters(f=>({...f, freqUnit: e.target.value}))}>
            <option value="">Semua Frekuensi</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <select className="border rounded-lg px-3 py-2" value={filters.sort} onChange={e=>setFilters(f=>({...f, sort: e.target.value}))}>
            <option value="createdAt">Terbaru</option>
            <option value="dues">Iuran</option>
            <option value="capacity">Kapasitas</option>
            <option value="startAt">Mulai</option>
          </select>
          <select className="border rounded-lg px-3 py-2" value={filters.order} onChange={e=>setFilters(f=>({...f, order: e.target.value}))}>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {loading && <div>Loading...</div>}
        {!loading && rooms.map(r => (
          <div key={r.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">{r.name}</div>
                <div className="text-sm text-slate-600">{r.drawFrequencyValue} {r.drawFrequencyUnit} • Tenor {r.tenorRounds} • Iuran Rp{Number(r.dues).toLocaleString('id-ID')}</div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${r.status==='waiting'?'bg-amber-100 text-amber-700': r.status==='ongoing'?'bg-emerald-100 text-emerald-700':'bg-slate-200 text-slate-700'}`}>{r.status}</div>
            </div>
            <div className="text-sm text-slate-700">Peserta: {r.count}/{r.capacity}</div>
            <div className="flex gap-2 mt-2">
              {r.count < r.capacity ? (
                <button className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm" onClick={()=>nav(`/rooms/${r.id}`)}>Gabung</button>
              ) : (
                <button className="px-3 py-2 rounded-lg bg-slate-700 text-white text-sm" onClick={()=>nav(`/rooms/${r.id}`)}>Masuk (Penonton)</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
