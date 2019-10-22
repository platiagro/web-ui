import React from 'react';

import { shallow } from 'enzyme';

import { Switch, Route } from 'react-router-dom';
import mainRoutes from '../../routes/main';

import App from '.';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';

import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

describe('App component', () => {
  it('is expected render without crashing', () => {
    shallow(<App />);
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

  it('Layout child is expected to have a Content child', () => {
    const wrapper = shallow(<App />);

    expect(
      wrapper
        .children(Layout)
        .children(Content)
        .exists()
    ).toBeTruthy();
  });

  it('Layout child is expected to have a Footer child', () => {
    const wrapper = shallow(<App />);

    expect(
      wrapper
        .children(Layout)
        .children(Footer)
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
        .children(Content)
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
        .children(Content)
        .children(Switch)
        .children(Route)
        .get(0).props.path
    ).toBe(path0);

    expect(
      wrapper
        .children(Layout)
        .children(Content)
        .children(Switch)
        .children(Route)
        .get(1).props.path
    ).toBe(path1);
  });

  it('Footer child of Layout child is expected to have a MainFooter child', () => {
    const wrapper = shallow(<App />);

    expect(
      wrapper
        .children(Layout)
        .children(Footer)
        .children(MainFooter)
        .exists()
    ).toBeTruthy();
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
