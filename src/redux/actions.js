import { SIGN_IN, SIGN_OUT, SEND_RESET_EMAIL, ADAPT_LAYOUT, TOGGLE_DRAWER } from './actionTypes';

export const signIn = () => ({
  type: SIGN_IN,
  payload: {}
});

export const signOut = () => ({
  type: SIGN_OUT,
  payload: {}
});

export const sendResetEmail = email => ({
  type: SEND_RESET_EMAIL,
  payload: {email: email}
});

export const adaptLayout = width => ({
  type: ADAPT_LAYOUT,
  payload: {width: width}
});

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
  payload: {}
});
