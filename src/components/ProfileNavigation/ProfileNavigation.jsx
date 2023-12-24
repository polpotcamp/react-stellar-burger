import styles from './ProfileNavigation.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../services/async/LogOut'
function ProfileNavigation() {
    const dispatch = useDispatch()
    const setActive = ({ isActive }) => isActive ? `text text_type_main-large ${styles.NavTextActive}` : `text text_type_main-large text_color_inactive  ${styles.NavText}`
    const navigate = useNavigate()
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    const logout = () => {
        dispatch(logOut())
        navigate('/', { state: initialBreadcrumb });
    }
    return (
        <div className={`${styles.Column} mt-30`}>
            <nav className={`${styles.Column} mr-15`}>
                <NavLink className={setActive} to={'/profile'} end>
                    Профиль
                </NavLink>
                <NavLink className={setActive} to={'/profile/orders'} >
                    История заказов
                </NavLink>
                <p className={`text text_type_main-large text_color_inactive ${styles.NavText}`} onClick={logout}>
                    Выход
                </p>
            </nav>
            <p className={`text text_type_main-default text_color_inactive mt-20 ${styles.Description}`}>
                В этом разделе вы можете посмотреть свою истрию заказов
            </p>
        </div>
    )
}
export default ProfileNavigation
// ${styles.NavText}