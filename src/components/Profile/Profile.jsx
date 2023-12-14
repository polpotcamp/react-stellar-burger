import AppHeader from '../AppHeader/AppHeader';
import React from 'react';
import { EditIcon,Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from '../../services/async/LogOut';
import { fetchWithRefresh } from '../../services/async/FetchWithRefresh';
import { BASE_URL } from '../../utils/Api';
import { useRef } from 'react';
import styles from './Profile.module.css'
function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    const [userName,setUserName] = React.useState('')
    const [userEmail,setUserEmail] = React.useState('')
    const nameRef = useRef(userName)
    const emailRef = useRef(userEmail)
    const logout = () => {
        dispatch(LogOut())
        navigate('/', { state: initialBreadcrumb });
    }
    const changeProf = () =>{
       const name = nameRef.current.value
       const email = emailRef.current.value
       fetchWithRefresh(`${BASE_URL}/auth/user`,{
        method: 'PATCH',
        headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken")),
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            name: name,
            email: email
        }).then((data) => {
            setUserEmail(data.user.email)
            setUserName(data.user.name)
        })
    })
    }
      React.useEffect(() => {
         fetchWithRefresh(`${BASE_URL}/auth/user`,{
                method: 'GET',
                headers: {
                    authorization: JSON.parse(localStorage.getItem("accessToken"))
                }
            }).then((data) => {
                setUserEmail(data.user.email)
                setUserName(data.user.name)
            })
        }
    , [])
    return (
        <>
            <AppHeader />
            <div className={`${styles.Profile} mt-30`} >
                <div className={`${styles.Column}`}>
                    <nav className={`${styles.Column} mr-15`}>
                        <p className={`text text_type_main-large ${styles.NavText}`}>
                            Профиль
                        </p>
                        <p className={`text text_type_main-large text_color_inactive ${styles.NavText}`}>
                            История заказов
                        </p>
                        <p className={`text text_type_main-large text_color_inactive ${styles.NavText}`} onClick={logout}>
                            Выход
                        </p>
                    </nav>
                    <p className={`text text_type_main-default text_color_inactive mt-20 ${styles.Description}`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
                <div className={`${styles.Column}`}>
                    <div className={`${styles.InputPlace} mb-6`} >
                        <div className={`${styles.Column}`} >
                            <p className={`text text_type_main-default text_color_inactive ${styles.InputText}`}>
                                Имя
                            </p>
                            <input type="text" placeholder={userName} ref={nameRef} className={`mt-6 ${styles.Input} text text_type_main-default text_color_inactive`} />
                        </div>
                        <div className={`${styles.EditIcon}`}>
                            <EditIcon type="primary" />
                        </div>
                    </div>
                    <div className={`${styles.InputPlace} mb-6`} >
                        <div className={`${styles.Column}`} >
                            <p className={`text text_type_main-default text_color_inactive ${styles.InputText}`}>
                                Логин
                            </p>
                            <input type="text" placeholder={userEmail} ref={emailRef} className={`mt-6 ${styles.Input} text text_type_main-default text_color_inactive`} />
                        </div>
                        <div className={`${styles.EditIcon}`}>
                            <EditIcon type="primary" />
                        </div>
                    </div>
                    <div className={`${styles.InputPlace} mb-6`} >
                        <div className={`${styles.Column}`} >
                            <p className={`text text_type_main-default text_color_inactive ${styles.InputText}`}>
                                Пароль
                            </p>
                            <input type="password" placeholder='******' className={`mt-6 ${styles.Input} text text_type_main-default text_color_inactive`} />
                        </div>
                        <div className={`${styles.EditIcon}`}>
                            <EditIcon type="primary" />
                        </div>
                    </div>
                    <Button htmlType="button" type="primary" size="large" onClick={changeProf} >
                        Сохранить
                    </Button>
                </div>
            </div>
        </>

    )
}
export default Profile