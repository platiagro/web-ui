import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Menu, Space, Checkbox } from 'antd';
import {
  MoreOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

import { DragIndicatorComponent } from 'assets';

import './OperatorResult.less';

const OperatorResultItemTitle = ({
  onDelete,
  result,
  handleDownloadResult,
}) => {
  return (
    <>
      <Space>
        <div draggable='true' style={{ cursor: 'grab', paddingRight: 10 }}>
          <DragIndicatorComponent fill='#595959' />
        </div>
      </Space>

      <Checkbox className='ant-checkbox-group-item'>{result}</Checkbox>

      <Dropdown
        trigger={['click']}
        overlay={
          <Menu>
            <Menu.Item
              key='remove'
              icon={<DeleteOutlined />}
              onClick={() => {
                onDelete(result.uuid);
              }}
            >
              <span>Remover</span>
            </Menu.Item>

            <Menu.Item
              key='download'
              icon={<DownloadOutlined />}
              onClick={() => {
                handleDownloadResult();
              }}
            >
              <span>Fazer Download</span>
            </Menu.Item>
          </Menu>
        }
      >
        <Button
          type='text'
          icon={<MoreOutlined />}
          style={{ float: 'right' }}
        />
      </Dropdown>
    </>
  );
};

OperatorResultItemTitle.propTypes = {
  onDelete: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  handleDownloadResult: PropTypes.func.isRequired,
};

export default OperatorResultItemTitle;
