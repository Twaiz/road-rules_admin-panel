import { makeAutoObservable } from 'mobx';

class GeneralStore {
  isLoading: boolean;
  isAuth: boolean;

  constructor() {
    this.isLoading = false;
    this.isAuth = false;

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
