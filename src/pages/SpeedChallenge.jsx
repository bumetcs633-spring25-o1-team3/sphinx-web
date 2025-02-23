import { useState, useContext, useEffect } from "preact/hooks";
import { getFlashcards } from '../components/FlashCardHelper.js';
import { AuthContext } from '../auth/AuthContext.jsx';
import { shuffleArray } from "../components/GlobalConsts.js";
import { Link } from "preact-router";
import './challenge.css'

const SpeedChallenge = ({ id }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [flashCards, setFlashCards] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [title, setTitle] = useState('');
  const { authFetch } = useContext(AuthContext);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const resp = await getFlashcards(authFetch, id);
      const shuffledCards = shuffleArray(Object.entries(resp.flashcards).map(([term, definition]) => ({
        term,
        definition
      })));
      setFlashCards(shuffledCards);
      setCurrentOptions(getFlashcardOptions(shuffledCards, index));
      setTitle(resp.title);
    };

    fetchFlashcards();
  }, [authFetch, id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      nextCard(false);
    }
  }, [timeLeft]);

  const nextCard = (isCorrect) => {
    if (isCorrect) setScore(score + timeLeft * 10);
    console.log(currentOptions);
    if (index < flashCards.length - 1) {
      setIndex(index + 1);
      setTimeLeft(10);
      setCurrentOptions(getFlashcardOptions(flashCards, index));
    } else {
      setGameOver(true);
    }
  };

  const getFlashcardOptions = (flashCards, index) => {
    const correctTerm = flashCards[index].term;
    const incorrectTerms = flashCards
      .filter((card) => card.term !== correctTerm)
      .map((card) => card.term)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  
    return [...incorrectTerms, correctTerm].sort(() => 0.5 - Math.random());
  };

  if (gameOver) {
    return (
      <div className="speed-challenge-container game-over">
        <h2>Game Over!</h2>
        <p>Your final score: {score}</p>
        <button className="restart-button" onClick={() => { setIndex(0); setScore(0); setTimeLeft(10); setGameOver(false); }}>
          Restart
        </button>
        <Link href={`/flashcard-viewer/${id}`} className="button-link">
          Flashcards
        </Link>
      </div>
    );
  }  

  return (
    <div className="speed-challenge-container">
      <h2>Flashcard Speed Challenge: {title}</h2>
      <p className="score">Score: {score}</p>
      <p className="timer">Time Left: {timeLeft}s</p>
      {flashCards.length > 0 && (
        <>
          <p className="flashcard">{flashCards[index].definition}</p>
          {currentOptions.map((term) => (
            <button key={term} onClick={() => nextCard(term === flashCards[index].term)}>
              {term}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default SpeedChallenge;
