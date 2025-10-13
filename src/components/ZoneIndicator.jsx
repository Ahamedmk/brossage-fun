function ZoneIndicator({ activeZone }) {
const zones = [
{ name: 'Haut Gauche' },
{ name: 'Haut Droite' },
{ name: 'Bas Gauche' },
{ name: 'Bas Droite' },
]


const getZoneStyle = (zoneName) => {
const isActive = zoneName === activeZone
return `flex items-center justify-center text-center select-none
text-xs sm:text-sm md:text-base font-semibold border
h-[22vw] w-[22vw] max-h-32 max-w-32
rounded-2xl transition duration-300
${isActive ? 'bg-green-400 text-white motion-safe:animate-pulse shadow-xl' : 'bg-white/80 text-slate-700 border-white/60 shadow'}`
}


return (
<div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
{zones.map((zone) => (
<div key={zone.name} className={getZoneStyle(zone.name)}>
{zone.name}
</div>
))}
</div>
)
}


export default ZoneIndicator