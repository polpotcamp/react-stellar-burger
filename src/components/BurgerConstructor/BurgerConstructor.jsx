import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import React from "react";
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../services/async/Order';
import { useDrop } from 'react-dnd';
import { switchBunAction, addIngredientAction } from '../../services/reduces/MainReducer';
import ConstructorElementList from '../ConstructorElementList/ConstructorElementList';
function BurgerConstructor() {
    const dispatch = useDispatch()
    const [domReady, setDomReady] = React.useState(false)
    const [modalActive, setModalActive] = React.useState(false)
    const ingr = useSelector(state => state.ingr)
    const bun = useSelector(state => state.bun)
    const totalPrice = calculateTotalPrice()
    const [codeName, setCodeName] = React.useState(0)
    const [, dropTarget] = useDrop({
        accept: ["ingredient"],
        drop(item) {
            if (item.ingredient !== undefined) {
                const ingredient = item.ingredient
                if (ingredient.type === 'bun') {
                    dispatch(switchBunAction(ingredient))
                } else if (ingredient.type !== 'bun') {
                    const newIngredient = JSON.parse(JSON.stringify(ingredient))
                    newIngredient.codeName = codeName
                    setCodeName(codeName + 1)
                    dispatch(addIngredientAction(newIngredient))
                }
            }
        }
    })
    function createOder() {
        const ids = []
        for (let i = 0; i < ingr.length; i++) {
            ids.push(ingr[i]._id)
        }
        if (bun !== undefined) {
            ids.push(bun._id)
            ids.unshift(bun._id)
        }
        dispatch(fetchOrder(ids))
        setModalActive(true)
    }
    function calculateTotalPrice() {
        let a = 0
        if (bun.length !== 0) {
            a = bun.price
            a *= 2
        }
        if (ingr.length > 0) {
            for (let i = 0; i < ingr.length; i++) {
                a += ingr[i].price
            }
        }
        return a
    }
    console.log(ingr)
    React.useEffect(() => {
        setDomReady(true)
    }, [])
    return (
        domReady
            ?
            <div className={`${BurgerConstructorStyles.BurgerConstructor} mt-25`} ref={dropTarget}>
                {(bun.length !== 0) ?
                    <div draggable={true}>
                        <ConstructorElement
                            type='top'
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass={'ml-8'}
                            key={bun._id}
                        />
                    </div> :
                    <div className={`${BurgerConstructorStyles.ChoiseBunTop}`}>
                        <p className="text text_type_main-medium">выберите булки</p>
                    </div>}
                <div className={`${BurgerConstructorStyles.elements} custom-scroll `} >
                    {(ingr.length !== 0) ?
                        ingr.map((ingredient, i) => (
                            <ConstructorElementList ingredientInConstructor={ingredient} index={i}  key={ingredient.codeName}/>
                        )) : null}
                </div>
                {(bun.length !== 0) ?
                    <div draggable={true}>
                        <ConstructorElement
                            type='bottom'
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass={'ml-8'}
                        />
                    </div> : <div className={`${BurgerConstructorStyles.ChoiseBunBot}`}>
                        <p className="text text_type_main-medium">выберите булки</p>
                    </div>}

                <div className={`${BurgerConstructorStyles.buy} mt-10`} >
                    <div className={`mr-10 ${BurgerConstructorStyles.price}`} >
                        <p className="text text_type_digits-medium mr-2"  >{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="large" onClick={() => createOder()}>
                        Оформить заказ
                    </Button>
                </div>
                {modalActive && (
                    <Modal setActive={setModalActive}>
                        <OrderDetails />
                    </Modal>
                )}
            </div>
            : null
    )
}
export default BurgerConstructor