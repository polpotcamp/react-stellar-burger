import styles from './IngredientDetails.module.css'
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks';
type IngredientDetailsParams = {
    ingredientId: string;
}
const IngredientDetails: FC = () => {
    const id: string|undefined = useParams<IngredientDetailsParams>().ingredientId?.slice(1)
    const ingredients = useSelector(state => state.apiData)
    const ingredient = ingredients.find(x => x._id === id)
    return (
        (ingredient !== undefined) ?
            <>
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
            </> : null
    )
}
export default IngredientDetails