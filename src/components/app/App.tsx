import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MyDialogs } from '../dialogs/MyDialogs';
import { Header } from '../header/Header';
import { Login } from '../login/Login';
import { Navbar } from '../navbar/Navbar';
import { Profile } from '../profile/Profile';
import { Users } from '../users/Users';
import './App.css';

export const App = (props: any) => {
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Header />
        <Navbar />
        <main className='main'>
          <Routes>
            <Route
              path='/'
              element={<Navigate to='/profile' />}
            />
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
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};
