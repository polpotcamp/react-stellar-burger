import styles from './SignInForm.module.css'
import React, { FC, FormEvent } from 'react';
import { signUp } from '../../services/async/SignIn';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from '../../hooks/hooks';
import { useRef } from 'react';
const SignInForm: FC = () => {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [typeIcon, setTypeIcon] = React.useState<any>('HideIcon')
    const [inputType, setInputType] = React.useState<any>('password')
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    const login = (event: FormEvent) => {
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
        <div className={`${styles.Container}`}>
            <p className="text text_type_main-medium">
                Вход
            </p>
            <form onSubmit={login} className={`${styles.form}`}>
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
                    type={inputType}
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
                <Link className={`text text_type_main-default text_color_inactive ${styles.ColoredText}`} to={'/register'} >Зарегистрироваться</Link>
            </div>
            <div className={`${styles.Links} mt-4`}>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль?
                </p>
                <Link className={`text text_type_main-default text_color_inactive ${styles.ColoredText}`} to={'/forgot-password'}>Восстановить пароль</Link>
            </div>
        </div>
    );
}

export default SignInForm;