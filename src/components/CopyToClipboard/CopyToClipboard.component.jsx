import React from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { CopyToClipboard as ReactCopyToClipboard } from 'react-copy-to-clipboard';

const CopyToClipboard = ({ children, text, onCopy, showMessageOnCopy }) => {
  const handleOnCopy = (textCopied, result) => {
    if (onCopy) onCopy(textCopied, result);
    if (showMessageOnCopy) {
      message.success(`Copiado para área de transferência!`);
    }
  };

  return (
    <ReactCopyToClipboard text={text} onCopy={handleOnCopy}>
      {children}
    </ReactCopyToClipboard>
  );
};

CopyToClipboard.propTypes = {
  text: PropTypes.string.isRequired,
  showMessageOnCopy: PropTypes.bool,
  children: PropTypes.any,
  onCopy: PropTypes.func,
};

CopyToClipboard.defaultProps = {
  showMessageOnCopy: true,
};

export default CopyToClipboard;
