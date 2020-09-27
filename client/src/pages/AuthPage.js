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
              <label htmlFor="email">
                <p>Email</p>
              </label>
              <input
                    type="email"
                    id="email"
                    placeholder="Введите email"
                    name="email"
                    className="input"
                    onChange={changeHandler}
                />
                <br/>
                <label htmlFor="username">
                  <p>Имя пользователя</p>
                  <input
                    type="text"
                    id="username"
                    placeholder="Введите имя пользователя"
                    name="username"
                    className="input"
                    onChange={changeHandler}
                  />
                </label>
                <br/>
                <label htmlFor="password">
                  <p>Пароль</p>
                  <input
                    type="password"
                    id="password"
                    placeholder="Введите пароль"
                    name="password"
                    className="input"
                    onChange={changeHandler}
                  />
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