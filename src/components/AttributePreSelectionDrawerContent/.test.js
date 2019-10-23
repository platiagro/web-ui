import React from 'react';

import { shallow, mount } from 'enzyme'

import { act } from 'react-dom/test-utils';

import AttributePreSelectionDrawerContent from '.';
import ResultsDrawer from '../ResultsDrawer';
import ResultsButtonBar from '../ResultsButtonBar';

const parameter = {
  cutoff: 1,
  correlation: 1
}

const setCutoffPre2 = (e) => { };
const setCorrelationPre2 = (e) => { };

describe('AttributePreSelectionDrawerContent component', () => {

  it('is expected render without crashing', () => {
    shallow(<AttributePreSelectionDrawerContent
      parameter={parameter}
      setCutoff={setCutoffPre2}
      setCorrelation={setCorrelationPre2}
    />);
  });

  it('is expected render without crashing with runStatus = Failed and taskStatus = Succeeded', () => {
    act(() => {
      shallow(<AttributePreSelectionDrawerContent
        parameter={parameter}
        setCutoff={setCutoffPre2}
        setCorrelation={setCorrelationPre2}
        runStatus={'Failed'}
        taskStatus={'Succeeded'}
      />);
    });
  });

  it('is expected to be of type Div', () => {
    const wrapper = shallow(<AttributePreSelectionDrawerContent
      parameter={parameter}
      setCutoff={setCutoffPre2}
      setCorrelation={setCorrelationPre2}
    />);

    expect(wrapper.is('div')).toBeTruthy();
  });

  it('Div child is expected to have a ResultsDrawer child and ResultsButtonBar button', () => {

    act(() => {
      const wrapper = mount(<AttributePreSelectionDrawerContent
        parameter={parameter}
        setCutoff={setCutoffPre2}
        setCorrelation={setCorrelationPre2}
        details={[{ "uuid": "uuid", "headerId": "headerId" }]}
        runStatus={'Failed'}
        taskStatus={'Succeeded'}
      />);

      expect(
        wrapper
          .children('div')
          .children(ResultsDrawer)
          .exists()
      ).toBeTruthy();

      expect(
        wrapper
          .children('div')
          .children(ResultsButtonBar)
          .exists()
      ).toBeTruthy();
    });
  });

  it('is expected render html correctly', () => {
    const wrapper = shallow(<AttributePreSelectionDrawerContent
      parameter={parameter}
      setCutoff={setCutoffPre2}
      setCorrelation={setCorrelationPre2}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
