import { useContext } from 'preact/hooks';
import { AuthContext } from './auth/AuthContext.jsx';
import { Navbar } from './components/Navbar/Navbar.jsx'

const App = ({ children }) => {
  const { user, signOut } = useContext(AuthContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className="app-container">
      <Navbar
        user={user}
        onSignOut={signOut}
        backendUrl={backendUrl}
      />
      <main className="main-content">
        {children} {/* Router content goes here */}
      </main>
    </div>
  );
};

export default App;
