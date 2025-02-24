import { useContext, useState, useEffect } from 'preact/hooks';
import { AuthContext } from '../auth/AuthContext';
import { route } from 'preact-router';
import './CreateFlashcards.css';
import { Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';
import { backendUrl } from '../components/GlobalConsts.js';
import { getFlashcards } from '../components/FlashCardHelper.js';

const CreateFlashcards = ({ id }) => {
    const { user, authFetch } = useContext(AuthContext);
    const isEditMode = !!id;

    // If user is not authenticated, render nothing (PrivateRoute will handle redirect)
    if (!user) {
        return null;
    }

    const [flashcardSet, setFlashcardSet] = useState({
        name: '',
        description: '',
        flashcards: [{ term: '', definition: '' }]
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchFlashcardSet = async () => {
                try {
                    const response = await getFlashcards(authFetch, id);
                    if (response) {
                        const flashcardsArray = Object.entries(response.flashcards).map(([term, definition]) => ({
                            term,
                            definition
                        }));

                        setFlashcardSet({
                            name: response.title,
                            description: response.description,
                            flashcards: flashcardsArray
                        });
                    }
                } catch (error) {
                    console.error('Error fetching flashcard set:', error);
                    toast.error('Failed to load flashcard set');
                }
            };

            fetchFlashcardSet();
        }
    }, [id]);

    const handleSetChange = (e) => {
        const { name, value } = e.target;
        setFlashcardSet(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCardChange = (index, field, value) => {
        setFlashcardSet(prev => {
            const newFlashcards = [...prev.flashcards];
            newFlashcards[index] = {
                ...newFlashcards[index],
                [field]: value
            };
            return {
                ...prev,
                flashcards: newFlashcards
            };
        });
    };

    const addNewCard = () => {
        setFlashcardSet(prev => ({
            ...prev,
            flashcards: [...prev.flashcards, { term: '', definition: '' }]
        }));
    };

    const deleteCard = (indexToDelete) => {
        if (flashcardSet.flashcards.length > 1) {
            setFlashcardSet(prev => ({
                ...prev,
                flashcards: prev.flashcards.filter((_, index) => index !== indexToDelete)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading(isEditMode ? 'Updating...' : 'Saving...');
        try {
            const flashcardsDTO = flashcardSet.flashcards.map(card => ({
                question: card.term,
                answer: card.definition,
                createReverse: false
            }));

            const requestBody = {
                name: flashcardSet.name,
                description: flashcardSet.description,
                flashcards: flashcardsDTO,
                isPublic: false
            };

            const url = isEditMode
                ? `${backendUrl}/flashcard-set/${id}`
                : `${backendUrl}/flashcard-set`;

            const response = await authFetch(url, {
                method: isEditMode ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(isEditMode ? 'Failed to update flashcard set' : 'Failed to create flashcard set');
            }

            toast.success(isEditMode ? 'Flashcard set updated successfully!' : 'Flashcard set created successfully!', {
                id: loadingToast,
            });

            // Redirect to flashcard sets page
            route('/flashcard-sets');

        } catch (err) {
            console.error('Error:', err);
            toast.error(isEditMode ? 'Failed to update flashcard set. Please try again.' : 'Failed to create flashcard set. Please try again.', {
                id: loadingToast,
            });
        }
    };

    return (
        <div className="flashcard-form-container">
            <form onSubmit={handleSubmit} className="flashcard-form">
                <div className="form-header">
                    <input
                        type="text"
                        name="name"
                        value={flashcardSet.name}
                        onChange={handleSetChange}
                        placeholder="Enter set name"
                        className="set-name-input"
                        required
                    />

                    <textarea
                        name="description"
                        value={flashcardSet.description}
                        onChange={handleSetChange}
                        placeholder="Enter set description"
                        rows="2"
                        className="set-description-input"
                    />
                </div>

                <div className="flashcards-table-container">
                    <table className="flashcards-table">
                        <thead>
                            <tr>
                                <th className="term-column">Term</th>
                                <th className="definition-column">Definition</th>
                                <th className="action-column"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {flashcardSet.flashcards.map((card, index) => (
                                <tr key={index}>
                                    <td className="term-column">
                                        <textarea
                                            value={card.term}
                                            onChange={(e) => handleCardChange(index, 'term', e.target.value)}
                                            placeholder="Enter term/question"
                                            className="card-textarea"
                                            rows="3"
                                            required
                                        />
                                    </td>
                                    <td className="definition-column">
                                        <textarea
                                            value={card.definition}
                                            onChange={(e) => handleCardChange(index, 'definition', e.target.value)}
                                            placeholder="Enter definition/answer"
                                            className="card-textarea"
                                            rows="3"
                                            required
                                        />
                                    </td>
                                    <td className="action-column">
                                        <button
                                            type="button"
                                            onClick={() => deleteCard(index)}
                                            className="delete-card-button"
                                            disabled={flashcardSet.flashcards.length === 1}
                                            title="Delete card"
                                        >
                                            <Minus size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={addNewCard}
                        className="add-card-button"
                        title="Add new card"
                    >
                        <Plus size={16} />
                        Add Card
                    </button>

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        {isEditMode ? 'Update Flashcard Set' : 'Create Flashcard Set'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateFlashcards;