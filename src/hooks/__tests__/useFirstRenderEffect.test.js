import { renderHook } from '@testing-library/react-hooks';

import { useFirstRenderEffect } from '../useFirstRenderEffect';

describe('useFirstRenderEffect hook', () => {
  it('should run the function passed as parameter a single time', () => {
    const mockFn = jest.fn();
    const { rerender } = renderHook(() => useFirstRenderEffect(mockFn));
    rerender();
    rerender();
    expect(mockFn).toBeCalledTimes(1);
  });
});
