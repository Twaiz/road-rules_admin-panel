import { ReactNode } from 'react';

import style from './Button.module.scss';

import { Loader } from '../';

type ButtonText = string | ReactNode;
type ButtonTypes = 'button' | 'submit';
type ButtonStyles = 'button' | 'link';

interface IButton {
  text: ButtonText;
  buttonStyle?: ButtonStyles;
  type?: ButtonTypes;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: IButton) => {
  const {
    text,
    buttonStyle = 'button',
    type = 'button',
    disabled = false,
    onClick,
  } = props;

  const isLoading = false; //? Позже тут будет динамическое состояние ?\\
  const isSubmitType = type === 'submit';
  const styleButtonDisabled = style.button__disabled;

  const combinedClassname = [
    style[buttonStyle],
    isSubmitType && isLoading && styleButtonDisabled,
    disabled && styleButtonDisabled,
  ]
    .filter(Boolean) //? Убирает все ложные значения из массива ?\\
    .join(' ');

  return (
    <button
      className={combinedClassname}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? <Loader /> : text}
    </button>
  );
};

export { Button };
