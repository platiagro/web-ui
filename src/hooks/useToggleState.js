import { useCallback, useState } from 'react';

/**
 * Similar to useState from React but it also returns a function that toggle the state
 *
 * @param {boolean} initialValue Initial Value
 * @returns {Array} [value, toggleFunction, setValue]
 */
export const useToggleState = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const handleToggle = useCallback(() => {
    setValue((currentValue) => !currentValue);
  }, []);

  return [value, handleToggle, setValue];
};
