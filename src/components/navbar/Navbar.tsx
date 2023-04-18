import style from './navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={style.nav}>
      <ul>
        <li className={style.item}>
          <a href='#profile'>Profile</a>
        </li>
        <li className={style.item}>
          <a href='#dialogs'>Dialogs</a>
        </li>
      </ul>
    </nav>
  );
};
