import styles from './RegisterForm.module.css'
import AppHeader from '../AppHeader/AppHeader';
import { ShowIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom'
import { Registration } from '../../services/async/Registration';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
function RegisterForm() {
    const dispatch = useDispatch()
    const nameRef = useRef(null)
    const passwordRef = useRef(null)
    const emailRef = useRef(null)
    const navigate = useNavigate();
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    const ToLogin = () => {
        navigate('/login', { state: initialBreadcrumb });
    };
    const Registr = () => {
        const name = nameRef.current.value
        const password = passwordRef.current.value
        const email= emailRef.current.value
        dispatch(Registration(email,password, name))
        navigate('/', { state: initialBreadcrumb });
    }
    return (
        <>
            <AppHeader />
            <div className={`${styles.Container}`}>
                <p className="text text_type_main-medium">
                    Регистрация
                </p>
                <input type="text" placeholder='Имя' ref={nameRef} className={`mt-6 ${styles.Input} text text_type_main-default text_color_inactive`} />
                <input type="email" placeholder='E-mail' ref={emailRef} className={`mt-6 ${styles.Input} text text_type_main-default text_color_inactive`} />
                <div className={`${styles.Password} mb-6`} >
                    <input type="password" placeholder='Пароль' ref={passwordRef} className={`mt-6 ${styles.Input} text text_type_main-default text_color_inactive`} />
                    <div className={`${styles.PasswordIcon}`}>
                        <ShowIcon type="primary" />
                    </div>
                </div>
                <div onClick={Registr}>
                    <Button htmlType="button" type="primary" size="large">
                        Зарегистрироваться
                    </Button>
                </div>
                <div className={`${styles.Links} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        уже зарегистрированы?
                    </p>
                    <p className={`text text_type_main-default text_color_inactive ${styles.ColoredText}`} onClick={ToLogin}>Войти</p>
                </div>
            </div>
        </>
    )
}
export default RegisterForm