import styles from './RegisterForm.module.css'
import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom'
import { registration } from '../../services/async/Registration';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
function RegisterForm() {
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const dispatch = useDispatch()
    const nameRef = useRef(null)
    const passwordRef = useRef(null)
    const emailRef = useRef(null)
    const navigate = useNavigate();
    const [typeIcon, setTypeIcon] = React.useState('HideIcon')
    const [inputPype, setInputType] = React.useState('password')
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    const ToLogin = () => {
        navigate('/login', { state: initialBreadcrumb });
    };
    const Registr = event => {
        event.preventDefault()
        dispatch(registration(email, password, name))
        navigate('/', { state: initialBreadcrumb });
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
    return (
        <>
            <div className={`${styles.Container}`}>
                <p className="text text_type_main-medium">
                    Регистрация
                </p>
                <form className={`${styles.form}`} onSubmit={Registr}>
                    <Input
                        type={'text'}
                        placeholder={'имя'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        name={'name'}
                        error={false}
                        ref={nameRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                    />
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        error={false}
                        ref={emailRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                    />
                    <Input
                        type={inputPype}
                        placeholder={'Пароль'}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        icon={typeIcon}
                        name={'password'}
                        error={false}
                        ref={passwordRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6 mb-6"
                    />
                    <Button htmlType="submit" type="primary" size="large">
                        Зарегистрироваться
                    </Button>
                </form>
                <div className={`${styles.Links} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?
                    </p>
                    <p className={`text text_type_main-default text_color_inactive ${styles.ColoredText}`} onClick={ToLogin}>Войти</p>
                </div>
            </div>
        </>
    )
}
export default RegisterForm