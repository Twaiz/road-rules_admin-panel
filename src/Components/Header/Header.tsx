import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToggleTheme } from '@/Tools';
import { authStore, generalStore } from '@/Stores';

import style from './Header.module.scss';

import { Button } from '@/Ui';

const Header = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisibleHeader, setIsVisibleHeader] = useState(true);

  const isAuth = generalStore.isAuth;
  const { firstName, secondName } = authStore.userInfo
    ? authStore.userInfo
    : {};

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisibleHeader(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`${style.header} ${
        isVisibleHeader ? style.header__visible : style.header__hidden
      }`}
    >
      <ToggleTheme />
      <nav className={style.navigation}>
        <ul className={style.navigation_auth}>
          <li>
            {!isAuth ? (
              <Button
                buttonStyle="button"
                text="Логин"
                onClick={() => navigate('/login')}
              />
            ) : (
              <p className={style.navigation_authItemDescription}>
                {firstName} {secondName}
              </p>
            )}
          </li>
          <li>
            {!isAuth ? (
              <Button
                text="Регистрация"
                onClick={() => navigate('/register')}
              />
            ) : (
              <Button text="Выйти" /> //? Позже будет реализована функция logout ?\\
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
