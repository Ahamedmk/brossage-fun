import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import BrushingScreen from './components/BrushingScreen'


function App() {
const [started, setStarted] = useState(false)
const [settings, setSettings] = useState({ totalTime: 120, zoneDuration: 30 })


const handleStart = (opts) => {
setSettings(opts)
setStarted(true)
}


return (
<div className="min-h-screen w-screen bg-gradient-to-b from-sky-100 to-blue-200">
{!started ? (
<HomeScreen onStart={handleStart} initialSettings={settings} />
) : (
<BrushingScreen
onExit={() => setStarted(false)}
totalTime={settings.totalTime}
zoneDuration={settings.zoneDuration}
/>
)}
</div>
)
}


export default App