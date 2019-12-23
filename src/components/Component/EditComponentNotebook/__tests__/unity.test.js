import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import nock from 'nock';
import { Button } from 'antd';
import { URL as JUPYTER_URL } from '../../../../services/jupyterApi';
import UploadFileNotebookModal from '../../UploadFileNotebookModal';
import EditComponentNotebook from '..';

describe('EditComponentNotebook component', () => {
  it('is expected render without crashing', () => {
    shallow(<EditComponentNotebook fileName='fileName' filePath='filePath' />);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <EditComponentNotebook fileName='fileName' filePath='filePath' />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('toggleModal', async () => {
    // work around to ignore console log act error
    jest.spyOn(console, 'error').mockImplementation(() => {});

    nock(JUPYTER_URL)
      .get('/kubeflow/api/workgroup/env-info')
      .reply(200, {
        namespaces: [],
      });

    const wrapper = mount(
      <EditComponentNotebook fileName='fileName' filePath='filePath' />
    );

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
      const button = wrapper.find(Button);
      button.simulate('click');
      const modal = wrapper.find(UploadFileNotebookModal);
      expect(modal.props().visible).toBe(true);
    });
  });
});
