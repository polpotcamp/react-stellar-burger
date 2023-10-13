import { Logo,BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import mainStyles from './AppHeader.module.css'
function AppHeader (){
    return(
        <header className= {`${mainStyles.header} `}>
            <div className={` ${mainStyles.container} mt-4 mb-4`}>
            <nav className={`${mainStyles.menu} `}>
                <div className={`${mainStyles.item} pl-5 pr-5 pb-4 pt-4 mr-2`}>
                <BurgerIcon type="primary"/>
                <p className= {`text text_type_main-default ml-2 `}>Конструктор</p>
                </div>
                <div className={`${mainStyles.item} pl-5 pr-5 pb-4 pt-4`}>
                <ListIcon type="secondary" />
              <p className= {`text text_type_main-default ml-2 text_color_inactive`}> Лента заказов </p>
                </div>
            </nav>
            <Logo/>
            <div className={`${mainStyles.personalAccount} pl-5 pr-5 pb-4 pt-4`}>
            <ProfileIcon type="secondary" />
            <p className= {`text text_type_main-default ml-2 text_color_inactive`}> Личный кабинет </p>
            </div>
            </div>
        </header>
       
    )
}
export default AppHeader