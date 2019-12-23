import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import { Button, message, Upload } from 'antd';
import { URL } from '../../../../services/componentsApi';
import UploadFileNotebookModal from '../../UploadFileNotebookModal';
import ComponentsUpload from '..';

const { Dragger } = Upload;

const details = {
  uuid: '1',
  createdAt: '2019-11-05T17:16:53.000Z',
  name: 'AutoML',
  parameters: [
    { name: 'b', type: 'int', required: true },
    { name: 'a', type: 'int', required: false },
  ],
};

const namespaces = [
  {
    namespace: 'anonymous',
    role: 'contributor',
    user: 'anonymous@kubeflow.org',
  },
];

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  component: {
    details,
    namespaces,
  },
});

describe('ComponentsUpload component', () => {
  it('is expected render without crashing', () => {
    shallow(
      <Provider store={store}>
        <ComponentsUpload />
      </Provider>
    );
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ComponentsUpload />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('toggleModal', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ComponentsUpload />
      </Provider>
    );
    const button = wrapper.find(Button);
    button.simulate('click');
    const modal = wrapper.find(UploadFileNotebookModal);
    expect(modal.props().visible).toBe(true);
  });

  it('DraggerProps', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <ComponentsUpload />
      </Provider>
    );

    const dragger = wrapper.find(Dragger);
    const draggerProps = dragger.props();

    const spyMsgSuccess = jest
      .spyOn(message, 'success')
      .mockImplementation(() => {});
    const spyMsgError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});

    // call beforeUpload without crashing
    draggerProps.beforeUpload({ name: 'name' });

    // check onChange with status done
    draggerProps.onChange({ file: { name: 'name', status: 'done' } });
    expect(spyMsgSuccess).toHaveBeenCalledWith(`name salvo com sucesso.`);

    // check onChange with status removed and error
    draggerProps.onChange({
      file: { status: 'removed', error: { status: 400 } },
    });

    // check onChange with status removed without error
    draggerProps.onChange({ file: { name: 'name', status: 'removed' } });
    expect(spyMsgSuccess).toHaveBeenCalledWith(`name removido com sucesso.`);

    // check onChange with status error with response 400
    draggerProps.onChange({
      file: { name: 'name', status: 'error', error: { status: 400 } },
    });
    expect(spyMsgError).toHaveBeenCalledWith(
      `Só é possível realizar o upload de um arquivo!`
    );

    // check onChange with status error with response 500
    draggerProps.onChange({
      file: { name: 'name', status: 'error', error: { status: 500 } },
    });
    expect(spyMsgError).toHaveBeenCalledWith(`Falha no upload do arquivo name`);

    // check onRemove success
    nock(URL)
      .post(`/components/deleteFiles/${details.uuid}`)
      .reply(200);
    await draggerProps
      .onRemove({
        file: { name: 'name' },
      })
      .then((response) => {
        expect(response).toBe(true);
      });

    // check onRemove error
    nock(URL)
      .post(`/components/deleteFiles/${details.uuid}`)
      .reply(400);
    await draggerProps
      .onRemove({
        file: { name: 'name' },
      })
      .then((response) => {
        expect(response).toBe(false);
      });

    // check onRemove with file error
    draggerProps.onRemove({
      file: { error: { status: 500 } },
    });
  });
});
