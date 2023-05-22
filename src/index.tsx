import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import AppWrapper from './components/app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>,
);

reportWebVitals();
