import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../header/Header';
import { Navbar } from '../navbar/Navbar';
import { Profile } from '../profile/Profile';
import './App.css';
import { MyDialogs } from '../dialogs/MyDialogs';

export const App = () => {
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Header />
        <Navbar />
        <main className='main'>
          <Routes>
            <Route
              path='/'
              element={<Profile />}
            />
            <Route
              path='/profile'
              element={<Profile />}
            />
            <Route
              path='dialogs/*'
              element={<MyDialogs />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};
