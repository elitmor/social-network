import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../../assets/avatar.svg';
import { getUserId } from '../../../redux/auth-selectors';
import { getUserProfile } from '../../../redux/profile-selectors';
import { Preloader } from '../../common/preloader/Preloader';
import style from './profileInfo.module.css';
import { ProfileStatus } from './profileStatus/ProfileStatus';
import { savePhoto } from '../../../redux/profile-reducer';

export const ProfileInfo = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(getUserProfile);
  const currentUserId = useSelector(getUserId);

  if (!userProfile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      dispatch(savePhoto(e.target.files[0]));
    }
  };

  return (
    <div>
      <h3 className={style.title}>My posts</h3>
      <img
        className={style.avatar}
        src={userProfile.photos.small || avatar}
        alt='avatar'
      />
      {props.isOwner ? (
        <input
          type='file'
          onChange={onMainPhotoSelected}
        />
      ) : (
        ''
      )}
      {currentUserId === userProfile.userId ? <ProfileStatus /> : null}
      <div>{userProfile.fullName}</div>
      <div>{userProfile.contacts.github}</div>
    </div>
  );
};
