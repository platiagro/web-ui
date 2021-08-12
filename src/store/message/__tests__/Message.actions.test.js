import { message } from 'antd';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import {
  showError,
  showInfo,
  showLoading,
  showSuccess,
  showWarning,
} from '../message.actions';

describe('Message Actions', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({});

  it('should show error using the antd message.error function', () => {
    const spy = jest.spyOn(message, 'error');
    store.dispatch(showError('message'));
    expect(spy).toHaveBeenCalled();
  });

  it('should show info using the antd message.info function', () => {
    const spy = jest.spyOn(message, 'info');
    store.dispatch(showInfo('message'));
    expect(spy).toHaveBeenCalled();
  });

  it('should show loading using the antd message.loading function', () => {
    const spy = jest.spyOn(message, 'loading');
    store.dispatch(showLoading('message'));
    expect(spy).toHaveBeenCalled();
  });

  it('should show success using the antd message.success function', () => {
    const spy = jest.spyOn(message, 'success');
    store.dispatch(showSuccess('message'));
    expect(spy).toHaveBeenCalled();
  });

  it('should show warning using the antd message.warning function', () => {
    const spy = jest.spyOn(message, 'warning');
    store.dispatch(showWarning('message'));
    expect(spy).toHaveBeenCalled();
  });
});
