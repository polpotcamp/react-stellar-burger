import styles from './SignInForm.module.css'
import React from 'react';
import { signUp } from '../../services/async/SignIn';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
function SignInForm() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [typeIcon, setTypeIcon] = React.useState('HideIcon')
    const [inputPype, setInputType] = React.useState('password')
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    const ToRegister = () => {
        navigate('/register', { state: initialBreadcrumb });
    };
    const ToforgotPassword = () => {
        navigate('/forgot-password', { state: initialBreadcrumb });
    };
    const Login = event => {
        event.preventDefault()
        dispatch(signUp(email, password))
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
                    Вход
                </p>
                <form onSubmit={Login} className={`${styles.form}`}>
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
                        войти
                    </Button>
                </form>
                <div className={`${styles.Links} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вы - новый ползователь?
                    </p>
                    <p className={`text text_type_main-default text_color_inactive ${styles.ColoredText}`} onClick={ToRegister}>Зарегистрироваться</p>
                </div>
                <div className={`${styles.Links} mt-4`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                    </p>
                    <p className={`text text_type_main-default text_color_inactive ${styles.ColoredText}`} onClick={ToforgotPassword}>Восстановить пароль</p>
                </div>
            </div>
        </>
    );
}

export default SignInForm;