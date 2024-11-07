import { Outlet } from 'react-router-dom';

import style from './AppLayout.module.scss';

import Header from '@/Components/Header';

const AppLayout = () => {
  return (
    <div className={style.wrapper}>
      <Header />

      <main className={style.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
