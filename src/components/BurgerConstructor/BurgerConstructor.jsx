import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import React from "react";
import OrderDetails from '../OrderDetails/OrderDetails';
import PropTypes from 'prop-types';
function BurgerConstructor({ data }) {
    const [modalActive, setModalActive] = React.useState(false)
    function isTrueType() {
        let a = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].type !== 'bun') {
                a.push(data[i])
            }
        }
        return a
    }
    const notBun = isTrueType()
    return (
        <div className={`${BurgerConstructorStyles.BurgerConstructor} mt-25`}>
            <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${ data[0].name} (верх)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                />
                <div  className={`${BurgerConstructorStyles.elements} custom-scroll`}>
                {notBun.map((ingredient)=>(
                    <ConstructorElement
                    dragIcon={true}
                    text={`${ingredient.name}`}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    key={ingredient._id}
                />
                ))}
                </div>
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={`${ data[0].name} (низ)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                />
           
            <div className={`${BurgerConstructorStyles.buy} mt-10`} >
                <div className={`mr-10 ${BurgerConstructorStyles.price}`} >
                    <p className="text text_type_digits-medium mr-2"  >610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => setModalActive(true)}>
                    Оформить заказ
                </Button>
            </div>

            {modalActive && (
        <Modal setActive={setModalActive}>
          <OrderDetails />
        </Modal>
      )}
        </div>
    )
}
BurgerConstructor.propTypes = {
    data: PropTypes.array
}
export default BurgerConstructor