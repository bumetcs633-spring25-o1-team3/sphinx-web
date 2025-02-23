import { useState, useContext, useEffect } from "preact/hooks";
import { getFlashcards } from '../components/FlashCardHelper.js';
import { AuthContext } from '../auth/AuthContext.jsx';
import { shuffleArray } from "../components/GlobalConsts.js";
import { Link } from 'preact-router';
import './quiz.css';

const Quizzes = ({ id }) => {
  const [flashCards, setFlashCards] = useState([]);
  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [guess, setGuess] = useState('');
  const [title, setTitle] = useState('');
  const { authFetch } = useContext(AuthContext);

  function checkGuess () {
    if (guess.toLowerCase() === remainingQuestions[0].term.toLowerCase()) {
      setNumCorrect(numCorrect+1);
    }
    setRemainingQuestions(remainingQuestions.slice(1));
  }

  function playAgain () {
    setRemainingQuestions(shuffleArray(flashCards));
    setNumCorrect(0);
    setNumOfQuestions(flashCards.length);
  }

  useEffect(async() => {
    const resp = await getFlashcards(authFetch, id);
    const shuffledCards = shuffleArray(Object.entries(resp.flashcards).map(([term, definition]) => ({
      term,
      definition
    })));
    setFlashCards(shuffledCards);
    setRemainingQuestions(shuffledCards);
    setTitle(resp.title);
    setNumOfQuestions(shuffledCards.length);
    setNumCorrect(0);
  }, []);

  return (
    <>
      {flashCards && 
      remainingQuestions && 
      flashCards.length > 0 && 
      remainingQuestions.length > 0 && (
        <div className="quiz-container">
          <h2>Quiz for {title}</h2>
          <div className="stats">
            <div>Current Correct: {numCorrect}</div>
            <div>Number of Questions Answered: {numOfQuestions - remainingQuestions.length}</div>
          </div>
          <div>
            <h3>Definition: {remainingQuestions[0].definition}</h3>
            <h3>What is the term?</h3>
            <input type='text' onInput={(e) => setGuess(e.target.value)} style={{marginRight: '10px'}}/>
            <button onClick={checkGuess}>Submit</button>
          </div>
        </div>
      )}
      {flashCards.length > 0 && 
      remainingQuestions.length === 0 && (
        <div className="quiz-container">
          <h3>Congratulations, you finished the quiz</h3>
          <p>Your Score: {(numCorrect/numOfQuestions * 100).toFixed(2)}%</p>
          <button onClick={playAgain}>Try Again?</button>
          <Link href={`/flashcard-viewer/${id}`} className="button-link">
            Flashcards
          </Link>
        </div>
      )}
    </>
  );
};

export default Quizzes;