import { createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// store authentication state, accessible throughout the app
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // store logged in user's data
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/auth/user`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.email) {
                    setUser(data);
                }
            })
            .catch(err => console.error('Auth check failed:', err))
    }, []);

    const signOut = async () => {
        await fetch(`${backendUrl}/logout`, {
            credentials: 'include'
        });
        setUser(null);
    };

    // Provide authentication context to all child components
    return (
        <AuthContext.Provider value={{ user, setUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};