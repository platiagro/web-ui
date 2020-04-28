import React from 'react';
import AutosizeInput from 'react-input-autosize';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import EditableTitle from '..';

const details = {
  uuid: 'uuid',
  name: 'name',
};

const onUpdate = jest.fn((detail, newName) => {
  let response = false;
  if (newName === 'newName') {
    response = true;
  }
  return Promise.resolve(response);
});

describe('EditableTitle component', () => {
  it('is expected render without crashing', () => {
    shallow(<EditableTitle details={details} onUpdate={onUpdate} />);
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(
      <EditableTitle details={details} onUpdate={onUpdate} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is expected to exist AutosizeInput', () => {
    const wrapper = mount(
      <EditableTitle details={details} onUpdate={onUpdate} />
    );
    expect(wrapper.find(AutosizeInput).exists()).toBeTruthy();
  });

  it('is expected to call onUpdate', () => {
    const wrapper = mount(
      <EditableTitle details={details} onUpdate={onUpdate} />
    );

    const funcBlur = jest.fn();
    act(() => {
      const input = wrapper.find('input');
      const inputProps = input.props();
      inputProps.onClick();
      inputProps.onChange({ currentTarget: { value: 'newName' } });

      inputProps.onBlur({ currentTarget: { value: details.name } });
      inputProps.onBlur({ currentTarget: { value: 'newName' } });
      expect(onUpdate).toBeCalledWith(details, 'newName');
      inputProps.onBlur({ currentTarget: { value: 'error' } });
      expect(onUpdate).toBeCalledWith(details, 'error');

      inputProps.onKeyUp({ currentTarget: { blur: funcBlur }, key: 'Escape' });
      inputProps.onKeyUp({ currentTarget: { blur: funcBlur }, key: 'Enter' });
      expect(funcBlur).toBeCalled();
    });
  });
});
