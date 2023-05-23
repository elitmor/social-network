import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import { fetchUsers, follow, unfollow } from '../../redux/users-reducer';
import {
  getCurrentPage,
  getFollowingProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from '../../redux/users-selectors';
import { Paginator } from '../common/paginator/Paginator';
import { Preloader } from '../common/preloader/Preloader';
import style from './users.module.css';

export const Users = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(getIsFetching);
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const followingProgress = useSelector(getFollowingProgress);

  useEffect(() => {
    dispatch(fetchUsers(currentPage, pageSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageClick = (page) => {
    dispatch(fetchUsers(page, pageSize));
  };

  const pagesCount = Math.ceil(totalUsersCount / pageSize);

  return (
    <div>
      {isFetching ? <Preloader /> : null}
      <Paginator
        currentPage={currentPage}
        pagesCount={pagesCount}
        handlePageClick={handlePageClick}
      />
      {users.map((user) => (
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
              <button
                className={style.btn}
                disabled={followingProgress.some((id) => id === user.id)}
                onClick={() => {
                  dispatch(unfollow(user.id));
                }}
              >
                UnFollow
              </button>
            ) : (
              <button
                className={style.btn}
                disabled={followingProgress.some((id) => id === user.id)}
                onClick={() => {
                  dispatch(follow(user.id));
                }}
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
