import { renderHook, act } from '@testing-library/react-hooks';

import { useToggleState } from '../useToggleState';

describe('useToggleState hook', () => {
  it('should return the correct structure', () => {
    const { result } = renderHook(() => useToggleState());

    expect(result.current).toHaveLength(3);
    expect(typeof result.current[0]).toBe('boolean');
    expect(typeof result.current[1]).toBe('function');
    expect(typeof result.current[2]).toBe('function');
  });

  it('should toggle the state correctly', () => {
    const { result } = renderHook(() => useToggleState());

    expect(result.current[0]).toBe(false);

    act(() => {
      const handleToggle = result.current[1];
      handleToggle();
    });

    expect(result.current[0]).toBe(true);
  });

  it('should set the state using the setState function', () => {
    const { result } = renderHook(() => useToggleState(true));

    expect(result.current[0]).toBe(true);

    act(() => {
      const setState = result.current[2];
      setState(false);
    });

    expect(result.current[0]).toBe(false);
  });

  it('should the toggle function do not change due to re-renders', () => {
    const { result, rerender } = renderHook(() => useToggleState());

    const handleToggle = result.current[1];

    rerender();

    expect(result.current[1]).toBe(handleToggle);
  });
});
