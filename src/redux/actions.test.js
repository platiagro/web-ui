import { SIGN_IN, SIGN_OUT, ADAPT_LAYOUT, TOGGLE_DRAWER } from './actionTypes';
import { signIn, signOut, adaptLayout, toggleDrawer } from './actions';

describe('actions', () => {
  it('should create an action to sign in', () => {
    const expectedAction = {
      type: SIGN_IN,
      payload: {}
    }
    expect(signIn()).toEqual(expectedAction)
  });

  it('should create an action to sign out', () => {
    const expectedAction = {
      type: SIGN_OUT,
      payload: {}
    }
    expect(signOut()).toEqual(expectedAction)
  });

  it('should create an action to adapt layout', () => {
    const expectedAction = {
      type: ADAPT_LAYOUT,
      payload: {width: 768}
    }
    expect(adaptLayout(768)).toEqual(expectedAction)
  });

  it('should create an action to adapt layout', () => {
    const expectedAction = {
      type: TOGGLE_DRAWER,
      payload: {}
    }
    expect(toggleDrawer()).toEqual(expectedAction)
  });
});
