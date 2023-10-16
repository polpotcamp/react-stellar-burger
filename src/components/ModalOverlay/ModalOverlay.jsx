
import ModalOverlayStyles from './ModalOverlay.module.css'
function ModalOverlay({onClick}) {
  return (
    <div className={ModalOverlayStyles.overlay} onClick={onClick}></div>
  )
}
export default ModalOverlay