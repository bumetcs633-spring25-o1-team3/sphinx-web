import { useContext, useState } from 'preact/hooks';
import { AuthContext } from '../auth/AuthContext';
import './CreateFlashcards.css';
import { Plus, Minus } from 'lucide-react';

const CreateFlashcards = () => {
    const { user } = useContext(AuthContext);

    // If user is not authenticated, render nothing (PrivateRoute will handle redirect)
    if (!user) {
        return null;
    }

    const [flashcardSet, setFlashcardSet] = useState({
        name: '',
        description: '',
        flashcards: [{ term: '', definition: '' }]
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', flashcardSet);
        // TODO: Submit to backend
    };

    return (
        <div className="flashcard-form-container">
            <form onSubmit={handleSubmit} className="flashcard-form">
                {/* Set Details Section */}
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

                {/* Flashcards Table */}
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
                        Create Flashcard Set
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateFlashcards;