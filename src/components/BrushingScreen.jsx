// BrushingScreen.jsx
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import ZoneIndicator from './ZoneIndicator'
import zoneSound from '../assets/zone-sound.mp3'
import { useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'


const ZONES = ['Haut Gauche', 'Haut Droite', 'Bas Gauche', 'Bas Droite']


function BrushingScreen() {
const [zoneIndex, setZoneIndex] = useState(0)
const [finished, setFinished] = useState(false)
const [key, setKey] = useState(0)
const TOTAL_TIME = 120
const ZONE_DURATION = 30
const { width, height } = useWindowSize()


const handleTimeUpdate = (remainingTime) => {
const currentZone = Math.floor((TOTAL_TIME - remainingTime) / ZONE_DURATION)


if (currentZone !== zoneIndex) {
setZoneIndex(currentZone)
const audio = new Audio(zoneSound)
audio.play().catch((e) => console.error('Audio play failed:', e))
}
}

const handleRestart = () => {
setZoneIndex(0)
setFinished(false)
setKey(prev => prev + 1) // redémarre le timer
}


return (
<div className="flex flex-col justify-between items-center text-center min-h-screen w-screen bg-blue-50 p-6 relative overflow-hidden">
{finished && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />}


<div className="mt-4">
<CountdownCircleTimer
key={key}
isPlaying
duration={TOTAL_TIME}
colors="#3b82f6"
trailColor="#cbd5e1"
strokeWidth={10}
size={120}
onUpdate={handleTimeUpdate}
onComplete={() => {
setFinished(true)
return { shouldRepeat: false }
}}
>
{({ remainingTime }) =>
remainingTime > 0 ? (
<div className="text-lg sm:text-xl font-semibold text-blue-700">
{Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
</div>
) : (
<div className="text-2xl font-bold text-green-600">Bravo ! 🎉</div>
)
}
</CountdownCircleTimer>
</div>


{!finished && <ZoneIndicator activeZone={ZONES[zoneIndex]} />}


{finished ? (
<button
onClick={handleRestart}
className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md text-lg transition"
>
Rejouer
</button>
) : (
<p className="text-sm text-gray-500 mb-2">Change de zone toutes les 30 secondes !</p>
)}
</div>
)
}


export default BrushingScreen