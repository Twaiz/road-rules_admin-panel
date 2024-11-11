import axios from 'axios';

import { variables } from '/variables.ts';
import { authOperations } from './authOperations';
import { notificationStore } from '@/Stores';

axios.defaults.baseURL = variables.apiUrl;

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = undefined;
  },
};

const handleError = (error: unknown, titleText: string) => {
  if (axios.isAxiosError(error) && error.response?.data.message) {
    notificationStore.setNotification({
      type: 'error',
      titleText: `Ошибка ${titleText}`,
      bodyText: error.message,
    });

    return;
  } else {
    notificationStore.setNotification({
      type: 'error',
      titleText: `Ошибка ${titleText}`,
      bodyText: 'Неизвестная ошибка',
    });
  }
};

const api = {
  login: authOperations.login,
};

export { api, token, handleError };
