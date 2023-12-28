import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import CardStyles from './IngredientСard.module.css'
import React from 'react';
import { ingredientType} from "../../utils/types";
import { switchIngredientDetailsAction} from '../../services/actions/actions';
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link ,useLocation} from "react-router-dom";
function IngredientСard({ ingredient }) {
    const location = useLocation();
    const dispatch = useDispatch()
    const [count,setcount] = React.useState(0)
    const ingr = useSelector(state => state.ingr)
    const bun = useSelector(state => state.bun)
    const ingredientId = ingredient['_id']
    const [,dragRef] = useDrag({
        type: 'ingredient',
        item: {ingredient}
    })
    function openMadal(){
        dispatch(switchIngredientDetailsAction(ingredient))
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
        <Link key={ingredientId} to={`/ingredients/:${ingredientId}`} state={{ background: location }} className={`${CardStyles.link}`}>
            <div className={`${CardStyles.card}`}  ref={dragRef} onClick={ () => openMadal()} >
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
IngredientСard.propTypes = {
    ingredient: ingredientType
}
export default IngredientСard