import { ADAPT_LAYOUT, TOGGLE_DRAWER } from '../actionTypes';
import reducer from './window';

describe('window reducer', () => {
  it('should handle ADAPT_LAYOUT to dismissible drawer size', () => {
    expect(
      reducer(
        {
          drawer: { dismissible: false }
        },
        {
          type: ADAPT_LAYOUT,
          payload: {
            width: 768
          }
        })
    ).toEqual(
      {
        drawer: { dismissible: true }
      }
    )
  });

  it('should handle ADAPT_LAYOUT to permanent drawer size', () => {
    expect(
      reducer(
        {
          drawer: { dismissible: true }
        },
        {
          type: ADAPT_LAYOUT,
          payload: {
            width: 1024
          }
        })
    ).toEqual(
      {
        drawer: { dismissible: false }
      }
    )
  });

  it('should handle TOGGLE_DRAWER when drawer is open', () => {
    expect(
      reducer(
        {
          drawer: { open: true }
        },
        {
          type: TOGGLE_DRAWER,
          payload: {}
        })
    ).toEqual(
      {
        drawer: { open: false }
      }
    )
  });

  it('should handle TOGGLE_DRAWER when drawer is closed', () => {
    expect(
      reducer(
        {
          drawer: { open: false }
        },
        {
          type: TOGGLE_DRAWER,
          payload: {}
        })
    ).toEqual(
      {
        drawer: { open: true }
      }
    )
  });
});
