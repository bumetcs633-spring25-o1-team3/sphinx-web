import { useContext } from 'preact/hooks';
import { AuthContext } from '../auth/AuthContext';
import './CreateFlashcards.css';

const CreateFlashcards = () => {
    const { user } = useContext(AuthContext);

    // If user is not authenticated, render nothing (PrivateRoute will handle redirect)
    if (!user) {
        return null;
    }

    return (
        <div className="create-flashcards-container">
            {/* TODO: add form inputs */}
        </div>
    );
};

export default CreateFlashcards;