// App.jsx
import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import BrushingScreen from './components/BrushingScreen'

function App() {
  const [started, setStarted] = useState(false)

  return (
    <div className="min-h-screen w-screen">
      {!started ? (
        <HomeScreen onStart={() => setStarted(true)} />
      ) : (
        <BrushingScreen />
      )}
    </div>
  )
}

export default App
