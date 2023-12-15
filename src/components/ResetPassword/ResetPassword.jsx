
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './ResetPassword.module.css'
import { request } from '../../utils/Api';
import { BASE_URL } from '../../utils/Api';
import { useRef } from 'react';
function ResetPassword() {
    const [password, setPassword] = React.useState('')
    const [token, setToken] = React.useState('')
    const [typeIcon, setTypeIcon] = React.useState('HideIcon')
    const [inputPype, setInputType] = React.useState('password')
    const navigate = useNavigate();
    const passwordRef = useRef(null)
    const tokenRef = useRef(null)
    const flag = localStorage.getItem("flag")
    const ToLogin = () => {
        const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
        navigate('/login', { state: initialBreadcrumb });
    };
    const ChangePassword = event => {
        event.preventDefault()
        const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
        request(`${BASE_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "password": password,
                "token": token
            })
        })
            .then(() => {
                localStorage.setItem("flag", JSON.stringify(null))
                navigate('/', { state: initialBreadcrumb })
            })
            .catch(error => {
                console.log(error)
            })
    }
    const onIconClick = () => {
        if (typeIcon === 'HideIcon') {
            setTypeIcon('ShowIcon')
            setInputType('text')
        } else if (typeIcon === 'ShowIcon') {
            setTypeIcon('HideIcon')
            setInputType('password')
        }
    }
    if (flag !== 'true') {
        return <Navigate to="/forgot-password" />
    }
    console.log(typeof (flag))
    return (
        <>
            <div className={`${styles.Container}`}>
                <p className="text text_type_main-medium">
                    Восстановление пароля
                </p>
                <form className={`${styles.form}`} onSubmit={ChangePassword}>
                <Input
                    type={inputPype}
                    placeholder={'Ввведите новый пароль'}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    icon={typeIcon}
                    name={'password'}
                    error={false}
                    ref={passwordRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
               <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setToken(e.target.value)}
                    value={token}
                    name={'token'}
                    error={false}
                    ref={tokenRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6 mb-6"
                />
                    <Button htmlType="submit" type="primary" size="large">
                        Сохранить
                    </Button>
                </form>
                <div className={`${styles.Links} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
                    </p>
                    <p className={`text text_type_main-default text_color_inactive ${styles.ColoredText}`} onClick={ToLogin}>Войти</p>
                </div>
            </div>
        </>
    )
}
export default ResetPassword