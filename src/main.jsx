import './index.css'; 
import { render } from 'preact';
import { Router } from 'preact-router';
import App from './App';
import Quizzes from './pages/Quizzes';
import NotFound from './pages/NotFound';
import { AuthProvider } from './auth/AuthContext.jsx';

const Main = () => (
  <AuthProvider> {/* authentication state is available throughout application */}
    <App>
      <Router>
        <Quizzes path="/quizzes" />
        <NotFound default />
      </Router>
    </App>
  </AuthProvider>
);

render(<Main />, document.getElementById('root'));

