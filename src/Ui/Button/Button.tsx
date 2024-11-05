import { ReactNode } from 'react';

import style from './Button.module.scss';

import Loader from '../Loader';

type ButtonText = string | ReactNode;
type ButtonTypes = 'button' | 'submit';
type ButtonStyles = 'button' | 'link';

interface IButton {
  text: ButtonText;
  buttonStyle?: ButtonStyles;
  type?: ButtonTypes;
  disabled?: boolean;
  onChange?: () => void;
}

const Button = (props: IButton) => {
  const {
    text,
    buttonStyle = 'button',
    type = 'button',
    disabled = false,
    onChange,
  } = props;

  //? Я считаю, тут лучше сразу же сделать так, чтобы потом не переписывать ?\\
  const getButtonStyles = (() => {
    switch (buttonStyle) {
      case 'link':
        return style.link;
      default:
        return style.button;
    }
  })(); //? Тут нужна функция IIFE т.к. чтобы присвоить значение функции в переменую ?\\

  const isLoading = false; //? Позже тут будет динамическое состояние ?\\
  const isSubmitType = type === 'submit';
  const styleButtonDisabled = style.button__disabled;

  const combinedClassname = [
    getButtonStyles,
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
      onChange={onChange}
    >
      {isLoading ? <Loader /> : text}
    </button>
  );
};

export default Button;
