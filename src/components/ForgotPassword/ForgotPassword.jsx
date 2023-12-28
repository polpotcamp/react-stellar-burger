
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPassword.module.css'
import { request } from '../../utils/Api';
import { BASE_URL } from '../../utils/Api';
import { useRef } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
function ForgotPassword() {
    const [email, setEmail] = React.useState('')
    const navigate = useNavigate();
    const emailRef = useRef(null)
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    const toResetPassword = event => {
        event.preventDefault()
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
    const toLogin = () => {
        navigate('/login', { state: initialBreadcrumb });
    };
    return (
        <>
            <div className={`${styles.Container}`}>
                <p className="text text_type_main-medium">
                    Восстановление пароля
                </p>
                <form className={`${styles.form}`} onSubmit={toResetPassword}>
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        error={false}
                        ref={emailRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mb-6 mt-6"
                    />
                    <Button htmlType="submit" type="primary" size="large">
                        Восстановить
                    </Button>
                </form>
                <div className={`${styles.Links} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
                    </p>
                    <p className={`text text_type_main-default text_color_inactive ${styles.ColoredText}`} onClick={toLogin}>Войти</p>
                </div>
            </div>
        </>
    )
}
export default ForgotPassword