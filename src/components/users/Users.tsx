import { useDispatch, useSelector } from 'react-redux';
import { followAС, unfollowAС } from '../../redux/users-reducer';
import style from './users.module.css';

export const Users = () => {
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
              src={user.photoUrl}
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
            <div>{user.fullName}</div>
            <div>{user.status}</div>
            <div>{user.location.country}</div>
            <div>{user.location.city}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
