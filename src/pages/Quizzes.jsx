import { useState, useEffect } from "preact/hooks";
import { Link } from 'preact-router';

const Quizzes = () => {
  const [flashCards, setFlashCards] = useState({});
  const [remainingQuestions, setRemainingQuestions] = useState({});
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [guess, setGuess] = useState('');
  const [correct, setCorrect] = useState<boolean>(null);

  function shuffleObject(obj) {
    const entries = Object.entries(obj);
    for (let i = entries.length - 1; i &gt; 0; i--) {
        const j = 
            Math.floor(Math.random() * (i + 1));
        [entries[i], entries[j]] = 
            [entries[j], entries[i]];
    }
    return Object.fromEntries(entries);
  }

  function checkGuess () {
    if (guess.toLowerCase() === Object.keys(remainingQuestions)[0]) {
      setNumCorrect(numCorrect++);
    }
  }

  useEffect(() => {
    fetch('../../temp/flash_cards.json') // This will be replaced with a call to the backend later
      .then(response => response.json())
      .then(data => setFlashCards((data)))
      .then(data => setRemainingQuestions(shuffleObject(data)))
      .then(data => setNumOfQuestions(Object.entries(data).length()))
      .catch(error => console.error('Error loading JSON:', error));
  }, []);

  return (
    <>
      <Link href="/" className="home-link">Home</Link>
      {flashCards && 
      remainingQuestions && 
      Object.entries(flashCards).length > 0 && 
      Object.entries(remainingQuestions).length > 0 && (
        <div>
          <h3>Definition: {Object.values(remainingQuestions)[0]}</h3>
          <h3>What is the term?</h3>
          <input type='text' onInput={setGuess}/>
          <button onClick={checkGuess}/>
        </div>
      )}
    </>
  );
};

export default Quizzes;