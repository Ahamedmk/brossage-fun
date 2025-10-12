function HomeScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-blue-100 p-6 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-6">
        Bienvenue dans Brossage Fun 🪥
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-md">
        Brosse-toi les dents en t'amusant ! Suis le guide, change de zone toutes les 30 secondes, et termine avec des confettis 🎉
      </p>
      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-fuchsia-700 px-8 py-4 rounded-2xl text-lg font-semibold shadow-md transition"
      >
        Commencer le brossage
      </button>
    </div>
  )
}

export default HomeScreen
