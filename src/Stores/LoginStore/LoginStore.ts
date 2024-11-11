import { makeAutoObservable } from 'mobx';

import { api } from '@/Operations';
import { authStore } from '../';

interface ICredentialsLogin {
  email: string;
  password: string;
}

class LoginStore {
  emailFieldIsSuccess: boolean;
  passwordFieldIsSuccess: boolean;

  constructor() {
    this.emailFieldIsSuccess = false;
    this.passwordFieldIsSuccess = false;

    makeAutoObservable(this);
  }

  getAllStatusField() {
    return [this.emailFieldIsSuccess, this.passwordFieldIsSuccess].every(
      Boolean,
    );
  }

  validateEmailField = (value: string): string => {
    if (value.length < 6) {
      this.emailFieldIsSuccess = false;
      return 'Почта должна быть не менее 6 символов';
    }
    this.emailFieldIsSuccess = true;
    return '';
  };

  validatePasswordField = (value: string): string => {
    if (value.length < 6) {
      this.passwordFieldIsSuccess = false;
      return 'Пароль должен быть не менее 6 символов';
    }
    this.passwordFieldIsSuccess = true;
    return '';
  };

  async login(credentials: ICredentialsLogin) {
    const loginResponse = await api.login(credentials);
    if (!loginResponse) return;
    authStore.login({
      firstName: loginResponse.firstName,
      secondName: loginResponse.secondName,
      isAppointExam: loginResponse.isAppointExam,
      email: credentials.email,
      token: loginResponse.token,
    });
  }
}

const loginStore = new LoginStore();
export { loginStore };
