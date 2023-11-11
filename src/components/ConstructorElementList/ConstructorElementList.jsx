import {  useDrag, useDrop } from 'react-dnd';
import React from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from '../BurgerConstructor/BurgerConstructor.module.css'
import { useDispatch} from 'react-redux';
import { removeIngredientAction ,sortedIngredientsAction } from '../../services/actions/actions';
import { ingredientType } from '../../utils/types';
import PropTypes from 'prop-types';
function ConstructorElementList({ingredientInConstructor,  index }) {
    const dispatch = useDispatch()
    const ref = React.useRef(null)
    function removeIngredient(element) {
        dispatch(removeIngredientAction(element))
    }
    const [,drop] = useDrop({
        accept:  "ingredientInConstructor",
        hover:(item,monitor) =>{
            const dragIndex =item.index
            const hoverIndex = index
            if(dragIndex ===hoverIndex ){
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
              }
              if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
              }
            dispatch(sortedIngredientsAction({dragIndex,hoverIndex}))
        }
    })
    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredientInConstructor",
        item: {index},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })
    dragRef(drop(ref))
    return (
        !isDrag && 
        <div className={`${BurgerConstructorStyles.elementsnobun} mt-4`} ref={ref} >
            <DragIcon type='primary' />
            <ConstructorElement
                text={`${ingredientInConstructor.name}`}
                price={ingredientInConstructor.price}
                thumbnail={ingredientInConstructor.image}
                handleClose={() => removeIngredient(ingredientInConstructor)}
            />
        </div>
    )
}
ConstructorElementList.propTypes = {
    ingredientInConstructor: ingredientType,
    index: PropTypes.number.isRequired
}
export default ConstructorElementList