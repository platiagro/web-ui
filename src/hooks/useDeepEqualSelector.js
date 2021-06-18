import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';

export const useDeepEqualSelector = (selector) => {
  return useSelector(selector, isEqual);
};
