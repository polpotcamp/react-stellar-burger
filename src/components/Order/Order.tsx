import { useSelector } from "../../hooks/hooks"
import { useParams } from "react-router-dom"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './Order.module.css'
import React from "react"
import OrderIngredient from "../OrderIngredient/OrderIngredient"
import { request } from "../../utils/Api"
import { BASE_URL } from "../../utils/Api"
import { FC } from "react";
import { TOrder, TIngredient } from "../../utils/types"
type OrderParams = {
    number: string;
}
interface IingredientsInOrder {
    ingredient: TIngredient,
    count: number
}
const Order: FC = () => {
    const number: number = Number(useParams<OrderParams>().number?.slice(1))
    const ingredients = useSelector(state => state.apiData)
    const orders = useSelector(state => state.wsOrders)
    const orderInWsOrders = orders.find(order => order.number === number)
    const [order, setOrder] = React.useState<TOrder | undefined>(orderInWsOrders)
    const totalPrice: number | undefined = calculateTotalPrice()
    function calculateTotalPrice() {
        if (order !== undefined) {
            let price: number = 0
            for (let i = 0; i < order.ingredients.length; i++) {
                const ingredient: string = order.ingredients[i]
                const ingr: TIngredient | undefined = ingredients.find(x => x._id === ingredient)
                if (ingr !== undefined)
                    price += ingr.price
            }
            return price
        }
    }
    function createdDate() {
        if (order !== undefined) {
            const date: string = order.createdAt.replace('T', ' ')
            const createdAt: string = date.substring(0, 19)
            return createdAt
        }
    }
    function countIngredients() {
        if (order !== undefined) {
            let ingredientsInOrder: Array<IingredientsInOrder> = []
            const uniqueIngredients: Set<string> = new Set(order.ingredients)
            const uniqueIngredientsArr: Array<string> = Array.from(uniqueIngredients)
            for (let i = 0; i < uniqueIngredientsArr.length; i++) {
                const ingr: TIngredient | undefined = ingredients.find(x => x._id === uniqueIngredientsArr[i])
                if (ingr !== undefined) {
                    const IngrForArr: IingredientsInOrder = { ingredient: ingr, count: 0 }
                    for (let i = 0; i < order.ingredients.length; i++) {
                        if (IngrForArr.ingredient !== undefined) {
                            if (IngrForArr.ingredient._id === order.ingredients[i]) {
                                IngrForArr.count++
                            }
                        }
                    }
                    ingredientsInOrder.push(IngrForArr)
                }
            }
            return ingredientsInOrder
        }
    }

    const ingredientsInOrder = countIngredients()
    const createdAt: string | undefined = createdDate()
    React.useEffect(() => {
        if (orderInWsOrders === undefined) {
            request<{succes:boolean, orders:Array<TOrder>}>(`${BASE_URL}/orders/${number}`)
                .then(data => {
                   if(data)
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
                    {ingredientsInOrder?.map((ingredient) => (
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