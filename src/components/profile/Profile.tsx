import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserId } from '../../redux/auth-selectors';
import { getUserProfile } from '../../redux/profile-reducer';
import { MyPosts } from './myPosts/MyPosts';
import style from './profile.module.css';
import { ProfileInfo } from './profileInfo/ProfileInfo';

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  const authorizedUserId = useSelector(getUserId);

  const redirectToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const profileUserId = userId || authorizedUserId;
    if (profileUserId) {
      //@ts-ignore
      dispatch(getUserProfile(profileUserId));
    } else {
      redirectToLogin();
    }
  }, [userId, authorizedUserId, dispatch, redirectToLogin]);

  return (
    <div className={style.profile}>
      <ProfileInfo isOwner={!userId} />
      <MyPosts />
    </div>
  );
};

export default Profile;
