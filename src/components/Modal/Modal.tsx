import ModalStyles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from "react";
import ReactDOM from 'react-dom'
import ModalOverlay from '../ModalOverlay/ModalOverlay';
interface IModalProps {
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactChild;
}
const Modal: FC<IModalProps> = ({ setActive, children }) => {
    const container = document.querySelector('#modals') as HTMLElement
    const [domReady, setDomReady] = React.useState<boolean>(false)
    function closeModal() {
        setActive(false)
    }
    React.useEffect(() => {
        const closeByEsc = (evt:KeyboardEvent) => {
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
                        <CloseIcon onClick={closeModal} type='primary'/>
                    </div>
                    {children}
                </div>
            </div>
        ),container) : null
}
export default Modal