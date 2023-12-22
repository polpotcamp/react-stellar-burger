import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './OrderCard.module.css'
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
function OrderCard({ data }) {
    const location = useLocation();
    const ingredientsInOrder = data.ingredients
    const ingredients = useSelector(state => state.apiData)
    const ingr1 = ingredients.find(x => x._id === ingredientsInOrder[0])
    const ingr2 = ingredients.find(x => x._id === ingredientsInOrder[1])
    const ingr3 = ingredients.find(x => x._id === ingredientsInOrder[2])
    const ingr4 = ingredients.find(x => x._id === ingredientsInOrder[3])
    const ingr5 = ingredients.find(x => x._id === ingredientsInOrder[4])
    const ingr6 = ingredients.find(x => x._id === ingredientsInOrder[5])
    const anotherIngredients = ingredientsInOrder.length - 6
    function calculateTotalPrice() {
        let price = 0
        for (let i = 0; i < ingredientsInOrder.length; i++) {
            const ingrId =ingredientsInOrder[i]
            const ingr = ingredients.find(x => x._id === ingrId)
            if(ingr!==undefined){
            price += ingr.price
            }
        }
        return price
    }
    const totalPrice = calculateTotalPrice()

    return (
        <Link key={data._id} to={`/feed/:${data._id}`} state={{ background: location }} className={`${styles.link}`}>
            <div className={`${styles.card} pb-6 mb-4`}>
                <div className={`${styles.line}  ml-6 pt-6 mb-6`}>
                    <p className="text text_type_digits-medium">
                        #{data.number}
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {data.createdAt}
                    </p>
                </div>
                <p className="text text_type_main-medium mb-6 ml-6" >
                    {data.name}
                </p>
                <div className={`${styles.line} ml-6`}>
                    <div className={`${styles.ingredientsLine}`} >
                        <div className={`${styles.imgContainer}`} >
                            <img src={ingr1.image} alt={ingr1.name} className={`${styles.img}`} />
                        </div>
                        {(ingr2 !== undefined) ?
                            <div className={`${styles.imgContainer} ${styles.imgContainer2}`} >
                                <img src={ingr2.image} alt={ingr2.name} className={`${styles.img}`} />
                            </div> : null
                        }
                        {(ingr3 !== undefined) ?
                            <div className={`${styles.imgContainer} ${styles.imgContainer3}`} >
                                <img src={ingr3.image} alt={ingr3.name} className={`${styles.img}`} />
                            </div> : null
                        }
                        {(ingr4 !== undefined) ?
                            <div className={`${styles.imgContainer} ${styles.imgContainer4}`} >
                                <img src={ingr4.image} alt={ingr4.name} className={`${styles.img}`} />
                            </div> : null
                        }
                        {(ingr5 !== undefined) ?
                            <div className={`${styles.imgContainer} ${styles.imgContainer5}`} >
                                <img src={ingr5.image} alt={ingr5.name} className={`${styles.img}`} />
                            </div> : null
                        }
                        {(ingr6 !== undefined) ?
                            <div className={` ${styles.imgContainer} ${styles.imgContainer6}`} >
                                <p className={`${styles.imgText} text text_type_digits-default`}>+{anotherIngredients}</p>
                                <img src={ingr6.image} alt={ingr6.name} className={`${styles.img6}`} />
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
        </Link>
    )
}
export default OrderCard