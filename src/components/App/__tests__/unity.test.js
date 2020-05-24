import React from 'react';
import { shallow } from 'enzyme';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import mainRoutes from '../../../routes/main';
import App from '..';
import MainHeader from '../../MainHeader';

const { Header } = Layout;

describe('App component', () => {
  it('is expected render without crashing', () => {
    shallow(<App />);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('is expected to be of type Layout', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.is(Layout)).toBeTruthy();
  });

  it('is expected to have a Layout child', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.children(Layout).exists()).toBeTruthy();
  });

  it('Layout child is expected to have a Header child', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper
        .children(Layout)
        .children(Header)
        .exists()
    ).toBeTruthy();
  });

  it('Header child of Layout child is expected to have a Route child', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper
        .children(Layout)
        .children(Header)
        .children(Route)
        .exists()
    ).toBeTruthy();
  });

  it(
    'Route child of Header child of Layout child is expected to have a render ' +
      'props that returns a MainHeader component',
    () => {
      const wrapper = shallow(<App />);
      expect(
        wrapper
          .children(Layout)
          .children(Header)
          .children(Route)
          .get(0)
          .props.render()
      ).toMatchObject(<MainHeader mainRoutes={mainRoutes} />);
    }
  );

  it('Content child of Layout child is expected to have a Switch child', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper
        .children(Layout)
        .children(Layout)
        .children(Switch)
        .exists()
    ).toBeTruthy();
  });

  it('MainRoutes are expected to be mapped within the Switch component.', () => {
    const wrapper = shallow(<App />);
    const path0 = mainRoutes[0].path;
    const path1 = mainRoutes[1].path;

    expect(
      wrapper
        .children(Layout)
        .children(Layout)
        .children(Switch)
        .children(Route)
        .get(0).props.path
    ).toBe(path0);

    expect(
      wrapper
        .children(Layout)
        .children(Layout)
        .children(Switch)
        .children(Route)
        .get(1).props.path
    ).toBe(path1);
  });
