import ModalStyles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
function Modal({ active, setActive, children, overlay }) {
    const container = document.querySelector('#main')
    const [domReady, setDomReady] = React.useState(false)
    const closeByEsc = evt => {
        if (evt.key === `Escape`) {
            setActive(false)
        }
    }
    React.useEffect(() => {
        setDomReady(true)
        window.addEventListener('keydown', closeByEsc)
        return () =>{ window.removeEventListener('keydown', closeByEsc)
    
    }
    }, [])
    return domReady
        ? ReactDOM.createPortal((
            <div className={active ? `${ModalStyles.modal} ${ModalStyles.active}` : `${ModalStyles.modal}`} onClick={() => setActive(false)}>
                <div className={ModalStyles.content} onClick={e => e.stopPropagation()}>
                    <div className={ModalStyles.close}>
                        <CloseIcon onClick={() => setActive(false)}/>
                    </div>
                    {children}
                </div>
                {overlay}
            </div>
        ), container) : null
}
Modal.propTypes ={
    active: PropTypes.bool.isRequired,
    setActive: PropTypes.func.isRequired,
    children:PropTypes.object.isRequired,
    overlay:PropTypes.object.isRequired
   }
export default Modal