import axios from 'axios';

import { handleAsyncOperation } from '@/Tools';

interface IUserInfo {
  firstName: string;
  secondName: string;
  isAppointExam: boolean;
  email: string;
  token: string;
}

interface IUserCredentianls {
  email: string;
  password: string;
}

const authOperations = {
  login: async (
    userCredentials: IUserCredentianls,
  ): Promise<IUserInfo | null> => {
    const requestToLogin = () =>
      axios.post('/api/auth/adminLogin', userCredentials).then(res => res.data);
    return handleAsyncOperation(requestToLogin, 'логина');
  },
};

export { authOperations };
