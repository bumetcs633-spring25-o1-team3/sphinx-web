import { useState, useEffect } from "preact/hooks";
import { Link } from 'preact-router';
import { getFlashcards } from '../components/FlashCardHelper.js';

const FlashCardViewer = (setId) => {
  const [flashCards, setFlashCards] = useState({});
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    setFlashCards(getFlashcards(setId));
  }, []);

  const toggleFlip = (key) => {
    setFlippedCards(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      <Link href="/" className="home-link">Home</Link>

      {flashCards && Object.entries(flashCards).length > 0 && (
        <div className="flashcard-grid">
          {Object.entries(flashCards).map(([key, value]) => (
            <div 
              key={key} 
              className={`flashcard ${flippedCards[key] ? 'flipped' : ''}`}
              onClick={() => toggleFlip(key)}
            >
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  <p>{key}</p>
                </div>
                <div className="flashcard-back">
                  <p>{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FlashCardViewer;