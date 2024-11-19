import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { Form, redirect } from 'react-router-dom';

import { authStore } from '@/Stores';
import { validateEmailField, validatePasswordField } from '@/Tools';

import style from './Login.module.scss';

import { Button, Checkbox, Input } from '@/Ui';

const Login = observer(() => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const fieldIsSuccess = authStore.getAllStatusField();

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
            onValidate={validateEmailField}
          />
          <div className={style.wrapper}>
            <Input
              label="Пароль"
              name="userPassword"
              placeholder="*********"
              inputRef={passwordInputRef}
              onValidate={validatePasswordField}
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

          <a
            href="http://localhost:5273/register"
            target="_blank"
            className={style.actions_link}
          >
            Зарегистрироваться
          </a>
        </div>
      </Form>
    </div>
  );
});

export { Login };
