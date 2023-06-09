import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import style from './user.module.css';

interface UserProps {
  user: {
    id: number;
    photos: {
      small: string | null;
    };
    followed: boolean;
    name: string;
    status: string;
  };
  followingProgress: number[];
  unfollowUser: (userId: number) => void;
  followUser: (userId: number) => void;
}

export const User: React.FC<UserProps> = ({
  user,
  followingProgress,
  unfollowUser,
  followUser,
}) => {
  return (
    <div key={user.id}>
      <div>
        <NavLink to={`/profile/${user.id}`}>
          <img
            className={style.avatar}
            src={user.photos.small ?? avatar}
            alt='avatar'
          />
        </NavLink>
        {user.followed === true ? (
          <Button
            disabled={followingProgress.some((id) => id === user.id)}
            onClick={() => {
              unfollowUser(user.id);
            }}
          >
            UnFollow
          </Button>
        ) : (
          <Button
            disabled={followingProgress.some((id) => id === user.id)}
            onClick={() => {
              followUser(user.id);
            }}
          >
            Follow
          </Button>
        )}
      </div>
      <div>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </div>
    </div>
  );
};
