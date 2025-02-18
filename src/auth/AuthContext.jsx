import { createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// store authentication state, accessible throughout the app
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // store logged in user's data
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log('Checking auth status...');
                const res = await fetch(`${backendUrl}/auth/user`, {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                console.log('Auth response status:', res.status);

                // Log response headers
                const headers = {};
                res.headers.forEach((value, key) => {
                    headers[key] = value;
                });
                console.log('Response headers:', headers);

                if (res.ok) {
                    const data = await res.json();
                    console.log('Auth response data:', data);
                    if (data && data.email) {
                        setUser(data);
                        localStorage.setItem('lastAuthCheck', new Date().toISOString());
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