import { makeAutoObservable } from 'mobx';

import { generalStore } from '../GeneralStore/GeneralStore';
import { api } from '@/Operations/operations';

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

class AuthStore {
  userInfo: IUserInfo | null;

  constructor() {
    this.userInfo = null;
    makeAutoObservable(this);
  }

  async login(userCredentials: IUserCredentianls) {
    const userInfo: IUserInfo | null = await api.login(userCredentials);
    if (!userInfo) return null;

    this.userInfo = userInfo;
    generalStore.setIsAuth(true);

    //? Позже тут будет запись в localStorage ?\\
  }
}

const authStore = new AuthStore();
export { authStore };
