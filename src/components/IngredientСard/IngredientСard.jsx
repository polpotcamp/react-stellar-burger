import { Counter,CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import CardStyles from './IngredientСard.module.css'
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import React from 'react';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import PropTypes from 'prop-types';
function IngredientСard({ingredient}){
    const [modalActive, setModalActive] = React.useState(false)
    return(
        <>
        <div className={`${CardStyles.card}`} onClick={()=>setModalActive(true)}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={ingredient.image} alt={ingredient.name} className={`${CardStyles.img} mr-4 ml-4 mb-1`}/>
            <div className={`${CardStyles.price} mb-1`}>
            <p className="text text_type_digits-default">{ingredient.price}</p>
            <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
        </div>
        <Modal active={modalActive} setActive={setModalActive} overlay={ <ModalOverlay />}>
            <IngredientDetails  Ingredient={ingredient}/>
        </Modal>
        </>
    )
}
IngredientСard.propTypes ={
    ingredient: PropTypes.shape({
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
   }
export default IngredientСard