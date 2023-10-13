import IngredientListStyles from './IngredientList.module.css'
import IngredientСard from '../IngredientСard/IngredientСard'
import PropTypes from 'prop-types';
function IngredientList({ ingredients, type, name }) {
    function isTrueType() {
        let a = []
        for (let i = 0; i < ingredients.data.length; i++) {
            if (ingredients.data[i].type === type) {
                a.push(ingredients.data[i])
            }
        }
        return a
    }
    const ingredientss = isTrueType()
    return (
        <>
            <p className="text text_type_main-medium mt-10 mb-6">{name}</p>
            <div className={`${IngredientListStyles.list} pl-4 pr-4`}>
                {ingredientss.map((ingredient) => (
                    <IngredientСard ingredient={ingredient} key={ingredient._id} />
                ))}
            </div>
        </>
    )
}
IngredientList.propTypes = {
    ingredients: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}
export default IngredientList