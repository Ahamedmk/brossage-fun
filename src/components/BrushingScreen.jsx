import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import ZoneIndicator from './ZoneIndicator'
import zoneSound from '../assets/zone-sound.mp3'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'


const ZONES = ['Haut Gauche', 'Haut Droite', 'Bas Gauche', 'Bas Droite']

function BrushingScreen({ onExit, totalTime = 120, zoneDuration = 30 }) {
const [zoneIndex, setZoneIndex] = useState(0)
const [finished, setFinished] = useState(false)
const [key, setKey] = useState(0) // redémarrage du timer
const [muted, setMuted] = useState(false)
const { width, height } = useWindowSize()

// Accessibilité : annonce douce du temps restant
useEffect(() => {
// Pré-charger le son après interaction utilisateur (clic depuis HomeScreen)
const audio = new Audio(zoneSound)
audio.load()
}, [])

const handleTimeUpdate = (remainingTime) => {
const currentZone = Math.floor((totalTime - remainingTime) / zoneDuration)
const nextIndex = Math.min(currentZone, 3)


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
}
return (
<div className="relative min-h-screen w-screen p-4 flex flex-col">
{finished && (
<Confetti width={width} height={height} recycle={false} numberOfPieces={300} />
)}


{/* Top Bar */}
<div className="flex items-center justify-between mb-4">
<button
onClick={onExit}
className="px-4 py-2 rounded-xl bg-white/70 hover:bg-white text-blue-700 font-medium shadow border border-white/60"
>
Accueil
</button>
<div className="flex items-center gap-2">
<span className="text-sm text-slate-700 hidden sm:block">Son</span>
<button
onClick={() => setMuted((m) => !m)}
aria-pressed={muted}
className={`px-3 py-2 rounded-xl font-medium shadow border border-white/60 bg-white/70 hover:bg-white ${
muted ? 'text-slate-600' : 'text-blue-700'
}`}
title={muted ? 'Activer le son' : 'Couper le son'}
>
{muted ? '🔇' : '🔊'}
</button>
</div>
</div>
<div className="flex-1 flex flex-col items-center justify-center gap-6">
<div className="mt-2" aria-live="polite">
<CountdownCircleTimer
key={key}
isPlaying={!finished}
duration={totalTime}
colors="#2563eb" // blue-600
trailColor="#e2e8f0" // slate-200
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

<div className="flex items-center gap-3">
{[0, 1, 2, 3].map((i) => (
<span
key={i}
className={`h-3 w-3 rounded-full ${i <= zoneIndex ? 'bg-blue-600' : 'bg-slate-300'}`}
aria-hidden="true"
/>
))}
</div>
{!finished && <ZoneIndicator activeZone={ZONES[zoneIndex]} />}
</div>


{/* Bas de page */}
<div className="mt-6 flex items-center justify-center">
{finished ? (
<div className="flex gap-3">
<button
onClick={handleRestart}
className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md text-lg transition"
>
Rejouer
</button>
<button
onClick={onExit}
className="bg-white/80 hover:bg-white text-blue-700 px-6 py-3 rounded-2xl shadow-md text-lg transition border border-white/60"
>
Accueil
</button>
</div>
) : (
<p className="text-sm text-slate-600">Change de zone toutes les 30 secondes !</p>
)}
</div>
</div>
)
}


export default BrushingScreen