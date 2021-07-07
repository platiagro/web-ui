import { useRef, useEffect } from 'react';

export const useFirstRenderEffect = (fn) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && fn) {
      isFirstRender.current = false;
      fn();
    }
  }, [fn]);
};
