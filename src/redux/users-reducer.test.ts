import { InitialStateType, actions, usersReducer } from './users-reducer';

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'Alex 0',
        followed: false,
        photos: { small: null, large: null },
        status: 'status0',
      },
      {
        id: 1,
        name: 'Alex 1',
        followed: false,
        photos: { small: null, large: null },
        status: 'status1',
      },
      {
        id: 2,
        name: 'Alex 2',
        followed: false,
        photos: { small: null, large: null },
        status: 'status2',
      },
      {
        id: 3,
        name: 'Alex 3',
        followed: true,
        photos: { small: null, large: null },
        status: 'status3',
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingProgress: [],
  };
});

test('follow success', () => {
  const newState = usersReducer(state, actions.followSuccess(1));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test('unfollow success', () => {
  const newState = usersReducer(state, actions.unfollowSuccess(1));

  expect(newState.users[2].followed).toBeFalsy();
  expect(newState.users[3].followed).toBeTruthy();
});
