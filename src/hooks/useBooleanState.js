import { useCallback, useState } from 'react';

/**
 * It's like a useState with boolean value. Returns a function to set the state
 * to true and other to set it to false.
 *
 * @param {boolean} initialValue Initial Value
 * @returns {Array} [booleanValue, handleSetToTrue, handleSetToFalse]
 */
export const useBooleanState = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const handleSetToTrue = useCallback(() => setValue(true), []);
  const handleSetToFalse = useCallback(() => setValue(false), []);

  return [value, handleSetToTrue, handleSetToFalse];
};
