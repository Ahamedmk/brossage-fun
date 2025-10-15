import { useState, useMemo } from 'react'


function HomeScreen({ onStart, initialSettings }) {
const [totalTime, setTotalTime] = useState(initialSettings?.totalTime ?? 120)


// 🧮 Calcul automatique : 5 zones
const zoneDuration = useMemo(() => Math.round(Number(totalTime) / 5), [totalTime])


const start = () => {
onStart({ totalTime: Number(totalTime), zoneDuration })
}


return (
<div className="flex flex-col items-center justify-center min-h-screen w-screen p-6 text-center">
<div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-8 max-w-xl w-full border border-white/60">
<h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-3">Brossage Fun 🪥</h1>
<p className="text-base md:text-lg text-slate-700 mb-8">
Choisis la durée totale. Le temps par zone est calculé automatiquement pour <strong>5 positions</strong> (HG, HD, Devant, BG, BD).
</p>


<div className="grid grid-cols-1 gap-4 text-left mb-4">
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


<div className="bg-blue-50 text-blue-800 rounded-2xl p-4 shadow border border-blue-100 flex items-center justify-between">
<span className="text-sm font-medium">Temps par zone (5 zones)</span>
<span className="text-lg font-bold tabular-nums">≈ {zoneDuration}s</span>
</div>
</div>
<button
onClick={start}
className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-fuchsia-900 px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition w-full sm:w-auto"
>
Commencer le brossage
</button>
</div>
</div>
)
}


export default HomeScreen