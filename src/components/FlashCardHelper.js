import { backendUrl } from './GlobalConsts.js';

export const getFlashcards = async (authFetch, setId) => {
    try {
        const response = await authFetch(`${backendUrl}/flashcard-set/${setId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.ok) {
            const data = await response.json();
            const formattedFlashcards = data.flashcards.reduce((acc, card) => {
                acc[card.question] = card.answer;
                return acc;
            }, {});
            return {flashcards: formattedFlashcards, description: data.description, title: data.name};
        } else {
            console.error('Bad Response');
            return null;
        }
    } catch (error) {
        console.error('Flash card fetch failed:', error);
        return null;
    }
};