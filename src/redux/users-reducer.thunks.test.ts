import { APIResponseType, ResultCodes } from '../api/api';
import { usersAPI } from '../api/usersAPI';

import { PhotosType } from '../types/types';
import { actions, follow, unfollow } from './users-reducer';

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

jest.mock('../api/usersAPI');

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const apiResponseMock: APIResponseType = {
  resultCode: ResultCodes.Success,
  messages: ['test 1'],
  data: {},
  photos: function (photos: PhotosType): PhotosType {
    throw new Error('Function not implemented.');
  },
};

test('success follow thunk', async () => {
  userAPIMock.follow.mockResolvedValue(apiResponseMock);

  const thunk = follow(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgressAC(true, 1),
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingProgressAC(false, 1),
  );

  userAPIMock.follow.mockClear();
});

test('success unfollow thunk', async () => {
  userAPIMock.unfollow.mockResolvedValue(apiResponseMock);

  const thunk = unfollow(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgressAC(true, 1),
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingProgressAC(false, 1),
  );

  userAPIMock.unfollow.mockClear();
});
