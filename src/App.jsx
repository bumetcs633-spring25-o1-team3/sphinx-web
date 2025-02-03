import { Link } from 'preact-router';

const App = () => {
  return (
    <div>
      <h1>Welcome to Preact + Vite</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/quizzes">Quizzes</Link>
      </nav>
      <div>
        Tailwind should be blue now!
      </div>
    </div>
  );
};

export default App;
