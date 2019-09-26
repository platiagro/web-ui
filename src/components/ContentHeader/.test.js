import React from 'react';

import { shallow, mount } from 'enzyme';

import { PageHeader } from 'antd';

import ContentHeader from '.';

describe('ContentHeader component', () => {
  it('is expected render without crashing', () => {
    shallow(<ContentHeader />);
  });

  it('is expected to be a PageHeader (antd)', () => {
    const wrapper = shallow(<ContentHeader />);

    expect(wrapper.is(PageHeader)).toBeTruthy();
  });

  it('is expected to render the title received by props', () => {
    const title = 'Title';
    const wrapper = shallow(<ContentHeader title={title} />);

    expect(wrapper.html()).toContain(title);
  });

  it(
    'The title is expected to receive an onTitleDoubleClick event if it' +
      ' exists in the props',
    () => {
      const title = 'Title';
      const handleTitleDoubleClick = jest.fn(() => true);
      const wrapper = shallow(
        <ContentHeader
          title={title}
          onTitleDoubleClick={handleTitleDoubleClick}
        />
      );

      expect(wrapper.prop('title').props.onDoubleClick).toBe(
        handleTitleDoubleClick
      );
    }
  );

  it('A double click on the title is expected to call the onTitleDoubleClick function', () => {
    const title = 'Title';
    const handleTitleDoubleClick = jest.fn(() => true);

    const wrapper = mount(
      <ContentHeader
        title={title}
        onTitleDoubleClick={handleTitleDoubleClick}
      />
    );

    wrapper
      .find('span')
      .at(1)
      .simulate('doubleClick');

    expect(handleTitleDoubleClick).toHaveBeenCalled();
  });

  it(
    'A double click on the title is expected to have no events if props' +
      ' onTitleDoubleClick is not set',
    () => {
      const title = 'Title';
      const wrapper = shallow(<ContentHeader title={title} />);

      expect(wrapper.prop('title').props).toBeUndefined();
    }
  );

  it('is expected to render the subtitle received by props', () => {
    const subTitle = 'subTitle';
    const wrapper = shallow(<ContentHeader subTitle={subTitle} />);

    expect(wrapper.html()).toContain(subTitle);
  });

  it('is not expected to render subtitle if not present in props', () => {
    const wrapper = shallow(<ContentHeader />);

    expect(wrapper.prop('subTitle')).toBeUndefined();
  });

  it(
    'The component is expected to render a "back" arrow with the function' +
      ' contained in the onBack property, if any',
    () => {
      const title = 'Title';
      const onBack = jest.fn(() => true);
      const wrapper = mount(<ContentHeader title={title} onBack={onBack} />);

      expect(wrapper.prop('onBack')).toBe(onBack);
      expect(wrapper.find('i').html()).toContain('arrow-left');
    }
  );

  it(
    'is expected that when clicking on the component\'s "back" arrow the' +
      'function contained in the onBack property will be called',
    () => {
      const title = 'Title';
      const onBack = jest.fn(() => true);

      const wrapper = mount(<ContentHeader title={title} onBack={onBack} />);

      wrapper.find('i').simulate('click');

      expect(onBack).toHaveBeenCalled();
    }
  );

  it('is not expected to render back arrow when no onBack props', () => {
    const title = 'Title';
    const wrapper = mount(<ContentHeader title={title} />);

    expect(wrapper.find('i').exists()).not.toBeTruthy();
  });

  it(
    'is expected to render breadcrumbs contained in the breadcrumbs property' +
      ' when there is one',
    () => {
      const breadcrumbs = [
        {
          path: 'projects',
          breadcrumbName: 'Projetos',
        },
        {
          path: '2',
          breadcrumbName: 'Projeto 2',
        },
        {
          path: 'experiment/3',
          breadcrumbName: 'Experimento 3',
        },
      ];
      const title = 'Title';
      const wrapper = mount(
        <ContentHeader title={title} breadcrumbs={breadcrumbs} />
      );

      expect(wrapper.html()).toContain(breadcrumbs[0].breadcrumbName);
    }
  );

  // it(
  //   'Clicking on a breadcrumbs element is expected to change the route to' +
  //     " the path contained in the element's path property",
  //   () => {}
  // );

  // it('is not expected to render breadcrumbs when there is no props', () => {});

  // it('', () => {});

  // it('is expected render html correctly', () => {
  //   const wrapper = shallow(
  //     <ContentHeader />
  //   );

  //   expect(wrapper).toMatchSnapshot();
  // });
});

/*
Cabeçalho do conteúdo principal.  
Esse componente é responsável por exibir um título.  
Esse componente pode exibir um subtítulo.  
Esse componente pode exibir uma seta para voltar a tela anterior.  
Esse componente pode exibir um breadcrumbs.
Esse componente pode receber um evento de duplo clique no título, para permitir a edição do mesmo.
*/
