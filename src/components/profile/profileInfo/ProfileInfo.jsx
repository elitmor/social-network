import { useSelector } from 'react-redux';
import { Preloader } from '../../common/preloader/Preloader';
import style from './profileInfo.module.css';
import { ProfileStatus } from './profileStatus/ProfileStatus';
import { getUserProfile } from '../../../redux/profile-selectors';
import { getUserId } from '../../../redux/auth-selectors';

export const ProfileInfo = () => {
  const userProfile = useSelector(getUserProfile);
  const currentUserId = useSelector(getUserId);

  if (!userProfile) {
    return <Preloader />;
  }

  return (
    <div>
      <h3 className={style.title}>My posts</h3>
      <img
        src={userProfile.photos.small}
        alt='avatar'
      />
      {currentUserId === userProfile.userId ? <ProfileStatus /> : null}
      <div>{userProfile.fullName}</div>
      <div>{userProfile.contacts.github}</div>
    </div>
  );
};
