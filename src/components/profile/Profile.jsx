import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../redux/profile-reducer';
import { MyPosts } from './myPosts/MyPosts';
import style from './profile.module.css';
import { ProfileInfo } from './profileInfo/ProfileInfo';

export const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const authorizedUserId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const profileUserId = userId || authorizedUserId;
    if (profileUserId) {
      dispatch(getUserProfile(profileUserId));
    }
  }, [userId, authorizedUserId, dispatch]);

  return (
    <div className={style.profile}>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};
