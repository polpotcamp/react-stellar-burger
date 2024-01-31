import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import React, { FC } from "react";
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { fetchOrder } from '../../services/async/Order';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom'
import { getSwitchBunAction, getAddIngredientAction } from '../../services/actions/Ingredients';
import ConstructorElementList from '../ConstructorElementList/ConstructorElementList';
import { TIngredient } from '../../utils/types';
const BurgerConstructor: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [domReady, setDomReady] = React.useState<boolean>(false)
    const [modalActive, setModalActive] = React.useState<boolean>(false)
    const isAuthorization = useSelector(state => state.isAuthorization)
    const ingr = useSelector(state => state.ingr)
    const bun = useSelector(state => state.bun)
    const totalPrice:number = calculateTotalPrice()
    const [codeName, setCodeName] = React.useState<number>(0)
    const [, dropTarget] = useDrop({
        accept: ["ingredient"],
        drop(item: {
            ingredient: TIngredient
        }) {
            if (item.ingredient !== undefined) {
                const ingredient:TIngredient = item.ingredient
                if (ingredient.type === 'bun') {
                    dispatch(getSwitchBunAction(ingredient))
                } else if (ingredient.type !== 'bun') {
                    const newIngredient = JSON.parse(JSON.stringify(ingredient))
                    newIngredient.codeName = codeName
                    setCodeName(codeName + 1)
                    dispatch(getAddIngredientAction(newIngredient))
                }
            }
        }
    })
    const ToProfile = () => {
        const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
        navigate('/profile', { state: initialBreadcrumb });
    };
    function createOder() {
        if (!isAuthorization) {
            ToProfile()
        }
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
        let a:number = 0
        if (bun !== undefined) {
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
    React.useEffect(() => {
        setDomReady(true)
    }, [])
    return (
        domReady
            ?
            <div className={`${BurgerConstructorStyles.BurgerConstructor} mt-25`} ref={dropTarget}>
                {
                    (bun !== undefined) ?
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
                    {
                        (ingr !== undefined) ?
                            ingr.map((ingredient, i) => (
                                <ConstructorElementList ingredientInConstructor={ingredient} index={i} key={ingredient.codeName} />
                            )) : null}
                </div>
                {(bun !== undefined) ?
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