import { Link } from 'preact-router';

const App = () => {
  const backendUrl = import.meta.env.VITE_API_URL;
  return (
    <div>
      <h1>Welcome to Preact + Vite</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/quizzes">Quizzes</Link>
        <a href={`${backendUrl}/oauth2/authorization/google`}>Sign in with Google</a>
      </nav>
    </div>
  );
};

export default App;
