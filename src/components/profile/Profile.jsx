import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getUserProfile } from '../../redux/profile-reducer';
import { MyPosts } from './myPosts/MyPosts';
import style from './profile.module.css';
import { ProfileInfo } from './profileInfo/ProfileInfo';

export const Profile = () => {
  const dispatch = useDispatch();
  let { userId } = useParams();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (!userId) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      userId = '20178';
    }
    dispatch(getUserProfile(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAuth ? (
    <div className={style.profile}>
      <ProfileInfo />
      <MyPosts />
    </div>
  ) : (
    <Navigate to='/login' />
  );
};
