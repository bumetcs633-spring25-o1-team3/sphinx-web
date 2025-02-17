import { useContext } from 'preact/hooks';
import { AuthContext } from '../auth/AuthContext';
import './Home.css';

const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
        return 'Good morning';
    } else if (hour < 17) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
};

const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.split(' ')[0];
};

const Home = () => {
    const { user } = useContext(AuthContext);
    
    // If user is not authenticated, render nothing
    if (!user) {
        return null;
    }

    const firstName = getFirstName(user?.name);
    return (
        <div className="greeting-container">
            <h1 className="greeting-title">
                {getGreeting()}, {firstName}
            </h1>
            <p className="greeting-subtitle">
                Your interactive learning platform for MET CS 633.
            </p>
        </div>
    );
};

export default Home;