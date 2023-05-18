import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { initializeApp } from '../../redux/app-reducer';
import { Preloader } from '../common/preloader/Preloader';
import { MyDialogs } from '../dialogs/MyDialogs';
import { Header } from '../header/Header';
import { Login } from '../login/Login';
import { Navbar } from '../navbar/Navbar';
import { Profile } from '../profile/Profile';
import { Users } from '../users/Users';
import './App.css';

export const App = (props) => {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.app.initialized);

  useEffect(() => {
    dispatch(initializeApp());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Header />
        <Navbar />
        <main className='main'>
          {initialized ? (
            <Routes>
              <Route
                path='/profile/:userId?'
                element={<Profile />}
              />
              <Route
                path='dialogs/*'
                element={<MyDialogs />}
              />
              <Route
                path='users/'
                element={<Users />}
              />
              <Route
                path='login/'
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
        </main>
      </BrowserRouter>
    </div>
  );
};
