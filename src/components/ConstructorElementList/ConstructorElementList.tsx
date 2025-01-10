import { useDrag, useDrop } from 'react-dnd';
import React from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from '../BurgerConstructor/BurgerConstructor.module.css'
import { useDispatch } from '../../hooks/hooks';
import { getRemoveIngredientAction, getSortedIngredientsAction } from '../../services/actions/Ingredients';
import { TIngredient } from '../../utils/types';
interface IConstructorElementListProps {
    ingredientInConstructor: TIngredient,
    index: number
}
const ConstructorElementList = ({ ingredientInConstructor, index }: IConstructorElementListProps) => {
    const dispatch = useDispatch()
    const ref = React.useRef<HTMLDivElement>(null)
    function removeIngredient(element: TIngredient) {
        console.log(element)
        dispatch(getRemoveIngredientAction(element))
    }
    const [, drop] = useDrop({
        accept: "ingredientInConstructor",
        hover: (item: { index: number }, monitor) => {
            const dragIndex: number = item.index
            const hoverIndex: number = index
            if (dragIndex === index) {
                return
            }
            if (ref.current !== null) {
                const hoverBoundingRect: DOMRect = ref.current.getBoundingClientRect()
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                const clientOffset = monitor.getClientOffset()
                if (clientOffset !== null) {
                    const hoverClientY = clientOffset.y - hoverBoundingRect.top
                    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                        return
                    }
                    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                        return
                    }
                    dispatch(getSortedIngredientsAction(dragIndex, hoverIndex))
                }
            }
        }
    })
    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredientInConstructor",
        item: { index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })
    dragRef(drop(ref))
    return (
        <>
        {!isDrag &&
        <div className={`${BurgerConstructorStyles.elementsnobun} mt-4`} ref={ref} >
            <DragIcon type='primary' />
            <ConstructorElement
                text={`${ingredientInConstructor.name}`}
                price={ingredientInConstructor.price}
                thumbnail={ingredientInConstructor.image}
                handleClose={() => removeIngredient(ingredientInConstructor)}
            />
        </div>}
        </>
    )
}
export default ConstructorElementList