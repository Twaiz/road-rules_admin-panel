import { makeAutoObservable } from 'mobx';

import { generalStore } from '../';
import { localStorageSelectors } from '@/Tools';
import { api, token } from '@/Operations';

interface IUserInfo {
  firstName: string;
  secondName: string;
  isAppointExam: boolean;
  email: string;
  token: string;
}

interface ICredentialsLogin {
  email: string;
  password: string;
}

const getLocalUserInfo = localStorage.getItem(localStorageSelectors.userInfo);
const localStorageUserInfo = getLocalUserInfo
  ? JSON.parse(getLocalUserInfo)
  : null;

class AuthStore {
  userInfo: IUserInfo | null;
  emailFieldIsSuccess: boolean;
  passwordFieldIsSuccess: boolean;

  constructor() {
    this.userInfo = localStorageUserInfo || null;
    this.emailFieldIsSuccess = false;
    this.passwordFieldIsSuccess = false;

    makeAutoObservable(this);
  }

  setUserInfo(userInfo: IUserInfo) {
    this.userInfo = userInfo;
  }

  getAllStatusField() {
    return [this.emailFieldIsSuccess, this.passwordFieldIsSuccess].every(
      Boolean,
    );
  }

  async login(credentials: ICredentialsLogin) {
    const loginResponse = await api.login(credentials);
    if (!loginResponse) return;

    this.setUserInfo(loginResponse);
    token.set(loginResponse.token);
    generalStore.setIsAuth(true);

    localStorage.setItem(
      localStorageSelectors.userInfo,
      JSON.stringify(loginResponse),
    );
  }
}

const authStore = new AuthStore();
export { authStore };
export type { IUserInfo, ICredentialsLogin };
