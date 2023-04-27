import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dialogs } from '../dialogs/Dialogs';
import { Header } from '../header/Header';
import { Navbar } from '../navbar/Navbar';
import { Profile } from '../profile/Profile';
import './App.css';

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
              element={<Dialogs />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};
