import styles from '../components/IngredientDetails/IngredientDetails.module.css'
import React from 'react'
import { getApiData } from '../services/async/ApiData';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
function IngredientPage() {
    const dispatch = useDispatch()
    const [domReady, setDomReady] = React.useState(false)
    const id = useParams().ingredientId.slice(1)
    const ingredients = useSelector(state => state.apiData)
    const ingredient = ingredients.find(x => x._id === id)
    React.useEffect(() => {
        dispatch(getApiData())
        setTimeout(() => {
            setDomReady(true)
        }, 200)
    }, [])
    return (
        domReady ?
        <div className={styles.container}>
            <div className={styles.ingredientDetails}>
                <p className="text text_type_main-large mt-10 mr-10 ml-10">
                    Детали ингредиента
                </p>
                <img src={ingredient.image} alt={ingredient.name} className={`${styles.img} mr-25 ml-25 pl-5 pr-5`} />
                <p className="text text_type_main-medium mt-4 mb-8 ml-25 mr-25">
                    {ingredient.name}
                </p>
                <div className={`${styles.flexbox} mb-15 mr-25 ml-25`}>
                    <div className={styles.property}>
                        <p className="text  text_type_main-default text_color_inactive">
                            Калории,ккал
                        </p>
                        <p className="text  text_type_digits-default text_color_inactive">
                            {ingredient.calories}
                        </p>
                    </div>
                    <div className={styles.property}>
                        <p className="text  text_type_main-default text_color_inactive">
                            Белки, г
                        </p>
                        <p className="text  text_type_digits-default text_color_inactive">
                            {ingredient.proteins}
                        </p>
                    </div>
                    <div className={styles.property}>
                        <p className="text  text_type_main-default text_color_inactive">
                            Жиры, г
                        </p>
                        <p className="text  text_type_digits-default text_color_inactive">
                            {ingredient.fat}
                        </p>
                    </div>
                    <div className={styles.property}>
                        <p className="text  text_type_main-default text_color_inactive">
                            Углеводы, г
                        </p>
                        <p className="text  text_type_digits-default text_color_inactive">
                            {ingredient.carbohydrates}
                        </p>
                    </div>
                </div>
            </div> 
            </div>: null)
}
export default IngredientPage