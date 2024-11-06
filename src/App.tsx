import { Suspense } from 'react';

import './Styles/Main.module.scss';

import Routing from './Components/Routing';
import Loader from './Ui/Loader';

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routing />
    </Suspense>
  );
};

export default App;
