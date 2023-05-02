import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/App';
import './index.css';
import { addPost, store } from './redux/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App
      store={store}
      addPost={addPost}
    />
  </React.StrictMode>,
);

reportWebVitals();
