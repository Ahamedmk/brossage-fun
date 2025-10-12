function ZoneIndicator({ activeZone }) {
const zones = [
{ name: 'Haut Gauche' },
{ name: 'Haut Droite' },
{ name: 'Bas Gauche' },
{ name: 'Bas Droite' },
]


const getZoneStyle = (zoneName) => {
const isActive = zoneName === activeZone
return `flex items-center justify-center text-center
text-xs sm:text-sm md:text-base font-medium border
h-[22vw] w-[22vw] max-h-28 max-w-28
rounded-xl transition duration-300
${isActive ? 'bg-green-400 text-white animate-pulse shadow-lg' : 'bg-gray-200 text-gray-600'}`
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