import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setUserProfileAC } from '../../redux/profile-reducer';
import { MyPosts } from './myPosts/MyPosts';
import style from './profile.module.css';
import { ProfileInfo } from './profileInfo/ProfileInfo';

export const Profile = (props: any) => {
  const dispatch = useDispatch();
  let { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      userId = '20178';
    }
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
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
