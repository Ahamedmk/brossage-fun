import { ArrowUpLeft, ArrowDownLeft, ArrowUpRight, ArrowDownRight, Smile } from 'lucide-react'


function ZoneIndicator({ activeZone }) {
// Layout 2 rangées × 3 colonnes : Gauche | Devant | Droite
// HG | Devant Haut | HD
// BG | Devant Bas | BD


const base =
'flex flex-col items-center justify-center gap-1 text-center select-none rounded-2xl transition duration-300 font-semibold border h-[18vw] w-[18vw] max-h-24 max-w-24';
const activeCls =
'bg-emerald-500 text-white ring-4 ring-emerald-300 shadow-xl shadow-emerald-300 scale-105';
const inactiveCls = 'bg-white/90 text-slate-700 border-white/60 ring-1 ring-slate-200 shadow';


const Cell = ({ label, icon: Icon, active }) => (
<div className={`${base} ${active ? activeCls : inactiveCls}`}>
<Icon className={`${active ? 'text-white' : 'text-blue-600'} drop-shadow`} size={22} />
<span className="text-[11px] sm:text-xs md:text-sm leading-tight">{label}</span>
</div>
)


const isFront = activeZone === 'Devant'


return (
<div className="grid grid-cols-3 grid-rows-2 gap-4 sm:gap-6 md:gap-8 place-items-center">
{/* Rangée du haut */}
<Cell label="Haut Gauche" icon={ArrowUpLeft} active={activeZone === 'Haut Gauche'} />
<Cell label="Devant" icon={Smile} active={isFront} />
<Cell label="Haut Droite" icon={ArrowUpRight} active={activeZone === 'Haut Droite'} />


{/* Rangée du bas */}
<Cell label="Bas Gauche" icon={ArrowDownLeft} active={activeZone === 'Bas Gauche'} />
<Cell label="Devant" icon={Smile} active={isFront} />
<Cell label="Bas Droite" icon={ArrowDownRight} active={activeZone === 'Bas Droite'} />
</div>
)
}


export default ZoneIndicator