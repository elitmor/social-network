import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MyDialogs } from '../dialogs/MyDialogs';
import { Header } from '../header/Header';
import { Navbar } from '../navbar/Navbar';
import { Profile } from '../profile/Profile';
import './App.css';
import { Users } from '../users/Users';

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
              path='/profile'
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
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};
