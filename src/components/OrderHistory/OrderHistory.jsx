import styles from './OrderHistory.module.css'
import { useDispatch , useSelector} from 'react-redux';
import { logOut } from '../../services/async/LogOut';
import { useNavigate } from 'react-router-dom'
import OrderCard from '../OrderCard/OrderCard';
function OrderHistory() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    const logout = () => {
        dispatch(logOut())
        navigate('/', { state: initialBreadcrumb });
    }
    const orders = useSelector(state => state.wsOrdesByUser)
    console.log(orders)
    return (
        orders ?
        <div className={styles.TwoColumn}>
             {console.log(orders)}
            <div className={styles.Column}>
                <div className={`${styles.Column}`}>
                    <nav className={`${styles.Column} mr-15`}>
                        <p className={`text text_type_main-large text_color_inactive  ${styles.NavText}`}>
                            Профиль
                        </p>
                        <p className={`text text_type_main-large ${styles.NavText}`}>
                            История заказов
                        </p>
                        <p className={`text text_type_main-large text_color_inactive ${styles.NavText}`} onClick={logout}>
                            Выход
                        </p>
                    </nav>
                    <p className={`text text_type_main-default text_color_inactive mt-20 ${styles.Description}`}>
                        В этом разделе вы можете посмотреть свою истрию заказов
                    </p>
                </div>
            </div>
            <div className={`${styles.feed} custom-scroll`} >
                {orders.map((order) => (
                    <OrderCard data={order} key={order._id} />
                ))}
            </div>
        </div> : null
    )
}
export default OrderHistory