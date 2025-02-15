import './index.css'; 
import { render } from 'preact';
import { Router } from 'preact-router';
import App from './App';
import Quizzes from './pages/Quizzes';
import NotFound from './pages/NotFound';
import { AuthProvider } from './auth/AuthContext.jsx';

const Main = () => (
  <AuthProvider>
    <Router>
      <App path="/" />
      <Quizzes path="/quizzes" />
      <NotFound default />
    </Router>
  </AuthProvider>
);

render(<Main />, document.getElementById('root'));

