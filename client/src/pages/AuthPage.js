import React, {useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';

export const AuthPage = () => {
    const {loading, request} = useHttp();
    const [form, setForm, error] = useState({
        email: '', password: ''
    });

    useEffect(() => {

    }, [error])

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data', data);
        } catch (e) {}
    }

    return (
        <section className="auth">
            <h1 className="auth__headline">Авторизация в систему</h1>
            <div>
                <input
                    type="email"
                    id="email"
                    placeholder="Введите email"
                    name="email"
                    className="input"
                    onChange={changeHandler}
                />
                <label htmlFor="email">
                    Email
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Введите пароль"
                    name="password"
                    className="input"
                    onChange={changeHandler}
                />
                <label htmlFor="password">
                    Пароль
                </label>
            </div>
            <div>
                <button
                    disabled={loading}
                >
                    Войти
                </button>
                <button
                    onClick={registerHandler}
                    disabled={loading}
                >
                    Регистрация
                </button>
            </div>
        </section>
    )
}