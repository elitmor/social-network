import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const posts = [
  { id: 1, message: 'Hello', likesCount: 5 },
  { id: 2, message: 'You', likesCount: 3 },
  { id: 3, message: 'How are you?', likesCount: 7 },
];

const dialogs = [
  { id: 1, name: 'Alex' },
  { id: 2, name: 'Ksy' },
  { id: 3, name: 'Liza' },
];

const messages = [
  { id: 1, message: 'Hello' },
  { id: 2, message: 'You' },
  { id: 3, message: 'How are you?' },
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App
      posts={posts}
      dialogs={dialogs}
      messages={messages}
    />
  </React.StrictMode>,
);

reportWebVitals();
