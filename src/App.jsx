import { useContext } from 'preact/hooks';
import { AuthContext } from './auth/AuthContext.jsx';
import { Navbar } from './components/Navbar/Navbar.jsx'
import { Toaster } from 'react-hot-toast';
import { backendUrl } from './components/GlobalConsts.js';

const App = ({ children }) => {
  const { user, signOut } = useContext(AuthContext);
  return (
    <div className="app-container">
      <Toaster position="top-right" />
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
