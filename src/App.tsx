import { Suspense } from 'react';

import './Styles/Main.module.scss';

import { Routing } from './Components';
import { Loader } from './Ui';

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routing />
    </Suspense>
  );
};

export { App };
