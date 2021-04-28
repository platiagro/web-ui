import { useSelector } from 'react-redux';

const loadingSelector = (...keys) => ({ loadingReducer }) => {
  if (keys.length === 1) {
    const [key] = keys;
    const loading = loadingReducer.loading;
    return !!loading && !!loading[key];
  } else if (keys.length > 1) {
    const loading = loadingReducer.loading;

    const someKeysIsTruthy = Object.keys(loading || {}).some((key) => {
      const keyIsInKeysArray = keys.includes(key);
      return keyIsInKeysArray && !!loading[key];
    });

    return !!loading && someKeysIsTruthy;
  }

  return false;
};

export const useIsLoading = (...keys) => {
  return useSelector(loadingSelector(...keys));
};
