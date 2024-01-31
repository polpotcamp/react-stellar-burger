import styles from './OrderFeed.module.css'
import OrderCard from '../OrderCard/OrderCard'
import { useSelector } from '../../hooks/hooks';
import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
const OrderFeed: FC=()=> {
    const location = useLocation();
    const orders = useSelector(state => state.wsOrders)
    const Total = useSelector(state => state.wsTotal)
    const TotalToday = useSelector(state => state.wsTotalToday)
    return (
        orders ?
            <div className={`${styles.twoColumn} mt-20`}>
                <div className={`${styles.Column} mr-15`}>
                    <p className="text text_type_main-large mb-5">
                        Лента заказов
                    </p>
                    <div className={`${styles.feed} custom-scroll`} >
                        {orders.map((order) => (
                            <Link key={order.number} to={`/feed/:${order.number}`} state={{ background: location }} className={`${styles.link}`} >
                                <OrderCard data={order} key={order._id} />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={`${styles.Column}`}>
                    <div className={`${styles.twoColumn}`}>
                        <div className={`${styles.Column} mr-9`}>
                            <p className="text text_type_main-large mb-5">
                                Готовы:
                            </p>
                            <div className={`${styles.OrdersList}`}>
                                {orders.map((order) => (
                                    (order.status === 'done') ?
                                        <div key={order.number} className={`text text_type_main-medium mb-2 ${styles.doneNumbers}`}>{order.number}</div> : null
                                ))}
                            </div>
                        </div>
                        <div className={`${styles.Column}`}>
                            <p className="text text_type_main-large mb-5">
                                В работе:
                            </p>
                            <div className={`${styles.OrdersList}`}>
                                {orders.map((order) => (
                                    (order.status !== 'done') ?
                                        <div className={`text text_type_main-medium mb-2 `}>{order.number}</div> : null
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text text_type_main-large">
                        Выполненно за всё время:
                    </p>
                    <p className="text text_type_digits-large">
                        {Total}
                    </p>
                    <p className="text text_type_main-large">
                        Выполненно за сегодня
                    </p>
                    <p className="text text_type_digits-large">
                        {TotalToday}
                    </p>
                </div>
            </div> : null
    )
}
export default OrderFeed