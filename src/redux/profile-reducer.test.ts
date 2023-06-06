import { v1 } from 'uuid';
import { actions, profileReducer } from './profile-reducer';
import { PostsType, ProfileType } from '../types/types';

const state = {
  posts: [
    { id: v1(), message: 'Hello', likesCount: 5 },
    { id: v1(), message: 'You', likesCount: 3 },
    { id: v1(), message: 'How are you?', likesCount: 7 },
  ] as PostsType[],
  profile: null as ProfileType | null,
  status: '',
};

describe('profileReducer', () => {
  describe('addPostAC', () => {
    it('should increment the length of posts when a new post is added', () => {
      const action = actions.addPostAC('Hello everyone');
      const newState = profileReducer(state, action);
      expect(newState.posts.length).toBe(4);
    });

    it('should set the correct message for the new post', () => {
      const action = actions.addPostAC('Hello everyone');
      const newState = profileReducer(state, action);
      expect(newState.posts[3].message).toBe('Hello everyone');
    });

    it('should not modify the state when attempting to delete a post with an invalid id', () => {
      const action = actions.deletePostAC('100');
      const newState = profileReducer(state, action);
      expect(newState.posts.length).toBe(3);
    });
  });
});
