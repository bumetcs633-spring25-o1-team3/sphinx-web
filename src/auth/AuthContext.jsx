import { createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const fetchWithCredentials = (url, options = {}) => {
    return fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            ...options.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
};

// store authentication state, accessible throughout the app
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // store logged in user's data
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetchWithCredentials(`${backendUrl}/auth/user`);

                if (!response.ok) {
                    console.error('Auth check failed with status:', response.status);
                    setError(`Authentication check failed: ${response.status}`);
                    setLoading(false);
                    return;
                }

                const data = await response.json();
                console.log('Auth data received:', data);

                if (data && data.email) {
                    setUser(data);
                }
            } catch (err) {
                console.error('Auth check error:', err);
                setError(`Authentication error: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [backendUrl]);

    const signOut = async () => {
        await fetch(`${backendUrl}/logout`, {
            credentials: 'include'
        });
        setUser(null);
    };

    // Provide authentication context to all child components
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            signOut,
            fetchWithCredentials: (path, options) =>
                fetchWithCredentials(`${backendUrl}${path}`, options)
        }}>
            {children}
        </AuthContext.Provider>
    );
};