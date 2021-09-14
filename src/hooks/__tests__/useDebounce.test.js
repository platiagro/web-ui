import { renderHook, act } from '@testing-library/react-hooks';

import { useDebounce } from '../useDebounce';

describe('useDebounce hook', () => {
  it('should return the correct structure', () => {
    const { result } = renderHook(() => useDebounce());
    expect(typeof result.current).toBe('function');
  });

  it('should call the start function immediately and the stop after a delay', async () => {
    const startCallback = jest.fn();
    const stopCallback = jest.fn();

    const { result, waitFor } = renderHook(() =>
      useDebounce({
        delay: 50,
        startCallback,
        stopCallback,
      })
    );

    act(() => {
      result.current();
    });

    expect(startCallback).toBeCalled();

    await waitFor(
      () => {
        expect(stopCallback).toBeCalled();
      },
      { timeout: 75 }
    );
  });

  it('should pass all params to the start and stop functions', async () => {
    const startCallback = jest.fn();
    const stopCallback = jest.fn();

    const { result, waitFor } = renderHook(() =>
      useDebounce({
        delay: 51,
        startCallback,
        stopCallback,
      })
    );

    act(() => {
      result.current(7, 8, 9, 'abc', 1, 2, 3);
    });

    expect(startCallback).toBeCalledWith(7, 8, 9, 'abc', 1, 2, 3);

    await waitFor(
      () => {
        expect(stopCallback).toBeCalledWith(7, 8, 9, 'abc', 1, 2, 3);
      },
      { timeout: 75 }
    );
  });
});
