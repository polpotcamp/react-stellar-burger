import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import CardStyles from './IngredientСard.module.css'
import Modal from '../Modal/Modal';
import React from 'react';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ingredientType} from "../../utils/types";
import { switchIngredientDetailsAction} from '../../services/actions/actions';
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
function IngredientСard({ ingredient }) {
    const [modalActive, setModalActive] = React.useState(false);
    const dispatch = useDispatch()
    const [count,setcount] = React.useState(0)
    const ingr = useSelector(state => state.ingr)
    const bun = useSelector(state => state.bun)
    const [,dragRef] = useDrag({
        type: 'ingredient',
        item: {ingredient}
    })
    function openMadal(){
        dispatch(switchIngredientDetailsAction(ingredient))
        setModalActive(true)
    }
    React.useEffect(() => {
        if(bun._id === ingredient._id){
            setcount(2);
        }else{
        const array = ingr.filter(
            (item) => item._id === ingredient._id
          );
          setcount(array.length);
        }
    }, [ingr,bun])
    return (
        <>
            <div className={`${CardStyles.card}`}  ref={dragRef} onClick={ () => openMadal()} >
                <Counter count={count} size="default" extraClass="m-1" />
                <img src={ingredient.image} draggable={false} alt={ingredient.name} className={`${CardStyles.img} mr-4 ml-4 mb-1`} />
                <div className={`${CardStyles.price} mb-1`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
            </div>
            {modalActive &&
                <Modal setActive={setModalActive} >
                    <IngredientDetails />
                </Modal>
            }
        </>
    )
}
IngredientСard.propTypes = {
    ingredient: ingredientType
}
export default IngredientСard