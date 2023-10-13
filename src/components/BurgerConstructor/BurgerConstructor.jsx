import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import React from "react";
import OrderDetails from '../OrderDetails/OrderDetails';
import PropTypes from 'prop-types';
function BurgerConstructor({data}) {
    const [modalActive,setModalActive] = React.useState(false)
    return (
        <div className={`${BurgerConstructorStyles.BurgerConstructor} mt-25`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={`${BurgerConstructorStyles.elements} custom-scroll`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${data[0].name} (верх)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                /> <ConstructorElement
                    text={data[1].name}
                    price={data[1].price}
                    thumbnail={data[1].image}
                /> <ConstructorElement
                    text={data[2].name}
                    price={data[2].price}
                    thumbnail={data[2].image}
                /> <ConstructorElement
                    text={data[3].name}
                    price={data[3].price}
                    thumbnail={data[3].image}
                /><ConstructorElement
                    text={data[4].name}
                    price={data[4].price}
                    thumbnail={data[4].image}
                /><ConstructorElement
                    text={data[5].name}
                    price={data[5].price}
                    thumbnail={data[5].image}
                /> <ConstructorElement
                    text={data[6].name}
                    price={data[6].price}
                    thumbnail={data[6].image}
                /><ConstructorElement
                    text={data[7].name}
                    price={data[7].price}
                    thumbnail={data[7].image}
                /><ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${data[0].name} (низ)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                
                />

            </div>
            <div className={`${BurgerConstructorStyles.buy} mt-10`} >
                <div className='mr-10' style={{ display: 'flex', alignItems: 'center' }}>
                    <p className="text text_type_digits-medium mr-2"  >610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={()=> setModalActive(true)}>
                    Оформить заказ
                </Button>
            </div>
         
            <Modal active={modalActive} setActive={setModalActive} overlay={<ModalOverlay/>}>
                <OrderDetails/>
            </Modal>
            
        </div>
    )
}
BurgerConstructor.propTypes ={
 data: PropTypes.array  
}
export default BurgerConstructor