import ModalStyles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
function Modal({ setActive, children }) {
    const container = document.querySelector('#modals')
    const [domReady, setDomReady] = React.useState(false)
    function closeModal() {
        setActive(false)
    }
    React.useEffect(() => {
        const closeByEsc = evt => {
            if (evt.key === `Escape`) {
                closeModal()
            }
        }
        setDomReady(true)
        window.addEventListener('keydown', closeByEsc)
        return () => {
            window.removeEventListener('keydown', closeByEsc)
        }
    }, [])
    return domReady
        ? ReactDOM.createPortal((
            <div className={`${ModalStyles.modal} ${ModalStyles.active}`}>
                <ModalOverlay onClick={closeModal} />
                <div className={ModalStyles.content} onClick={e => e.stopPropagation()}>
                    <div className={ModalStyles.close}>
                        <CloseIcon onClick={closeModal} />
                    </div>
                    {children}
                </div>
            </div>
        ), container) : null
}
Modal.propTypes = {
    setActive: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
}
export default Modal