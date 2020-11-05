// REACT LIBS
import PropTypes from 'prop-types';
import React from 'react';

// UI LIBS
import Icon from '@ant-design/icons';
import {
  ClockCircleTwoTone,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Button, Cascader, Popover, Space } from 'antd';

// UTILS
import utils from 'utils';

// STYLES
import './CompareResultItem.less';

const DragIcon = () => (
  <svg
    width='6'
    height='10'
    viewBox='0 0 6 10'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M3.92969 7.67969C4.16667 7.44271 4.4401 7.32422 4.75 7.32422C5.0599 7.32422 5.33333 7.44271 5.57031 7.67969C5.80729 7.91667 5.92578 8.1901 5.92578 8.5C5.92578 8.8099 5.80729 9.08333 5.57031 9.32031C5.33333 9.55729 5.0599 9.67578 4.75 9.67578C4.4401 9.67578 4.16667 9.55729 3.92969 9.32031C3.69271 9.08333 3.57422 8.8099 3.57422 8.5C3.57422 8.1901 3.69271 7.91667 3.92969 7.67969ZM3.92969 4.17969C4.16667 3.94271 4.4401 3.82422 4.75 3.82422C5.0599 3.82422 5.33333 3.94271 5.57031 4.17969C5.80729 4.41667 5.92578 4.6901 5.92578 5C5.92578 5.3099 5.80729 5.58333 5.57031 5.82031C5.33333 6.05729 5.0599 6.17578 4.75 6.17578C4.4401 6.17578 4.16667 6.05729 3.92969 5.82031C3.69271 5.58333 3.57422 5.3099 3.57422 5C3.57422 4.6901 3.69271 4.41667 3.92969 4.17969ZM5.57031 2.32031C5.33333 2.55729 5.0599 2.67578 4.75 2.67578C4.4401 2.67578 4.16667 2.55729 3.92969 2.32031C3.69271 2.08333 3.57422 1.8099 3.57422 1.5C3.57422 1.1901 3.69271 0.916667 3.92969 0.679688C4.16667 0.442708 4.4401 0.324219 4.75 0.324219C5.0599 0.324219 5.33333 0.442708 5.57031 0.679688C5.80729 0.916667 5.92578 1.1901 5.92578 1.5C5.92578 1.8099 5.80729 2.08333 5.57031 2.32031ZM0.429688 0.679688C0.666667 0.442708 0.940104 0.324219 1.25 0.324219C1.5599 0.324219 1.83333 0.442708 2.07031 0.679688C2.30729 0.916667 2.42578 1.1901 2.42578 1.5C2.42578 1.8099 2.30729 2.08333 2.07031 2.32031C1.83333 2.55729 1.5599 2.67578 1.25 2.67578C0.940104 2.67578 0.666667 2.55729 0.429688 2.32031C0.192708 2.08333 0.0742188 1.8099 0.0742188 1.5C0.0742188 1.1901 0.192708 0.916667 0.429688 0.679688ZM0.429688 4.17969C0.666667 3.94271 0.940104 3.82422 1.25 3.82422C1.5599 3.82422 1.83333 3.94271 2.07031 4.17969C2.30729 4.41667 2.42578 4.6901 2.42578 5C2.42578 5.3099 2.30729 5.58333 2.07031 5.82031C1.83333 6.05729 1.5599 6.17578 1.25 6.17578C0.940104 6.17578 0.666667 6.05729 0.429688 5.82031C0.192708 5.58333 0.0742188 5.3099 0.0742188 5C0.0742188 4.6901 0.192708 4.41667 0.429688 4.17969ZM2.07031 7.67969C2.30729 7.91667 2.42578 8.1901 2.42578 8.5C2.42578 8.8099 2.30729 9.08333 2.07031 9.32031C1.83333 9.55729 1.5599 9.67578 1.25 9.67578C0.940104 9.67578 0.666667 9.55729 0.429688 9.32031C0.192708 9.08333 0.0742188 8.8099 0.0742188 8.5C0.0742188 8.1901 0.192708 7.91667 0.429688 7.67969C0.666667 7.44271 0.940104 7.32422 1.25 7.32422C1.5599 7.32422 1.83333 7.44271 2.07031 7.67969Z'
      fill='#595959'
    />
  </svg>
);

const CompareResultItemTitle = (props) => {
  const {
    compareResult,
    experimentsOptions,
    onDelete,
    onLoadTrainingHistory,
    onUpdate,
    trainingDetail,
  } = props;

  return (
    <>
      <Space>
        <div draggable='true' style={{ cursor: 'grab', paddingRight: 10 }}>
          <Icon component={DragIcon} />
        </div>
        <Cascader
          defaultValue={
            compareResult.experimentId && compareResult.runId
              ? [compareResult.experimentId, compareResult.runId]
              : null
          }
          displayRender={(label, selectedOptions) => {
            return label[0];
          }}
          loadData={(selectedOptions) => {
            const targetOption = selectedOptions[selectedOptions.length - 1];
            onLoadTrainingHistory(targetOption.value);
          }}
          onChange={(value, selectedOptions) => {
            const updatedCompareResult = {
              ...compareResult,
            };
            if (value.length === 0) {
              updatedCompareResult.experimentId = null;
              updatedCompareResult.operatorId = null;
              updatedCompareResult.runId = null;
            } else {
              updatedCompareResult.experimentId = value[0];
              updatedCompareResult.operatorId = null;
              updatedCompareResult.runId = value[1];
            }
            onUpdate(updatedCompareResult, false);
          }}
          options={experimentsOptions}
          placeholder={'Selecione o experimento'}
          size={'large'}
          style={{ width: 250 }}
        />
        {trainingDetail ? (
          <Space>
            <ClockCircleTwoTone />
            {utils.formatCompareResultDate(trainingDetail.createdAt)}
          </Space>
        ) : null}
      </Space>
      <Popover
        placement='bottom'
        content={
          <Button
            type='text'
            icon={<DeleteOutlined />}
            onClick={() => {
              onDelete(compareResult.uuid);
            }}
          >
            Remover
          </Button>
        }
      >
        <Button
          type='text'
          icon={<MoreOutlined />}
          style={{ float: 'right' }}
        />
      </Popover>
    </>
  );
};

// PROP TYPES
CompareResultItemTitle.propTypes = {
  /** The compare result */
  compareResult: PropTypes.object.isRequired,
  /** The expriment options to use on Cascader */
  experimentsOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Function to handle delete compare result */
  onDelete: PropTypes.func.isRequired,
  /** Function to handle load training history */
  onLoadTrainingHistory: PropTypes.func.isRequired,
  /** Function to handle update compare result */
  onUpdate: PropTypes.func.isRequired,
  /** The expriment training detail */
  trainingDetail: PropTypes.object,
};

// EXPORT DEFAULT
export default CompareResultItemTitle;
