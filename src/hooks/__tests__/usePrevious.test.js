import { renderHook } from '@testing-library/react-hooks';

import { usePrevious } from '../usePrevious';

describe('usePrevious hook', () => {
  it('should store the previous value', () => {
    const { result, rerender } = renderHook((value) => usePrevious(value), {
      initialProps: 1,
    });
    expect(result.current).toBe(undefined);
    rerender(2);
    expect(result.current).toBe(1);
    rerender(3);
    expect(result.current).toBe(2);
  });
});
