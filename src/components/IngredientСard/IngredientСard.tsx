import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import CardStyles from './IngredientСard.module.css'
import React, { FC } from 'react';
import { useDrag } from "react-dnd";
import { useSelector } from "../../hooks/hooks";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../utils/types";
interface IIngredientСardProps {
    ingredient: TIngredient
}
const IngredientСard: FC<IIngredientСardProps> = ({ ingredient }) => {
    const location = useLocation();
    const [count, setcount] = React.useState<number>(0)
    const ingr = useSelector(state => state.ingr)
    const bun = useSelector(state => state.bun)
    const ingredientId: string = ingredient['_id']
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: { ingredient }
    })
    React.useEffect(() => {
        if (bun!== undefined) {
            if (bun._id === ingredient._id) {
                setcount(2);
            } else {
                const array = ingr.filter(
                    (item) => item._id === ingredient._id
                );
                setcount(array.length);
            }
        }
    }, [ingr, bun])
    return (
        <>
            <Link key={ingredientId} to={`/ingredients/:${ingredientId}`} state={{ background: location }} className={`${CardStyles.link}`}>
                <div className={`${CardStyles.card}`} ref={dragRef}  >
                    <Counter count={count} size="default" extraClass="m-1" />
                    <img src={ingredient.image} draggable={false} alt={ingredient.name} className={`${CardStyles.img} mr-4 ml-4 mb-1`} />
                    <div className={`${CardStyles.price} mb-1`}>
                        <p className="text text_type_digits-default">{ingredient.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-default">{ingredient.name}</p>
                </div>
            </Link>
        </>
    )
}
export default IngredientСard