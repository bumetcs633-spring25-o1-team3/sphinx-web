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
import Flashcards from './pages/Flashcards.jsx';
import FlashCardViewer from './pages/FlashcardViewer.jsx';
import SpeedChallenge from './pages/SpeedChallenge.jsx';

const Main = () => (
  <AuthProvider> {/* authentication state is available throughout application */}
    <App>
      <Router>
        <AuthCallback path="/auth-callback" />
        <Home path="/" />
        <PrivateRoute path="/create-flashcards" component={CreateFlashcards} />
        <PrivateRoute path="/create-flashcards/:id" component={CreateFlashcards} />
        <PrivateRoute path="/quizzes" component={Quizzes} />
        <PrivateRoute path="/flashcard-sets" component={Flashcards} />
        <PrivateRoute path="/flashcard-viewer/:id" component={FlashCardViewer} />
        <PrivateRoute path="/speed-challenge/:id" component={SpeedChallenge} />
        <PrivateRoute path="/quiz/:id" component={Quizzes} />
        <PrivateRoute default component={NotFound} />
      </Router>
    </App>
  </AuthProvider>
);

render(<Main />, document.getElementById('root'));