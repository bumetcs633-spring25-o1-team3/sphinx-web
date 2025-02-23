import { useState, useContext, useEffect } from "preact/hooks";
import { Link } from 'preact-router';
import { backendUrl } from '../components/GlobalConsts.js';
import { AuthContext } from '../auth/AuthContext';
import "./sets.css";

const Flashcards = () => {
    const [flashCardSets, setFlashCardSets,] = useState([]);
    const { authFetch } = useContext(AuthContext);

    const getFlashcards = async () => {
        try {
            const response = await authFetch(`${backendUrl}/flashcard-set/my-sets`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setFlashCardSets(data);
                return;
            } else {
                console.error('No sets found');
            }
        } catch (error) {
            console.error('Error retrieving sets:', error);
            return;
        }
    };

    useEffect(() => {
        getFlashcards();
    }, [])
    
    return (
        <div className="container">
            {flashCardSets && flashCardSets.length > 0 && (
                <>
                    <h2>Flash Card Sets</h2>
                    <div className="json-list">
                        {flashCardSets.map((item) => (
                            <Link href={`/flashcard-viewer/${item.id}`} className="json-box">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
  };
  
  export default Flashcards;
  