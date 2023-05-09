import { useEffect } from 'react';
import { MyPosts } from './myPosts/MyPosts';
import style from './profile.module.css';
import { ProfileInfo } from './profileInfo/ProfileInfo';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserProfileAC } from '../../redux/profile-reducer';

export const Profile = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/20178`)
      .then((res) => {
        dispatch(setUserProfileAC(res.data));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.profile}>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};
