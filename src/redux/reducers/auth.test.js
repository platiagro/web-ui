import { SIGN_IN, SIGN_OUT } from '../actionTypes';
import reducer from './auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        isLoggedIn: false
      }
    );
  });

  it('should handle SIGN_IN', () => {
    expect(
      reducer(
        {
          isLoggedIn: false
        },
        {
          type: SIGN_IN,
          payload: {}
        })
    ).toEqual(
      {
        isLoggedIn: true
      }
    )
  });

  it('should handle SIGN_OUT', () => {
    expect(
      reducer(
        {
          isLoggedIn: true
        },
        {
          type: SIGN_OUT,
          payload: {}
        })
    ).toEqual(
      {
        isLoggedIn: false
      }
    )
  });
});
