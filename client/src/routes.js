import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {HomePage} from './pages/HomePage'
import {AuthPage} from './pages/AuthPage';
import {CreateTaskPage} from './pages/CreateTaskPage';
import {TasksPage} from './pages/TasksPage';
import {TaskDetailPage} from './pages/TaskDetailPage';

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
        <Redirect to="/task-crate" />
      </Switch>
    )
  }

    return (
      <div>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
      </div>
    )
}