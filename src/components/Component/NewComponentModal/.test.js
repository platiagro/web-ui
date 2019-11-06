import React from 'react';

import { shallow, mount } from 'enzyme'

import { act } from 'react-dom/test-utils';

import { Form, Modal } from 'antd';

import NewComponentModal from '.';

const teste = () => {}

describe('NewComponentModal component', () => {

  it('is expected render without crashing', () => {
    shallow(<NewComponentModal 
      visible={true}
      onCancel={teste}
      onCreate={teste}/>);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
    <NewComponentModal 
      visible={true}
      onCancel={teste}
      onCreate={teste}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('is expected to exist Form', () => {
    const wrapper = mount(
      <NewComponentModal 
        visible={true}
        onCancel={teste}
        onCreate={teste} />
    );

    expect(
      wrapper
        .find(Form)
        .exists()
    ).toBeTruthy();
  });

  it('is expected to exist Modal', () => {
    const wrapper = mount(
      <NewComponentModal 
        visible={true}
        onCancel={teste}
        onCreate={teste} />
    );

    expect(
      wrapper
        .find(Modal)
        .exists()
    ).toBeTruthy();
  });
});
