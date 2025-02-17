import './index.css'; 
import { render } from 'preact';
import { Router } from 'preact-router';
import App from './App';
import Home from './pages/Home'
import Quizzes from './pages/Quizzes';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './auth/AuthContext.jsx';

const Main = () => (
  <AuthProvider> {/* authentication state is available throughout application */}
    <App>
      <Router>
        <Home path="/" />
        <PrivateRoute path="/quizzes" component={Quizzes} />
        <PrivateRoute default component={NotFound} />
      </Router>
    </App>
  </AuthProvider>
);

render(<Main />, document.getElementById('root'));

