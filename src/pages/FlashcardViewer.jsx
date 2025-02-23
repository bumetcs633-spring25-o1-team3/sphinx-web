import { useState, useContext, useEffect } from "preact/hooks";
import { Link } from 'preact-router';
import { getFlashcards } from '../components/FlashCardHelper.js';
import { AuthContext } from '../auth/AuthContext.jsx';
import "./viewer.css";

const FlashCardViewer = ({ id }) => {
  const [flashCards, setFlashCards] = useState({});
  const [flippedCards, setFlippedCards] = useState({});
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const { authFetch } = useContext(AuthContext);

  useEffect(async () => {
    const resp = await getFlashcards(authFetch, id);
    setFlashCards(resp.flashcards);
    setTitle(resp.title);
    setDesc(resp.description);
  }, []);

  const toggleFlip = (key) => {
    setFlippedCards(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {flashCards && Object.keys(flashCards).length > 0 && (
        <div className="flashcard-container">
          <div className="flashcard-viewer">
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>

          <div className="button-container">
            <Link href={`/quiz/${id}`} className="link-button">
              Quiz
            </Link>
            <Link href={`/speed-challenge/${id}`} className="link-button">
              Speed Challenge
            </Link>
          </div>

          <div className="flashcard-grid">
            {Object.entries(flashCards).map(([key, value]) => (
              <div
                key={key}
                className={`flashcard ${flippedCards[key] ? 'flipped' : ''}`}
                onClick={() => toggleFlip(key)}
              >
                <div className="flashcard-inner">
                  <div className="flashcard-face flashcard-front">
                    <p>{key}</p>
                  </div>
                  <div className="flashcard-face flashcard-back">
                    <p>{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FlashCardViewer;