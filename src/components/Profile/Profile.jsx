
import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux';
import { logOut } from '../../services/async/LogOut';
import { useRef } from 'react';
import changeProfileData from '../../services/async/ChangeProfileData';
import getUserData from '../../services/async/GetUserData';

import styles from './Profile.module.css'
function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const startname = useSelector(state => state.userName)
    const startEmail =useSelector(state => state.userEmail)
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    const [name, setName] = React.useState(startname)
    const [email, setEmail] = React.useState(startEmail)
    const [password, setPassword] = React.useState('******')
    const nameRef = useRef(name)
    const emailRef = useRef(email)
    const logout = () => {
        dispatch(logOut())
        navigate('/', { state: initialBreadcrumb });
    }
    const toOrders = () => {
        navigate('/profile/orders', { state: initialBreadcrumb });
    };
    const changeProf = event => {
        event.preventDefault()
        dispatch(changeProfileData(name, email))
    }
    React.useEffect(() => {
        dispatch(getUserData())
    }, [])
    return (
        <>
            <div className={`${styles.Profile} mt-30`} >
                <div className={`${styles.Column}`}>
                    <nav className={`${styles.Column} mr-15`}>
                        <p className={`text text_type_main-large ${styles.NavText}`}>
                            Профиль
                        </p>
                        <p className={`text text_type_main-large text_color_inactive ${styles.NavText}`} onClick={toOrders}>
                            История заказов
                        </p>
                        <p className={`text text_type_main-large text_color_inactive ${styles.NavText}`} onClick={logout}>
                            Выход
                        </p>
                    </nav>
                    <p className={`text text_type_main-default text_color_inactive mt-20 ${styles.Description}`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
                <form className={`${styles.Column}`} onSubmit={changeProf}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        name={'name'}
                        icon={'EditIcon'}
                        error={false}
                        ref={nameRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                    />
                    <Input
                        type={'email'}
                        placeholder={'Логин'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        icon={'EditIcon'}
                        error={false}
                        ref={emailRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                    />
                    <Input
                        type={'text'}
                        placeholder={'Пароль'}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        icon={'EditIcon'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6 mb-6"
                    />
                    <Button htmlType="submit" type="primary" size="large" >
                        Сохранить
                    </Button>
                </form>
            </div>
        </>

    )
}
export default Profile