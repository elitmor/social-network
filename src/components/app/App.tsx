import { Header } from '../header/Header';
import { Navbar } from '../navbar/Navbar';
import { Profile } from '../profile/Profile';

import './App.css';

export const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Navbar />
      <Profile />
    </div>
  );
};
