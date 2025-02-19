import { useEffect, useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { AuthContext } from './AuthContext';

const AuthCallback = () => {
    const { setUser, setTokens } = useContext(AuthContext);

    useEffect(() => {
        // Parse tokens from URL fragment
        const fragment = window.location.hash.substring(1);
        const params = new URLSearchParams(fragment);

        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
            // Store tokens in local storage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Decode the JWT to get user info
            const payload = JSON.parse(atob(accessToken.split('.')[1]));

            // Set user in context
            const user = {
                id: payload.userId,
                name: payload.name,
                email: payload.email
            };

            setUser(user);
            setTokens({
                accessToken,
                refreshToken
            });

            // Redirect to root path (home)
            route('/', true);
        } else {
            // Handle error case
            console.error('Authentication failed: No tokens received');
            route('/', true);
        }
    }, []);

    // Return null since this is just a processing component
    return null;
};

export default AuthCallback;