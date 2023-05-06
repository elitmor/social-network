import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followAС, setUsersAС, unfollowAС } from '../../redux/users-reducer';
import style from './users.module.css';
import avatar from '../../assets/avatar.svg';

export const Users = () => {
  useEffect(() => {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/users')
      .then((res) => {
        dispatch(setUsersAС(res.data.items));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.usersPage.users);

  const handleFollowClick = (userId: any) => {
    dispatch(followAС(userId));
  };

  const handleUnfollowClick = (userId: any) => {
    dispatch(unfollowAС(userId));
  };

  return (
    <div>
      {users.map((user: any) => (
        <div key={user.id}>
          <div>
            <img
              className={style.avatar}
              src={user.photos.small ?? avatar}
              alt='avatar'
            />
            {user.followed === true ? (
              <button
                className={style.btn}
                onClick={() => handleUnfollowClick(user.id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className={style.btn}
                onClick={() => handleFollowClick(user.id)}
              >
                Follow
              </button>
            )}
          </div>
          <div>
            <div>{user.name}</div>
            <div>{user.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
