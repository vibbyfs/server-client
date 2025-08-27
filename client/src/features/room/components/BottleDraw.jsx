import React from 'react'

export default function BottleDraw({ startSignal, winnerName }){
  const [phase, setPhase] = React.useState('idle') // idle|spinning|slowing|reveal|celebration
  const [rotation, setRotation] = React.useState(0)
  const [showConfetti, setShowConfetti] = React.useState(false)

  // Debug logs
  React.useEffect(() => {
    console.log('BottleDraw props:', { startSignal, winnerName, phase });
  }, [startSignal, winnerName, phase]);

  React.useEffect(() => {
    if(startSignal && phase === 'idle'){
      console.log('Starting animation...');
      setPhase('spinning')
      setRotation(0)

      // Fast spinning phase
      const fastSpin = setInterval(() => {
        setRotation(prev => prev + 45)
      }, 50)

      // Slow down after 2 seconds
      setTimeout(() => {
        clearInterval(fastSpin)
        setPhase('slowing')

        // Gradual slowdown
        const slowSpin = setInterval(() => {
          setRotation(prev => {
            const newRotation = prev + Math.max(5, (360 - (prev % 360)) * 0.1)
            if (newRotation >= 360 * 3) { // Stop after 3 full rotations
              clearInterval(slowSpin)
              setPhase('reveal')
              return 360 * 3
            }
            return newRotation
          })
        }, 100)
      }, 2000)
    }
  }, [startSignal])

  React.useEffect(() => {
    // Immediately show winner if available during reveal phase
    if(winnerName && (phase === 'reveal' || phase === 'slowing')){
      console.log('BottleDraw: Winner revealed:', winnerName); // Debug log
      setPhase('celebration')
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [winnerName, phase])

  // Reset phase when startSignal becomes false
  React.useEffect(() => {
    if (!startSignal && phase !== 'idle') {
      setTimeout(() => {
        setPhase('idle')
        setRotation(0)
      }, 5000) // Give time for celebration
    }
  }, [startSignal, phase])

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r from-luxury-gold to-yellow-400 rounded-full animate-[confetti_3s_ease-out_forwards]`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Bottle Container */}
      <div className="relative">
        <div
          className={`w-48 h-48 rounded-full bg-gradient-to-br from-luxury-gold/20 via-luxury-white/50 to-luxury-gold/20 border-2 border-luxury-gold/30 flex items-center justify-center shadow-2xl backdrop-blur-sm transition-all duration-500 ${
            phase === 'spinning' ? 'scale-110 shadow-luxury' :
            phase === 'slowing' ? 'scale-105' :
            phase === 'celebration' ? 'scale-110 animate-pulse' : ''
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: phase === 'slowing' ? 'transform 0.5s ease-out' : 'none'
          }}
        >
          {/* Bottle */}
          <div className={`relative transition-transform duration-300 ${
            phase === 'spinning' ? 'scale-110' :
            phase === 'celebration' ? 'scale-125 animate-bounce' : ''
          }`}>
            {/* Bottle Neck */}
            <div className="w-6 h-16 bg-gradient-to-b from-luxury-black to-luxury-gray-300 rounded-t-full mx-auto shadow-lg" />

            {/* Bottle Body */}
            <div className="w-20 h-28 bg-gradient-to-br from-luxury-gold/80 via-luxury-gold to-luxury-gold/60 rounded-b-3xl mx-auto mt-1 shadow-inner relative overflow-hidden">
              {/* Bottle Label */}
              <div className="absolute inset-2 bg-gradient-to-r from-luxury-white/20 to-transparent rounded-2xl border border-luxury-white/30 flex items-center justify-center">
                <span className="text-xs font-bold text-luxury-black transform -rotate-12">ARISAN</span>
              </div>

              {/* Shimmer Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-luxury-white/20 to-transparent transform -skew-x-12 ${
                phase === 'spinning' || phase === 'celebration' ? 'animate-[shimmer_1s_ease-in-out_infinite]' : ''
              }`} />
            </div>
          </div>

          {/* Glow Effect */}
          <div className={`absolute inset-0 rounded-full bg-luxury-gold/10 blur-xl transition-opacity duration-500 ${
            phase === 'spinning' || phase === 'celebration' ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>

        {/* Spinning Indicator */}
        {(phase === 'spinning' || phase === 'slowing') && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Winner Reveal */}
      <div className={`mt-8 text-center transition-all duration-1000 ${
        winnerName && (phase==='reveal' || phase==='celebration') ?
        'opacity-100 transform translate-y-0 scale-100' :
        'opacity-0 transform translate-y-4 scale-95'
      }`}>
        <div className={`inline-block p-6 rounded-2xl bg-gradient-to-r from-luxury-gold/10 to-luxury-white/20 border border-luxury-gold/20 shadow-lg backdrop-blur-sm ${
          phase === 'celebration' ? 'animate-[winnerGlow_2s_ease-in-out_infinite]' : ''
        }`}>
          <div className="text-2xl mb-2">🎉</div>
          <div className="text-xl font-bold text-luxury-black mb-1">PEMENANG</div>
          <div className={`text-2xl font-extrabold bg-gradient-to-r from-luxury-gold to-yellow-500 bg-clip-text text-transparent transition-all duration-500 ${
            phase === 'celebration' ? 'animate-pulse scale-110' : ''
          }`}>
            {winnerName}
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="mt-4 text-center">
        {phase === 'spinning' && (
          <p className="text-luxury-gray font-medium animate-pulse">Memutar botol...</p>
        )}
        {phase === 'slowing' && (
          <p className="text-luxury-gray font-medium animate-pulse">Melambat...</p>
        )}
        {phase === 'reveal' && (
          <div className="space-y-2">
            <p className="text-luxury-gold font-semibold animate-bounce">Mengungkap pemenang...</p>
            {winnerName && (
              <p className="text-2xl font-bold text-luxury-black">🏆 {winnerName} 🏆</p>
            )}
          </div>
        )}
        {phase === 'celebration' && (
          <div className="space-y-2">
            <p className="text-luxury-gold font-bold animate-pulse">🎊 Selamat! 🎊</p>
            {winnerName && (
              <p className="text-2xl font-bold text-luxury-black">{winnerName}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
