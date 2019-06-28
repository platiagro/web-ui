import { SIGN_IN, SIGN_OUT } from './actionTypes';
import { signIn, signOut } from './actions'

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
});
