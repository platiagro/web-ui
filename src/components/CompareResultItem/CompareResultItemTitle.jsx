import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Cascader, Popover, Space } from 'antd';
import {
  MoreOutlined,
  DeleteOutlined,
  ClockCircleTwoTone,
} from '@ant-design/icons';

import utils from 'utils';
import { DragIndicatorComponent } from 'assets';

import './CompareResultItem.less';

const CompareResultItemTitle = ({
  onDelete,
  onUpdate,
  compareResult,
  trainingDetail,
  experimentsOptions,
  onLoadTrainingHistory,
}) => {
  const defaultValue = useMemo(() => {
    return compareResult.experimentId && compareResult.runId
      ? [compareResult.experimentId, compareResult.runId]
      : null;
  }, [compareResult.experimentId, compareResult.runId]);

  const handleChangeValue = (value) => {
    const updatedCompareResult = {
      ...compareResult,
    };

    if (value.length === 0) {
      updatedCompareResult.experimentId = null;
      updatedCompareResult.runId = null;
    } else {
      updatedCompareResult.experimentId = value[0];
      updatedCompareResult.runId = value[1];
    }

    updatedCompareResult.activeTab = '1';
    updatedCompareResult.operatorId = null;
    onUpdate(updatedCompareResult, true);
  };

  const handleLoadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    onLoadTrainingHistory(targetOption.value);
  };

  return (
    <>
      <Space>
        <div draggable='true' style={{ cursor: 'grab', paddingRight: 10 }}>
          <DragIndicatorComponent />
        </div>

        <Cascader
          displayRender={([firstLabel]) => firstLabel}
          placeholder={'Selecione o experimento'}
          onChange={handleChangeValue}
          options={experimentsOptions}
          defaultValue={defaultValue}
          loadData={handleLoadData}
          style={{ width: 250 }}
          size={'large'}
        />

        {!!trainingDetail && (
          <Space>
            <ClockCircleTwoTone />
            {utils.formatCompareResultDate(trainingDetail.createdAt)}
          </Space>
        )}
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

CompareResultItemTitle.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  compareResult: PropTypes.object.isRequired,
  trainingDetail: PropTypes.object.isRequired,
  onLoadTrainingHistory: PropTypes.func.isRequired,
  experimentsOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CompareResultItemTitle;
