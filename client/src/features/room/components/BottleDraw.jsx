import React from 'react'

export default function BottleDraw({ startSignal, winnerName }){
  const [phase, setPhase] = React.useState('idle') // idle|shaking|reveal|done

  React.useEffect(() => {
    if(startSignal){
      setPhase('shaking')
      const t = setTimeout(() => setPhase('reveal'), 2500)
      return () => clearTimeout(t)
    }
  }, [startSignal])

  React.useEffect(() => {
    if(winnerName && phase==='reveal'){
      const t = setTimeout(() => setPhase('done'), 2000)
      return () => clearTimeout(t)
    }
  }, [winnerName, phase])

  return (
    <div className="w-full flex flex-col items-center">
      <div className={`w-40 h-40 rounded-full bg-emerald-200/60 border border-emerald-300 flex items-center justify-center ${phase==='shaking'?'animate-[shake_0.2s_ease-in-out_infinite]':''}`}>
        <div className="w-10 h-24 bg-emerald-500/80 rounded-t-full rounded-b-[12px] shadow-inner" />
      </div>
      <div className={`mt-4 text-xl font-semibold text-slate-800 transition-opacity ${winnerName && (phase==='reveal' || phase==='done') ? 'opacity-100 animate-[pop_0.4s_ease]' : 'opacity-0'}`}>
        🎉 Pemenang: {winnerName}
      </div>
    </div>
  )
}
