// REACT LIBS
import React from 'react';

// TEST LIBS
import { shallow, mount } from 'enzyme';

// COMPONENTS
import Modal from './Modal';

// MOCKS
// COMPONENT PROPS
// modal child html content
const childHtmlContent = <p>Html Content</p>;
// modal footer close button text
const closeButtonText = 'Close Button Text';
// modal close handler
const handleClose = () => alert('handleClose');
// modal is full screen
const isFullScreen = true;
// modal is visible
const isVisible = true;
// modal header title
const title = 'This is a modal title!';
// OTHERS
// modal child react content
const ChildReactContent = () => <div>React Content</div>;
// modal header close button css class
const headerCloseButtonCssClass = '.ant-modal-close';
// modal footer close button
const footerCloseButtonCssClass = '.ant-btn-primary';
// modal full screen css class
const fullScreenCssClass = '.modalFullScreen';
// modal wrapper css class
const modalWrapperCssClass = '.ant-modal-wrap';

// HEADER TESTS
describe('Header', () => {
  // should render header title
  it('should render header title', () => {
    // modal component
    const modalComponent = mount(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isFullScreen={isFullScreen}
        isVisible={isVisible}
        title={title}
      >
        {childHtmlContent}
      </Modal>
    );

    // expected condition
    expect(modalComponent.text().includes(title)).toBeTruthy();
  });

  // should render header close button
  it('should render header close button', () => {
    // modal component
    const modalComponent = mount(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isFullScreen={isFullScreen}
        isVisible={isVisible}
        title={title}
      >
        {childHtmlContent}
      </Modal>
    );

    // expected condition
    expect(modalComponent.exists(headerCloseButtonCssClass)).toBeTruthy();
  });
});

// CHILD TESTS
describe('Child', () => {
  // should render child html content
  it('should render child html content', () => {
    // modal component
    const modalComponent = shallow(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isFullScreen={isFullScreen}
        isVisible={isVisible}
        title={title}
      >
        {childHtmlContent}
      </Modal>
    );

    // expected condition
    expect(modalComponent.contains(childHtmlContent)).toBeTruthy();
  });

  // should render child react content
  it('should render child react content', () => {
    // modal component
    const modalComponent = shallow(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isFullScreen={isFullScreen}
        isVisible={isVisible}
        title={title}
      >
        <ChildReactContent />
      </Modal>
    );

    // expected condition
    expect(modalComponent.contains(<ChildReactContent />)).toBeTruthy();
  });
});

// FOOTER TESTS
describe('Footer', () => {
  // should render footer close button
  it('should render footer close button', () => {
    // modal component
    const modalComponent = mount(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isFullScreen={isFullScreen}
        isVisible={isVisible}
        title={title}
      >
        {childHtmlContent}
      </Modal>
    );

    // expected condition
    expect(modalComponent.exists(footerCloseButtonCssClass)).toBeTruthy();
  });

  // should render footer close button text
  it('should render footer close button text', () => {
    // modal component
    const modalComponent = mount(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isFullScreen={isFullScreen}
        isVisible={isVisible}
        title={title}
      >
        {childHtmlContent}
      </Modal>
    );

    // expected condition
    expect(modalComponent.text().includes(title)).toBeTruthy();
  });
});

// SIZE TESTS
describe('Size', () => {
  // should render a full screen modal
  it('should render a full screen modal', () => {
    // modal component
    const modalComponent = mount(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isFullScreen={isFullScreen}
        isVisible={isVisible}
        title={title}
      >
        {childHtmlContent}
      </Modal>
    );

    // expected condition
    expect(modalComponent.exists(fullScreenCssClass)).toBeTruthy();
  });

  // should render a default modal
  it('should render a default modal', () => {
    // is full screen
    const isFullScreen = false;

    // modal component
    const modalComponent = mount(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isVisible={isVisible}
        isFullScreen={isFullScreen}
        title={title}
      >
        {childHtmlContent}
      </Modal>
    );

    // expected condition
    expect(modalComponent.exists(fullScreenCssClass)).not.toBeTruthy();
  });
});

// VISIBILITY TESTS
describe('Visibility', () => {
  // should render a visible modal
  it('should render a visible modal', () => {
    // modal component
    const modalComponent = mount(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isFullScreen={isFullScreen}
        isVisible={isVisible}
        title={title}
      >
        {childHtmlContent}
      </Modal>
    );

    // expected condition
    expect(modalComponent.exists(modalWrapperCssClass)).toBeTruthy();
  });

  // should not render a invisible modal
  it('should not render a invisible modal', () => {
    // is visible
    const isVisible = false;

    // modal component
    const modalComponent = mount(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isFullScreen={isFullScreen}
        isVisible={isVisible}
        title={title}
      >
        {childHtmlContent}
      </Modal>
    );

    // expected condition
    expect(modalComponent.exists(modalWrapperCssClass)).not.toBeTruthy();
  });
});

// HANDLERS TESTS
describe('Handlers', () => {
  // should call a close handler on header close button
  it('should call a close handler on header close button click', () => {
    // modal close handler
    const handleClose = jest.fn();

    // modal component
    const modalComponent = mount(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isFullScreen={isFullScreen}
        isVisible={isVisible}
        title={title}
      >
        {childHtmlContent}
      </Modal>
    );

    // simulating click on header close button
    modalComponent.find(headerCloseButtonCssClass).simulate('click');

    // expected condition
    expect(handleClose.mock.calls.length).toEqual(1);
  });

  // should call a close handler on footer close button click
  it('should call a close handler on footer close button click', () => {
    // modal close handler
    const handleClose = jest.fn();

    // modal component
    const modalComponent = mount(
      <Modal
        closeButtonText={closeButtonText}
        handleClose={handleClose}
        isFullScreen={isFullScreen}
        isVisible={isVisible}
        title={title}
      >
        {childHtmlContent}
      </Modal>
    );

    // simulating click on footer close button
    modalComponent.find(footerCloseButtonCssClass).simulate('click');

    // expected condition
    expect(handleClose.mock.calls.length).toEqual(1);
  });
});
