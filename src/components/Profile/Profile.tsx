
import React, { FC, FormEvent } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch,useSelector } from '../../hooks/hooks';
import { useRef } from 'react';
import changeProfileData from '../../services/async/ChangeProfileData';
import styles from './Profile.module.css'
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
const Profile:FC =()=> {
    const dispatch = useDispatch()
    const startName = useSelector(state => state.userName)
    const startEmail = useSelector(state => state.userEmail)
    const [name, setName] = React.useState<string>(startName)
    const [email, setEmail] = React.useState<string>(startEmail)
    const [password, setPassword] = React.useState('******')
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const changeProf = (event:FormEvent) => {
        event.preventDefault()
        dispatch(changeProfileData(name, email))
    }
    const startValues = () => {
        setName(startName)
        setEmail(startEmail)
    }
    return (
        <>
            <div className={`${styles.Profile}`} >
                <ProfileNavigation />
                <form className={`${styles.Column} mt-30`} onSubmit={changeProf}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        name={'name'}
                        icon={'EditIcon'}
                        error={false}
                        ref={nameRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                    />
                    <Input
                        type={'email'}
                        placeholder={'Логин'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        icon={'EditIcon'}
                        error={false}
                        ref={emailRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6"
                    />
                    <Input
                        type={'text'}
                        placeholder={'Пароль'}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        icon={'EditIcon'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mt-6 mb-6"
                    />
                    {(name !== startName || email !== startEmail) ?
                        <div className={`${styles.buttons}`}>
                            <p className={`text text_type_main-default text_color_inactive ${styles.text} mr-10`} onClick={startValues}>Отмена</p>
                            <Button htmlType="submit" type="primary" size="large" >
                                Сохранить
                            </Button>
                        </div>
                        : null
                    }
                </form>
            </div>
        </>

    )
}
export default Profile