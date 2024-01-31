
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FormEvent, FC } from 'react';
import styles from './ResetPassword.module.css'
import resetPassword from '../../services/async/ResetPassword';
import { useRef } from 'react';
import { useDispatch } from '../../hooks/hooks';
const ResetPassword: FC = () => {
    const dispatch = useDispatch()
    const [password, setPassword] = React.useState<string>('')
    const [token, setToken] = React.useState<string>('')
    const [typeIcon, setTypeIcon] = React.useState<any>('HideIcon')
    const [inputPype, setInputType] = React.useState<any>('password')
    const navigate = useNavigate();
    const passwordRef = useRef<HTMLInputElement>(null)
    const tokenRef = useRef<HTMLInputElement>(null)
    const flag = localStorage.getItem("flag") as string
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    const changePassword = (event: FormEvent) => {
        event.preventDefault()
        dispatch(resetPassword(password, token))
        navigate('/', { state: initialBreadcrumb })
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
    return (
        <>
            <div className={`${styles.Container}`}>
                <p className="text text_type_main-medium">
                    Восстановление пароля
                </p>
                <form className={`${styles.form}`} onSubmit={changePassword}>
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
                    <Link className={`text text_type_main-default text_color_inactive ${styles.ColoredText}`} to={'/login'}>Войти</Link>
                </div>
            </div>
        </>
    )
}
export default ResetPassword