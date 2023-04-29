import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MyDialogs } from '../dialogs/MyDialogs';
import { Header } from '../header/Header';
import { Navbar } from '../navbar/Navbar';
import { Profile } from '../profile/Profile';
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
              element={<Profile posts={props.store.profilePage} />}
            />
            <Route
              path='/profile'
              element={<Profile posts={props.store.profilePage} />}
            />
            <Route
              path='dialogs/*'
              element={
                <MyDialogs
                  dialogs={props.store.dialogPage}
                  messages={props.store.dialogPage}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};
