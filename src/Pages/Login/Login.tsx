import { Form } from 'react-router-dom';

import style from './Login.module.scss';

const Login = () => {
  return (
    <div>
      <div>
        <h2>Логин</h2>
        <p>Войдите в свой аккаунт</p>
      </div>

      <Form method="POST">
        <div>
          <input />
          <div>
            <input />
            <input type="checkbox" />
          </div>
        </div>
      </Form>

      <div className={style.actions}>
        <button>Login</button>
        <button>Register</button>
      </div>
    </div>
  );
};

export { Login };
