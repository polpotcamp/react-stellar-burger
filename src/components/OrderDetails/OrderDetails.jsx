import styles from './OrderDetails.module.css'
import CheckMarkIcon from '../../images/graphics.svg'
import React from 'react'
import { useSelector } from 'react-redux';
function OrderDetails() {
    const order = useSelector(state => state.order)
    return (
        <div className={styles.OrderDetails}>
            <p className="text text_type_digits-large mt-30">{order}</p>
            <p className="text text_type_main-medium mt-8">идентефикатор заказа</p>
            <img src={CheckMarkIcon} alt="CheckMarkIcon" className='mt-15' />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default  text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}
export default OrderDetails