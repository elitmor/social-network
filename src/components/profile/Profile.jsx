import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserProfile } from '../../redux/profile-reducer';
import { MyPosts } from './myPosts/MyPosts';
import style from './profile.module.css';
import { ProfileInfo } from './profileInfo/ProfileInfo';

export const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  const authorizedUserId = useSelector((state) => state.auth.userId);

  const redirectToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const profileUserId = userId || authorizedUserId;
    if (profileUserId) {
      dispatch(getUserProfile(profileUserId));
    } else {
      redirectToLogin();
    }
  }, [userId, authorizedUserId, dispatch, redirectToLogin]);

  return (
    <div className={style.profile}>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};
