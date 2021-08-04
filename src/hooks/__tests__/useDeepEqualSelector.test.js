import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { renderHook } from '@testing-library/react-hooks';

import { useDeepEqualSelector } from '../useDeepEqualSelector';

describe('useDeepEqualSelector hook', () => {
  const fakeProjects = [{ uuid: '1' }];

  const mockStore = configureStore();

  const store = mockStore({
    projectsReducer: {
      projects: fakeProjects,
    },
  });

  it('should return the selected data from the store', () => {
    const projectsSelector = ({ projectsReducer }) => projectsReducer.projects;

    const { result } = renderHook(
      () => useDeepEqualSelector(projectsSelector),
      {
        wrapper(props) {
          // eslint-disable-next-line react/prop-types
          return <Provider store={store}>{props.children}</Provider>;
        },
      }
    );

    expect(result.current).toEqual(fakeProjects);
  });
});
