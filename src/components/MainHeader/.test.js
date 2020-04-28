import React from 'react';

import { Link, Route, MemoryRouter } from 'react-router-dom';

import { shallow, mount } from 'enzyme';

import MainHeader from '.';

import { Menu } from 'antd';

describe('MainHeader component', () => {
  it('is expected render without crashing', () => {
    shallow(<MainHeader />);
  });

  it('is expected to contain a logo.', () => {
    const wrapper = shallow(<MainHeader />);

    expect(wrapper.find('.logo').exists()).toBeTruthy();
  });

  it('is expected to receive a mainRoutes property.', () => {
    const routes = [
      { path: '/', title: 'Root' },
      { path: '/projects', title: 'Projetos' },
    ];

    const wrapper = shallow(
      <MemoryRouter>
        <MainHeader mainRoutes={routes} />
      </MemoryRouter>
    );

    expect(wrapper.children().prop('mainRoutes')).toBe(routes);
  });

  it('is expected to have a child Menu', () => {
    const wrapper = shallow(<MainHeader />);

    expect(wrapper.children(Menu).exists()).toBeTruthy();
  });

  it('mainRoutes property is expected to map into Menu.Item components, children of Menu', () => {
    const routes = [
      { path: '/', title: 'Root' },
      { path: '/projects', title: 'Projetos' },
    ];

    const wrapper = shallow(<MainHeader mainRoutes={routes} />);

    expect(
      wrapper
        .children(Menu)
        .children(Menu.Item)
        .exists()
    ).toBeTruthy();
  });

  it(
    'Menu.Item component is expected to have a key with the path attribute ' +
      'of the route object, element of the mainRoutes vector',
    () => {
      const routes = [
        { path: '/', title: 'Root' },
        { path: '/projects', title: 'Projetos' },
      ];

      const wrapper = shallow(<MainHeader mainRoutes={routes} />);

      expect(
        wrapper
          .children(Menu)
          .children(Menu.Item)
          .get(0).key
      ).toBe(routes[0].path);
    }
  );

  it('Menu.Item component is expected to have a child Link', () => {
    const routes = [
      { path: '/', title: 'Root' },
      { path: '/projects', title: 'Projetos' },
    ];

    const wrapper = shallow(<MainHeader mainRoutes={routes} />);

    expect(
      wrapper
        .children(Menu)
        .children(Menu.Item)
        .children(Link)
        .exists()
    ).toBeTruthy();
  });

  it(
    'is expected to receive a location property (to receive this property ' +
      'the component must be routed `<Route component = {MainHeader} />`)',
    () => {
      const routes = [
        { path: '/', title: 'Root' },
        { path: '/projects', title: 'Projetos' },
      ];

      const wrapper = mount(
        <MemoryRouter>
          <Route component={MainHeader} />} />
        </MemoryRouter>
      );

      expect(wrapper.find(MainHeader).prop('location')).toBeDefined();
    }
  );

  it(
    'Menu selectedKeys props is expected to populate with the result of the' +
      'getCurrentRoute(location.pathname, mainRoutes) function call from the utils.js file.',
    () => {
      const routes = [
        { path: '/', title: 'Root' },
        { path: '/projects', title: 'Projetos' },
      ];

      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Route
            render={(props) => <MainHeader {...props} mainRoutes={routes} />}
          />
        </MemoryRouter>
      );

      expect(wrapper.find(Menu).prop('selectedKeys')).toEqual([routes[0].path]);
    }
  );

  it('Clicking on a menu item is expected to change a route', () => {
    const routes = [
      { path: '/', title: 'Root' },
      { path: '/projects', title: 'Projetos' },
    ];

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Route
          render={(props) => <MainHeader {...props} mainRoutes={routes} />}
        />
      </MemoryRouter>
    );

    wrapper
      .find(Link)
      .at(1)
      .simulate('click', { button: 0 });

    expect(wrapper.find(MainHeader).prop('location').pathname).toEqual(
      routes[1].path
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(<MainHeader />);

    expect(wrapper).toMatchSnapshot();
  });
});
