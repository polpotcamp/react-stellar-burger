import IngredientListStyles from './IngredientList.module.css'
import IngredientСard from '../IngredientСard/IngredientСard'
import PropTypes from 'prop-types';
function IngredientList({ ingredients, type, name }) {
console.log(ingredients)
    function isTrueType() {
        let a = []
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i].type === type) {
                a.push(ingredients[i])
            }
        }
        return a
    }
    const ingedientList = isTrueType()
    return (
        <>
            <p className="text text_type_main-medium mt-10 mb-6">{name}</p>
            <div className={`${IngredientListStyles.list} pl-4 pr-4`}>
                {ingedientList.map((ingredient) => (
                    <IngredientСard ingredient={ingredient} key={ingredient._id} />
                ))}
            </div>
        </>
    )
}
IngredientList.propTypes = {
    ingredients: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}
export default IngredientList