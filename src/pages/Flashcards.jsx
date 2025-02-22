import { useState, useContext, useEffect } from "preact/hooks";
import { Link } from 'preact-router';
import { backendUrl } from '../components/GlobalConsts.js';

const Flashcards = () => {
    const { user } = useContext(AuthContext);
    const [flashCardSets, setFlashCardSets,] = useState([]);

    const getFlashcards = async () => {
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

    
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
      </div>
    );
  };
  
  export default Flashcards;
  