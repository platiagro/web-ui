import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Popover, Input } from 'antd';

/**
 * Popover to rename or duplicate a experiment or deployment.
 */
function NewNamePopover(props) {
  const { children, loading, currentName, onSubmit, isDuplicate } = props;

  const [visible, setVisible] = useState(false);

  const popoverTitle = isDuplicate ? 'Duplicar' : 'Renomear';

  const handleSubmit = (name) => {
    // Only send rename if has a name and new name is different from current name
    if (name.length > 0 && name !== currentName) {
      onSubmit(name);
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
        <strong>{popoverTitle}</strong>
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
          onSearch={handleSubmit}
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
  onSubmit: PropTypes.func.isRequired,
  isDuplicate: PropTypes.bool.isRequired,
};

NewNamePopover.defaultProps = {
  loading: false,
  currentName: '',
};

export default NewNamePopover;
