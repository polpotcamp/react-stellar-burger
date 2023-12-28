import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {
    const isAuthorization = useSelector(state => state.isAuthorization)
    const isAuthChecked= useSelector((state) => state.isAuthChecked);
    const location = useLocation();
    const from = location.state?.from || '/';
    if(!isAuthChecked){
        return null
    }
    if (isAuthorization&& onlyUnAuth) {
        return <Navigate  to={ from } />;
    }
    if (!isAuthorization && !onlyUnAuth) {
        return  <Navigate to="/login" state={{ from: location}}/>
    }
    return component;
}
export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
    <ProtectedRouteElement onlyUnAuth={true} component={component} />
)
