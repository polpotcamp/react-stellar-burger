import styles from './OrderHistory.module.css'
import React from 'react';
import {  useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import OrderCard from '../OrderCard/OrderCard';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
function OrderHistory() {
    const location = useLocation();
    const orders = useSelector(state => state.wsOrders)
    return (
            <div className={`${styles.TwoColumn}`}>      
                    <ProfileNavigation/>
                {(orders !== undefined) ?
                <div className={`${styles.feed} custom-scroll mt-9`} >
                    {orders.map((order) => (
                        <Link key={order.number} to={`/profile/orders/:${order.number}`} state={{ background: location }} className={`${styles.link}`} >
                            <OrderCard data={order} type='special' />
                        </Link>
                    ))}
                </div>: null}
            </div> 
    )
}
export default OrderHistory