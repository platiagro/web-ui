import React from 'react';

import { shallow, mount } from 'enzyme'

import { act } from 'react-dom/test-utils';

import { Modal, Form, Input, Select, Switch } from 'antd';

import NewParameterModal from '.';

const teste = () => {}

describe('NewParameterModal component', () => {

  it('is expected render without crashing', () => {
    shallow(
      <NewParameterModal 
        visible={true}
        onCancel={teste}
        onCreate={teste}/>
      );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <NewParameterModal
        visible={true}
        onCancel={teste}
        onCreate={teste}/>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('is expected to exist Modal', () => {
    const wrapper = mount(
      <NewParameterModal
        visible={true}
        onCancel={teste}
        onCreate={teste}/>
    );

    expect(
      wrapper
        .find(Modal)
        .exists()
    ).toBeTruthy();
  });

  it('is expected to exist Form', () => {
    const wrapper = mount(
      <NewParameterModal
        visible={true}
        onCancel={teste}
        onCreate={teste}/>
    );

    expect(
      wrapper
        .find(Form)
        .exists()
    ).toBeTruthy();
  });
});
