import axios from 'axios';

import { variables } from '/variables.ts';
import { authOperations } from './authOperations';

axios.defaults.baseURL = variables.apiUrl;

export const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = undefined;
  },
};

const api = {
  login: authOperations.login,
};

export { api };
