import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { shallow, mount } from 'enzyme'

import { act } from 'react-dom/test-utils';

import { Popconfirm, Table } from 'antd';

import ComponentTable from '.';

const components = [
  {
    uuid: '9014c0e6-534b-4e7d-a8db-cd5c9d8ee540',
    createdAt: '2019-11-04T17:16:53.000Z',
    updatedAt: null,
    name: 'teste 2',
    file: '',
  },
  {
    uuid: '58af2581-de59-40ea-8051-cf28a9c3f5b1',
    createdAt: '2019-11-04T17:16:48.000Z',
    updatedAt: null,
    name: 'teste 1',
    file: '',
  },
  {
    uuid: '80b35439-d45b-4ae1-b437-8069a5663510',
    createdAt: '2019-11-04T17:16:43.000Z',
    updatedAt: null,
    name: 'teste ',
    file: '',
  },
];

const onDelete = () => {}

describe('ComponentTable component', () => {

  it('is expected render without crashing', () => {
    shallow(<ComponentTable
      componentList={components}
      onDelete = {onDelete}
    />);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(<ComponentTable
      componentList={components}
      onDelete = {onDelete}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('is expected to exist Table', () => {
    const wrapper = mount(
      <Router>
        <ComponentTable
          componentList={components}
          onDelete = {onDelete} />
        </Router>
    );

    expect(
      wrapper
        .find(Table)
        .exists()
    ).toBeTruthy();
  });
});
