// app/game/page.js
const GameMenu=()=> {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6" style={{ background: 'teal' }}>
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-teal-600 mb-6">َFast Quiz</h1>
        <p className="text-lg mb-6">Choose the programming language</p>

        <div className="space-y-4">
          <a
            href="/game/html"
            className="block py-4 bg-blue-600 text-white text-lg font-medium rounded hover:bg-blue-700 transition"
          >
             HTML Quiz
          </a>

          <a
            href="/game/css"
            className="block py-4 bg-orange-600 text-white text-lg font-medium rounded hover:bg-orange-700 transition"
          >
             CSS Quiz
          </a>

          <a
            href="/game/javascript"
            className="block py-4 bg-yellow-600 text-white text-lg font-medium rounded hover:bg-yellow-700 transition"
          >
             JavaScript Quiz
          </a>
           <a
            href="/game/react"
            className="block py-4 bg-yellow-600 text-white text-lg font-medium rounded hover:bg-yellow-700 transition"
          >
             React Quiz
          </a>
           <a
            href="/game/next"
            className="block py-4 bg-yellow-600 text-white text-lg font-medium rounded hover:bg-yellow-700 transition"
          >
            Next.js Quiz
          </a>
        </div>

        <div className="mt-8">
          <a href="/" className="text-teal-600 hover:underline text-sm">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
export default GameMenu;