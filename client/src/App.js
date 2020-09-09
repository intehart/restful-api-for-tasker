import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {useRouts} from './routes';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, login, logout, userId} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRouts(isAuthenticated);
    return (
        <AuthContext.Provider value={{
            token, logout, login, userId, isAuthenticated
        }}>
            <BrowserRouter>
                <div>
                    <h1>{routes}</h1>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );

}

export default App;
