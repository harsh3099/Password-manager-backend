interface NotificationProps {
  content: string;
  type?: 'info' | 'warn' | 'alert';
}

export const addNotification = (props: NotificationProps) => {
  dispatchEvent(new CustomEvent('ldNotificationClear'));
  dispatchEvent(
    new CustomEvent('ldNotificationAdd', {
      detail: {
        timeout: 2000,
        type: 'info',
        ...props,
      },
    }),
  );
};
