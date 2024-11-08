import axios, { AxiosResponse } from 'axios';

import { catchAsync } from '@/Tools/Helpers/catchAsync';
import { token } from './operations';

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
  login: (userCredentials: IUserCredentianls): Promise<IUserInfo | null> => {
    const requestLogin = async (): Promise<IUserInfo> => {
      const { data }: AxiosResponse<IUserInfo> = await axios.post(
        '/api/auth/adminLogin',
        userCredentials,
      );

      token.set(data.token);
      return data;
    };

    const onSuccess = (userInfo: IUserInfo) => {
      return userInfo;
    };

    const onError = (error: Error) => {
      console.error(
        'Упс! Произошла ошибка при входе в аккаунт...',
        error.message,
      );
    };

    return catchAsync<IUserInfo>(requestLogin, { onSuccess, onError });
  },
};

export { authOperations };
