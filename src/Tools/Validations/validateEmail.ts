import { authStore } from '@/Stores';

const validateEmailField = (value: string): string => {
  if (value.length < 6) {
    authStore.emailFieldIsSuccess = false;
    return 'Почта должна быть не менее 6 символов';
  }
  authStore.emailFieldIsSuccess = true;
  return '';
};

export { validateEmailField };
