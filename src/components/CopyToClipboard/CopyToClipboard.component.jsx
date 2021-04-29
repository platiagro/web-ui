import React from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { CopyToClipboard as ReactCopyToClipboard } from 'react-copy-to-clipboard';

const CopyToClipboard = ({ children, text, onCopy, showMessageOnCopy }) => {
  const handleOnCopy = (textCopied, result) => {
    onCopy && onCopy(textCopied, result);
    showMessageOnCopy && message.success(`Copiado para área de transferência!`);
  };

  return (
    <ReactCopyToClipboard text={text} onCopy={handleOnCopy}>
      {children}
    </ReactCopyToClipboard>
  );
};

CopyToClipboard.propTypes = {
  /** Text to be copied */
  text: PropTypes.string.isRequired,
  /** Flag to show antd message on copy */
  showMessageOnCopy: PropTypes.bool,
  /** Any react component */
  children: PropTypes.any,
  /** Optional callback, will be called when text is copied */
  onCopy: PropTypes.func,
};

CopyToClipboard.defaultProps = {
  showMessageOnCopy: true,
};

export default CopyToClipboard;
