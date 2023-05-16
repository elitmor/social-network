import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../redux/profile-reducer';
import { MyPosts } from './myPosts/MyPosts';
import style from './profile.module.css';
import { ProfileInfo } from './profileInfo/ProfileInfo';

export const Profile = () => {
  const dispatch = useDispatch();
  let { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      userId = '20178';
    }
    dispatch(getUserProfile(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.profile}>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};
