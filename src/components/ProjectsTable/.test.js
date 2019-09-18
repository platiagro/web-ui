import React from 'react';

import { shallow } from 'enzyme';

import ProjectsTable from '.';

// remove after tests
const projects = [
  {
    key: '1',
    projectName: 'workshp_ForAgri_0',
    experimentsList: [
      'Experimento 0',
      'Experimento 1',
      'Experimento 2',
      'Experimento 3',
      'Experimento 4',
      'Experimento 5',
      'Experimento 6',
    ],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '2',
    projectName: 'workshp_ForAgri_1',
    experimentsList: ['Experimento 0', 'Experimento 1', 'Experimento 2'],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '3',
    projectName: 'workshp_ForAgri_2',
    experimentsList: ['Experimento 0'],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '4',
    projectName: 'workshp_ForAgri_3',
    experimentsList: ['Experimento 0'],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '5',
    projectName: 'workshp_ForAgri_4',
    experimentsList: ['Experimento 0'],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '6',
    projectName: 'workshp_ForAgri_5',
    experimentsList: ['Experimento 0'],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '7',
    projectName: 'workshp_ForAgri_6',
    experimentsList: ['Experimento 0'],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '8',
    projectName: 'workshp_ForAgri_7',
    experimentsList: ['Experimento 0'],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '9',
    projectName: 'workshp_ForAgri_8',
    experimentsList: ['Experimento 0'],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '10',
    projectName: 'workshp_ForAgri_9',
    experimentsList: ['Experimento 0'],
    created: '11/10/2019 12:59:21',
  },
];

projects.forEach((project) => {
  project.experiments = project.experimentsList.join(', ');
});

const rowSelection = {
  selectedRowKeys: [],
  onChange: () => null,
};

describe('ProjectsTable component should', () => {
  it('renders without crashing', () => {
    shallow(
      <ProjectsTable projectList={projects} rowSelection={rowSelection} />
    );
  });

  it('renders html correctly', () => {
    const projectsTableShallowed = shallow(
      <ProjectsTable projectList={projects} rowSelection={rowSelection} />
    );

    expect(projectsTableShallowed).toMatchSnapshot();
  });
});
