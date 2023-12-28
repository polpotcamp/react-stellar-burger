import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './OrderCard.module.css'
import { useSelector } from 'react-redux';
function OrderCard({ data}) {
    const ingredientsInOrderIds = data.ingredients
    const ingredients = useSelector(state => state.apiData)
    const ingredientsInOrder = ingredientsInOrderIds.map((ingredientId)=>(ingredients.find(x => x._id === ingredientId))) 
    const anotherIngredients = ingredientsInOrder.length - 6
    function calculateTotalPrice() {
        let price = 0
        for (let i = 0; i < ingredientsInOrder.length; i++) {
            const ingr = ingredientsInOrder[i]
            if (ingr !== undefined) {
                price += ingr.price
            }
        }
        return price
    }
    const totalPrice = calculateTotalPrice()
    const date = data.createdAt.replace('T',' ')
    const createdAt= date.substring(0,19)
    return (
            <div className={`${styles.card} pb-6 mb-4`}>
                <div className={`${styles.line}  ml-6 pt-6 mb-6`}>
                    <p className="text text_type_digits-medium">
                        #{data.number}
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {createdAt}
                    </p>
                </div>
                <p className="text text_type_main-medium mb-6 ml-6" >
                    {data.name}
                </p>
                <div className={`${styles.line} ml-6`}>
                    <div className={`${styles.ingredientsLine}`} >
                        <div className={`${styles.imgContainer}`} >
                            <img src={ingredientsInOrder[0].image} alt={ingredientsInOrder[0].name} className={`${styles.img}`} />
                        </div>
                        {(ingredientsInOrder[1] !== undefined) ?
                            <div className={`${styles.imgContainer} ${styles.imgContainer2}`} >
                                <img src={ingredientsInOrder[1].image} alt={ingredientsInOrder[1].name} className={`${styles.img}`} />
                            </div> : null
                        }
                        {(ingredientsInOrder[2] !== undefined) ?
                            <div className={`${styles.imgContainer} ${styles.imgContainer3}`} >
                                <img src={ingredientsInOrder[2].image} alt={ingredientsInOrder[2].name} className={`${styles.img}`} />
                            </div> : null
                        }
                        {(ingredientsInOrder[3] !== undefined) ?
                            <div className={`${styles.imgContainer} ${styles.imgContainer4}`} >
                                <img src={ingredientsInOrder[3].image} alt={ingredientsInOrder[3].name} className={`${styles.img}`} />
                            </div> : null
                        }
                        {(ingredientsInOrder[4] !== undefined) ?
                            <div className={`${styles.imgContainer} ${styles.imgContainer5}`} >
                                <img src={ingredientsInOrder[4].image} alt={ingredientsInOrder[4].name} className={`${styles.img}`} />
                            </div> : null
                        }
                        {(ingredientsInOrder[5]!== undefined) ?
                            <div className={` ${styles.imgContainer} ${styles.imgContainer6}`} >
                                <p className={`${styles.imgText} text text_type_digits-default`}>+{anotherIngredients}</p>
                                <img src={ingredientsInOrder[5].image} alt={ingredientsInOrder[5].name} className={`${styles.img6}`} />
                            </div> : null
                        }
                    </div>
                    <div className={`${styles.price}`}>
                        <p className="text text_type_digits-medium mr-2">
                            {totalPrice}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
    )
}
export default OrderCard