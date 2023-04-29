import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
);

reportWebVitals();
