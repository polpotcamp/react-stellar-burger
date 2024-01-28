
import { FC } from 'react';
import ModalOverlayStyles from './ModalOverlay.module.css'
interface ModalOverlayProps {
  onClick: () => void;
}
const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
  return (
    <div className={ModalOverlayStyles.overlay} onClick={onClick}></div>
  )
}
export default ModalOverlay