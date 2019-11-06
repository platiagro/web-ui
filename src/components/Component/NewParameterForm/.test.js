import React from 'react';

import { shallow, mount } from 'enzyme'

import { act } from 'react-dom/test-utils';

import { Button, Form, Input, Select, Switch } from 'antd';

import NewParameterForm from '.';

const submit = () => {}

describe('NewParameterForm component', () => {

  it('is expected render without crashing', () => {
    shallow(<NewParameterForm onSubmit={submit} />);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(<NewParameterForm onSubmit={submit} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('is expected to exist Form', () => {
    const wrapper = mount(<NewParameterForm onSubmit={submit} />);

    expect(
      wrapper
        .find(Form)
        .exists()
    ).toBeTruthy();
  });
});
