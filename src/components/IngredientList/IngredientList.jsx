import IngredientListStyles from './IngredientList.module.css'
import IngredientСard from '../IngredientСard/IngredientСard'
import PropTypes from 'prop-types';
function IngredientList({ Ingredients, type, name }) {
    function isTrueType() {
        let a = []
        for (let i = 0; i < Ingredients.data.length; i++) {
            if (Ingredients.data[i].type === type) {
                a.push(Ingredients.data[i])
            }
        }
        return a
    }
    const Ingredientss = isTrueType()
    console.log(Ingredientss)
    return (
        <>
            <p className="text text_type_main-medium mt-10 mb-6">{name}</p>
            <div className={`${IngredientListStyles.list} pl-4 pr-4`}>
                {Ingredientss.map((ingredient) => (
                    <IngredientСard ingredient={ingredient} key={ingredient._id}  />
                ))}
            </div>
        </>
    )
}
IngredientList.propTypes ={
    Ingredients: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    name:PropTypes.string.isRequired
   }
export default IngredientList