import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {CreateTaskPage} from './pages/CreateTaskPage';
import {TasksPage} from './pages/TasksPage';
import {TaskDetailPage} from './pages/TaskDetailPage';
import {AuthPage} from "./pages/AuthPage";

export const useRouts = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/tasks" exact>
                    <TasksPage />
                </Route>
                <Route path="/task-detail/:id" exact>
                    <TaskDetailPage />
                </Route>
                <Route path="/task-crate">
                    <CreateTaskPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route to="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}