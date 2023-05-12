// import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import { fetchUsers, follow, unfollow } from '../../redux/users-reducer';
import { Preloader } from '../common/preloader/Preloader';
import style from './users.module.css';

export const Users = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.usersPage.isFetching);
  const users = useSelector((state) => state.usersPage.users);
  const totalUsersCount = useSelector(
    (state) => state.usersPage.totalUsersCount,
  );
  const pageSize = useSelector((state) => state.usersPage.pageSize);
  const currentPage = useSelector((state) => state.usersPage.currentPage);
  const followingProgress = useSelector(
    (state) => state.usersPage.followingProgress,
  );

  useEffect(() => {
    dispatch(fetchUsers(currentPage, pageSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCurrentPage = (page) => {
    dispatch(fetchUsers(page, pageSize));
  };

  const pagesCount = Math.ceil(totalUsersCount / pageSize);

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {isFetching ? <Preloader /> : null}
      <div>
        {pages.map((page) => (
          <span
            className={currentPage === page ? style.selected : ''}
            key={page}
            onClick={() => handleCurrentPage(page)}
          >
            {page}
          </span>
        ))}
      </div>
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
