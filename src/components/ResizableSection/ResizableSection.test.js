// REACT LIBS
import React from 'react';

// TEST LIBS
import { shallow } from 'enzyme';

// COMPONENTS
import ResizableSection from './ResizableSection.jsx';

// CSS CLASS
// title block
const titleBlockCssClass = '.resizable-section-title';
// tip block
const tipBlockCssClass = '.resizable-section-tip';

// MOCKS
// react component
const ReactComponent = () => <div id='reactComponent'>React Component</div>;
// html element
const htmlElement = <div id='htmlElement' />;
// placeholder
const placeholder = <div>This is Placeholder!</div>;
// title
const title = 'This is a title!';
// tip
const tip = 'This is tip!';

// CHILDS TESTS
describe('Childs', () => {
  // html element render
  it('should render with a child html element', () => {
    // resizable section component
    const resizableSection = shallow(
      <ResizableSection placeholder={placeholder}>
        {htmlElement}
      </ResizableSection>
    );

    // expected condition
    expect(resizableSection.contains(htmlElement)).toBeTruthy();
    expect(resizableSection.contains(placeholder)).not.toBeTruthy();
  });

  // react component
  it('should render with a child react component', () => {
    // resizable section component
    const resizableSection = shallow(
      <ResizableSection placeholder={placeholder}>
        <ReactComponent />
      </ResizableSection>
    );

    // expected conditions
    expect(resizableSection.contains(<ReactComponent />)).toBeTruthy();
    expect(resizableSection.contains(placeholder)).not.toBeTruthy();
  });

  // empty
  it('should render without child', () => {
    // resizable section component
    const resizableSection = shallow(
      <ResizableSection placeholder={placeholder} />
    );

    // expected condition
    expect(resizableSection.contains(placeholder)).toBeTruthy();
  });
});

// TITLE TESTS
describe('Title', () => {
  // render with title
  it('should be able to render a title', () => {
    // resizable section component
    const resizableSection = shallow(
      <ResizableSection title={title} placeholder={placeholder}>
        <ReactComponent />
      </ResizableSection>
    );

    // expected condition
    expect(resizableSection.contains(title)).toBeTruthy();
    expect(resizableSection.exists(titleBlockCssClass)).toBeTruthy();
  });

  // reder without title
  it('should be able to render whithout a title', () => {
    // resizable section component
    const resizableSection = shallow(
      <ResizableSection placeholder={placeholder}>
        <ReactComponent />
      </ResizableSection>
    );

    // expected condition
    expect(resizableSection.exists(titleBlockCssClass)).not.toBeTruthy();
  });
});

// TIP TESTS
describe('Tip', () => {
  // render with tip
  it('should be able to render a tip', () => {
    // resizable section component
    const resizableSection = shallow(
      <ResizableSection tip={tip} placeholder={placeholder}>
        <ReactComponent />
      </ResizableSection>
    );

    // expected condition
    expect(resizableSection.exists(tipBlockCssClass)).toBeTruthy();
  });

  // render without tip
  it('should be able to render without a tip', () => {
    // resizable section component
    const resizableSection = shallow(
      <ResizableSection placeholder={placeholder}>
        <ReactComponent />
      </ResizableSection>
    );

    // expected condition
    expect(resizableSection.exists(tipBlockCssClass)).not.toBeTruthy();
  });
});

// TODO: SNAPSHOTS TESTS
