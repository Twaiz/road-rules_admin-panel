import axios, { AxiosResponse } from 'axios';

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
    return handleAsyncOperation(async () => {
      const { data }: AxiosResponse<IUserInfo> = await axios.post(
        '/api/auth/adminLogin',
        userCredentials,
      );
      return data;
    }, 'Упс! Произошла ошибка при входе в аккаунт...');
  },
};

export { authOperations };