import { useSelector } from 'react-redux';
import { Preloader } from '../../common/preloader/Preloader';
import style from './profileInfo.module.css';
import { ProfileStatus } from './profileStatus/ProfileStatus';

export const ProfileInfo = () => {
  const userProfile = useSelector((state) => state.profilePage.profile);
  const status = useSelector((state) => state.profilePage.status);
  const currentUserId = useSelector((state) => state.auth.userId); // Assuming you have the user ID in your auth state

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
      {currentUserId === userProfile.userId ? (
        <ProfileStatus status={status} />
      ) : null}
      <div>{userProfile.fullName}</div>
      <div>{userProfile.contacts.github}</div>
    </div>
  );
};
