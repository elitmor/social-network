import { Suspense, lazy, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { initializeApp } from '../../redux/app-reducer';
import { getInitialized } from '../../redux/app-selectors';
import store from '../../redux/store';
import { Preloader } from '../common/preloader/Preloader';
import { Header } from '../header/Header';
import { Login } from '../login/Login';
import { Navbar } from '../navbar/Navbar';
import { Users } from '../users/Users';
import './App.css';

const Profile = lazy(() => import('../profile/Profile'));
const MyDialogs = lazy(() => import('../dialogs/MyDialogs'));

const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector(getInitialized);

  useEffect(() => {
    dispatch(initializeApp());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='wrapper'>
      <HashRouter>
        <Header />
        <Navbar />
        <main className='main'>
          <Suspense fallback={<Preloader />}>
            {initialized ? (
              <Routes>
                <Route
                  path='/profile/:userId?'
                  element={<Profile />}
                />
                <Route
                  path='/dialogs/*'
                  element={<MyDialogs />}
                />
                <Route
                  path='/users/'
                  element={<Users />}
                />
                <Route
                  path='/login/'
                  element={<Login />}
                />
                <Route
                  path='/'
                  element={<Navigate to='/profile' />}
                />
              </Routes>
            ) : (
              <Preloader />
            )}
          </Suspense>
        </main>
      </HashRouter>
    </div>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
