import { PostType } from '../../../types/types';
import { MyPosts } from './myPosts/MyPosts';
import style from './profile.module.css';
import { ProfileInfo } from './profileInfo/ProfileInfo';

interface ProfileProps {
  posts: PostType[];
}

export const Profile = (props: ProfileProps) => {
  return (
    <div className={style.profile}>
      <ProfileInfo />
      <MyPosts posts={props.posts} />
    </div>
  );
};
