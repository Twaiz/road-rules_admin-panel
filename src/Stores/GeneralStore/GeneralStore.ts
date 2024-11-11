import { makeAutoObservable } from 'mobx';

import { localStorageSelectors } from '@/Tools';

const getLocalUserInfo = localStorage.getItem(localStorageSelectors.userInfo);
const localStorageUserInfo = getLocalUserInfo
  ? JSON.parse(getLocalUserInfo)
  : null;

class GeneralStore {
  isLoading: boolean;
  isAuth: boolean;

  constructor() {
    this.isLoading = false;
    this.isAuth = !!localStorageUserInfo?.token;

    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }
}

const generalStore = new GeneralStore();
export { generalStore };
