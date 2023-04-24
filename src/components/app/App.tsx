import { Dialogs } from '../dialogs/Dialogs';
import { Header } from '../header/Header';
import { Navbar } from '../navbar/Navbar';
// import { Profile } from '../profile/Profile';

import './App.css';

export const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Navbar />
      <main className='main'>
        {/* <Profile /> */}
        <Dialogs />
      </main>
    </div>
  );
};
