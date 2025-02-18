import { createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// store authentication state, accessible throughout the app
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // store logged in user's data
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/auth/user`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            },
            mode: 'cors'
        })
            .then(res => {
                console.log('Auth response status:', res.status);
                console.log('Auth response headers:', [...res.headers.entries()]);
                return res.json();
            })
            .then(data => {
                console.log('Auth response data:', data);
                if (data && data.email) {
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