import React from 'react';

export const HomePage = () => {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/auth">Авторизоваться</Link>
      </div>
    </Router>
  )
};