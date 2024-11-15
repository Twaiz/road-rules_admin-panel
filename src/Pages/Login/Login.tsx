import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { Form, redirect, useNavigate } from 'react-router-dom';

import style from './Login.module.scss';

import { loginStore } from '@/Stores/LoginStore/LoginStore';
import { Button, Checkbox, Input } from '@/Ui';

const Login = observer(() => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const fieldIsSuccess = loginStore.getAllStatusField();

  const navigate = useNavigate();

  const handleChangeVisibility = () => {
    const input = passwordInputRef.current;
    if (!input) return;

    input.type = input.type === 'password' ? 'text' : 'password';
  };

  return (
    <div className={style.login}>
      <div className={style.infoSection}>
        <h2 className={style.infoSection_title}>Логин</h2>
        <p className={style.infoSection_description}>Войдите в свой аккаунт</p>
      </div>

      <Form method="POST" className={style.form}>
        <div>
          <Input
            label="Email"
            name="userEmail"
            type="email"
            placeholder="your_email@yandex.ru"
            onValidate={loginStore.validateEmailField}
          />
          <div className={style.wrapper}>
            <Input
              label="Пароль"
              name="userPassword"
              placeholder="*********"
              inputRef={passwordInputRef}
              onValidate={loginStore.validatePasswordField}
            />

            <Checkbox
              defaultChecked
              label="Показать пароль"
              onToggle={handleChangeVisibility}
            />
          </div>
        </div>

        <div className={style.actions}>
          <Button
            type="submit"
            text="Войти"
            disabled={!fieldIsSuccess}
            onClick={() => redirect('/menu')}
          />

          <Button
            buttonStyle="link"
            text="Зарегистрироваться"
            onClick={() => navigate('/register')}
          />
        </div>
      </Form>
    </div>
  );
});

export { Login };
