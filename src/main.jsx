import './index.css';
import { render } from 'preact';
import { Router } from 'preact-router';
import App from './App';
import Home from './pages/Home';
import Quizzes from './pages/Quizzes';
import NotFound from './pages/NotFound';
import AuthCallback from './auth/AuthCallback';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './auth/AuthContext.jsx';
import CreateFlashcards from './pages/CreateFlashcards';

const Main = () => (
  <AuthProvider> {/* authentication state is available throughout application */}
    <App>
      <Router>
        <AuthCallback path="/auth-callback" />
        <Home path="/" />
        <PrivateRoute path="/create-flashcards" component={CreateFlashcards} />
        <PrivateRoute path="/quizzes" component={Quizzes} />
        <PrivateRoute default component={NotFound} />
      </Router>
    </App>
  </AuthProvider>
);

render(<Main />, document.getElementById('root'));