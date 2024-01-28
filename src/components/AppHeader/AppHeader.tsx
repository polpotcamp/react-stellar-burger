import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import mainStyles from './AppHeader.module.css'
import { NavLink } from 'react-router-dom'
import React from 'react';
function AppHeader() {
    return (
        <header className={`${mainStyles.header} `}>
            <div className={` ${mainStyles.container} mt-4 mb-4`}>
                <nav className={`${mainStyles.menu} `}>
                    <NavLink className={`pl-5 pr-5 pb-4 pt-4 mr-2 ${mainStyles.item}`} to={'/'} >
                        {({ isActive }) => (
                            <>
                                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                                <p className={isActive ? `text text_type_main-default ml-2 ${mainStyles.active} ` : ` text text_type_main-default ml-2 text_color_inactive`} >Конструктор</p>
                            </>
                        )}
                    </NavLink >
                    <NavLink className={`${mainStyles.item} pl-5 pr-5 pb-4 pt-4`} to={"/feed"}>
                        {({ isActive }) => (
                            <>
                                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                                <p className={isActive ? `text text_type_main-default ml-2 ${mainStyles.active} ` : ` text text_type_main-default ml-2 text_color_inactive`} > Лента заказов </p>
                            </>
                        )}
                    </NavLink>
                </nav>
                <div >
                    <Logo />
                </div>
                <NavLink className={`${mainStyles.personalAccount} pl-5 pr-5 pb-4 pt-4`} to={"/profile"}>
                    {({ isActive }) => (
                        <>
                            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                            <p className={isActive ? `text text_type_main-default ml-2 ${mainStyles.active} ` : ` text text_type_main-default ml-2 text_color_inactive`}> Личный кабинет </p>
                        </>
                    )}
                </NavLink>
            </div>
        </header>

    )
}
export default AppHeader