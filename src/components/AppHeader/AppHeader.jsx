import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import mainStyles from './AppHeader.module.css'
import { useNavigate } from 'react-router-dom'
function AppHeader() {
    const navigate = useNavigate();
    const toHomePage = () => {
        const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
        navigate('/', { state: initialBreadcrumb });
    };
    const toProfile = () => {
        const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
        navigate('/profile', { state: initialBreadcrumb });
    };
    const toFeed = () => {
        const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
        navigate('/feed', { state: initialBreadcrumb });
    };
    return (
        <header className={`${mainStyles.header} `}>
            <div className={` ${mainStyles.container} mt-4 mb-4`}>
                <nav className={`${mainStyles.menu} `}>
                    <div className={`${mainStyles.item} pl-5 pr-5 pb-4 pt-4 mr-2`} onClick={toHomePage}>
                        <BurgerIcon type="primary" />
                        <p className={`text text_type_main-default ml-2 `}>Конструктор</p>
                    </div>
                    <div className={`${mainStyles.item} pl-5 pr-5 pb-4 pt-4`} onClick={toFeed}>
                        <ListIcon type="secondary" />
                        <p className={`text text_type_main-default ml-2 text_color_inactive`}> Лента заказов </p>
                    </div>
                </nav>
                <div onClick={toHomePage}>
                    <Logo />
                </div>
                <div className={`${mainStyles.personalAccount} pl-5 pr-5 pb-4 pt-4`} onClick={toProfile}>
                    <ProfileIcon type="secondary" />
                    <p className={`text text_type_main-default ml-2 text_color_inactive`}> Личный кабинет </p>
                </div>
            </div>
        </header>

    )
}
export default AppHeader