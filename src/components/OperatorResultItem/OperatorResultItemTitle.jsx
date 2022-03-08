import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Menu, Space, Checkbox, Select } from 'antd';
import {
  MoreOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

import { DragIndicatorComponent } from 'assets';

import './OperatorResult.less';

const OperatorResultItemTitle = ({
  cardId,
  result,
  figures,
  isSelected,
  selectedFigure,
  handleSelectResult,
  handleRemoveFigure,
  handleSelectFigure,
  handleDownloadResult,
}) => {
  return (
    <>
      <Space>
        <div draggable='true' style={{ cursor: 'grab', paddingRight: 10 }}>
          <DragIndicatorComponent fill='#595959' />
        </div>
      </Space>

      <Checkbox
        className='ant-checkbox-group-item'
        checked={isSelected}
        onChange={() => handleSelectResult(cardId)}
      >
        {result}
      </Checkbox>

      <Space>
        <Select
          displayRender={([firstLabel]) => firstLabel}
          placeholder={'Selecione um Resultado'}
          style={{ width: 250, marginLeft: 20 }}
          value={selectedFigure}
          onChange={(value) => handleSelectFigure(cardId, value)}
        >
          {figures.map((figure, index) => {
            return (
              <Select.Option key={figure.uuid} value={index}>
                Resultado {index + 1}
              </Select.Option>
            );
          })}
        </Select>
      </Space>

      <Dropdown
        trigger={['click']}
        overlay={
          <Menu>
            <Menu.Item
              key='remove'
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveFigure(cardId)}
            >
              <span>Remover</span>
            </Menu.Item>

            {selectedFigure >= 0 && (
              <Menu.Item
                key='download'
                icon={<DownloadOutlined />}
                onClick={() => handleDownloadResult(cardId)}
              >
                <span>Fazer Download</span>
              </Menu.Item>
            )}
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
  cardId: PropTypes.string.isRequired,
  result: PropTypes.object.isRequired,
  figures: PropTypes.array.isRequired,
  isSelected: PropTypes.array.isRequired,
  selectedFigure: PropTypes.number,
  handleSelectResult: PropTypes.func.isRequired,
  handleRemoveFigure: PropTypes.func.isRequired,
  handleSelectFigure: PropTypes.func.isRequired,
  handleDownloadResult: PropTypes.func.isRequired,
};

OperatorResultItemTitle.defaultProps = {
  selectedFigure: undefined,
};

export default OperatorResultItemTitle;
