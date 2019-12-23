import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import nock from 'nock';
import { Form, Modal, message, Select, Spin } from 'antd';
import UploadFileNotebookModal from '..';
import * as componentsServices from '../../../../services/componentsApi';
import * as jupyterServices from '../../../../services/jupyterApi';

const namespaces = [
  {
    namespace: 'anonymous',
    role: 'contributor',
    user: 'anonymous@kubeflow.org',
  },
];

const notebooks = [
  {
    name: 'my-notebook-server',
  },
];

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const onCancel = () => {};

describe('UploadFileNotebookModal component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('is expected render without crashing', () => {
    shallow(
      <UploadFileNotebookModal
        visible
        namespaces={namespaces}
        filePath='filePath'
        fileName='fileName'
        onCancel={onCancel}
      />
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <UploadFileNotebookModal
        visible
        namespaces={namespaces}
        filePath='filePath'
        fileName='fileName'
        onCancel={onCancel}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render self and subcomponents', () => {
    const wrapper = mount(
      <UploadFileNotebookModal
        visible
        namespaces={namespaces}
        filePath='filePath'
        fileName='fileName'
        onCancel={onCancel}
      />
    );

    expect(wrapper.find(Modal).exists()).toBeTruthy();
    expect(wrapper.find(Spin).exists()).toBeTruthy();
    expect(wrapper.find(Form).exists()).toBeTruthy();
  });

  it('onOk should be called', () => {
    // work around to ignore console log antd
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(
      <UploadFileNotebookModal
        visible
        namespaces={namespaces}
        filePath='filePath'
        fileName='fileName'
        onCancel={onCancel}
      />
    );

    const event = { preventDefault: () => {} };
    const modal = wrapper.find(Modal).instance();
    const spyHandleOk = jest.spyOn(modal, 'handleOk');
    modal.handleOk(event);
    expect(spyHandleOk).toHaveBeenCalled();
  });

  it('onCancel should be called', () => {
    const wrapper = mount(
      <UploadFileNotebookModal
        visible
        namespaces={namespaces}
        filePath='filePath'
        fileName='fileName'
        onCancel={onCancel}
      />
    );
    act(() => {
      const modal = wrapper.find(Modal).instance();
      const spyHandleCancel = jest.spyOn(modal, 'handleCancel');
      modal.handleCancel();
      expect(spyHandleCancel).toHaveBeenCalled();
    });
  });

  it('onChangeNamespace without notebook', async () => {
    const wrapper = mount(
      <UploadFileNotebookModal
        visible
        namespaces={namespaces}
        filePath='filePath'
        fileName='fileName'
        onCancel={onCancel}
      />
    );

    // mock get notebook list response
    nock(jupyterServices.URL)
      .get(`/jupyter/api/namespaces/anonymous/notebooks`)
      .reply(200);

    wrapper
      .find(Select)
      .at(0)
      .simulate('click');
    wrapper
      .find('MenuItem')
      .at(0)
      .simulate('click');
    await sleep(1000);
    wrapper
      .find(Select)
      .at(1)
      .simulate('click');
    expect(
      wrapper
        .find('MenuItem')
        .at(1)
        .props().value
    ).toBe('new-notebook');
  });

  it('onChangeNamespace with notebook', async () => {
    const wrapper = mount(
      <UploadFileNotebookModal
        visible
        namespaces={namespaces}
        filePath='filePath'
        fileName='fileName'
        onCancel={onCancel}
      />
    );

    // mock get notebook list response
    nock(jupyterServices.URL)
      .get(`/jupyter/api/namespaces/anonymous/notebooks`)
      .reply(200, { notebooks });

    wrapper
      .find(Select)
      .at(0)
      .simulate('click');
    wrapper
      .find('MenuItem')
      .at(0)
      .simulate('click');
    await sleep(1000);
    wrapper
      .find(Select)
      .at(1)
      .simulate('click');
    expect(
      wrapper
        .find('MenuItem')
        .at(1)
        .props().value
    ).toBe('my-notebook-server');
  });

  it('create new notebook', async () => {
    const wrapper = mount(
      <UploadFileNotebookModal
        visible
        namespaces={namespaces}
        filePath='filePath'
        fileName='fileName'
        onCancel={onCancel}
      />
    );

    // mock get notebook list response
    nock(jupyterServices.URL)
      .get(`/jupyter/api/namespaces/anonymous/notebooks`)
      .reply(200);

    // spy on windows open
    const spyGlobalOpen = jest.spyOn(global, 'open');

    wrapper
      .find(Select)
      .at(0)
      .simulate('click');
    wrapper
      .find('MenuItem')
      .at(0)
      .simulate('click');
    await sleep(1000);
    wrapper
      .find(Select)
      .at(1)
      .simulate('click');
    wrapper
      .find('MenuItem')
      .at(1)
      .simulate('click');

    expect(spyGlobalOpen).toHaveBeenCalledWith('/jupyter/');
  });

  it('handleSubmit', async () => {
    const wrapper = mount(
      <UploadFileNotebookModal
        visible
        namespaces={namespaces}
        filePath='filePath'
        fileName='fileName'
        onCancel={onCancel}
      />
    );

    // mock get notebook list response
    nock(jupyterServices.URL)
      .get(`/jupyter/api/namespaces/anonymous/notebooks`)
      .reply(200, { notebooks });

    // mock download base 64 response
    nock(componentsServices.URL)
      .post(`/components/downloadBase64`)
      .reply(200, {
        payload: 'payload',
      });

    // mock notebook file upload response
    nock(jupyterServices.URL)
      .put(`/notebook/anonymous/my-notebook-server/api/contents/fileName`)
      .reply(200);

    wrapper
      .find(Select)
      .at(0)
      .simulate('click');
    wrapper
      .find('MenuItem')
      .at(0)
      .simulate('click');
    await sleep(1000);
    wrapper
      .find(Select)
      .at(1)
      .simulate('click');
    wrapper
      .find('MenuItem')
      .at(1)
      .simulate('click');

    const spyMsgSuccess = jest.spyOn(message, 'success');
    const event = { preventDefault: () => {} };
    const modal = wrapper.find(Modal).instance();
    modal.handleOk(event);
    await sleep(2000);
    expect(spyMsgSuccess).toHaveBeenCalledWith(`Upload realizado com sucesso.`);
  });
});
