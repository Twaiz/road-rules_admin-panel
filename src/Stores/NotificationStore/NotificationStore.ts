import { makeAutoObservable } from 'mobx';

type NotificationTypes = 'basic' | 'error';

interface IButton {
  text: string;
  onClick: () => void;
}

interface INotification {
  type: NotificationTypes;
  titleText: string;
  bodyText: string;
  button?: IButton;
}

class NotificationStore {
  notification: INotification | null;

  constructor() {
    this.notification = null;

    makeAutoObservable(this);
  }

  setNotification(notification: INotification) {
    this.notification = notification;
  }

  deleteNotification() {
    this.notification = null;
  }
}

const notificationStore = new NotificationStore();
export { notificationStore };
