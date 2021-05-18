import { message as Message } from 'antd';

export const showError =
  (message, duration = 5) =>
  () => {
    Message.error(message, duration);
  };

export const showSuccess =
  (message, duration = 5) =>
  () => {
    Message.success(message, duration);
  };

export const showInfo =
  (message, duration = 5) =>
  () => {
    Message.info(message, duration);
  };

export const showWarning =
  (message, duration = 5) =>
  () => {
    Message.warning(message, duration);
  };

export const showLoading =
  (message, duration = 5) =>
  () => {
    Message.loading(message, duration);
  };
