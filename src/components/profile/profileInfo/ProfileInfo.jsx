import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../../assets/avatar.svg';
import { getUserId } from '../../../redux/auth-selectors';
import { savePhoto, saveProfile } from '../../../redux/profile-reducer';
import { getUserProfile } from '../../../redux/profile-selectors';
import { Preloader } from '../../common/preloader/Preloader';
import { ProfileDataForm } from './profileDataForm/ProfileDataForm';
import style from './profileInfo.module.css';
import { ProfileStatus } from './profileStatus/ProfileStatus';

export const ProfileInfo = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(getUserProfile);
  const currentUserId = useSelector(getUserId);
  const [editMode, setEditMode] = useState(false);

  const onEditModeChange = (newEditMode) => {
    setEditMode(newEditMode);
  };

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      dispatch(savePhoto(e.target.files[0]));
    }
  };

  const onSubmit = (data) => {
    dispatch(saveProfile(data));
    onEditModeChange(false);
  };

  if (!userProfile) {
    return <Preloader />;
  }

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
      {editMode ? (
        <ProfileDataForm
          defaultValues={userProfile}
          onSubmit={onSubmit}
        />
      ) : (
        <ProfileData
          profile={userProfile}
          isOwner={props.isOwner}
          goToEditMode={() => {
            onEditModeChange(true);
          }}
        />
      )}
    </div>
  );
};

const ProfileData = ({ isOwner, goToEditMode }) => {
  const userProfile = useSelector(getUserProfile);
  return (
    <div>
      {isOwner ? <button onClick={goToEditMode}>Edit</button> : ''}
      <div>
        <b>FullName: </b>
        {userProfile.fullName}
      </div>
      <div>
        <b>Looking for a job: </b>
        {userProfile.lookingForAJob ? 'yes' : 'no'}
      </div>
      <div>
        <b>Skills: </b>
        {userProfile.lookingForAJobDescription}
      </div>
      <div>
        <b>About me: </b>
        {userProfile.aboutMe}
      </div>
      <div>
        <b>
          Contacts
          {Object.keys(userProfile.contacts).map((key) => {
            return (
              <Contacts
                key={key}
                contactTitle={key}
                contactValue={userProfile.contacts[key]}
              />
            );
          })}
        </b>
      </div>
    </div>
  );
};

const Contacts = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}: </b>
      {contactValue}
    </div>
  );
};
