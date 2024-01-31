import Mainstyles from './BurgerIngredients.module.css'
import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientList from '../IngredientList/IngredientList';
const BurgerIngredients: FC = () => {
    const [current, setCurrent] = React.useState('one')
    const topRef = React.useRef<HTMLDivElement>(null)
    const bunRef = React.useRef<HTMLDivElement>(null)
    const souceRef = React.useRef<HTMLDivElement>(null)
    const mainRef = React.useRef<HTMLDivElement>(null)
    function changeTab() {
        if (topRef.current !== null && bunRef.current !== null && souceRef.current !== null && mainRef.current !== null) {
            const distanceFromTop = topRef.current.scrollTop;
            const bunView = bunRef.current.getBoundingClientRect().top;
            const souceView = souceRef.current.getBoundingClientRect().top
            const mainView = mainRef.current.getBoundingClientRect().top
            if (distanceFromTop >= bunView && distanceFromTop <= souceView) {
                setCurrent("one");
            } else if (distanceFromTop >= souceView && distanceFromTop <= mainView) {
                setCurrent("two");
            } else if (distanceFromTop >= mainView) {
                setCurrent("three");
            }
        }
    }
    function tabClick(type: string, ref: any) {
        console.log(ref)
        setCurrent(type)
        ref.current.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <section className={`${Mainstyles.burgerIngredients} mr-10`} >
            <p className={`text text_type_main-large mt-10`}>Соберите Бургер</p>
            <nav className={`mt-5 ${Mainstyles.tabs}`}>
                <Tab value="one" active={current === 'one'} onClick={() => tabClick('one', bunRef)} >
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={() => tabClick('two', souceRef)}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={() => tabClick('three', mainRef)}>
                    Начинки
                </Tab>
            </nav>
            <div className={`${Mainstyles.categories} custom-scroll`} ref={topRef} onScroll={changeTab}>
                <p className="text text_type_main-medium mt-10 mb-6" ref={bunRef} >Булки</p>
                <IngredientList type='bun' />
                <p className="text text_type_main-medium mt-10 mb-6" ref={souceRef} >Соусы</p>
                <IngredientList type='sauce' />
                <p className="text text_type_main-medium mt-10 mb-6" ref={mainRef}>Начинки</p>
                <IngredientList type='main' />
            </div>
        </section>
    )
}
export default BurgerIngredients