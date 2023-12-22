import styles from './OrderIngredient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
function OrderIngredient({ data }) {
    return (
        <div className={styles.card}>
            <div className={`${styles.imgContainer}`} >
                <img src={data.ingredient.image} alt={data.ingredient.name} className={`${styles.img}`} />
            </div>
            <p className={`text text_type_main-default ml-4 mr-4 ${styles.name}`}>{data.ingredient.name}</p>
            <div className={`${styles.price}`}>
                <p className="text text_type_digits-default ">
                    {data.count} x {data.ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}
export default OrderIngredient