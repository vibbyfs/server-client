import React from 'react'
import html2canvas from 'html2canvas'
import http from '../../../services/http'

const themes = {
  classic: { bg: 'bg-white', border: 'border-slate-300', accent: 'text-slate-800' },
  lebaran: { bg: 'bg-emerald-50', border: 'border-emerald-300', accent: 'text-emerald-700' },
  '17an': { bg: 'bg-red-50', border: 'border-red-300', accent: 'text-red-700' },
  newyear: { bg: 'bg-indigo-50', border: 'border-indigo-300', accent: 'text-indigo-700' }
}

export default function ShareCard({ room, winner, onShared }){
  const [theme, setTheme] = React.useState('classic')
  const ref = React.useRef(null)

  async function makeImage(){
    const node = ref.current
    const canvas = await html2canvas(node, { backgroundColor: null, scale: 2 })
    return canvas.toDataURL('image/png')
  }

  async function shareWhatsApp(){
    const url = await makeImage()
    const msg = `Pemenang arisan "${room.name}" hari ini: ${winner.name}! 🎉`
    // Web Share API jika ada
    if (navigator.canShare && navigator.canShare({ files: [] })) {
      const res = await fetch(url); const blob = await res.blob()
      const file = new File([blob], 'share.png', { type: 'image/png' })
      try { await navigator.share({ text: msg, files: [file] }) } catch {}
    } else {
      const wa = `https://wa.me/?text=${encodeURIComponent(msg)}`
      window.open(wa, '_blank')
      const a = document.createElement('a'); a.href = url; a.download = 'arisan-share.png'; a.click()
    }
    await http.post(`/winners/${winner.winnerId}/share`, { theme })
    onShared?.()
  }

  const t = themes[theme]

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-slate-800">Kartu Pemenang</div>
        <select className="border rounded-lg px-2 py-1" value={theme} onChange={e=>setTheme(e.target.value)}>
          <option value="classic">Classic</option>
          <option value="lebaran">Lebaran</option>
          <option value="17an">17-an</option>
          <option value="newyear">Tahun Baru</option>
        </select>
      </div>
      <div ref={ref} className={`w-full max-w-md mx-auto aspect-[1.91/1] ${t.bg} border ${t.border} rounded-xl flex flex-col items-center justify-center gap-2 p-4`}>
        <div className={`text-sm ${t.accent}`}>{new Date().toLocaleDateString('id-ID')}</div>
        <div className={`text-xl font-bold ${t.accent}`}>Pemenang Arisan</div>
        <div className="text-3xl font-extrabold text-slate-900">{winner.name}</div>
        <div className={`text-sm ${t.accent}`}>{room.name}</div>
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={shareWhatsApp} className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm">Bagikan</button>
      </div>
    </div>
  )
}
