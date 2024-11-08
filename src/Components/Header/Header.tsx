import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './Header.module.scss';

import { Button } from '@/Ui';
import { ToggleTheme } from '@/Tools';

const Header = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisibleHeader, setIsVisibleHeader] = useState(true);

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
            <Button
              buttonStyle="button"
              text="Логин"
              onClick={() => navigate('/login')}
            />
            <p className={style.navigation_authItemDescription}>Вася Пупкин</p>
          </li>

          {/*
          //? Начало - Позже будет всё динамическое ?\\
          <li>
            {!authStore.isAuth ? (
              <Button
                buttonStyle="button"
                text="Логин"
                onClick={() => navigate('/login')}
              />
            ) : (
              <p className={style.navigation_authItemDescription}>
                {authStore.userInfo?.firstName} {authStore.userInfo?.secondName}
              </p>
            )}
          </li>
          <li>
            {!authStore.isAuth ? (
              <Button
                text="Регистрация"
                onClick={() => navigate('/register')}
              />
            ) : (
              <Button onClick={() => authStore.logout()} text="Выйти" />
            )}
          </li> 
          //? Конец ?\\
          */}
        </ul>
      </nav>
    </header>
  );
};

export { Header };
