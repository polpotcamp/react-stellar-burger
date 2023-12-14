import AppHeader from '../AppHeader/AppHeader';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPassword.module.css'
import { changeEmailForResetAction } from '../../services/actions/actions';
import { request } from '../../utils/Api';
import { BASE_URL } from '../../utils/Api';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
function ForgotPassword() {
    const dispatch = useDispatch
    const navigate = useNavigate();
    const emailRef = useRef(null)
    const ToResetPassword = () => {
        const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
        const email= emailRef.current.value
        request(`${BASE_URL}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                email: email
            })
        })
            .then(() => {
                localStorage.setItem("flag", JSON.stringify(true))
                navigate('/reset-password', { state: initialBreadcrumb })
            })
            .catch(error => {
                console.log(error)
            })
    };
    const ToLogin = () => {
        const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
        navigate('/login', { state: initialBreadcrumb });
    };
    return (
        <>
            <AppHeader />
            <div className={`${styles.Container}`}>
                <p className="text text_type_main-medium">
                    Восстановление пароля
                </p>
                <input type="email" placeholder='Укажите e-mail' ref={emailRef} className={`mt-6  mb-6 ${styles.Input} text text_type_main-default text_color_inactive`} />
                <div onClick={ToResetPassword}>
                    <Button htmlType="button" type="primary" size="large">
                        Восстановить
                    </Button>
                </div>
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
export default ForgotPassword