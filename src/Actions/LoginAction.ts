import { redirect } from 'react-router-dom';

import { generalStore, authStore } from '@/Stores';

interface ICredentials {
  email: string;
  password: string;
}

const LoginAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    [key: string]: string;
  };

  const credentials: ICredentials = {
    email: data.userEmail,
    password: data.userPassword,
  };

  await authStore.login(credentials);

  if (!generalStore.isAuth) return redirect('/login');

  return redirect('/menu');
};

export { LoginAction };
