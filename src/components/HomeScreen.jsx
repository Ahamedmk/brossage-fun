import { useState, useEffect } from 'react'


function HomeScreen({ onStart, initialSettings }) {
const [totalTime, setTotalTime] = useState(initialSettings?.totalTime ?? 120)
const [zoneDuration, setZoneDuration] = useState(initialSettings?.zoneDuration ?? 30)
const [warning, setWarning] = useState('')


useEffect(() => {
if (totalTime % zoneDuration !== 0) {
setWarning('⚠️ La durée totale n’est pas un multiple du temps par zone, la dernière zone sera plus courte.')
} else {
setWarning('')
}
}, [totalTime, zoneDuration])


const start = () => {
onStart({ totalTime: Number(totalTime), zoneDuration: Number(zoneDuration) })
}


return (
<div className="flex flex-col items-center justify-center min-h-screen w-screen p-6 text-center">
<div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-8 max-w-xl w-full border border-white/60">
<h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-3">Brossage Fun 🪥</h1>
<p className="text-base md:text-lg text-slate-700 mb-8">
Choisis la durée et lance le brossage. Change de zone quand ça sonne !
</p>


<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-4">
<label className="flex flex-col gap-2 bg-white/80 rounded-2xl p-4 shadow border border-white/60">
<span className="text-sm font-medium text-slate-700">Durée totale</span>
<select
className="rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 p-2"
value={totalTime}
onChange={(e) => setTotalTime(e.target.value)}
>
{[60, 120, 180].map((v) => (
<option key={v} value={v}>{v} secondes</option>
))}
</select>
</label>
<label className="flex flex-col gap-2 bg-white/80 rounded-2xl p-4 shadow border border-white/60">
<span className="text-sm font-medium text-slate-700">Temps par zone</span>
<select
className="rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 p-2"
value={zoneDuration}
onChange={(e) => setZoneDuration(e.target.value)}
>
{[20, 30, 40].map((v) => (
<option key={v} value={v}>{v} secondes</option>
))}
</select>
</label>
</div>
{warning && (
<p
role="alert"
aria-live="polite"
className="text-sm text-yellow-700 bg-yellow-50 rounded-xl p-3 mb-4 border border-yellow-300 shadow-sm ring-1 ring-yellow-200/60 flex items-center gap-2 motion-safe:animate-pulse"
>
<span className="text-lg">⚠️</span>
<span>{warning}</span>
</p>
)}
<button
onClick={start}
className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-fuchsia-600 px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition w-full sm:w-auto"
>
Commencer le brossage
</button>
</div>
</div>
)
}


export default HomeScreen