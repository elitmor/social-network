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

interface UserProfile {
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  aboutMe: string;
  photos: {
    small: string | null;
    large: string | null;
  };
  contacts: {
    [key: string]: string;
  };
  userId: number;
}

interface ProfileInfoProps {
  isOwner: boolean;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(getUserProfile) as UserProfile | null;
  const currentUserId = useSelector(getUserId) as number;
  const [editMode, setEditMode] = useState(false);

  const onEditModeChange = (newEditMode: boolean) => {
    setEditMode(newEditMode);
  };

  const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      //@ts-ignore
      dispatch(savePhoto(e.target.files[0]));
    }
  };

  const onSubmit = (data: UserProfile) => {
    //@ts-ignore
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
      ) : null}
      {currentUserId === userProfile.userId ? (
        <ProfileStatus status={''} />
      ) : null}
      {editMode ? (
        <ProfileDataForm
          defaultValues={userProfile}
          //@ts-ignore
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

interface ProfileDataProps {
  isOwner: boolean;
  goToEditMode: () => void;
  profile: UserProfile;
}

const ProfileData: React.FC<ProfileDataProps> = ({
  isOwner,
  goToEditMode,
  profile,
}) => {
  return (
    <div>
      {isOwner ? <button onClick={goToEditMode}>Edit</button> : null}
      <div>
        <b>FullName: </b>
        {profile.fullName}
      </div>
      <div>
        <b>Looking for a job: </b>
        {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      <div>
        <b>Skills: </b>
        {profile.lookingForAJobDescription}
      </div>
      <div>
        <b>About me: </b>
        {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contacts
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

interface ContactsProps {
  contactTitle: string;
  contactValue: string;
}

const Contacts: React.FC<ContactsProps> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}: </b>
      {contactValue}
    </div>
  );
};
