import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchUsers, follow, unfollow } from '../../redux/users-reducer';
import {
  getCurrentPage,
  getFollowingProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../redux/users-selectors';
import { UsersType } from '../../types/types';
import { Paginator } from '../common/paginator/Paginator';
import { Preloader } from '../common/preloader/Preloader';
import { User } from './User';
import { UsersSearchForm } from './usersSearchForm/UsersSearchForm';

type PropsType = {
  pageTitle: string;
};

export const Users: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(getIsFetching);
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const followingProgress = useSelector(getFollowingProgress);
  const filter = useSelector(getUsersFilter);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchUsers(currentPage, pageSize, filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageClick = (page: number) => {
    // @ts-ignore
    dispatch(fetchUsers(page, pageSize, filter));
  };

  const useNavigateSearch = () => {
    const navigate = useNavigate();
    return (pathname: string, params: any) =>
      navigate(`${pathname}?${createSearchParams(params)}`);
  };

  const navigateSearch = useNavigateSearch();
  const location = useLocation();
  useEffect(() => {
    navigateSearch('/users', {
      page: `${currentPage}`,
      count: `${pageSize}`,
      term: `${filter.term}`,
      friend: `${filter.friend}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentPage, pageSize]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    let actualPage = currentPage;
    let actualFilter = filter;

    const queryFriend = query.get('friend');
    const queryPage = query.get('page');
    const queryTerm = query.get('term');

    if (queryPage) actualPage = +queryPage;

    if (queryTerm) actualFilter = { ...actualFilter, term: queryTerm };

    switch (queryFriend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null };
        break;
      case 'true':
        actualFilter = { ...actualFilter, friend: true };
        break;
      case 'false':
        actualFilter = { ...actualFilter, friend: false };
        break;
      default:
        break;
    }

    // @ts-ignore
    dispatch(fetchUsers(actualPage, pageSize, actualFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <UsersSearchForm />
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        onPageChanged={handlePageClick}
        pageSize={pageSize}
        portionSize={10}
      />
      {users.map((user: UsersType) => (
        <User
          key={user.id}
          user={user}
          followingProgress={followingProgress}
          // @ts-ignore
          unfollowUser={() => dispatch(unfollow(user.id))}
          // @ts-ignore
          followUser={() => dispatch(follow(user.id))}
        />
      ))}
    </div>
  );
};
