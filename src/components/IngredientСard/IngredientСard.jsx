import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import CardStyles from './IngredientСard.module.css'
import Modal from '../Modal/Modal';
import React from 'react';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ingredientPropType } from "../../utils/prop-types";
import { BurgerConstructorContext } from "../../services/BurgerConstructor";
function IngredientСard({ ingredient }) {
    const [modalActive, setModalActive] = React.useState(false);
    const { burgerConstructorData, dispatch } = React.useContext(BurgerConstructorContext)
    function addIngr() {
        if (ingredient.type === 'bun') {
            dispatch({ type: 'SWITCHBUN', payload: ingredient })
        }else{
        dispatch({ type: 'ADD', payload: ingredient })
        }
        console.log(burgerConstructorData.bun)
    }
    return (
        <>
            <div className={`${CardStyles.card}`} onClick={() => addIngr()}>
                <Counter count={1} size="default" extraClass="m-1" />
                <img src={ingredient.image} alt={ingredient.name} className={`${CardStyles.img} mr-4 ml-4 mb-1`} />
                <div className={`${CardStyles.price} mb-1`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
            </div>
            {modalActive &&
                <Modal setActive={setModalActive} >
                    <IngredientDetails ingredient={ingredient} />
                </Modal>
            }

        </>
    )
}
IngredientСard.propTypes = {
    ingredient: ingredientPropType
}
export default IngredientСard