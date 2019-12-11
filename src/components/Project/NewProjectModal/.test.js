import React from 'react';

import { shallow } from 'enzyme';

import NewProjectModal from '.';

describe('NewProjectModal component should', () => {
  it('renders without crashing', () => {
    shallow(
      <NewProjectModal
        visible={false}
        onCancel={() => null}
        onCreate={() => null}
      />
    );
  });

  it('renders html correctly', () => {
    const newProjectModalShallowed = shallow(
      <NewProjectModal
        visible={false}
        onCancel={() => null}
        onCreate={() => null}
      />
    );

    expect(newProjectModalShallowed).toMatchSnapshot();
  });
});
