import { useEffect } from 'react';

/**
 *
 * @param {boolean} dependency Dependency flag to monitore
 */
export const useChangeFavicon = (dependency) => {
  useEffect(() => {
    const favicon = document.querySelector('#favicon');

    if (dependency) {
      favicon.href = '/favicon_gray.png';
    } else {
      favicon.href = '/favicon.png';
    }
    return () => {
      favicon.href = '/favicon.png';
    };
  }, [dependency]);
};
