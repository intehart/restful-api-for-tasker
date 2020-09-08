import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {useRouts} from './routes';

function App() {
  const routes = useRouts(false)
  return (
    <BrowserRouter>
      <div>
        <h1>{routes}</h1>
      </div>
    </BrowserRouter>
  );

}

export default App;
