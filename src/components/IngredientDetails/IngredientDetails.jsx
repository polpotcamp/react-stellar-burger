import styles from './IngredientDetails.module.css'
import PropTypes from 'prop-types';
function IngredientDetails({ Ingredient }) {
    return (
        <div className={styles.ingredientDetails}>
            <p className="text text_type_main-large mt-10 mr-10 ml-10">
                Детали ингредиента
            </p>
            <img src={Ingredient.image} alt={Ingredient.name} className={`${styles.img} mr-25 ml-25 pl-5 pr-5`}/>
            <p className="text text_type_main-medium mt-4 mb-8 ml-25 mr-25">
                {Ingredient.name}
            </p>
            <div className={`${styles.flexbox} mb-15 mr-25 ml-25`}>
                <div className={styles.property}>
                    <p className="text  text_type_main-default text_color_inactive">
                        Калории,ккал
                    </p>
                    <p className="text  text_type_digits-default text_color_inactive">
                        {Ingredient.calories}
                    </p>
                </div>
                <div className={styles.property}>
                    <p className="text  text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text  text_type_digits-default text_color_inactive">
                        {Ingredient.proteins}
                    </p>
                </div>
                <div className={styles.property}>
                    <p className="text  text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text  text_type_digits-default text_color_inactive">
                        {Ingredient.fat}
                    </p>
                </div>
                <div className={styles.property}>
                    <p className="text  text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text  text_type_digits-default text_color_inactive">
                        {Ingredient.carbohydrates}
                    </p>
                </div>
            </div>
        </div>
    )
}
IngredientDetails.propTypes ={
    Ingredient:PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        calories:PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat:PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
      }),
   }
export default IngredientDetails