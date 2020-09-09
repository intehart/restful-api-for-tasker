import React, {useContext, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {loading, request} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data);
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
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
                    onClick={loginHandler}
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