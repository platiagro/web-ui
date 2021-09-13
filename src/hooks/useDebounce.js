import { useRef } from 'react';

export const useDebounce = ({ stopCallback, startCallback, delay = 600 }) => {
  const timer = useRef(0);

  return () => {
    if (startCallback) startCallback();

    window.clearTimeout(timer.current);

    timer.current = window.setTimeout(() => {
      if (stopCallback) stopCallback();
    }, delay);
  };
};
