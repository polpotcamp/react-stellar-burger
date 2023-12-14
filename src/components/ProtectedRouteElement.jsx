import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
 const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {
    const isAuthorization = useSelector(state => state.isAuthorization)
    if (isAuthorization && onlyUnAuth) {
        return <Navigate to={"/profile"} />;
    }
    if (!isAuthorization && !onlyUnAuth) {
        return <Navigate to="/login" />
    }
    return component;
}
export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
    <ProtectedRouteElement onlyUnAuth={true} component={component} />
)
