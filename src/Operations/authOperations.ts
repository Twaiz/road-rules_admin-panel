import axios from 'axios';

import { handleAsyncOperation } from '@/Tools';
import { IUserInfo, ICredentialsLogin } from '@/Stores';

const authOperations = {
  login: async (
    userCredentials: ICredentialsLogin,
  ): Promise<IUserInfo | null> => {
    const requestToLogin = () =>
      axios.post('/api/auth/adminLogin', userCredentials).then(res => res.data);
    return handleAsyncOperation(requestToLogin, 'логина');
  },
};

export { authOperations };
