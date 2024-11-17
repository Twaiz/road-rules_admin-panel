import { authStore } from '@/Stores';

const validatePasswordField = (value: string): string => {
  if (value.length < 6) {
    authStore.passwordFieldIsSuccess = false;
    return 'Пароль должен быть не менее 6 символов';
  }
  authStore.passwordFieldIsSuccess = true;
  return '';
};

export { validatePasswordField };
