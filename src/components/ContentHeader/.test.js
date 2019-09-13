import React from 'react';

import { shallow } from 'enzyme';

import ContentHeader from '.';

describe('ContentHeader component should', () => {
  it('renders without crashing', () => {
    shallow(<ContentHeader />);
  });

  it('have a title props', () => {
    const contentHeaderShalowed = shallow(<ContentHeader />);

    expect(contentHeaderShalowed.prop('title')).toBeDefined();
  });

  it('have a subTitle props', () => {
    const contentHeaderShalowed = shallow(<ContentHeader />);

    expect(contentHeaderShalowed.prop('subTitle')).toBeDefined();
  });

  it('renders html correctly without title and subtitle', () => {
    const contentHeaderShalowed = shallow(<ContentHeader />);

    expect(contentHeaderShalowed.prop('title')).toBe('');
    expect(contentHeaderShalowed.prop('subTitle')).toBe('');
    expect(contentHeaderShalowed).toMatchSnapshot();
  });

  it('renders html correctly with title and no subtitle', () => {
    const title = 'Título';
    const contentHeaderShalowed = shallow(<ContentHeader title={title} />);

    expect(contentHeaderShalowed.prop('title')).toBe(title);
    expect(contentHeaderShalowed.prop('subTitle')).toBe('');
    expect(contentHeaderShalowed).toMatchSnapshot();
  });

  it('renders html correctly with subtitle and no title', () => {
    const subTitle = 'Subtítulo';
    const contentHeaderShalowed = shallow(
      <ContentHeader subTitle={subTitle} />
    );

    expect(contentHeaderShalowed.prop('title')).toBe('');
    expect(contentHeaderShalowed.prop('subTitle')).toBe(subTitle);
    expect(contentHeaderShalowed).toMatchSnapshot();
  });

  it('renders html correctly with title and subtitle', () => {
    const title = 'Título';
    const subTitle = 'Subtítulo';

    const contentHeaderShalowed = shallow(
      <ContentHeader title={title} subTitle={subTitle} />
    );

    expect(contentHeaderShalowed.prop('title')).toBe(title);
    expect(contentHeaderShalowed.prop('subTitle')).toBe(subTitle);
    expect(contentHeaderShalowed).toMatchSnapshot();
  });
});
