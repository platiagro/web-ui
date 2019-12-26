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

const setupShallow = () => {
  const wrapper = shallow(<ComponentsUpload store={store} />);
  return wrapper.dive().dive();
};

describe('ComponentsUpload component', () => {
  it('is expected render without crashing', () => {
    setupShallow();
  });

  it('is expected render html correctly', () => {
    const wrapper = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('toggleModal', () => {
    const wrapper = setupShallow();
    const button = wrapper.find(Button);
    button.simulate('click');
    const modal = wrapper.find(UploadFileNotebookModal);
    expect(modal.props().visible).toBe(true);
  });

  it('Dragger call beforeUpload without crashing', () => {
    const wrapper = setupShallow();
    const dragger = wrapper.find(Dragger);
    const draggerProps = dragger.props();
    draggerProps.beforeUpload({ name: 'name' });
  });

  it('Dragger check onChange with status done', () => {
    const wrapper = setupShallow();
    const dragger = wrapper.find(Dragger);
    const draggerProps = dragger.props();
    const spyMsgSuccess = jest
      .spyOn(message, 'success')
      .mockImplementation(() => {});

    draggerProps.onChange({ file: { name: 'name', status: 'done' } });
    expect(spyMsgSuccess).toHaveBeenCalledWith(`name salvo com sucesso.`);
  });

  it('Dragger check onChange with status removed', () => {
    const wrapper = setupShallow();
    const dragger = wrapper.find(Dragger);
    const draggerProps = dragger.props();
    const spyMsgSuccess = jest
      .spyOn(message, 'success')
      .mockImplementation(() => {});

    // call onChange with status removed and error
    draggerProps.onChange({
      file: { status: 'removed', error: { status: 400 } },
    });

    // call onChange with status removed without error
    draggerProps.onChange({ file: { name: 'name', status: 'removed' } });
    expect(spyMsgSuccess).toHaveBeenCalledWith(`name removido com sucesso.`);
  });

  it('Dragger check onChange with status error', () => {
    const wrapper = setupShallow();
    const dragger = wrapper.find(Dragger);
    const draggerProps = dragger.props();
    const spyMsgError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});

    // call onChange with status error and error 400
    draggerProps.onChange({
      file: { name: 'name', status: 'error', error: { status: 400 } },
    });
    expect(spyMsgError).toHaveBeenCalledWith(
      `Só é possível realizar o upload de um arquivo!`
    );

    // call onChange with status error and error 500
    draggerProps.onChange({
      file: { name: 'name', status: 'error', error: { status: 500 } },
    });
    expect(spyMsgError).toHaveBeenCalledWith(`Falha no upload do arquivo name`);
  });

  it('Dragger check onRemove', async () => {
    const wrapper = setupShallow();
    const dragger = wrapper.find(Dragger);
    const draggerProps = dragger.props();

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
      })
      .catch((error) => {
        throw error;
      });

    // check onRemove error
    nock(URL)
      .post(`/components/deleteFiles/${details.uuid}`)
      .reply(400, { message: 'message' });
    await draggerProps
      .onRemove({
        file: { name: 'name' },
      })
      .then((response) => {
        expect(response).toBe(false);
      })
      .catch((error) => {
        throw error;
      });

    // check onRemove with file error
    draggerProps.onRemove({
      file: { error: { status: 500 } },
    });
  });
});
