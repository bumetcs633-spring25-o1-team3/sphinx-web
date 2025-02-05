import './index.css'; 
import { render } from 'preact';
import { Router } from 'preact-router';
import App from './App';
import Quizzes from './pages/Quizzes';
import NotFound from './pages/NotFound';

const Main = () => (
  <Router>
    <App path="/" />
    <Quizzes path="/quizzes" />
    <NotFound default />
  </Router>
);

render(<Main />, document.getElementById('root'));

