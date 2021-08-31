import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Select, Skeleton, Popconfirm } from 'antd';
import { ExclamationCircleFilled, DeleteOutlined } from '@ant-design/icons';

import { PropertyBlock } from 'components';

import './SelectInputBlock.style.less';

const SelectInputBlock = ({
  handleChange,
  isDisabled,
  isLoading,
  isMultiple,
  options,
  placeholder,
  tip,
  title,
  value,
  valueLatestTraining,
}) => {
  const selectRef = useRef(null);

  const inputValue = useMemo(() => {
    return typeof value === 'string' ? [value] : value;
  }, [value]);

  const executionValue = useMemo(() => {
    return typeof valueLatestTraining === 'string'
      ? [valueLatestTraining]
      : valueLatestTraining;
  }, [valueLatestTraining]);

  const modifiedSinceLastExecution = useMemo(() => {
    return JSON.stringify(inputValue) !== JSON.stringify(executionValue);
  }, [executionValue, inputValue]);

  const selectMode = useMemo(() => {
    return isMultiple ? 'multiple' : null;
  }, [isMultiple]);

  const handleChangeValues = (values) => {
    selectRef.current.blur();
    handleChange(values);
  };

  const handleClearValues = () => {
    selectRef.current.blur();
    handleChangeValues(null);
  };

  const canShowClearButton = () => {
    if (isMultiple) return value?.length > 0;
    return !!value;
  };

  return (
    <PropertyBlock className='select-input-block' title={title} tip={tip}>
      {isLoading ? (
        <Skeleton
          active
          size='large'
          title={false}
          paragraph={{ rows: 1, width: 110 }}
        />
      ) : (
        <div className='select-input-block-content'>
          <Select
            ref={selectRef}
            value={value}
            mode={selectMode}
            loading={isLoading}
            placeholder={placeholder}
            onChange={handleChangeValues}
            disabled={isLoading || isDisabled}
            className='select-input-block-select'
          >
            {options?.map((option) => {
              const { uuid, name: optionName } = option;

              return (
                <Select.Option key={uuid || option} value={uuid || option}>
                  {optionName || option}
                </Select.Option>
              );
            })}
          </Select>

          {canShowClearButton() && (
            <Popconfirm
              okType='danger'
              okText='Limpar'
              cancelText='Cancelar'
              placement='topLeft'
              onConfirm={handleClearValues}
              title='Deseja limpar selecionado(s)?'
            >
              <DeleteOutlined className='select-input-block-clear' />
            </Popconfirm>
          )}

          {modifiedSinceLastExecution && (
            <Tooltip
              placement='bottomRight'
              title='Valor modificado desde a última execução.'
            >
              <ExclamationCircleFilled className='select-input-block-modified' />
            </Tooltip>
          )}
        </div>
      )}
    </PropertyBlock>
  );
};

SelectInputBlock.propTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  tip: PropTypes.string,
  isMultiple: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  valueLatestTraining: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

SelectInputBlock.defaultProps = {
  tip: undefined,
  value: undefined,
  title: undefined,
  name: undefined,
  isLoading: false,
  isDisabled: false,
  isMultiple: false,
};

export default SelectInputBlock;
