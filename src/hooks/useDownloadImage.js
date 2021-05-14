import { useCallback } from 'react';

export const useDownloadImage = () => {
  return useCallback((fileName, url) => {
    const linkElement = document.createElement('a');
    document.body.appendChild(linkElement);

    linkElement.download = fileName;
    linkElement.href = url;
    linkElement.click();

    document.body.removeChild(linkElement);
  }, []);
};
