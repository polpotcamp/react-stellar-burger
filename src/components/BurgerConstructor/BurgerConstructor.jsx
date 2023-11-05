import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import React from "react";
import OrderDetails from '../OrderDetails/OrderDetails';
import PropTypes from 'prop-types';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorContext } from '../../services/BurgerConstructor';
import { orderContext } from '../../services/Order';
function BurgerConstructor() {
    const [domReady, setDomReady] = React.useState(false)
    const [modalActive, setModalActive] = React.useState(false)
    const { burgerConstructorData } = React.useContext(BurgerConstructorContext)
    const {order,setOrder} =React.useContext(orderContext)
    const bun = burgerConstructorData.bun
    const totalPrice = calculateTotalPrice()
    const notBun = burgerConstructorData.ingr
    React.useEffect(() => {
        setDomReady(true)
    }, [])
    function createOder() {
        const ids = []
        for (let i = 0; i < burgerConstructorData.ingr.length; i++) {
            ids.push(burgerConstructorData.ingr[i]._id)
        }
        if (burgerConstructorData.bun !== undefined) {
            ids.push(burgerConstructorData.bun._id)
            ids.unshift(burgerConstructorData.bun._id)
        }
        fetch("https://norma.nomoreparties.space/api/orders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "ingredients": ids
            })

        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(data => {
                setOrder(data.order.number)
            })
            .catch(error => {
                console.log(error)
            })
            setModalActive(true)
    }
    function calculateTotalPrice() {
        let a = 0
        if (burgerConstructorData.bun !== undefined) {
            a = burgerConstructorData.bun.price
            a *= 2
        }
        for (let i = 0; i < burgerConstructorData.ingr.length; i++) {
            a += burgerConstructorData.ingr[i].price
        }
        return a
    }
    return (
        domReady
            ?
            <div className={`${BurgerConstructorStyles.BurgerConstructor} mt-25`}>
                <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={'ml-8'}
                    key={bun._id}
                />
                <div className={`${BurgerConstructorStyles.elements} custom-scroll `} >
                    {(notBun.length !== 0) ?
                        notBun.map((ingredient) => (
                            <div className={`${BurgerConstructorStyles.elementsnobun} mt-4`} key={ingredient._id} >
                                <DragIcon type='primary' />
                                <ConstructorElement
                                    text={`${ingredient.name}`}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                />
                            </div>
                        )) : null}
                </div>
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={'ml-8'}
                />

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
                        <OrderDetails  />
                    </Modal>
                )}
            </div> : null
    )
}
BurgerConstructor.propTypes = {
    data: PropTypes.array
}
export default BurgerConstructor