export type PostsType = {
  id: string;
  message: string;
  likesCount: number;
};

export type ContactType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactType;
  photos: PhotosType;
};

export type UsersType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
};
