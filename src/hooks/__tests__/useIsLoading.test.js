import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { renderHook } from '@testing-library/react-hooks';

import { useIsLoading } from '../useIsLoading';

describe('useIsLoading hook', () => {
  const mockStore = configureStore();

  const store = mockStore({
    loadingReducer: {
      loading: {
        KEY_1: true,
        KEY_2: false,
      },
    },
  });

  it('should return true if the key is true in the state', () => {
    const { result, rerender } = renderHook((...keys) => useIsLoading(keys), {
      initialProps: 'NOT_EXISTING_KEY',
      wrapper(props) {
        // eslint-disable-next-line react/prop-types
        return <Provider store={store}>{props.children}</Provider>;
      },
    });

    expect(result.current).toBe(false);
    rerender('KEY_1');
    expect(result.current).toBe(true);
    rerender('KEY_2');
    expect(result.current).toBe(false);
  });

  it('should return true if one or more keys are true', () => {
    const { result } = renderHook(() => useIsLoading('KEY_2', 'KEY_1'), {
      wrapper(props) {
        // eslint-disable-next-line react/prop-types
        return <Provider store={store}>{props.children}</Provider>;
      },
    });

    expect(result.current).toBe(true);
  });

  it('should return false if do not pass a key as param', () => {
    const { result } = renderHook(() => useIsLoading(), {
      wrapper(props) {
        // eslint-disable-next-line react/prop-types
        return <Provider store={store}>{props.children}</Provider>;
      },
    });

    expect(result.current).toBe(false);
  });
});
