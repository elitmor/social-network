import { v1 } from 'uuid';

export const store = {
  profilePage: {
    posts: [
      { id: v1(), message: 'Hello', likesCount: 5 },
      { id: v1(), message: 'You', likesCount: 3 },
      { id: v1(), message: 'How are you?', likesCount: 7 },
    ],
  },
  dialogPage: {
    dialogs: [
      { id: v1(), name: 'Alex' },
      { id: v1(), name: 'Ksy' },
      { id: v1(), name: 'Liza' },
    ],
    messages: [
      { id: v1(), message: 'Hello' },
      { id: v1(), message: 'You' },
      { id: v1(), message: 'How are you?' },
    ],
  },
};

export const addPost = (postMessage: any) => {
  const newPost = {
    id: v1(),
    message: postMessage,
    likesCount: 0,
  };
  store.profilePage.posts.push(newPost);
};
