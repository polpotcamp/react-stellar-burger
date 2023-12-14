import styles from './SignInForm.module.css'
import { SignUp } from '../../services/async/SignIn';
import AppHeader from '../AppHeader/AppHeader';
import { ShowIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux';
import { useRef } from 'react';
function SignInForm() {
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
    const Login = () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        dispatch(SignUp(email, password))
        navigate('/', { state: initialBreadcrumb });
    }
    return (
        <>
            <AppHeader />
            <div className={`${styles.Container}`}>
                <p className="text text_type_main-medium">
                    Вход
                </p>
                <input type="email" placeholder='E-mail' ref={emailRef} className={`mt-6 ${styles.Input} text text_type_main-default text_color_inactive`} />
                <div className={`${styles.Password} mb-6`} >
                    <input type="password" placeholder='Пароль' ref={passwordRef} className={`mt-6 ${styles.Input} text text_type_main-default text_color_inactive`} />
                    <div className={`${styles.PasswordIcon}`}>
                        <ShowIcon type="primary" />
                    </div>
                </div>
                <div onClick={Login}>
                    <Button htmlType="button" type="primary" size="large">
                        войти
                    </Button>
                </div>
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