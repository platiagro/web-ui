import { message as Message } from 'antd';

export const showError = (message, duration = 5) => () => {
  Message.error(message, duration);
};

export const showSuccess = (message, duration = 5) => () => {
  Message.success(message, duration);
};
