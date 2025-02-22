import { backendUrl } from '../components/GlobalConsts.js';

export const getFlashcards = async (setId) => {
    try {
        const response = await fetch(`${backendUrl}/set/${setId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.ok) {
            const data = await response.json();
            const formattedFlashcards = data.reduce((acc, card) => {
                acc[card.question] = card.answer;
                return acc;
            }, {});
            return formattedFlashcards;
        } else {
            console.error('Bad Response:', error);
            return null;
        }
    } catch (error) {
        console.error('Flash card fetch failed:', error);
        return null;
    }
};