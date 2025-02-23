import { createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { backendUrl } from '../components/GlobalConsts.js';

// store authentication state, accessible throughout the app
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // store logged in user's data
    const [tokens, setTokens] = useState({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    });

    // Helper function to check if token is expired
    const isTokenExpired = (token) => {
        if (!token) return true;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp * 1000; // Convert to milliseconds
            return Date.now() >= expiry;
        } catch (e) {
            return true;
        }
    };

    // Helper to refresh tokens
    const refreshTokens = async () => {
        try {
            const response = await fetch(`${backendUrl}/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: tokens.refreshToken
                })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setTokens({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                });
                return data.accessToken;
            } else {
                // If refresh fails, sign out
                signOut();
                return null;
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            signOut();
            return null;
        }
    };

    // Create authenticated fetch that handles token refresh
    const authFetch = async (url, options = {}) => {
        // Check if access token is expired
        if (isTokenExpired(tokens.accessToken)) {
            // Try to refresh the token
            const newAccessToken = await refreshTokens();
            if (!newAccessToken) {
                throw new Error('Authentication failed');
            }
        }

        // Add authorization header
        const authOptions = {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${tokens.accessToken}`
            }
        };

        // Make the request
        let response = await fetch(url, authOptions);

        // If unauthorized, try refreshing token once
        if (response.status === 401 && !isTokenExpired(tokens.refreshToken)) {
            const newAccessToken = await refreshTokens();
            if (newAccessToken) {
                authOptions.headers['Authorization'] = `Bearer ${newAccessToken}`;
                response = await fetch(url, authOptions);
            }
        }

        return response;
    };

    useEffect(() => {
        const checkAuth = async () => {
            if (tokens.accessToken) {
                try {
                    // If token is expired and refresh token is available, try refreshing
                    if (isTokenExpired(tokens.accessToken) && tokens.refreshToken) {
                        await refreshTokens();
                    }

                    // If we have a valid token, get user data
                    if (tokens.accessToken && !isTokenExpired(tokens.accessToken)) {
                        const response = await authFetch(`${backendUrl}/auth/user`);
                        const data = await response.json();

                        if (data.email) {
                            setUser(data);
                        }
                    }
                } catch (err) {
                    console.error('Auth check failed:', err);
                    // Clear tokens if authentication fails
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    setTokens({ accessToken: null, refreshToken: null });
                }
            }
        };

        checkAuth();
    }, []);

    const signOut = async () => {
        // Clear tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Clear state
        setTokens({ accessToken: null, refreshToken: null });
        setUser(null);
    };

    // Provide authentication context to all child components
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            tokens,
            setTokens,
            signOut,
            authFetch
        }}>
            {children}
        </AuthContext.Provider>
    );
};