import { Outlet } from 'react-router-dom';

import { notificationStore } from '@/Stores';

import style from './AppLayout.module.scss';

import { Header, Notification } from '@/Components';

const AppLayout = () => {
  return (
    <div className={style.wrapper}>
      <Header />

      <main className={style.main}>
        <Outlet />

        {notificationStore.notification && <Notification />}
      </main>
    </div>
  );
};

export { AppLayout };
