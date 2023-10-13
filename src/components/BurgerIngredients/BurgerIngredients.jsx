import Mainstyles from './BurgerIngredients.module.css'
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientList from '../IngredientList/IngredientList';
import PropTypes from 'prop-types';
function BurgerIngredients(data) {
    const [current, setCurrent] = React.useState('one')
    return (
        <section className={`${Mainstyles.burgerIngredients} mr-10`}>
            <p className={`text text_type_main-large mt-10`}>Соберите Бургер</p>
            <div style={{ display: 'flex' }} className={`mt-5`}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={`${Mainstyles.categories} custom-scroll`}>
                <IngredientList Ingredients={data} type='bun' name='Булки'/>
                <IngredientList Ingredients={data} type='sauce' name='Соусы'/>
                <IngredientList Ingredients={data} type='main' name='Начинки'/>
            </div>
        </section>     
    )
}
BurgerIngredients.propTypes ={
    data: PropTypes.array.isRequired  
   }
export default BurgerIngredients