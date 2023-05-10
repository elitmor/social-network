import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import {
  followAС,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAС,
  toggleIsFetchingAC,
  unfollowAС,
} from '../../redux/users-reducer';
import { Preloader } from '../common/preloader/Preloader';
import style from './users.module.css';

export const Users = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector((state: any) => state.usersPage.isFetching);
  const users = useSelector((state: any) => state.usersPage.users);
  const totalUsersCount = useSelector(
    (state: any) => state.usersPage.totalUsersCount,
  );
  const pageSize = useSelector((state: any) => state.usersPage.pageSize);
  const currentPage = useSelector((state: any) => state.usersPage.currentPage);

  useEffect(() => {
    dispatch(toggleIsFetchingAC(true));
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
        { withCredentials: true },
      )
      .then((res) => {
        dispatch(toggleIsFetchingAC(false));
        dispatch(setUsersAС(res.data.items));
        dispatch(setTotalUsersCountAC(res.data.totalCount));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCurrentPage = (page: any) => {
    dispatch(setCurrentPageAC(page));
    dispatch(toggleIsFetchingAC(true));
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${pageSize}`,
        { withCredentials: true },
      )
      .then((res) => {
        dispatch(toggleIsFetchingAC(false));
        dispatch(setUsersAС(res.data.items));
      });
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
      {users.map((user: any) => (
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
                onClick={() => {
                  axios
                    .delete(
                      `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                      {
                        withCredentials: true,
                        headers: {
                          'API-KEY': '61be3eef-56b5-439b-bddf-698a9c9e3f2f',
                        },
                      },
                    )
                    .then((res) => {
                      if (res.data.resultCode === 0) {
                        dispatch(unfollowAС(user.id));
                      }
                    });
                }}
              >
                UnFollow
              </button>
            ) : (
              <button
                className={style.btn}
                onClick={() => {
                  axios
                    .post(
                      `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                      {},
                      {
                        withCredentials: true,
                        headers: {
                          'API-KEY': '61be3eef-56b5-439b-bddf-698a9c9e3f2f',
                        },
                      },
                    )
                    .then((res) => {
                      if (res.data.resultCode === 0) {
                        dispatch(followAС(user.id));
                      }
                    });
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
