import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Popover, Input } from 'antd';

/**
 * Popover to rename or duplicate a experiment or deployment.
 */
function NewNamePopover(props) {
  const { children, loading, currentName, onRename } = props;

  const [visible, setVisible] = useState(false);

  const handleRename = (name) => {
    // Only send rename if has a name and new name is different from current name
    if (name.length > 0 && name !== currentName) {
      onRename(name);
    }

    if (name.length > 0) {
      handleVisibleChange();
    }
  };

  const handleVisibleChange = () => {
    setVisible(!visible);
  };

  const popoverContent = (
    <div>
      <div>
        <strong>Renomear</strong>
      </div>
      <div>
        {
          // We are using the input search because of the ease of the suffix button
        }
        <Input.Search
          allowClear
          enterButton='OK'
          placeholder='Digite o novo nome'
          defaultValue={currentName}
          loading={loading}
          disabled={loading}
          onSearch={handleRename}
        />
      </div>
    </div>
  );

  return (
    <Popover
      trigger='click'
      content={popoverContent}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      {children}
    </Popover>
  );
}

NewNamePopover.propTypes = {
  children: PropTypes.node.isRequired,
  currentName: PropTypes.string,
  loading: PropTypes.bool,
  onRename: PropTypes.func.isRequired,
};

NewNamePopover.defaultProps = {
  loading: false,
  currentName: '',
};

export default NewNamePopover;
