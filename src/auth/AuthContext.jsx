import { createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// store authentication state, accessible throughout the app
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // store logged in user's data
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // In AuthContext.jsx
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${backendUrl}/auth/user`, {
                    credentials: 'include',  // Important: include cookies
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log('Auth response:', data);
                    if (data && data.email) {
                        setUser(data);
                    } else {
                        console.warn('Valid response but no user data:', data);
                        setUser(null);
                    }
                } else {
                    console.error('Auth check failed with status:', res.status);
                    setUser(null);
                }
            } catch (err) {
                console.error('Auth check error:', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
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