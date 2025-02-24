import { useState, useContext, useEffect } from "preact/hooks";
import { Link, route } from 'preact-router';
import { getFlashcards } from '../components/FlashCardHelper.js';
import { AuthContext } from '../auth/AuthContext.jsx';
import { backendUrl } from '../components/GlobalConsts.js';
import ConfirmDialog from '../components/ConfirmDialog';
import toast from 'react-hot-toast';
import "./viewer.css";

const FlashCardViewer = ({ id }) => {
  const [flashCards, setFlashCards] = useState({});
  const [flippedCards, setFlippedCards] = useState({});
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
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

  const handleDelete = async () => {
    const loadingToast = toast.loading('Deleting flashcard set...');
    try {
      const response = await authFetch(`${backendUrl}/flashcard-set/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete flashcard set');
      }

      toast.success('Flashcard set deleted successfully!', {
        id: loadingToast,
      });

      // Redirect to flashcard sets page
      route('/flashcard-sets');
    } catch (error) {
      console.error('Error deleting flashcard set:', error);
      toast.error('Failed to delete flashcard set. Please try again.', {
        id: loadingToast,
      });
    }
    setConfirmDialogOpen(false);
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
            <Link href={`/create-flashcards/${id}`} className="link-button">
              Edit Set
            </Link>
            <button
              onClick={() => setConfirmDialogOpen(true)}
              className="link-button delete-button"
            >
              Delete Set
            </button>
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

          <ConfirmDialog
            isOpen={confirmDialogOpen}
            onClose={() => setConfirmDialogOpen(false)}
            onConfirm={handleDelete}
            title="Delete Flashcard Set"
            message={`Are you sure you want to delete "${title}"?\n\nThis will delete the set and all its associated cards. This action cannot be undone.`}
          />
        </div>
      )}
    </>
  );
};

export default FlashCardViewer;