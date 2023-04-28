import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MyDialogs } from '../dialogs/MyDialogs';
import { Header } from '../header/Header';
import { Navbar } from '../navbar/Navbar';
import { Profile } from '../profile/Profile';
import './App.css';
import { PostType, DialogType, MessageType } from '../../../types/types';

interface AppProps {
  posts: PostType[];
  dialogs: DialogType[];
  messages: MessageType[];
}

export const App = (props: AppProps) => {
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Header />
        <Navbar />
        <main className='main'>
          <Routes>
            <Route
              path='/'
              element={<Profile posts={props.posts} />}
            />
            <Route
              path='/profile'
              element={<Profile posts={props.posts} />}
            />
            <Route
              path='dialogs/*'
              element={
                <MyDialogs
                  dialogs={props.dialogs}
                  messages={props.messages}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};
