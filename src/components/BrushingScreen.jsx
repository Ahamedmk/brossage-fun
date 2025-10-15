import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import ZoneIndicator from './ZoneIndicator'
import zoneSound from '../assets/zone-sound.mp3'
import natureMusic from '../assets/nature-music.mp3'
import { useEffect, useRef, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'


// ✅ 5 zones avec le devant des dents
const ZONES = ['Haut Gauche', 'Haut Droite', 'Devant', 'Bas Gauche', 'Bas Droite']


function BrushingScreen({ onExit, totalTime = 120, zoneDuration = 30 }) {
const [zoneIndex, setZoneIndex] = useState(0)
const [finished, setFinished] = useState(false)
const [key, setKey] = useState(0)
const [muted, setMuted] = useState(false) // sons de changement de zone
const [musicOn, setMusicOn] = useState(true) // musique de fond nature


const musicRef = useRef(null)
const { width, height } = useWindowSize()


// Préparer l'audio de fond
useEffect(() => {
if (!musicRef.current) {
musicRef.current = new Audio(natureMusic)
musicRef.current.loop = true
musicRef.current.volume = 0.35
}


// jouer/pause selon l'état
const audio = musicRef.current
if (musicOn && !finished) {
audio.play().catch(() => {})
} else {
audio.pause()
}


// pause et reset à la sortie composant
return () => {
audio.pause()
audio.currentTime = 0
}
}, [musicOn, finished])

// Pré-charger le son de changement de zone
useEffect(() => {
const audio = new Audio(zoneSound)
audio.load()
}, [])


const handleTimeUpdate = (remainingTime) => {
const currentZone = Math.floor((totalTime - remainingTime) / zoneDuration)
const nextIndex = Math.min(currentZone, ZONES.length - 1)


if (nextIndex !== zoneIndex) {
setZoneIndex(nextIndex)
if (!muted) {
const audio = new Audio(zoneSound)
audio.volume = 0.7
audio.play().catch(() => {})
}
if (navigator.vibrate) navigator.vibrate(80)
}
}


const handleRestart = () => {
setZoneIndex(0)
setFinished(false)
setKey((prev) => prev + 1)
// relancer la musique si activée
if (musicRef.current && musicOn) {
musicRef.current.currentTime = 0
musicRef.current.play().catch(() => {})
}
}


const handleExit = () => {
// s'assurer d'arrêter la musique
if (musicRef.current) {
musicRef.current.pause()
musicRef.current.currentTime = 0
}
onExit?.()
}


return (
<div className="relative min-h-screen w-screen p-4 flex flex-col">
{finished && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />}


{/* Top Bar */}
<div className="flex items-center justify-between mb-4">
<button
onClick={handleExit}
className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white text-blue-700 font-medium shadow border border-white/60"
>
Accueil
</button>
<div className="flex items-center gap-2">
{/* Toggle musique */}
<button
onClick={() => setMusicOn((m) => !m)}
aria-pressed={musicOn}
className={`px-3 py-2 rounded-xl font-medium shadow border border-white/60 bg-white/70 hover:bg-white ${
musicOn ? 'text-green-700' : 'text-slate-600'
}`}
title={musicOn ? 'Couper la musique' : 'Activer la musique'}
>
{musicOn ? '🎵 Musique' : '🔇 Musique'}
</button>


{/* Toggle bip zone */}
<button
onClick={() => setMuted((m) => !m)}
aria-pressed={muted}
className={`px-3 py-2 rounded-xl font-medium shadow border border-white/60 bg-white/70 hover:bg-white ${
muted ? 'text-slate-600' : 'text-blue-700'
}`}
title={muted ? 'Activer le son' : 'Couper le son'}
>
{muted ? '🔇 Bip' : '🔊 Bip'}
</button>
</div>
</div>


{/* Centre */}
<div className="flex-1 flex flex-col items-center justify-center gap-6">
<div className="mt-2" aria-live="polite">
<CountdownCircleTimer
key={key}
isPlaying={!finished}
duration={totalTime}
colors="#2563eb"
trailColor="#e2e8f0"
strokeWidth={12}
size={150}
onUpdate={handleTimeUpdate}
onComplete={() => {
setFinished(true)
return { shouldRepeat: false }
}}
>
{({ remainingTime }) => (
remainingTime > 0 ? (
<div className="text-xl md:text-2xl font-bold text-blue-700 tabular-nums">
{Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
</div>
) : (
<div className="text-2xl font-bold text-green-600">Bravo ! 🎉</div>
)
)}
</CountdownCircleTimer>
</div>
{/* Dots de progression : 5 zones */}
<div className="flex items-center gap-3">
{[0, 1, 2, 3, 4].map((i) => (
<span key={i} className={`h-3 w-3 rounded-full ${i <= zoneIndex ? 'bg-blue-600' : 'bg-slate-300'}`} />)
)}
</div>


{!finished && <ZoneIndicator activeZone={ZONES[zoneIndex]} />}
</div>


{/* Bas */}
<div className="mt-6 flex items-center justify-center">
{finished ? (
<div className="flex gap-3">
<button onClick={handleRestart} className="bg-blue-600 hover:bg-blue-700 text-blue-700 px-6 py-3 rounded-2xl shadow-md text-lg transition">
Rejouer
</button>
<button onClick={handleExit} className="bg-white/80 hover:bg-white text-blue-700 px-6 py-3 rounded-2xl shadow-md text-lg transition border border-white/60">
Accueil
</button>
</div>
) : (
<p className="text-sm text-slate-600">5 zones — {zoneDuration}s par zone — Durée totale : {totalTime}s</p>
)}
</div>
</div>
)
}


export default BrushingScreen