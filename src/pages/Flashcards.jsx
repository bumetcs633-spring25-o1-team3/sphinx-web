import { useState, useEffect } from "preact/hooks";
import { Link } from 'preact-router';

const FlashCards = () => {
  const [flashCards, setFlashCards] = useState({});
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    fetch('../../temp/flash_cards.json') // This will be replaced with a call to the backend later
      .then(response => response.json())
      .then(data => setFlashCards(data))
      .catch(error => console.error('Error loading JSON:', error));
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

export default FlashCards;