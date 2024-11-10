import { makeAutoObservable } from 'mobx';

import { generalStore } from '../';
import { api } from '@/Operations';
import { localStorageSelectors } from '@/Tools';

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

const getLocalUserInfo = localStorage.getItem(localStorageSelectors.userInfo);
const localStorageUserInfo = getLocalUserInfo
  ? JSON.parse(getLocalUserInfo)
  : null;

class AuthStore {
  userInfo: IUserInfo | null;

  constructor() {
    this.userInfo = localStorageUserInfo
      ? {
          firstName: localStorageUserInfo.firstName,
          secondName: localStorageUserInfo.secondName,
          email: localStorageUserInfo.email,
          isAppointExam: localStorageUserInfo.isAppointExam,
          token: localStorageUserInfo.token,
        }
      : null;
    makeAutoObservable(this);
  }

  setUserInfo(userInfo: IUserInfo) {
    this.userInfo = userInfo;
  }

  async login(userCredentials: IUserCredentianls) {
    const userInfo: IUserInfo | null = await api.login(userCredentials);
    if (!userInfo) return null;

    this.setUserInfo(userInfo);
    generalStore.setIsAuth(true);

    localStorage.setItem(
      localStorageSelectors.userInfo,
      JSON.stringify(userInfo),
    );
  }
}

const authStore = new AuthStore();
export { authStore };
