import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { AuthContext } from '../auth/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        route('/', true);
        return null;
    }
    
    return <Component {...rest} />;
};

export default PrivateRoute;