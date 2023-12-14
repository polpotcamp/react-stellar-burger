import AppHeader from '../AppHeader/AppHeader';
import { useNavigate,Navigate  } from 'react-router-dom';
import { Button, ShowIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPassword.module.css'
import { request } from '../../utils/Api';
import { BASE_URL } from '../../utils/Api';
import { useRef } from 'react';
function ResetPassword() {
    const navigate = useNavigate();
    const passwordRef = useRef(null)
    const flag = localStorage.getItem("flag")
    const ToLogin = () => {
        const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
        navigate('/login', { state: initialBreadcrumb });
    };
    const ChangePassword = () => {
        const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
        const password = passwordRef.current.value
        request(`${BASE_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "password": password,
                "token": ""
            })
        })
            .then(() =>{
                localStorage.setItem("flag", JSON.stringify(null))
                navigate('/', { state: initialBreadcrumb })
            })
            .catch(error => {
                console.log(error)
            })
    }
    if(flag !== 'true'){
       return <Navigate to="/forgot-password"/>
    }
    console.log(typeof(flag))
    return (
        <>
            <AppHeader />
            <div className={`${styles.Container}`}>
                <p className="text text_type_main-medium">
                    Восстановление пароля
                </p>
                <div className={`${styles.Password} mb-6`} >
                    <input type="password" placeholder='Введите новый пароль' ref={passwordRef} className={`mt-6 ${styles.Input} text text_type_main-default text_color_inactive`} />
                    <div className={`${styles.PasswordIcon}`}>
                        <ShowIcon type="primary" />
                    </div>
                </div>
                <input type="text" placeholder='Введите код из письма' className={`mt-6  mb-6 ${styles.Input} text text_type_main-default text_color_inactive`} />
                <div onClick={ChangePassword}>
                    <Button htmlType="button" type="primary" size="large">
                        Сохранить
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
export default ResetPassword