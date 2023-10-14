import Mainstyles from './BurgerIngredients.module.css'
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientList from '../IngredientList/IngredientList';
import PropTypes from 'prop-types';
function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('one')
    return (
        <section className={`${Mainstyles.burgerIngredients} mr-10`}>
            <p className={`text text_type_main-large mt-10`}>Соберите Бургер</p>
            <div  className={`mt-5 ${Mainstyles.tabs}`}>
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
                <IngredientList ingredients={props.data} type='bun' name='Булки' />
                <IngredientList ingredients={props.data} type='sauce' name='Соусы' />
                <IngredientList ingredients={props.data} type='main' name='Начинки' />
            </div>
        </section>
    )
}
BurgerIngredients.propTypes = {
    data: PropTypes.array.isRequired,
}
export default BurgerIngredients