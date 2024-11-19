import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { notificationStore } from '@/Stores';

import style from './Notification.module.scss';

import { CrossIcon, InfoIcon } from '/public';

const Notification = observer(() => {
  const notification = notificationStore.notification;

  if (!notification) return null;

  const typeSuffix = notification.type === 'error' ? 'error' : 'basic';
  //? Короче, решил сделать так, чтобы упростить код :) Уменшил целых шесть строк) ?\\
  const crossIconStyle = style[`cross_buttonIcon__${typeSuffix}`];
  const infoIconStyle = style[`info_buttonIcon__${typeSuffix}`];
  const checkIsButton =
    notification.button && notification.button.text.length > 0;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        notificationStore.deleteNotification();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div
      className={`${style.notification} ${
        style[`notification_${notification.type}`]
      }`}
    >
      <div className={style.cross}>
        <button
          type="button"
          className={`${style.cross_button} ${crossIconStyle}`}
          onClick={() => {
            notificationStore.deleteNotification();
          }}
        >
          <CrossIcon />
        </button>
      </div>

      <div className={style.info}>
        <button
          type="button"
          className={`${style.info_button} ${infoIconStyle}`}
        >
          <InfoIcon />
        </button>
      </div>

      <div className={style.container}>
        <div className={style.aboutNotification}>
          <h4
            className={`${style.aboutNotification_title} ${
              style[`aboutNotification_title__${notification.type}`]
            }`}
          >
            {notification.titleText}
          </h4>
          <p
            className={`${style.aboutNotification_description} ${
              style[`aboutNotification_description__${notification.type}`]
            }`}
          >
            {notification.bodyText}
          </p>
        </div>

        {checkIsButton && (
          <button
            className={`${style.container_button} ${
              style[`container_button__${notification.type}`]
            }`}
            onClick={() => {
              notification.button?.onClick();
              notificationStore.deleteNotification();
            }}
            type="button"
          >
            {notification.button?.text}
          </button>
        )}
      </div>
    </div>
  );
});

export { Notification };
