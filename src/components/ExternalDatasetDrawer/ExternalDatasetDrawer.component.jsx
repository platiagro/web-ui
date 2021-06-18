import React, { useState } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { CopyOutlined } from '@ant-design/icons';

import { PropertyBlock, CopyToClipboard } from 'components';
import { SelectInputBlock } from 'components/InputBlocks';

import './ExternalDatasetDrawer.component.style.less';

const ExternalDatasetDrawer = ({
  urlText,
  propertyTip,
  propertyTitle,
  onClickLearnMore,
  description,
}) => {
  const [inputValue, setInputValue] = useState('Aplicação externa');

  const handleChange = (value) => {
    setInputValue(value);
  };

  return (
    <div className='externalDatasetDrawer'>
      <PropertyBlock title={propertyTitle} tip={propertyTip}>
        <SelectInputBlock
          key='externalDataset'
          placeholder='Selecionar'
          options={['Arquivo local', 'Aplicação externa']}
          handleChange={handleChange}
          value={inputValue}
          valueLatestTraining='Aplicação externa'
        />
      </PropertyBlock>

      <div className='externalDatasetDrawerUrl'>
        <p>{description}</p>

        <p>
          <Button type='link' onClick={onClickLearnMore}>
            Saiba mais
          </Button>
        </p>

        <CopyToClipboard text={urlText}>
          <Button
            style={{ backgroundColor: '#237804', borderColor: '#237804' }}
            icon={<CopyOutlined />}
            type='primary'
            shape='round'
          >
            Copiar URL
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

ExternalDatasetDrawer.propTypes = {
  urlText: PropTypes.string.isRequired,
  propertyTitle: PropTypes.string.isRequired,
  propertyTip: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClickLearnMore: PropTypes.func.isRequired,
};

export default ExternalDatasetDrawer;
