import { renderHook, act } from '@testing-library/react-hooks';

import { useBooleanState } from '../useBooleanState';

describe('useBooleanState hook', () => {
  it('should return the correct structure', () => {
    const { result } = renderHook(() => useBooleanState());

    expect(result.current).toHaveLength(3);
    expect(typeof result.current[0]).toBe('boolean');
    expect(typeof result.current[1]).toBe('function');
    expect(typeof result.current[2]).toBe('function');
  });

  it('should set the state to true', () => {
    const { result } = renderHook(() => useBooleanState());

    expect(result.current[0]).toBe(false);

    act(() => {
      const handleSetToTrue = result.current[1];
      handleSetToTrue();
    });

    expect(result.current[0]).toBe(true);
  });

  it('should set the state to false', () => {
    const { result } = renderHook(() => useBooleanState(true));

    expect(result.current[0]).toBe(true);

    act(() => {
      const handleSetToFalse = result.current[2];
      handleSetToFalse();
    });

    expect(result.current[0]).toBe(false);
  });

  it('should the functions do not change due to re-renders', () => {
    const { result, rerender } = renderHook(() => useBooleanState());

    const handleSetToTrue = result.current[1];
    const handleSetToFalse = result.current[2];

    rerender();

    expect(result.current[1]).toBe(handleSetToTrue);
    expect(result.current[2]).toBe(handleSetToFalse);
  });
});
