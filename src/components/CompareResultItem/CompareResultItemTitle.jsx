import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Cascader, Dropdown, Menu, Space } from 'antd';
import {
  MoreOutlined,
  DeleteOutlined,
  DownloadOutlined,
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
  handleDownloadResult,
  onLoadTrainingHistory,
}) => {
  const defaultValue = useMemo(() => {
    return compareResult.experimentId && compareResult.runId
      ? [compareResult.experimentId, compareResult.runId]
      : null;
  }, [compareResult.experimentId, compareResult.runId]);

  const canDownloadResult =
    !!compareResult.experimentId &&
    !!compareResult.runId &&
    !!compareResult.operatorId;

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

      <Dropdown
        trigger={['click']}
        overlay={
          <Menu>
            <Menu.Item
              key='remove'
              icon={<DeleteOutlined />}
              onClick={() => {
                onDelete(compareResult.uuid);
              }}
            >
              <span>Remover</span>
            </Menu.Item>

            {canDownloadResult && (
              <Menu.Item
                key='download'
                icon={<DownloadOutlined />}
                onClick={() => {
                  handleDownloadResult(
                    compareResult.experimentId,
                    compareResult.runId,
                    compareResult.operatorId
                  );
                }}
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

CompareResultItemTitle.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  compareResult: PropTypes.object.isRequired,
  trainingDetail: PropTypes.object.isRequired,
  onLoadTrainingHistory: PropTypes.func.isRequired,
  handleDownloadResult: PropTypes.func.isRequired,
  experimentsOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CompareResultItemTitle;
