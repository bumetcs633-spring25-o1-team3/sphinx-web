import { useState, useEffect } from "preact/hooks";

const FlashcardGame = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [flashCards, setFlashCards] = useState({});

  useEffect(() => {
    useEffect(() => {
      setFlashCards(getFlashcards(setId));
    }, []);
  }, [])

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
    if (index < flashCards.length - 1) {
      setIndex(index + 1);
      setTimeLeft(5);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return (
      <div>
        <h2>Game Over!</h2>
        <p>Your final score: {score}</p>
        <button onClick={() => { setIndex(0); setScore(0); setTimeLeft(5); setGameOver(false); }}>Restart</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Flashcard Speed Challenge</h2>
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft}s</p>
      <p>{flashCards[index].question}</p>
      {flashCards[index].options.map((option) => (
        <button key={option} onClick={() => nextCard(option === flashCards[index].correct)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default FlashcardGame;
