import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { mount, shallow } from 'enzyme';

import { act } from 'react-dom/test-utils';

import { Button, Empty, Spin } from 'antd';

import NewComponentModal from '../../components/Component/NewComponentModal';
import ComponentsTable from '../../components/Component/ComponentsTable';
import ContentHeader from '../../components/ContentHeader';
import Components from '.';

describe('Page Components should', () => {
  it('is expected render without crashing', () => {
    shallow(<Components />);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(<Components />);

    expect(wrapper).toMatchSnapshot();
  });

  it('is expected to have a NewComponentModal child', () => {
    const wrapper = shallow(<Components />);

    expect(
      wrapper
        .children(NewComponentModal)
        .exists()
    ).toBeTruthy();
  });

  it('is expected to have a ContentHeader child', () => {
    const wrapper = shallow(<Components />);

    expect(
      wrapper
        .children(ContentHeader)
        .exists()
    ).toBeTruthy();
  });

  it('is expected to have a div child', () => {
    const wrapper = shallow(<Components />);

    expect(wrapper.children('div').exists()).toBeTruthy();
  });

  it('componentsPageBody is expected to have header', () => {
    const wrapper = shallow(<Components />);

    expect(
      wrapper
      .children('div')
      .find('.header')
      .exists()
    ).toBeTruthy();
  });

  it('componentsPageBody header is expected to have button', () => {
    const wrapper = shallow(<Components />);

    expect(
      wrapper
      .children('div')
      .find('.header')
      .children(Button)
      .exists()
    ).toBeTruthy();
  });

  it('componentsPageBody is expected to have body', () => {
    const wrapper = shallow(<Components />)

    expect(
      wrapper
      .children('div')
      .find('.body')
      .exists()
    ).toBeTruthy();
  });

  it('is expected to exist Empty', () => {
    act(() => {
      const wrapper = shallow(<Components />);
      wrapper.setState({ loading: false, componentList: []});
      expect(
        wrapper
        .find(Empty)
        .exists()
      ).toBeTruthy();
    });
  });

  it('is expected to exist ComponentsTable', () => {
    const components = [
      {
        uuid: '9014c0e6-534b-4e7d-a8db-cd5c9d8ee540',
        createdAt: '2019-11-04T17:16:53.000Z',
        updatedAt: null,
        name: 'teste 2',
        file: '',
      },
    ];

    act(() => {
      const wrapper = shallow(<Components />);
      wrapper.setState({ loading: false, componentList: components});
      expect(
        wrapper
        .find(ComponentsTable)
        .exists()
      ).toBeTruthy();
    });
  });
});
