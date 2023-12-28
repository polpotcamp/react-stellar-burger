import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './Order.module.css'
import React from "react"
import OrderIngredient from "../OrderIngredient/OrderIngredient"
import { request } from "../../utils/Api"
import { BASE_URL } from "../../utils/Api"
function Order() {
    const number = useParams().number.slice(1)
    const ingredients = useSelector(state => state.apiData)
    const orders = useSelector(state => state.wsOrders)
    const orderInWsOrders = orders.find(x => x.number === number)
    const [order, setOrder] = React.useState(orderInWsOrders)
    const totalPrice = calculateTotalPrice()
    function calculateTotalPrice() {
        if (order !== undefined) {
            let price = 0
            for (let i = 0; i < order.ingredients.length; i++) {
                const ingredient = order.ingredients[i]
                const ingr = ingredients.find(x => x._id === ingredient)
                price += ingr.price
            }
            return price
        }
    }
    function createdDate() {
        if (order !== undefined) {
            const date = order.createdAt.replace('T', ' ')
            const createdAt = date.substring(0, 19)
            return createdAt
        }
    }
    function countIngredients() {
        if (order !== undefined) {
            let ingredientsInOrder = []
            const uniqueIngredients = new Set(order.ingredients)
            const uniqueIngredientsArr = Array.from(uniqueIngredients)
            for (let i = 0; i < uniqueIngredientsArr.length; i++) {
                const ingr = ingredients.find(x => x._id === uniqueIngredientsArr[i])
                const IngrForArr = { ingredient: ingr, count: 0 }
                for (let i = 0; i < order.ingredients.length; i++) {
                    if (IngrForArr.ingredient._id === order.ingredients[i]) {
                        IngrForArr.count++
                    }
                }
                ingredientsInOrder.push(IngrForArr)
            }
            return ingredientsInOrder
        }
    }
    const ingredientsInOrder = countIngredients()
    const createdAt = createdDate()
    React.useEffect(() => {
        if (orderInWsOrders === undefined) {
            request(`${BASE_URL}/orders/${number}`)
                .then(data => {
                    setOrder(data.orders[0])
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [])
    return (
        (order !== undefined) ?
            <div className={`${styles.Column}`}>
                <p className={`text text_type_digits-medium mb-10 ${styles.number}`}>
                    #{order.number}
                </p>
                <p className="text text_type_main-medium mb-3 " >
                    {order.name}
                </p>
                <p className="text text_type_main-medium mb-15 " >
                    {order.status}
                </p>
                <p className="text text_type_main-medium mb-6 " >
                    Cостав:
                </p>
                <div className={`${styles.ingredients} mb-10`}>
                    {ingredientsInOrder.map((ingredient) => (
                        <OrderIngredient data={ingredient} key={order._id} />
                    ))}
                </div>
                <div className={`${styles.line}`}>
                    <p className="text text_type_main-default text_color_inactive">
                        {createdAt}
                    </p>
                    <div className={`${styles.price}`}>
                        <p className="text text_type_digits-medium mr-2">
                            {totalPrice}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div> : null
    )
}
export default Order