import { useSelector } from 'react-redux';
import { Preloader } from '../../common/preloader/Preloader';
import style from './profileInfo.module.css';

export const ProfileInfo = () => {
  const userProfile = useSelector((state: any) => state.profilePage.profile);

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
      <div>{userProfile.fullName}</div>
      <div>{userProfile.contacts.github}</div>
    </div>
  );
};
