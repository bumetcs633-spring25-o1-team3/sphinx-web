import { Link } from 'preact-router';
import { useContext } from 'preact/hooks';
import { AuthContext } from './auth/AuthContext.jsx';

const App = () => {
  const { user, signOut } = useContext(AuthContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <div>
      <h1>Sphinx</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/quizzes">Quizzes</Link>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <a href={`${backendUrl}/oauth2/authorization/google`}>
            Sign in with Google
          </a>
        )}
      </nav>
    </div>
  );
};

export default App;
