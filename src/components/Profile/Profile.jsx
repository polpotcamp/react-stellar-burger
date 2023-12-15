
import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logOut } from '../../services/async/LogOut';
import { fetchWithRefresh } from '../../services/async/FetchWithRefresh';
import { BASE_URL } from '../../utils/Api';
import { useRef } from 'react';
import styles from './Profile.module.css'
function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('******')
    const nameRef = useRef(name)
    const emailRef = useRef(email)
    const logout = () => {
        dispatch(logOut())
        navigate('/', { state: initialBreadcrumb });
    }
    const changeProf = event => {
        event.preventDefault()
        fetchWithRefresh(`${BASE_URL}/auth/user`, {
            method: 'PATCH',
            headers: {
                authorization: JSON.parse(localStorage.getItem("accessToken")),
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                name: name,
                email: email
            })
                .then((data) => {
                    setEmail(data.user.email)
                    setName(data.user.name)
                })
        })
    }
    React.useEffect(() => {
        fetchWithRefresh(`${BASE_URL}/auth/user`, {
            method: 'GET',
            headers: {
                authorization: JSON.parse(localStorage.getItem("accessToken"))
            }
        }).then((data) => {
            setEmail(data.user.email)
            setName(data.user.name)
        })
    }
        , [])
    return (
        <>
            <div className={`${styles.Profile} mt-30`} >
                <div className={`${styles.Column}`}>
                    <nav className={`${styles.Column} mr-15`}>
                        <p className={`text text_type_main-large ${styles.NavText}`}>
                            Профиль
                        </p>
                        <p className={`text text_type_main-large text_color_inactive ${styles.NavText}`}>
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