import { Link } from 'preact-router';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Preact + Vite</h1>
      <nav className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline mr-4">Home</Link>
        <Link href="/quizzes" className="text-blue-500 hover:underline">About</Link>
      </nav>
    </div>
  );
};

export default App;
